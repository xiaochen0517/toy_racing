import GeneralTrackMap from "@/components/map/GeneralTrackMap.tsx";
import Lights from "@/components/environment/Lights.tsx";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Physics} from "@react-three/rapier";

export default function GameMapScene() {

  return <>
    <PerspectiveCamera makeDefault/>
    <OrbitControls/>
    <Lights/>
    <Physics debug={true}>
      <GeneralTrackMap/>
    </Physics>
  </>;
}
