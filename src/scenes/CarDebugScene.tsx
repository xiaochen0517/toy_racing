import {Box, OrbitControls, SoftShadows} from "@react-three/drei";
import Lights from "@/components/environment/Lights.tsx";
import {Physics, RigidBody} from "@react-three/rapier";
import {VehicleRacerLow} from "@/components/vehicles/VehicleRacerLow.tsx";
import TestWall from "@/components/debug/TestWall.tsx";

export default function CarDebugScene() {
  return <>
    <OrbitControls/>
    <Lights/>
    <SoftShadows samples={100}/>
    <Physics debug={true}>
      <VehicleRacerLow position={[0, 0.1, 0]}/>
      <TestWall/>
      <RigidBody type="fixed" restitution={0.2} friction={0.5}>
        <Box args={[50, 0.4, 50]} position={[0, -0.2, 0]} receiveShadow>
          <meshStandardMaterial color="skyblue" metalness={0.3} roughness={0.8}/>
        </Box>
      </RigidBody>
    </Physics>
  </>;
}
