import {
  interactionGroups,
  RapierRigidBody,
  RigidBody,
  useFixedJoint,
  usePrismaticJoint,
  useRevoluteJoint
} from "@react-three/rapier";
import {Box, MeshDiscardMaterial} from "@react-three/drei";
import {useEffect, useRef} from "react";
import {useThree} from "@react-three/fiber";
import {Quaternion} from "three";

const length = 0.1;

export default function TestSuspension() {

  const three = useThree();
  three.camera.position.set(0.5, 0.5, 0.5);

  const topRef = useRef<RapierRigidBody | null>(null);
  const bottomRef = useRef<RapierRigidBody | null>(null);

  const prismaticJoint = usePrismaticJoint(
    topRef, bottomRef, [[0, 0, 0], [0, 0, 0], [0, -1, 0], [0, length]]);

  useEffect(() => {
    if (prismaticJoint) {
      prismaticJoint.current?.configureMotor(0.1, 0, 20000, 100);
    }
  }, []);

  const bodyRef = useRef<RapierRigidBody | null>(null);

  useFixedJoint(bodyRef, topRef, [[0, 0, 0], new Quaternion(), [0, 0, 0], new Quaternion()]);

  const wheelRef = useRef<RapierRigidBody | null>(null);

  useRevoluteJoint(wheelRef, bottomRef, [[0, 0, 0], [0.1, 0, 0], [1, 0, 0]]);
  useRevoluteJoint(bottomRef, wheelRef, [[0.1, 0, 0], [0, 0, 0], [1, 0, 0]]);

  const leftLimitRef = useRef<RapierRigidBody | null>(null);
  const rightLimitRef = useRef<RapierRigidBody | null>(null);
  const frontLimitRef = useRef<RapierRigidBody | null>(null);
  const backLimitRef = useRef<RapierRigidBody | null>(null);

  useFixedJoint(topRef, leftLimitRef, [[-0.055, 0, 0], new Quaternion(), [0, 0, 0], new Quaternion()]);
  useFixedJoint(topRef, rightLimitRef, [[0.055, 0, 0], new Quaternion(), [0, 0, 0], new Quaternion()]);

  return <group position={[0, 1, 0]}>
    <RigidBody
      ref={wheelRef}
      scale={[0.05, 0.2, 0.2]}
      position={[0, length, 0]}
      collisionGroups={interactionGroups([4], [1])}
    >
      <Box args={[1, 1, 1]} material-color="blue">
        <MeshDiscardMaterial/>
      </Box>
    </RigidBody>
    <RigidBody
      ref={bodyRef}
      scale={[1, 0.05, 1]}
      position={[0, length, 0]}
      collisionGroups={interactionGroups([5], [1])}
    >
      <Box args={[1, 1, 1]} material-color="blue">
        <MeshDiscardMaterial/>
      </Box>
    </RigidBody>
    <RigidBody
      ref={leftLimitRef}
      scale={[0.01, 0.2, 0.1]}
      position={[0, length, 0]}
      collisionGroups={interactionGroups([3], [1, 2])}
    >
      <Box args={[1, 1, 1]} material-color="hotpink">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
    <RigidBody
      ref={rightLimitRef}
      scale={[0.01, 0.2, 0.1]}
      position={[0, length, 0]}
      collisionGroups={interactionGroups([3], [1, 2])}
    >
      <Box args={[1, 1, 1]} material-color="hotpink">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
    <RigidBody
      ref={frontLimitRef}
      scale={[0.1, 0.1, 0.1]}
      position={[0, length, 0]}
      collisionGroups={interactionGroups([2], [])}
    >
      <Box args={[1, 1, 1]} material-color="hotpink">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
    <RigidBody
      ref={backLimitRef}
      scale={[0.1, 0.1, 0.1]}
      position={[0, length, 0]}
      collisionGroups={interactionGroups([2], [])}
    >
      <Box args={[1, 1, 1]} material-color="hotpink">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
    <RigidBody
      ref={topRef}
      scale={[0.1, 0.1, 0.1]}
      position={[0, length, 0]}
      collisionGroups={interactionGroups([2], [1, 3])}
    >
      <Box args={[1, 1, 1]} material-color="hotpink">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
    <RigidBody
      ref={bottomRef}
      scale={[0.1, 0.1, 0.1]}
      position={[0, 0, 0]}
      collisionGroups={interactionGroups([2], [1, 3])}
    >
      <Box args={[1, 1, 1]} material-color="skyblue">
        {/*<MeshDiscardMaterial/>*/}
      </Box>
    </RigidBody>
  </group>
}
