import {euler, InstancedRigidBodies, vec3} from "@react-three/rapier";
import {useMemo} from "react";
import {InstancedRigidBodyProps} from "@react-three/rapier/dist/declarations/src/components/InstancedRigidBodies";

export default function TestGround(props: JSX.IntrinsicElements['group']) {
  const instancesCount = 50;

  const cubeSize = vec3({x: 10, y: 0.1, z: 1});

  const cubeInstancesData = (isBlack = false) => {
    const instances: InstancedRigidBodyProps[] = [];
    for (let i = 0; i < instancesCount; i++) {
      const position = vec3({
        x: 0,
        y: 0,
        z: 10 - (isBlack ? 0 : cubeSize.z) - i * cubeSize.z * 2,
      });
      const rotation = euler({
        x: 0,
        y: 0,
        z: 0,
      });
      const scale = cubeSize;
      instances.push({key: `cube-${i}`, position, rotation, scale, type: "fixed", restitution: 0.1, friction: 0.8});
    }
    return instances;
  };
  const cubesGrayInstances = useMemo(() => {
    return cubeInstancesData();
  }, []);
  const cubesBlackInstances = useMemo(() => {
    return cubeInstancesData(true);
  }, []);


  return <group {...props}>
    <InstancedRigidBodies instances={cubesGrayInstances}>
      <instancedMesh castShadow={true} args={[undefined, undefined, instancesCount]}>
        <boxGeometry/>
        <meshBasicMaterial color={"black"}/>
      </instancedMesh>
    </InstancedRigidBodies>

    <InstancedRigidBodies instances={cubesBlackInstances}>
      <instancedMesh castShadow={true} args={[undefined, undefined, instancesCount]}>
        <boxGeometry/>
        <meshBasicMaterial color={"gray"}/>
      </instancedMesh>
    </InstancedRigidBodies>
  </group>
}
