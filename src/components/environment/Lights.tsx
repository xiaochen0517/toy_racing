import {useRef} from "react";
import {CameraHelper, OrthographicCamera} from "three";
import {useHelper} from "@react-three/drei";

export default function Lights() {

  const directionalLightCameraRef = useRef<OrthographicCamera>(null!);
  useHelper(directionalLightCameraRef, CameraHelper);
  return <>
    <ambientLight intensity={0.5}/>
    <directionalLight
      intensity={1} position={[20, 20, 20]}
      castShadow={true}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-normalBias={0.02}
    >
      <orthographicCamera ref={directionalLightCameraRef} attach="shadow-camera" args={[-15, 15, 15, -15, 10, 50]}/>
    </directionalLight>
  </>
}
