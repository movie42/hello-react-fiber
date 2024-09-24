import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

// 각도 변환 함수
const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

// 셰이더 정의 (vertex와 fragment shader 포함)
const GradientMaterial = shaderMaterial(
  {
    color1: new THREE.Color("#b47c54"), // 첫 번째 색상
    color2: new THREE.Color("#a76849"), // 두 번째 색상
    time: 0 // 타임 유니폼 추가
  },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;  // UV 좌표를 fragment shader로 전달
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform vec3 color1; // 첫 번째 색상
  uniform vec3 color2; // 두 번째 색상
  uniform float time;  // time 유니폼
  varying vec2 vUv;
  void main() {
    float gradient = step(0.2, vUv.y) + step(0.4, vUv.y) + step(0.6, vUv.y) + step(0.8, vUv.y);
    vec3 mixedColor = mix(color1, color2, gradient); // 두 색상을 그라데이션 비율로 섞음
    gl_FragColor = vec4(mixedColor, 1.0); // 최종 색상을 설정
  }
  `
);

// Three.js의 JSX 타입에 `gradientMaterial` 추가
extend({ GradientMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<THREE.ShaderMaterial>,
        THREE.ShaderMaterial
      > & {
        color1?: THREE.Color | string;
        color2?: THREE.Color | string;
        time?: number;
      };
    }
  }
}

type GradientMaterialImpl = {
  color1: THREE.Color;
  color2: THREE.Color;
  time: number;
} & JSX.IntrinsicElements["shaderMaterial"]; // ShaderMaterial의 기본 타입과 유니폼 확장

// Floor 컴포넌트
export const Floor: React.FC = () => {
  const materialRef = useRef<THREE.ShaderMaterial & GradientMaterialImpl>(null);

  // 매 프레임마다 time 값을 업데이트
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime(); // time 값 업데이트
    }
  });

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
        <planeGeometry args={[500, 500]} />
        <gradientMaterial ref={materialRef} color1="#b47c54" color2="#a76849" />
      </mesh>
    </RigidBody>
  );
};
