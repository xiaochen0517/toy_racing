import {interactionGroups, RapierRigidBody, RigidBody, usePrismaticJoint, useSpringJoint} from "@react-three/rapier";
import {Box, MeshDiscardMaterial} from "@react-three/drei";
import {MutableRefObject} from "react";

export interface SuspensionProps {
  topRef: MutableRefObject<RapierRigidBody | null>;
  bottomRef: MutableRefObject<RapierRigidBody | null>;
  position?: [number, number, number];
  length?: number;
}

export default function Suspension({topRef, bottomRef, position, length = 0.1}: SuspensionProps) {

  useSpringJoint(topRef, bottomRef, [[0, 0, 0], [0, 0, 0], length, 2000, 100]);
  usePrismaticJoint(topRef, bottomRef, [[0, 0, 0], [0, 0, 0], [0, -1, 0], [0, length]]);

  return <group position={position}>
    <RigidBody ref={topRef} position={[0, length, 0]} collisionGroups={interactionGroups([2], [])}>
      <Box args={[0.1, 0.1, 0.1]} material-color="hotpink">
        <MeshDiscardMaterial/>
      </Box>
    </RigidBody>
    <RigidBody ref={bottomRef} position={[0, 0, 0]} collisionGroups={interactionGroups([2], [])}>
      <Box args={[0.1, 0.1, 0.1]} material-color="skyblue">
        <MeshDiscardMaterial/>
      </Box>
    </RigidBody>
  </group>
}
