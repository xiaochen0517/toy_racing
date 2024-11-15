import {euler, InstancedRigidBodies, vec3} from "@react-three/rapier";
import {useMemo, useRef} from "react";
import {InstancedRigidBodyProps} from "@react-three/rapier/dist/declarations/src/components/InstancedRigidBodies";
import {InstancedMesh} from "three";

export default function TestWall(props: JSX.IntrinsicElements['group']) {
  const instancesCount = 100;
  const columns = 10;

  const cubeSize = vec3({x: 0.3, y: 0.1, z: 0.2});

  const cubesRef = useRef<InstancedMesh>(null!);

  const cubeInstancesData = () => {
    const instances: InstancedRigidBodyProps[] = [];
    for (let i = 0; i < instancesCount; i++) {
      const position = vec3({
        x: i % columns * cubeSize.x + 0.01 - 2,
        y: i / columns * cubeSize.y + 0.01,
        z: -2,
      });
      const rotation = euler({
        x: 0,
        y: 0,
        z: 0,
      });
      const scale = cubeSize;
      instances.push({key: `cube-${i}`, position, rotation, scale, mass: 0.001});
    }
    return instances;
  };
  const cubesInstances = useMemo(() => {
    return cubeInstancesData();
  }, []);


  return <group {...props}>
    <InstancedRigidBodies instances={cubesInstances}>
      <instancedMesh ref={cubesRef} castShadow={true} args={[undefined, undefined, instancesCount]}>
        <boxGeometry/>
        <meshStandardMaterial color={"tomato"}/>
      </instancedMesh>
    </InstancedRigidBodies>
  </group>
}
