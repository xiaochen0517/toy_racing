import {ArrowHelper, MathUtils, Mesh, Object3D, Vector3} from "three"
import {useKeyboardControls} from "@react-three/drei"
import {ConvexHullCollider, RapierRigidBody, RigidBody, useRapier} from "@react-three/rapier";
import {cloneElement, ReactElement, RefObject, useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {useVehicleController, WheelInfo} from "@/utils/UseVehicleController.ts";
import {Collider, DynamicRayCastVehicleController} from '@dimforge/rapier3d-compat'
import {STEERING_SPEED, VehicleUtil} from "@/utils/VehicleUtil.ts";

type WheelBaseInfo = Omit<WheelInfo, "position">;
type VehicleControllerProps = {
  position?: [number, number, number]
  rotation?: [number, number, number]
  vehicleBodyMesh: ReactElement<JSX.IntrinsicElements['mesh']>
  wheelMeshes: ReactElement<JSX.IntrinsicElements['mesh']>[]
  wheelPositions: Vector3[]
  wheelBaseInfo: WheelBaseInfo
  accelerateForce?: number
  brakeForce?: number
  steerAngle?: number
  cameraTracking?: boolean
  cameraOffset?: Vector3
  cameraTargetOffset?: Vector3
  showcase?: boolean
  canMove?: boolean
  groundHeight?: number
}

export function VehicleController(
  {
    position,
    rotation,
    vehicleBodyMesh,
    wheelMeshes,
    wheelPositions,
    wheelBaseInfo,
    accelerateForce = 0.3,
    brakeForce = 0.01,
    steerAngle = Math.PI * 0.04,
    cameraTracking,
    cameraOffset = new Vector3(0, 2, 3),
    cameraTargetOffset = new Vector3(0, 1, 0),
    showcase = false,
    canMove = true,
    groundHeight = 0.5,
  }: VehicleControllerProps) {

  const {world, rapier} = useRapier();
  const state = useThree();

  const bodyMeshRef = useRef<Mesh>(null!);
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const wheelsRef: RefObject<(Object3D | null)[]> = useRef([]);

  const [wheels] = useState<WheelInfo[]>([]);
  const [vertices, setVertices] = useState<number[]>([]);
  const [indices, setIndices] = useState<number[]>([]);
  useEffect(() => {
    if (bodyMeshRef.current) {
      const geometry = bodyMeshRef.current.geometry;
      setVertices(Array.from(geometry.attributes.position.array));
      setIndices(Array.from(geometry.index?.array ?? []));
    }
    for (const wheelPosition of wheelPositions) {
      wheels.push({...wheelBaseInfo, position: wheelPosition});
    }
  }, [wheelBaseInfo, wheelPositions, bodyMeshRef, wheels]);

  const {vehicleController} = useVehicleController(bodyRef, wheelsRef as RefObject<Object3D[]>, wheels);

  const [smoothedCameraPosition] = useState(new Vector3(0, 10, 30));
  const [smoothedCameraTarget] = useState(new Vector3());

  const [, getKeys] = useKeyboardControls();
  const ground = useRef<Collider | null>(null);

  const {scene} = useThree();
  const groundArrowHelperRef = useRef<ArrowHelper | null>(null);

  /**
   * 检测车辆是否在地面上
   */
  const groundRayCast = (controller: DynamicRayCastVehicleController) => {
    const chassisRigidBody = controller.chassis();
    const groundRay = new rapier.Ray(chassisRigidBody.translation(), {x: 0, y: -1, z: 0});
    const groundRayResult = world.castRay(
      groundRay,
      groundHeight,
      true,
      undefined,
      undefined,
      undefined,
      chassisRigidBody
    );
    ground.current = groundRayResult ? groundRayResult.collider : null;
    // ray cast debug
    if (groundArrowHelperRef.current) {
      groundArrowHelperRef.current.position.copy(VehicleUtil.vector2Vector3(groundRay.origin));
    } else {
      groundArrowHelperRef.current = new ArrowHelper(
        VehicleUtil.vector2Vector3(groundRay.dir),
        VehicleUtil.vector2Vector3(groundRay.origin),
        groundHeight,
        0x00ff00,
        0.1,
        0.1
      );
      scene.add(groundArrowHelperRef.current);
    }
  }

  /**
   * 如果车辆在空中，根据按键控制车辆的旋转
   */
  const airControl = (lerpDelta: number, controller: DynamicRayCastVehicleController) => {
    if (ground.current) {
      return;
    }
    const keys = getKeys();
    const chassisRigidBody = controller.chassis();
    const rotations = VehicleUtil.getAirControlAngle(rapier, keys, chassisRigidBody, lerpDelta);
    chassisRigidBody.setAngvel(rotations, true);
  }

  /**
   * 引擎力、刹车力、转向力
   */
  const movePlayer = (controller: DynamicRayCastVehicleController) => {
    const {forward, backward, left, right, brake} = getKeys();

    const chassisRigidBody = controller.chassis();
    let engineForce = Number(forward) * accelerateForce - Number(backward) * accelerateForce;
    if (engineForce != 0) {
      const localVelocity = VehicleUtil.getRigidBodyLocalVelocity(chassisRigidBody);
      // console.log("current velocity", localVelocity.z);
      engineForce = VehicleUtil.easeOutQuart(engineForce > 0, engineForce, localVelocity.z, 10);
    }
    controller.setWheelEngineForce(2, engineForce);
    controller.setWheelEngineForce(3, engineForce);

    const wheelBrake = Number(brake) * brakeForce;
    controller.setWheelBrake(2, wheelBrake);
    controller.setWheelBrake(3, wheelBrake);

    const currentSteering = controller.wheelSteering(0) || 0;
    const steerDirection = Number(left) - Number(right);
    const steering = MathUtils.lerp(currentSteering, steerAngle * steerDirection, STEERING_SPEED);
    controller.setWheelSteering(0, steering);
    controller.setWheelSteering(1, steering);
  }

  /**
   * 镜头跟随车辆
   */
  const moveCamera = (lerpDelta: number, controller: DynamicRayCastVehicleController) => {
    const chassisRigidBody = controller.chassis();
    /* 车辆在地面和空中使用不同的镜头跟随方式 */
    if (ground.current) {
      // 车辆在地面或翻车
      VehicleUtil.cameraPosition.copy(cameraOffset);
      const bodyWorldMatrix = bodyMeshRef.current.matrixWorld;
      VehicleUtil.cameraPosition.applyMatrix4(bodyWorldMatrix);
    } else {
      // 车辆在空中
      const velocity = chassisRigidBody.linvel();
      VehicleUtil.cameraPosition.copy(velocity);
      VehicleUtil.cameraPosition.normalize();
      VehicleUtil.cameraPosition.multiplyScalar(-10);
      VehicleUtil.cameraPosition.add(chassisRigidBody.translation());
    }
    // 防止镜头穿过地面
    const minCameraY = (vehicleController.current?.chassis().translation().y ?? 0) + 1;
    VehicleUtil.cameraPosition.y = Math.max(VehicleUtil.cameraPosition.y, minCameraY);
    // 镜头平滑移动
    smoothedCameraPosition.lerp(VehicleUtil.cameraPosition, lerpDelta);
    state.camera.position.copy(smoothedCameraPosition);
    // 镜头看向车辆
    const bodyPosition = bodyMeshRef.current.getWorldPosition(VehicleUtil.bodyPosition);
    VehicleUtil.cameraTarget.copy(bodyPosition);
    VehicleUtil.cameraTarget.add(cameraTargetOffset);
    smoothedCameraTarget.lerp(VehicleUtil.cameraTarget, lerpDelta);
    state.camera.lookAt(smoothedCameraTarget);
  };

  useFrame((_state, delta) => {
    if (!bodyRef.current || !vehicleController.current || showcase) return;

    const controller = vehicleController.current;
    if (!controller) return;

    const lerpDelta = 1.0 - Math.pow(0.01, delta);
    groundRayCast(controller);
    airControl(lerpDelta, controller);

    if (canMove) movePlayer(controller);
    if (cameraTracking) moveCamera(lerpDelta, controller);
  });

  return (
    <group position={position} rotation={rotation} dispose={null}>
      <RigidBody ref={bodyRef} canSleep={false} colliders={false} type={!showcase ? "dynamic" : "fixed"} userData={{type: "vehicle"}}>
        {vertices.length > 0 && indices.length > 0 && (
          <ConvexHullCollider args={[vertices]} mass={0.15}/>
        )}

        {cloneElement(vehicleBodyMesh, {ref: bodyMeshRef})}
        {wheelMeshes.map((wheelMesh, index) => {
          return cloneElement(wheelMesh, {
            key: index,
            ref: (itemRef: Object3D | null) => {
              if (wheelsRef.current) wheelsRef.current[index] = itemRef
            }
          })
        })}
      </RigidBody>
    </group>
  )
}
