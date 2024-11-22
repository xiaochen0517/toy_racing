import {Text} from "@react-three/drei";
import {useState} from "react";
import {useFrame} from "@react-three/fiber";

type StartCountDownProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function StartCountDown(
  {
    position,
    rotation,
  }: StartCountDownProps) {

  const [countDown, setCountDown] = useState<number>(5);

  useFrame(() => {
    setTimeout(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1);
      }
    }, 1000);
  });

  return <group position={position} rotation={rotation}>
    <Text
      font="/fonts/quicksand/Quicksand-Bold.ttf"
      fontSize={1.5}
      position={[0, 0, 0]}
      castShadow={true}
      receiveShadow={true}
    >
      <meshStandardMaterial attach="material" color="black"/>
      {countDown}
    </Text>
  </group>;
}
