import {Html} from "@react-three/drei";

export default function LoadingScene() {
  return <>
    <Html fullscreen={true} transform={false}>
      <div className="w-full h-full flex justify-center items-center bg-sky-600">
        <div className="text-3xl font-bold text-white">Loading...</div>
      </div>
    </Html>
  </>
}
