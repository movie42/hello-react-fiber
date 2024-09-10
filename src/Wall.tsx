import { RigidBody } from "@react-three/rapier";

const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

export const Walls = () => {
  return (
    <RigidBody
      colliders="cuboid"
      lockTranslations={true}
      lockRotations
      position={[0, -2, 0]}
      rotation={[angleToRadians(-90), 0, 0]}
    >
      <mesh receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  );
};
