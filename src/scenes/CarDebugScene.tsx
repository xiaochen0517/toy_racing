import {OrbitControls, Stage} from "@react-three/drei";
import Lights from "@/components/environment/Lights.tsx";
import {Physics} from "@react-three/rapier";
import {VehicleRacerLow} from "@/components/vehicles/VehicleRacerLow.tsx";
import TestGround from "@/components/debug/TestGround.tsx";

export default function CarDebugScene() {
  return <>
    <OrbitControls/>
    <Lights/>
    <Stage/>
    <Physics debug={true}>
      <VehicleRacerLow position={[0, 0.1, 0]}/>
      {/*<TestWall/>*/}
      <TestGround/>
    </Physics>
  </>;
}
