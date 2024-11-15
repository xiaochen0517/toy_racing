import {Canvas} from "@react-three/fiber";
import {Box, KeyboardControls, OrbitControls} from "@react-three/drei";
import {Suspense} from "react";
import LoadingScene from "./scenes/base/LoadingScene.tsx";
import {Physics, RigidBody} from "@react-three/rapier";
import {Perf} from "r3f-perf";
import {VehicleRacerLow} from "./components/vehicles/VehicleRacerLow.tsx";
import Lights from "./components/environment/Lights.tsx";

export default function App() {

  return (
    <>
      <KeyboardControls
        map={[
          {name: "forward", keys: ["KeyW", "ArrowUp"]},
          {name: "backward", keys: ["KeyS", "ArrowDown"]},
          {name: "left", keys: ["KeyA", "ArrowLeft"]},
          {name: "right", keys: ["KeyD", "ArrowRight"]},
          {name: "brake", keys: ["Space"]},
        ]}
      >
        <Canvas className="w-full h-full touch-none" shadows={true}>
          <Suspense fallback={<LoadingScene/>}>
            <Perf position="top-left"/>
            <axesHelper args={[5]}/>
            <OrbitControls/>
            <color attach="background" args={["#202020"]}/>
            <Lights/>
            <Physics debug={true}>
              <VehicleRacerLow position={[0, 0.5, 0]}/>
              <RigidBody type="fixed" restitution={0.2} friction={1}>
                <Box args={[50, 0.4, 50]} position={[0, -0.2, 0]} receiveShadow>
                  <meshStandardMaterial color="skyblue" metalness={0.3} roughness={0.8}/>
                </Box>
              </RigidBody>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  )
}
