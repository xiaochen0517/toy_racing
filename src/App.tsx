import {Suspense} from "react";
import LoadingScene from "./scenes/base/LoadingScene.tsx";
import {Perf} from "r3f-perf";
import {useSnapshot} from "valtio/react";
import {Scenes, sceneStore} from "@/stores/ScenesStore.ts";

export default function App() {

  const sceneStoreSnapshot = useSnapshot(sceneStore);

  const Scene = Scenes[sceneStoreSnapshot.currentScene];

  return (
    <>
      <Suspense fallback={<LoadingScene/>}>
        <Perf position="top-left"/>
        <color attach="background" args={["#202020"]}/>
        <Scene/>
      </Suspense>
    </>
  )
}
