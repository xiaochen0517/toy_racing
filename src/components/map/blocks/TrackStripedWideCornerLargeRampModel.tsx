/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 .\track-striped-wide-corner-large.glb -c -t
*/

import * as THREE from 'three'
import {useGLTF} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
import {RigidBody} from "@react-three/rapier";
import {TRACK_FRICTION, TRACK_MODEL_SCALE, TRACK_RESTITUTION} from "@/components/map/blocks/TrackModelConfig.ts";

type GLTFResult = GLTF & {
  nodes: {
    ['track-striped-wide-corner-large-ramp_1']: THREE.Mesh
  }
  materials: {
    colormap: THREE.MeshStandardMaterial
  }
}

export function TrackStripedWideCornerLargeRampModel(props: JSX.IntrinsicElements['group']) {
  const {nodes, materials} = useGLTF('/models/toy_card_kit/track-striped-wide-corner-large-ramp.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        scale={TRACK_MODEL_SCALE}
        restitution={TRACK_RESTITUTION}
        friction={TRACK_FRICTION}
      >
        <mesh
          geometry={nodes['track-striped-wide-corner-large-ramp_1'].geometry}
          material={materials.colormap}
          position={[0, 0, 0]}
          castShadow={true}
          receiveShadow={true}
        />
      </RigidBody>
    </group>
  )
}

useGLTF.preload('/models/toy_card_kit/track-striped-wide-corner-large-ramp.glb')
