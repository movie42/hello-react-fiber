import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Controls } from "./App";
import { SpeedTextTunnel } from "./speedTextTunel";
import { NumberTuple } from "./types";

const _cameraPosition = new THREE.Vector3();
const _cubePosition = new THREE.Vector3();
const _direction = new THREE.Vector3();

export const Cube = ({ position }: { position: NumberTuple }) => {
  const cubeRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null); // Cube의 Mesh 참조 추가
  const isOnFloor = useRef(true);
  const [isPaused, setIsPaused] = useState(false); // 제어 일시 중지 상태 관리
  const [rotationY, setRotationY] = useState(0);
  const [speed, setSpeed] = useState(0); // 속도를 저장할 상태

  const jump = () => {
    if (!cubeRef.current || !isOnFloor.current) {
      return;
    }

    cubeRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
  };

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);

  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const handleMovement = () => {
    if (!isOnFloor.current || !cubeRef.current) {
      return;
    }

    const impulseStrength = 0.3;
    _direction.set(0, 0, 0);

    if (forwardPressed) {
      _direction.z -= impulseStrength;
    }
    if (backPressed) {
      _direction.z += impulseStrength;
    }

    _direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY);
    cubeRef.current.applyImpulse(_direction, true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setRotationY((prevRotationY) => prevRotationY - event.movementX * 0.01);
  };

  useFrame((state) => {
    if (isPaused || !cubeRef.current || !meshRef.current) {
      return;
    }

    if (jumpPressed) jump();

    const cubePosition = _cubePosition.copy(cubeRef.current.translation());

    meshRef.current.rotation.y = rotationY;

    const velocity = cubeRef.current.linvel();
    const speedValue = Math.sqrt(
      velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2
    );

    setSpeed(speedValue);
    cubeRef.current.setNextKinematicRotation(
      new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        rotationY
      )
    );

    handleMovement();

    if (!state.controls) {
      const cameraPosition = _cameraPosition
        .set(0, 13, 30)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY)
        .add(cubePosition);
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(cubePosition);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPaused((prev) => !prev); // ESC 키를 누르면 일시 중지/재개 토글
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
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
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial color="#ff0000" />
        </mesh>
        <axesHelper args={[5]} />
      </RigidBody>
      <SpeedTextTunnel.In>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            color: "white",
            fontSize: "1.5rem"
          }}
        >
          Speed: {speed.toFixed(2)} m/s
        </div>
      </SpeedTextTunnel.In>
    </>
  );
};
