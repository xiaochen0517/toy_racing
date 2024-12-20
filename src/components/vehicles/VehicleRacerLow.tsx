import * as THREE from "three"
import {Vector3} from "three"
import {Plane, useGLTF} from "@react-three/drei"
import {GLTF} from "three-stdlib"
import {VehicleController} from "./VehicleController.tsx";
import {WheelInfo} from "@/utils/UseVehicleController.ts";
import {VehicleComponentProps} from "@/components/vehicles/VehicleModelShowcase.tsx";

type GLTFResult = GLTF & {
  nodes: {
    ["vehicle-racer-low_1"]: THREE.Mesh
    ["wheel-fr"]: THREE.Mesh
    ["wheel-br"]: THREE.Mesh
    ["wheel-bl"]: THREE.Mesh
    ["wheel-fl"]: THREE.Mesh
  }
  materials: {
    colormap: THREE.MeshStandardMaterial
  }
}
const wheelInfo: Omit<WheelInfo, 'position'> = {
  axleCs: new THREE.Vector3(1, 0, 0),
  suspensionRestLength: 0.04,
  suspensionStiffness: 90,
  maxSuspensionTravel: 0.5,
  radius: 0.125,
}

const WHEELS_POSITIONS: Vector3[] = [
  new Vector3(-0.237, 0.125, -0.25),
  new Vector3(0.237, 0.125, -0.25),
  new Vector3(-0.237, 0.125, 0.25),
  new Vector3(0.237, 0.125, 0.25),
]

export function VehicleRacerLow(props: VehicleComponentProps) {

  const {nodes, materials} = useGLTF('/models/toy_card_kit/vehicle-racer-low.glb') as GLTFResult

  return (
    <group ref={props.modelRef} position={props.position} rotation={props.rotation} scale={props.scale} dispose={null}>
      <VehicleController
        vehicleBodyMesh={(
          <mesh
            castShadow={true}
            geometry={nodes['vehicle-racer-low_1'].geometry}
            material={materials.colormap}
          >
          </mesh>)}
        wheelMeshes={[
          <mesh
            castShadow={true}
            geometry={nodes['wheel-fl'].geometry}
            material={materials.colormap}
            position={WHEELS_POSITIONS[0]}
          />,
          <mesh
            castShadow={true}
            geometry={nodes['wheel-fr'].geometry}
            material={materials.colormap}
            position={WHEELS_POSITIONS[1]}
          />,
          <mesh
            castShadow={true}
            geometry={nodes['wheel-bl'].geometry}
            material={materials.colormap}
            position={WHEELS_POSITIONS[2]}
          />,
          <mesh
            castShadow={true}
            geometry={nodes['wheel-br'].geometry}
            material={materials.colormap}
            position={WHEELS_POSITIONS[3]}
          />
        ]}
        wheelPositions={WHEELS_POSITIONS}
        wheelBaseInfo={wheelInfo}
        accelerateForce={0.3}
        brakeForce={0.01}
        steerAngle={Math.PI * 0.03}
        cameraTracking={true}
        cameraOffset={new THREE.Vector3(0, 1, 4)}
        cameraTargetOffset={new THREE.Vector3(0, 0.7, 0)}
        showcase={props.showcase ?? false}
        canMove={props.started ?? true}
      />

      {props.showcase === true ? <Plane args={[2, 2]} rotation-x={-Math.PI / 2} receiveShadow>
        <shadowMaterial attach="material" color="#000000" opacity={0.3}/>
      </Plane> : null}
    </group>
  )
}

useGLTF.preload('/models/toy_card_kit/vehicle-racer-low.glb')
