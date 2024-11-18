/**
 * GeneralTrackMap
 */
import {GateModel} from "@/components/map/blocks/GateModel.tsx";
import {Box} from "@react-three/drei";
import {RigidBody} from "@react-three/rapier";
import {TrackNarrowModel} from "@/components/map/blocks/TrackNarrowModel.tsx";

export default function GeneralTrackMap() {
  return <>
    <GateModel/>
    <TrackNarrowModel position={[0, 0, -0.6]} scale={[1.1, 1, 1]}/>
    <RigidBody type="fixed">
      <Box args={[10, 0.1, 10]}>
        <meshStandardMaterial color="skyblue"/>
      </Box>
    </RigidBody>
  </>;
}
