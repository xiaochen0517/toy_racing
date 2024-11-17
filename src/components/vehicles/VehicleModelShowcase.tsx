import {VehicleRacerLow} from "@/components/vehicles/VehicleRacerLow.tsx";
import {MutableRefObject} from "react";
import {Group} from "three";

export type VehicleComponentProps = {
  modelRef: MutableRefObject<Group>
  position?: [number, number, number];
  rotation?: [number, number, number];
  showcase: boolean;
}

export type VehicleModelShowcaseProps = {
  modelRef: MutableRefObject<Group>;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function VehicleModelShowcase({modelRef, position, rotation}: VehicleModelShowcaseProps) {
  return <>
    <VehicleRacerLow modelRef={modelRef} position={position} rotation={rotation} showcase={true}/>
  </>;
}
