import {useRef} from "react";
import {CameraHelper, OrthographicCamera} from "three";
import {useHelper} from "@react-three/drei";

export default function Lights() {

  const directionalLightCameraRef = useRef<OrthographicCamera>(null!);
  useHelper(directionalLightCameraRef, CameraHelper);
  return <>
    <ambientLight intensity={0.5}/>
    <directionalLight
      intensity={1} position={[5, 5, 5]} castShadow={true}
      shadow-mapSize-width={2048} // 增加阴影贴图的分辨率
      shadow-mapSize-height={2048}
    >
      <orthographicCamera ref={directionalLightCameraRef} attach="shadow-camera" args={[-10, 10, 10, -10, 0.5, 20]}/>
    </directionalLight>
  </>
}
