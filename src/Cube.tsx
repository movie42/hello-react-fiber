import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Controls } from "./App";
import { NumberTuple } from "./types";

export const Cube = ({ position }: { position: NumberTuple }) => {
  const cubeRef = useRef<RapierRigidBody>(null);
  const isOnFloor = useRef(true);
  const jump = () => {
    if (!cubeRef.current) {
      return;
    }
    if (!isOnFloor.current) {
      return;
    }

    cubeRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
  };

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const handleMovement = () => {
    if (!isOnFloor.current || !cubeRef.current) {
      return;
    }

    if (rightPressed) {
      cubeRef.current.applyImpulse({ x: 0.3, y: 0, z: 0 }, true);
    }
    if (leftPressed) {
      cubeRef.current.applyImpulse({ x: -0.3, y: 0, z: 0 }, true);
    }

    if (forwardPressed) {
      cubeRef.current.applyImpulse({ x: 0, y: 0, z: -0.3 }, true);
    }
    if (backPressed) {
      cubeRef.current.applyImpulse({ x: 0, y: 0, z: 0.3 }, true);
    }
  };
  useFrame((_state) => {
    if (jumpPressed) {
      jump();
    }
    handleMovement();
  });

  return (
    <RigidBody
      position={position}
      ref={cubeRef}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "floor") {
          isOnFloor.current = true;
        }
      }}
      onCollisionExit={({ other }) => {
        if (other.rigidBodyObject?.name === "floor") {
          isOnFloor.current = false;
        }
      }}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color="#ff0000" />
      </mesh>
    </RigidBody>
  );
};
