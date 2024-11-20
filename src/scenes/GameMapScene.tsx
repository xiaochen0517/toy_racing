import GeneralTrackMap from "@/components/map/GeneralTrackMap.tsx";
import Lights from "@/components/environment/Lights.tsx";
import {PerspectiveCamera} from "@react-three/drei";
import {Physics} from "@react-three/rapier";

export default function GameMapScene() {

  return <>
    <PerspectiveCamera makeDefault fov={50}/>
    <Lights/>
    <Physics debug={true}>
      <GeneralTrackMap/>
    </Physics>
  </>;
}
