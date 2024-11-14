import {interactionGroups, RapierRigidBody, RigidBody, usePrismaticJoint} from "@react-three/rapier";
import {Box} from "@react-three/drei";
import {MutableRefObject, useEffect} from "react";

export interface SuspensionProps {
  topRef: MutableRefObject<RapierRigidBody | null>;
  bottomRef: MutableRefObject<RapierRigidBody | null>;
  position?: [number, number, number];
  length?: number;
  isFront?: boolean;
}

export default function Suspension({topRef, bottomRef, position, length = 0.1, isFront = false}: SuspensionProps) {

  const prismaticJoint = usePrismaticJoint(topRef, bottomRef, [[0, 0, 0], [0, 0, 0], [0, -1, 0], [0, length]]);

  useEffect(() => {
    if (prismaticJoint) {
      prismaticJoint.current?.configureMotor(0.1, 0, 10000, 100);
    }
  }, []);

  return <group position={position}>
    <RigidBody ref={topRef} scale={[0.1, 0.1, 0.1]} position={[0, length, 0]} collisionGroups={interactionGroups([2], [])}>
      <Box args={[1, 1, 1]} material-color="hotpink">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
    <RigidBody ref={bottomRef} scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]} collisionGroups={interactionGroups([2], [])}>
      <Box args={[1, 1, 1]} material-color="skyblue">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
  </group>
}
