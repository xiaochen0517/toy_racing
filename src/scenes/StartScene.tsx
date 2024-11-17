import {useThree} from "@react-three/fiber";
import {Float, Html, Text} from "@react-three/drei";
import StartMenuButton from "@/components/html/StartMenuButton.tsx";
import {setCurrentScene} from "@/stores/ScenesStore.ts";

export default function StartScene() {

  const state = useThree();
  state.camera.position.set(0, 0, 5);

  return <>
    <Float rotationIntensity={0.5} floatIntensity={2} speed={3}>
      <Text font="/fonts/quicksand/Quicksand-Bold.ttf" fontSize={1} position={[0, 1, 0]}>
        Toy Racing
      </Text>
    </Float>
    <Html fullscreen={true} transform={false}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex-1"/>
        <div className="flex-1 w-72 mt-32 flex flex-col gap-4 items-center">
          <StartMenuButton className="w-full" onClick={() => setCurrentScene("vehicleSelectionScene")}>
            Start Game
          </StartMenuButton>
          <StartMenuButton className="w-full">Options</StartMenuButton>
        </div>
      </div>
    </Html>
  </>;
}
