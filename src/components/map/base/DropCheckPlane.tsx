import {CuboidCollider} from "@react-three/rapier";

type DropCheckPlaneProps = {
  args?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  onDrop?: () => void;
}

export default function DropCheckPlane(
  {
    args = [200, 0.1, 200],
    position,
    rotation,
    onDrop,
  }: DropCheckPlaneProps) {

  return <group position={position} rotation={rotation}>
    <CuboidCollider
      args={args} sensor
      onIntersectionEnter={(e) => {
        if (e.rigidBody?.userData?.type !== 'vehicle') {
          return;
        }
        console.log("DropCheckPlane onIntersectionEnter", e.rigidBody?.userData?.type);
        if (onDrop) {
          onDrop();
        }
      }}
    />
  </group>
}
