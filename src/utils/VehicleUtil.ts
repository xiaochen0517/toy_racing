import {Matrix4, Quaternion, Vector3} from "three";
import {Rotation, Vector} from "@dimforge/rapier3d-compat";
import {RigidBody} from "@dimforge/rapier3d-compat/dynamics";

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
  }
}
