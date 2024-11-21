import * as THREE from "three"
import {MathUtils, Mesh, Object3D, Vector3} from "three"
import {useKeyboardControls} from "@react-three/drei"
import {ConvexHullCollider, RapierRigidBody, RigidBody, useRapier} from "@react-three/rapier";
import {cloneElement, ReactElement, RefObject, useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {useVehicleController, WheelInfo} from "@/utils/UseVehicleController.ts";
import {Collider} from '@dimforge/rapier3d-compat'
import {useControls} from "leva";
import {VehicleUtil} from "@/utils/VehicleUtil.ts";


const _bodyPosition = new THREE.Vector3()
const _airControlAngVel = new THREE.Vector3()
const _cameraPosition = new THREE.Vector3()
const _cameraTarget = new THREE.Vector3()

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
}

export function VehicleController(props: VehicleControllerProps) {

  /* Debug */
  const {accelerateForce, brakeForce, steerAngle, cameraTracking} = useControls('vehicle-controller', {
    accelerateForce: {value: props.accelerateForce ?? 0.3, min: 0, max: 1},
    brakeForce: {value: props.brakeForce ?? 0.01, min: 0, max: 0.2, step: 0.001},
    steerAngle: {value: props.steerAngle ?? Math.PI * 0.04, min: 0, max: Math.PI * 0.4},
    cameraTracking: {value: props.cameraTracking ?? true, label: 'Camera Tracking'},
  }, {collapsed: true})

  const wheels: WheelInfo[] = [];
  for (const wheelPosition of props.wheelPositions) {
    wheels.push({...props.wheelBaseInfo, position: wheelPosition});
  }
  const cameraOffset = props.cameraOffset ?? new Vector3(0, 2, 3);
  const cameraTargetOffset = props.cameraTargetOffset ?? new Vector3(0, 1, 0);

  const {world, rapier} = useRapier();
  const state = useThree();

  const bodyMeshRef = useRef<Mesh>(null!);
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const wheelsRef: RefObject<(Object3D | null)[]> = useRef([]);

  const [vertices, setVertices] = useState<number[]>([]);
  const [indices, setIndices] = useState<number[]>([]);
  useEffect(() => {
    if (bodyMeshRef.current) {
      const geometry = bodyMeshRef.current.geometry;
      setVertices(Array.from(geometry.attributes.position.array));
      setIndices(Array.from(geometry.index?.array ?? []));
    }
  }, []);

  const {vehicleController} = useVehicleController(bodyRef, wheelsRef as RefObject<Object3D[]>, wheels);

  const [smoothedCameraPosition] = useState(new Vector3(0, 10, 30));
  const [smoothedCameraTarget] = useState(new Vector3());

  const [, getKeys] = useKeyboardControls();
  const ground = useRef<Collider>()

  const movePlayer = (delta: number) => {
    if (!bodyRef.current || !vehicleController.current) {
      return;
    }
    const time = 1.0 - Math.pow(0.01, delta);
    /* controls */
    const {forward, backward, left, right, brake} = getKeys();
    const controller = vehicleController.current;
    if (!controller) {
      console.error('controller is not ready');
      return;
    }

    const chassisRigidBody = controller.chassis();
    const ray = new rapier.Ray(chassisRigidBody.translation(), {x: 0, y: -1, z: 0});
    const rayCastResult = world.castRay(ray, props.wheelBaseInfo.suspensionRestLength + 0.01, false, undefined, undefined, undefined, chassisRigidBody);
    ground.current = rayCastResult ? rayCastResult.collider : undefined;

    // air control
    if (!ground.current) {
      const forwardAngVel = Number(forward) - Number(backward);
      const sideAngVel = Number(left) - Number(right);

      const angVel = _airControlAngVel.set(forwardAngVel * time, sideAngVel * time, 0);
      angVel.applyQuaternion(chassisRigidBody.rotation());
      angVel.add(chassisRigidBody.angvel());
      chassisRigidBody.setAngvel(new rapier.Vector3(angVel.x, angVel.y, angVel.z), true);
      return;
    }

    let engineForce = Number(forward) * accelerateForce - Number(backward) * accelerateForce;
    if (engineForce != 0) {
      const localVelocity = VehicleUtil.getRigidBodyLocalVelocity(chassisRigidBody);
      console.log("current velocity", localVelocity.z);
      engineForce = VehicleUtil.easeOutQuart(engineForce > 0, engineForce, localVelocity.z, 10);
    }

    controller.setWheelEngineForce(2, engineForce);
    controller.setWheelEngineForce(3, engineForce);

    const wheelBrake = Number(brake) * brakeForce;
    // controller.setWheelBrake(0, wheelBrake);
    // controller.setWheelBrake(1, wheelBrake);
    controller.setWheelBrake(2, wheelBrake);
    controller.setWheelBrake(3, wheelBrake);

    const currentSteering = controller.wheelSteering(0) || 0;
    const steerDirection = Number(left) - Number(right);
    const steering = MathUtils.lerp(currentSteering, steerAngle * steerDirection, 0.2);
    controller.setWheelSteering(0, steering);
    controller.setWheelSteering(1, steering);
  }
  const moveCamera = (delta: number) => {
    if (!bodyRef.current || !vehicleController.current) {
      return;
    }
    /* camera */
    const controller = vehicleController.current;
    if (!controller) {
      console.error('controller is not ready');
      return;
    }
    const chassisRigidBody = controller.chassis()

    const time = 1.0 - Math.pow(0.01, delta)

    // camera position
    const cameraPosition = _cameraPosition

    if (ground.current !== undefined && ground.current) {
      // camera behind chassis
      cameraPosition.copy(cameraOffset)
      const bodyWorldMatrix = bodyMeshRef.current.matrixWorld
      cameraPosition.applyMatrix4(bodyWorldMatrix)
    } else {
      // camera behind velocity
      const velocity = chassisRigidBody.linvel()
      cameraPosition.copy(velocity)
      cameraPosition.normalize()
      cameraPosition.multiplyScalar(-10)
      cameraPosition.add(chassisRigidBody.translation())
    }

    cameraPosition.y = Math.max(cameraPosition.y, (vehicleController.current?.chassis().translation().y ?? 0) + 1)

    smoothedCameraPosition.lerp(cameraPosition, time)
    state.camera.position.copy(smoothedCameraPosition)

    // camera target
    const bodyPosition = bodyMeshRef.current.getWorldPosition(_bodyPosition)
    const cameraTarget = _cameraTarget

    cameraTarget.copy(bodyPosition)
    cameraTarget.add(cameraTargetOffset)
    smoothedCameraTarget.lerp(cameraTarget, time)

    state.camera.lookAt(smoothedCameraTarget)
  };

  useFrame((_state, delta) => {
    if (props.showcase) {
      return;
    }
    movePlayer(delta);
    if (cameraTracking) {
      moveCamera(delta);
    }
  });

  return (
    <group {...props} dispose={null}>
      <RigidBody ref={bodyRef} canSleep={false} colliders={false} type={!props.showcase ? "dynamic" : "fixed"}>
        {vertices.length > 0 && indices.length > 0 && (
          <ConvexHullCollider args={[vertices]} mass={0.15}/>
        )}

        {cloneElement(props.vehicleBodyMesh, {ref: bodyMeshRef})}
        {props.wheelMeshes.map((wheelMesh, index) => {
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
