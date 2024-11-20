/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 .\gate.glb -c -t
*/

import * as THREE from 'three'
import {useGLTF} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
import {RigidBody} from "@react-three/rapier";
import {GATE_MODEL_SCALE} from "@/components/map/blocks/TrackModelConfig.ts";

type GLTFResult = GLTF & {
  nodes: {
    gate_1: THREE.Mesh
  }
  materials: {
    colormap: THREE.MeshStandardMaterial
  }
}

export function GateModel(props: JSX.IntrinsicElements['group']) {
  const {nodes, materials} = useGLTF('/models/toy_card_kit/gate.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <RigidBody type="fixed" colliders="trimesh" scale={GATE_MODEL_SCALE} position={[0, -0.2, 0]}>
        <mesh geometry={nodes.gate_1.geometry} material={materials.colormap} castShadow={true} receiveShadow={true}/>
      </RigidBody>
    </group>
  )
}

useGLTF.preload('/models/toy_card_kit/gate.glb')
