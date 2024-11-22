import {Text} from "@react-three/drei";
import {useEffect, useState} from "react";

type StartCountDownProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  onStarted?: () => void;
}

export default function StartCountDown(
  {
    position,
    rotation,
    onStarted,
  }: StartCountDownProps) {

  const [countDown, setCountDown] = useState<number>(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDown >= -1) {
        setCountDown(countDown - 1);
      }
      if (countDown === 0 && onStarted) {
        onStarted();
        clearTimeout(timer);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countDown, onStarted]);

  return <group position={position} rotation={rotation}>
    {countDown >= -1 ?
      <Text
        font="/fonts/quicksand/Quicksand-Bold.ttf"
        fontSize={1.5}
        position={[0, 0, 0]}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial attach="material" color="black"/>
        {countDown < 0 ? "Go!" : countDown}
      </Text> : null}
  </group>;
}
