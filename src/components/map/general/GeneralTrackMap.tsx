/**
 * GeneralTrackMap
 */
import {OrbitControls, Sky} from "@react-three/drei";
import {useThree} from "@react-three/fiber";
import {useEffect, useRef, useState} from "react";
import {OrbitControls as ThreeOrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Lights from "@/components/environment/Lights.tsx";
import {VehicleRacerLow} from "@/components/vehicles/VehicleRacerLow.tsx";
import StartCountDown from "@/components/map/base/StartCountDown.tsx";
import GeneralTrackModel from "@/components/map/general/GeneralTrackModel.tsx";

const DEBUG_CAMERA_POSITION = {x: -20, y: 0, z: -50};

export default function GeneralTrackMap() {

  const {camera} = useThree();

  const orbitControlsRef = useRef<never>(null!);

  useEffect(() => {
    camera.position.set(DEBUG_CAMERA_POSITION.x, 70, DEBUG_CAMERA_POSITION.z);
    // camera.lookAt(0, 0, -40);
    (orbitControlsRef.current as ThreeOrbitControls).target.set(DEBUG_CAMERA_POSITION.x, DEBUG_CAMERA_POSITION.y, DEBUG_CAMERA_POSITION.z);
  }, [camera]);

  const [started, setStarted] = useState<boolean>(false);
  const handleStart = () => {
    console.log("Started");
    setStarted(true);
  };

  const [showVehicle, setShowVehicle] = useState<boolean>(true);
  const resetVehicle = () => {
    setShowVehicle(false);
    setTimeout(() => {
      setShowVehicle(true);
    });
  }

  return <>
    <Lights/>
    <OrbitControls ref={orbitControlsRef} makeDefault={true}/>
    <Sky sunPosition={[100, 200, 100]}/>

    <GeneralTrackModel
      onReset={resetVehicle}
    />

    <StartCountDown position={[0, 2, 0]} onStarted={handleStart}/>

    {showVehicle && <VehicleRacerLow position={[0, 0.2, 1]} started={started}/>}
  </>;
}
