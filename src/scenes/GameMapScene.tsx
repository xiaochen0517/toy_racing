import GeneralTrackMap from "@/components/map/GeneralTrackMap.tsx";
import {PerspectiveCamera} from "@react-three/drei";
import {Physics} from "@react-three/rapier";

export default function GameMapScene() {

  return <>
    <PerspectiveCamera makeDefault fov={50}/>
    <Physics debug={true}>
      <GeneralTrackMap/>
    </Physics>
  </>;
}
