/**
 * GeneralTrackMap
 */
import {GateModel} from "@/components/map/blocks/GateModel.tsx";
import {OrbitControls, Sky} from "@react-three/drei";
import {TrackStripedWideModel} from "@/components/map/blocks/TrackStripedWideModel.tsx";
import {TrackStripedWideCornerLargeModel} from "@/components/map/blocks/TrackStripedWideCornerLargeModel.tsx";
import {useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {OrbitControls as ThreeOrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {TrackStripedWideStraightBumpUpModel} from "@/components/map/blocks/TrackStripedWideStraightBumpUpModel.tsx";
import {TrackStripedWideCornerLargeRampModel} from "@/components/map/blocks/TrackStripedWideCornerLargeRampModel.tsx";
import {
  TrackStripedWideStraightHillBeginningModel
} from "@/components/map/blocks/TrackStripedWideStraightHillBeginningModel.tsx";
import {TrackStripedWideStraightHillEndModel} from "@/components/map/blocks/TrackStripedWideStraightHillEndModel.tsx";
import {TrackStripedWideCurveModel} from "@/components/map/blocks/TrackStripedWideCurveModel.tsx";
import {TrackStripedWideCornerSmallModel} from "@/components/map/blocks/TrackStripedWideCornerSmallModel.tsx";

const DEBUG_CAMERA_POSITION = {x: -20, y: 0, z: 50};

export default function GeneralTrackMap() {

  const {camera} = useThree();

  const orbitControlsRef = useRef<never>(null!);

  useEffect(() => {
    camera.position.set(DEBUG_CAMERA_POSITION.x, 70, DEBUG_CAMERA_POSITION.z);
    // camera.lookAt(0, 0, -40);
    (orbitControlsRef.current as ThreeOrbitControls).target.set(DEBUG_CAMERA_POSITION.x, DEBUG_CAMERA_POSITION.y, DEBUG_CAMERA_POSITION.z);
  }, [camera]);

  return <>
    <OrbitControls ref={orbitControlsRef} makeDefault={true}/>
    <Sky sunPosition={[100, 200, 100]}/>
    <GateModel scale={[2, 2, 2]}/>
    {[...Array(10)].map((_, i) => (
      <TrackStripedWideModel key={i} position={[0, 0, -(i * 4)]}/>
    ))}
    <TrackStripedWideCornerLargeModel position={[-16, 0, -54]} rotation={[0, Math.PI * 0.5, 0]}/>
    <TrackStripedWideCornerLargeModel position={[-16, 0, -54]} rotation={[0, Math.PI * 1.5, 0]}/>
    <TrackStripedWideCornerLargeModel position={[-32, 0, -70]} rotation={[0, -Math.PI, 0]}/>
    {[...Array(5)].map((_, i) => (
      <TrackStripedWideModel key={i} position={[-14 + (i * 4), 0, -86]} rotation={[0, Math.PI * 0.5, 0]}/>
    ))}
    {[...Array(3)].map((_, i) => (
      <TrackStripedWideStraightBumpUpModel key={i} position={[4 + (i * 16), 0, -86]} rotation={[0, Math.PI * 0.5, 0]}/>
    ))}
    <TrackStripedWideModel position={[54, 0, -86]} rotation={[0, Math.PI * 0.5, 0]}/>
    <TrackStripedWideModel position={[58, 0, -86]} rotation={[0, Math.PI * 0.5, 0]}/>
    <TrackStripedWideCornerLargeModel position={[76, 0, -102]} rotation={[0, 0, 0]}/>
    <TrackStripedWideCornerLargeRampModel position={[60, -2, -118]} rotation={[0, Math.PI * 0.5, 0]}/>
    <TrackStripedWideCornerLargeRampModel position={[44, -4, -102]} rotation={[0, Math.PI, 0]}/>
    {[...Array(14)].map((_, i) => (
      <TrackStripedWideModel key={i} position={[44, -4, -100 + (i * 4)]} rotation={[0, 0, 0]}/>
    ))}
    <TrackStripedWideCornerLargeRampModel position={[44, -4, -46]} rotation={[0, 0, 0]}/>
    <TrackStripedWideStraightHillBeginningModel position={[28, -2, -30]} rotation={[0, -Math.PI * 0.5, 0]}/>
    <TrackStripedWideStraightHillEndModel position={[12, 0, -30]} rotation={[0, -Math.PI * 0.5, 0]}/>
    {[...Array(10)].map((_, i) => (
      <TrackStripedWideModel key={i} position={[-6 - (i * 4), 2, -30]} rotation={[0, Math.PI * 0.5, 0]}/>
    ))}
    <TrackStripedWideCornerLargeRampModel position={[-60, 0, -14]} rotation={[0, Math.PI, 0]}/>
    <TrackStripedWideCornerLargeModel position={[-44, 0, 2]} rotation={[0, -Math.PI * 0.5, 0]}/>
    <TrackStripedWideCornerLargeModel position={[-44, 0, 2]} rotation={[0, Math.PI * 0.5, 0]}/>
    {[...Array(8)].map((_, i) => (
      <TrackStripedWideModel key={i} position={[-28, 0, 20 + (i * 4)]} rotation={[0, 0, 0]}/>
    ))}
    <TrackStripedWideCornerSmallModel position={[-20, 0, 58]} rotation={[0, -Math.PI * 0.5, 0]}/>
    <TrackStripedWideCornerSmallModel position={[-8, 0, 50]} rotation={[0, 0, 0]}/>
    <TrackStripedWideModel position={[-18, 0, 58]} rotation={[0, Math.PI * 0.5, 0]}/>
    <TrackStripedWideCurveModel position={[-8, 0, 50]} rotation={[0, Math.PI, 0]}/>

    {[...Array(9)].map((_, i) => (
      <TrackStripedWideModel key={i} position={[0, 0, (i * 4)]} rotation={[0, 0, 0]}/>
    ))}

    {/*<VehicleRacerLow position={[0, 0.3, 1]}/>*/}
  </>;
}
