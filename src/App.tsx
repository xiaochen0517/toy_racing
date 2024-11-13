import {Canvas} from "@react-three/fiber";
import {Box, OrbitControls} from "@react-three/drei";
import {Suspense} from "react";
import LoadingScene from "./scenes/base/LoadingScene.tsx";

export default function App() {

  return (
    <>
      <Canvas className="w-full h-full touch-none" shadows={true}>
        <Suspense fallback={<LoadingScene/>}>
          <OrbitControls/>
          <ambientLight intensity={0.5}/>
          <directionalLight intensity={0.5} position={[0, 5, 5]} castShadow/>
          <Box args={[1, 1, 1]} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="hotpink"/>
          </Box>
        </Suspense>
      </Canvas>
    </>
  )
}
