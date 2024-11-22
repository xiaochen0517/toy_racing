import {Matrix4, Quaternion, Vector3} from "three";
import Rapier, {Rotation, Vector} from "@dimforge/rapier3d-compat";
import {RigidBody} from "@dimforge/rapier3d-compat/dynamics";

const airControlAngVel = new Vector3()

type KeyboardControlsState<T extends string = string> = {
  [K in T]: boolean;
};

export const VehicleUtil = {
  /**
   * vehicle velocity easing function
   */
  easeOutQuart: (isForward: boolean = true, force: number, currentSpeed: number, maxSpeed: number): number => {
    currentSpeed = Math.abs(isForward ? Math.min(currentSpeed, 0) : Math.max(currentSpeed, 0));
    return force * (1 - Math.pow(1 - (maxSpeed - currentSpeed) / maxSpeed, 4));
  },
  vector2Vector3: (vector: Vector): Vector3 => {
    return new Vector3(vector.x, vector.y, vector.z);
  },
  rotation2Quaternion: (rotation: Rotation): Quaternion => {
    return new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
  },
  globalVelocity2Local: (velocity: Vector3, rotation: Quaternion): Vector3 => {
    const rotationMatrix = new Matrix4();
    rotationMatrix.makeRotationFromQuaternion(rotation);
    return velocity.applyMatrix4(rotationMatrix);
  },
  getRigidBodyLocalVelocity: (rigidBody: RigidBody): Vector3 => {
    const globalVelocity = VehicleUtil.vector2Vector3(rigidBody.linvel());
    const rotation = VehicleUtil.rotation2Quaternion(rigidBody.rotation());
    return VehicleUtil.globalVelocity2Local(globalVelocity, rotation);
  },
  getAirControlAngle: (rapier: typeof Rapier, keys: KeyboardControlsState, rigidBody: RigidBody, lerpDelta: number) => {
    const forwardAngVel = Number(keys.forward) - Number(keys.backward);
    const sideAngVel = Number(keys.left) - Number(keys.right);
    const angVel = airControlAngVel.set(forwardAngVel * lerpDelta, sideAngVel * lerpDelta, 0);
    angVel.applyQuaternion(rigidBody.rotation());
    angVel.add(rigidBody.angvel());
    return new rapier.Vector3(angVel.x, angVel.y, angVel.z)
  },

  bodyPosition: new Vector3(),
  cameraPosition: new Vector3(),
  cameraTarget: new Vector3(),
}
