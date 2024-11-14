import {interactionGroups, RapierRigidBody, RigidBody, usePrismaticJoint, useSpringJoint} from "@react-three/rapier";
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

  useSpringJoint(topRef, bottomRef, [[0, 0, 0], [0, 0, 0], length, 5000, 100]);

  // useFixedJoint(topRef, bottomRef, [[0, 0, 0], new Quaternion(), [0, 0.5, 0], new Quaternion()]);

  usePrismaticJoint(topRef, bottomRef, [[0, 0, 0], [0, 0, 0], [0, -1, 0], [0, length]]);
  // usePrismaticJoint(topRef, bottomRef, [[0.1, 0, 0.1], [0.1, 0, 0.1], [0, -1, 0], [0, length]]);
  // usePrismaticJoint(topRef, bottomRef, [[-0.1, 0, 0.1], [-0.1, 0, 0.1], [0, -1, 0], [0, length]]);
  // usePrismaticJoint(topRef, bottomRef, [[-0.1, 0, -0.1], [-0.1, 0, -0.1], [0, -1, 0], [0, length]]);
  // usePrismaticJoint(topRef, bottomRef, [[0.1, 0, -0.1], [0.1, 0, -0.1], [0, -1, 0], [0, length]]);

  useEffect(() => {
    // topRef.current?.setEnabledRotations(false, false, false, true);
    // bottomRef.current?.setEnabledRotations(false, isFront, false, true);
  }, [bottomRef, topRef]);

  return <group position={position}>
    <RigidBody collisionGroups={interactionGroups([2], [])}>
      <RigidBody ref={topRef} position={[0, length, 0]} collisionGroups={interactionGroups([2], [])}>
        <Box args={[0.1, 0.1, 0.1]} material-color="hotpink">
          {/*<MeshDiscardMaterial/>*/}
        </Box>
      </RigidBody>
      <RigidBody ref={bottomRef} position={[0, 0, 0]} collisionGroups={interactionGroups([2], [])}>
        <Box args={[0.1, 0.1, 0.1]} material-color="skyblue">
          {/*<MeshDiscardMaterial/>*/}
        </Box>
      </RigidBody>
    </RigidBody>
  </group>
}
