import { RigidBody } from "@react-three/rapier";

const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

export const Floor = () => {
  return (
    <RigidBody
      name="floor"
      colliders="cuboid"
      lockTranslations={true}
      lockRotations
      position={[0, -2, 0]}
      rotation={[angleToRadians(-90), 0, 0]}
    >
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f4b88c" />
      </mesh>
    </RigidBody>
  );
};
