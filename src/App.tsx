import {Suspense} from "react";
import LoadingScene from "./scenes/base/LoadingScene.tsx";
import {Perf} from "r3f-perf";
import {useSnapshot} from "valtio/react";
import {Scenes, sceneStore} from "@/stores/ScenesStore.ts";
import {Canvas} from "@react-three/fiber";
import GameHelp from "@/components/html/GameHelp.tsx";

export default function App() {

  const sceneStoreSnapshot = useSnapshot(sceneStore);

  const Scene = Scenes[sceneStoreSnapshot.currentScene];

  return (
    <>
      <Canvas className="w-full h-full touch-none" shadows={true}>
        <Suspense fallback={<LoadingScene/>}>
          <Perf position="top-left" minimal={true}/>
          <color attach="background" args={["#202020"]}/>
          <Scene/>
        </Suspense>
      </Canvas>
      <GameHelp/>
    </>
  )
}
