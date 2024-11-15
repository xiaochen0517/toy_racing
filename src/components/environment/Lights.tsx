import {useRef} from "react";
import {CameraHelper, OrthographicCamera} from "three";
import {useHelper} from "@react-three/drei";

export default function Lights() {

  const directionalLightCameraRef = useRef<OrthographicCamera>(null!);
  useHelper(directionalLightCameraRef, CameraHelper);
  return <>
    <ambientLight intensity={0.5}/>
    <directionalLight intensity={1} position={[5, 5, 5]} castShadow>
      <orthographicCamera ref={directionalLightCameraRef} attach="shadow-camera" args={[-10, 10, 10, -10, 0.5, 20]}/>
    </directionalLight>
  </>
}
