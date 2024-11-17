import {useFrame, useThree} from "@react-three/fiber";
import {Html, OrthographicCamera} from "@react-three/drei";
import VehicleModelShowcase from "@/components/vehicles/VehicleModelShowcase.tsx";
import {Physics} from "@react-three/rapier";
import Lights from "@/components/environment/Lights.tsx";
import {useEffect, useRef, useState} from "react";
import {Group, OrthographicCamera as OrthographicCameraImpl, Vector3} from "three";

export default function VehicleSelectionScene() {

  const {camera, size} = useThree();
  camera.lookAt(new Vector3(0, 0, 0));

  const [quarterX, setQuarterX] = useState<number>(-1);

  useEffect(() => {
    if (!(camera instanceof OrthographicCameraImpl)) {
      return;
    }
    const frustumWidth = (camera.right - camera.left) / camera.zoom;
    const screenQuarterX = frustumWidth / 4;
    setQuarterX(-screenQuarterX);
  }, [camera, size, setQuarterX]);

  const vehicleModelShowcaseRef = useRef<Group>(null!);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    vehicleModelShowcaseRef.current.rotation.y = elapsedTime / 2;
  });

  return <>
    <OrthographicCamera makeDefault position={[0, 0.5, 1]} zoom={250}/>
    <Lights/>
    <Physics>
      <VehicleModelShowcase modelRef={vehicleModelShowcaseRef} position={[quarterX, 0, 0]}/>
    </Physics>
    <Html fullscreen={true} transform={false}>
      <div className="w-full h-full flex flex-row">
        <div className="flex-1"/>
        <div className="flex-1 flex flex-row items-center">
          <div className="flex-1 mx-4 h-72 p-4 flex flex-col gap-2 rounded-xl overflow-y-auto bg-opacity-20 bg-neutral-500">
            <h1 className="text-neutral-50 font-black text-2xl text-center">Vehicle Racer Low</h1>
            <p className="text-neutral-100">
              A small rally car with balanced performance, suitable for various terrains.
            </p>
            <div className="flex-1"/>
            <button className="w-fit px-2 rounded-md text-xl font-black shadow-md border border-sky-700 text-neutral-100 bg-sky-600 hover:bg-sky-700 hover:border-sky-800 active:bg-sky-800">
              Start
            </button>
          </div>
        </div>
      </div>
    </Html>
  </>;
}
