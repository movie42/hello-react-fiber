import {
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { Cube } from "./Cube";
import { Floor } from "./Floor";
import { SpinningBox } from "./SpinningBox";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump"
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Cube position={[0, 0, 0]} />
      <Floor />
    </>
  );
};

const App = () => {
  const keyMap = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] }
    ],
    []
  );

  const distance = 10;
  const angle = (45 * Math.PI) / 180;
  const cameraX = distance * Math.sin(angle);
  const cameraY = distance * Math.sin(angle);
  const cameraZ = distance * Math.cos(angle);

  return (
    <KeyboardControls map={keyMap}>
      <Canvas shadows style={{ width: "100vw", height: "100vh" }}>
        <PerspectiveCamera
          makeDefault
          position={[cameraX, cameraY, cameraZ]}
          fov={75}
        />
        <Suspense fallback={<SpinningBox />}>
          <Physics>
            <Scene />
          </Physics>
          <OrbitControls
            enableZoom={true}
            enableRotate={true}
            enablePan={true}
            zoomSpeed={0.5}
            rotateSpeed={0.5}
            panSpeed={0.5}
            minPolarAngle={Math.PI / 12}
            maxPolarAngle={Math.PI / 2.4}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
};

export default App;
