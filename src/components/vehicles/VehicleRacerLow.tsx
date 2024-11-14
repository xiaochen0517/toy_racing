/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 .\vehicle-racer-low.glb -c -t
*/

import * as THREE from "three"
import {Quaternion} from "three"
import {useGLTF, useKeyboardControls} from "@react-three/drei"
import {GLTF} from "three-stdlib"
import {interactionGroups, RapierRigidBody, RigidBody, useFixedJoint, useRevoluteJoint} from "@react-three/rapier";
import {useRef} from "react";
import Suspension from "./Suspension.tsx";
import {useFrame, useThree} from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    ["vehicle-racer-low_1"]: THREE.Mesh
    ["wheel-fr"]: THREE.Mesh
    ["wheel-br"]: THREE.Mesh
    ["wheel-bl"]: THREE.Mesh
    ["wheel-fl"]: THREE.Mesh
  }
  materials: {
    colormap: THREE.MeshStandardMaterial
  }
}

const IMPULSE_SCALE = 0.4;
const TORQUE_SCALE = 0.1;

export function VehicleRacerLow(props: JSX.IntrinsicElements['group']) {
  const {nodes, materials} = useGLTF('/models/toy_card_kit/vehicle-racer-low.glb') as GLTFResult
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const wheelRefs = {
    fr: useRef<RapierRigidBody | null>(null),
    br: useRef<RapierRigidBody | null>(null),
    bl: useRef<RapierRigidBody | null>(null),
    fl: useRef<RapierRigidBody | null>(null),
  };

  const wheelSuspensions = {
    fr_t: useRef<RapierRigidBody | null>(null),
    fr_b: useRef<RapierRigidBody | null>(null),
    br_t: useRef<RapierRigidBody | null>(null),
    br_b: useRef<RapierRigidBody | null>(null),
    bl_t: useRef<RapierRigidBody | null>(null),
    bl_b: useRef<RapierRigidBody | null>(null),
    fl_t: useRef<RapierRigidBody | null>(null),
    fl_b: useRef<RapierRigidBody | null>(null),
  }

  const quaternion = new Quaternion();
  // fr
  useRevoluteJoint(wheelSuspensions.fr_b, wheelRefs.fr, [[0, 0, 0], [0, 0, 0], [1, 0, 0]]);
  useFixedJoint(bodyRef, wheelSuspensions.fr_t, [[0.237, 0.125, -0.25], quaternion, [0, 0, 0], quaternion]);
  useFixedJoint(bodyRef, wheelSuspensions.fr_t, [[0.237, 0.125, -0.25], quaternion, [0, 0, 0], quaternion]);
  // br
  useRevoluteJoint(wheelSuspensions.br_b, wheelRefs.br, [[0, 0, 0], [0, 0, 0], [1, 0, 0]]);
  useFixedJoint(bodyRef, wheelSuspensions.br_t, [[0.237, 0.125, 0.25], quaternion, [0, 0, 0], quaternion]);
  useFixedJoint(bodyRef, wheelSuspensions.br_t, [[0.237, 0.125, 0.25], quaternion, [0, 0, 0], quaternion]);
  // bl
  useRevoluteJoint(wheelSuspensions.bl_b, wheelRefs.bl, [[0, 0, 0], [0, 0, 0], [1, 0, 0]]);
  useFixedJoint(bodyRef, wheelSuspensions.bl_t, [[-0.188, 0.125, 0.25], quaternion, [0, 0, 0], quaternion]);
  useFixedJoint(bodyRef, wheelSuspensions.bl_t, [[-0.188, 0.125, 0.25], quaternion, [0, 0, 0], quaternion]);
  // fl
  useRevoluteJoint(wheelSuspensions.fl_b, wheelRefs.fl, [[0, 0, 0], [0, 0, 0], [1, 0, 0]]);
  useFixedJoint(bodyRef, wheelSuspensions.fl_t, [[-0.188, 0.125, -0.25], quaternion, [0, 0, 0], quaternion]);
  useFixedJoint(bodyRef, wheelSuspensions.fl_t, [[-0.188, 0.125, -0.25], quaternion, [0, 0, 0], quaternion]);

  const state = useThree();
  state.camera.position.set(2, 2, 2);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_subscribeKeys, getKeys] = useKeyboardControls();

  const movePlayer = (delta: number) => {
    if (!bodyRef.current) {
      return;
    }
    const {forward, backward, left, right} = getKeys();
    const impulse = {x: 0, y: 0, z: 0};
    const torque = {x: 0, y: 0, z: 0};
    const impulseStrength = IMPULSE_SCALE * delta;
    const torqueStrength = TORQUE_SCALE * delta;
    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    bodyRef.current.applyImpulse(impulse, true);
    bodyRef.current.applyTorqueImpulse(torque, true);
  };

  useFrame((_state, delta) => {
    movePlayer(delta);
  });

  return (
    <group {...props} dispose={null}>
      <RigidBody ref={bodyRef} colliders="hull" collisionGroups={interactionGroups([3], [1])} position={[0, 0, 0]}>
        <mesh geometry={nodes['vehicle-racer-low_1'].geometry} material={materials.colormap}/>
      </RigidBody>
      <Suspension
        topRef={wheelSuspensions.fr_t}
        bottomRef={wheelSuspensions.fr_b}
        position={[0.237, 0.125 - (0.3 * 0.5), -0.25]}
      />
      <RigidBody
        ref={wheelRefs.fr}
        colliders="trimesh"
        collisionGroups={interactionGroups([4], [1])}
        position={[0.237, 0.125, -0.25]}
      >
        <mesh geometry={nodes['wheel-fr'].geometry} material={materials.colormap}/>
      </RigidBody>
      <Suspension
        topRef={wheelSuspensions.br_t}
        bottomRef={wheelSuspensions.br_b}
        position={[0.237, 0.125 - (0.3 * 0.5), 0.25]}
      />
      <RigidBody
        ref={wheelRefs.br}
        colliders="trimesh"
        collisionGroups={interactionGroups([4], [1])}
        position={[0.237, 0.125, 0.25]}
      >
        <mesh geometry={nodes['wheel-br'].geometry} material={materials.colormap}/>
      </RigidBody>
      <Suspension
        topRef={wheelSuspensions.bl_t}
        bottomRef={wheelSuspensions.bl_b}
        position={[-0.188, 0.125 - (0.3 * 0.5), 0.25]}
      />
      <RigidBody
        ref={wheelRefs.bl}
        colliders="trimesh"
        collisionGroups={interactionGroups([4], [1])}
        position={[-0.188, 0.125, 0.25]}
      >
        <mesh geometry={nodes['wheel-bl'].geometry} material={materials.colormap}/>
      </RigidBody>
      <Suspension
        topRef={wheelSuspensions.fl_t}
        bottomRef={wheelSuspensions.fl_b}
        position={[-0.188, 0.125 - (0.3 * 0.5), -0.25]}
      />
      <RigidBody
        ref={wheelRefs.fl}
        colliders="trimesh"
        collisionGroups={interactionGroups([4], [1])}
        position={[-0.188, 0.125, -0.25]}
      >
        <mesh geometry={nodes['wheel-fl'].geometry} material={materials.colormap}/>
      </RigidBody>
    </group>
  )
}

useGLTF.preload('/models/toy_card_kit/vehicle-racer-low.glb')