import GeneralTrackMap from "@/components/map/GeneralTrackMap.tsx";
import Lights from "@/components/environment/Lights.tsx";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {useThree} from "@react-three/fiber";
import {Physics} from "@react-three/rapier";

export default function GameMapScene() {

  const state = useThree();
  console.log(state.camera)

  return <>
    <PerspectiveCamera makeDefault position={[5, 5, 5]}/>
    <OrbitControls/>
    <Lights/>
    <Physics debug={true}>
      <GeneralTrackMap/>
    </Physics>
  </>;
}
