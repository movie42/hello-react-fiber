import { RigidBody } from "@react-three/rapier";
import { NumberTuple } from "./types";

export const Cube = ({ position }: { position: NumberTuple }) => {
  return (
    <RigidBody position={position}>
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshPhongMaterial color="#ff0000" />
      </mesh>
    </RigidBody>
  );
};
