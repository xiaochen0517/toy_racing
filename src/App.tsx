import {Canvas} from "@react-three/fiber";
import {Box, KeyboardControls, OrbitControls} from "@react-three/drei";
import {Suspense} from "react";
import LoadingScene from "./scenes/base/LoadingScene.tsx";
import {Physics, RigidBody} from "@react-three/rapier";
import {Perf} from "r3f-perf";
import {VehicleRacerLow} from "./components/vehicles/VehicleRacerLow.tsx";

export default function App() {

  return (
    <>
      <KeyboardControls
        map={[
          {name: "forward", keys: ["KeyW", "ArrowUp"]},
          {name: "backward", keys: ["KeyS", "ArrowDown"]},
          {name: "left", keys: ["KeyA", "ArrowLeft"]},
          {name: "right", keys: ["KeyD", "ArrowRight"]},
        ]}
      >
        <Canvas className="w-full h-full touch-none" shadows={true}>
          <Suspense fallback={<LoadingScene/>}>
            <Perf position="top-left"/>
            <OrbitControls/>
            <color attach="background" args={["#202020"]}/>
            <ambientLight intensity={0.5}/>
            <directionalLight intensity={1} position={[0, 5, 5]} castShadow/>
            <Physics debug={true}>
              <VehicleRacerLow position={[0, 0.5, 0]}/>
              <RigidBody type="fixed" restitution={0}>
                <Box args={[10, 0.4, 10]} position={[0, -0.2, 0]} receiveShadow>
                  {/*<MeshDiscardMaterial/>*/}
                </Box>
              </RigidBody>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  )
}
