import {Canvas} from "@react-three/fiber";
import {Box, MeshDiscardMaterial, OrbitControls} from "@react-three/drei";
import {Suspense} from "react";
import LoadingScene from "./scenes/base/LoadingScene.tsx";
import {VehicleRacerLow} from "./components/vehicles/VehicleRacerLow.tsx";
import {Physics, RigidBody} from "@react-three/rapier";
import {Perf} from "r3f-perf";

export default function App() {

  return (
    <>
      <Canvas className="w-full h-full touch-none" shadows={true}>
        <Suspense fallback={<LoadingScene/>}>
          <Perf position="top-left"/>
          <OrbitControls/>
          <ambientLight intensity={0.5}/>
          <directionalLight intensity={1} position={[0, 5, 5]} castShadow/>
          <Physics debug={true}>
            <VehicleRacerLow position={[0, 0.5, 0]}/>
            <RigidBody type="fixed" restitution={0}>
              <Box args={[10, 0.4, 10]} position={[0, -0.2, 0]} receiveShadow>
                <MeshDiscardMaterial/>
              </Box>
            </RigidBody>
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}
