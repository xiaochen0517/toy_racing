/**
 * GeneralTrackMap
 */
import {GateModel} from "@/components/map/blocks/GateModel.tsx";
import {Box, Sky} from "@react-three/drei";
import {RigidBody} from "@react-three/rapier";
import {TrackStripedWideModel} from "@/components/map/blocks/TrackStripedWideModel.tsx";
import {TrackStripedWideCornerLargeModel} from "@/components/map/blocks/TrackStripedWideCornerLargeModel.tsx";
import {TrackStripedWideCornerSmallModel} from "@/components/map/blocks/TrackStripedWideCornerSmallModel.tsx";
import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import {VehicleRacerLow} from "@/components/vehicles/VehicleRacerLow.tsx";

export default function GeneralTrackMap() {

  const {camera} = useThree();

  useEffect(() => {
    camera.position.set(0, 5, -40);
    camera.lookAt(0, 0, -30);
  }, [camera]);

  return <>
    <Sky sunPosition={[100, 200, 100]}/>
    <GateModel scale={[2, 2, 2]}/>
    {[...Array(10)].map((_, i) => (
      <TrackStripedWideModel key={i} position={[0, 0, -(0.8 + i)]}/>
    ))}
    <TrackStripedWideCornerLargeModel position={[-4, 0, -14.3]} rotation={[0, Math.PI * 0.5, 0]}/>
    <TrackStripedWideCornerLargeModel position={[-4, 0, -14.3]} rotation={[0, Math.PI * 1.5, 0]}/>
    <TrackStripedWideCornerSmallModel position={[-8, 0, -18.3]} rotation={[0, Math.PI, 0]}/>

    <VehicleRacerLow position={[0, 0.3, 1]}/>
    <RigidBody type="fixed">
      <Box args={[10, 0.1, 10]}>
        <meshStandardMaterial color="skyblue"/>
      </Box>
    </RigidBody>
  </>;
}
