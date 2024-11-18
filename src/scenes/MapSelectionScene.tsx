import {Html, OrthographicCamera} from "@react-three/drei";
import Lights from "@/components/environment/Lights.tsx";
import BaseButton from "@/components/html/BaseButton.tsx";
import {setCurrentScene} from "@/stores/ScenesStore.ts";
import {ButtonType} from "@/components/html/ButtonType.ts";
import {useThree} from "@react-three/fiber";
import {Vector3} from "three";

export default function MapSelectionScene() {

  const {camera} = useThree();
  camera.lookAt(new Vector3(0, 0, 0));

  return <>
    <OrthographicCamera makeDefault position={[0, 0.5, 1]} zoom={250}/>
    <Lights/>
    <Html fullscreen={true} transform={false}>
      <div className="w-full h-full flex flex-row">
        <div className="flex-1"/>
        <div className="flex-1 flex flex-row items-center">
          <div className="flex-1 mx-4 h-72 p-4 flex flex-col gap-2 rounded-xl overflow-y-auto bg-opacity-20 bg-neutral-500">
            <h1 className="text-neutral-50 font-black text-2xl text-center">Debug Map</h1>
            <p className="text-neutral-100">
              Debug Map
            </p>
            <div className="flex-1"/>
            <div className="flex flex-row gap-2">
              <BaseButton onClick={() => setCurrentScene("gameMapScene")}>
                Start
              </BaseButton>
              <div className="flex-1"/>
              {/*<BaseButton>*/}
              {/*  Customize*/}
              {/*</BaseButton>*/}
              <BaseButton type={ButtonType.WARNING} onClick={() => setCurrentScene("vehicleSelectionScene")}>
                Back
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Html>
  </>;
}
