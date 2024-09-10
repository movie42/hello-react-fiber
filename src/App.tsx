import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Cube } from "./Cube";
import { SpinningBox } from "./SpinningBox";
import { Walls } from "./Wall";

const Scene = () => {
  return (
    <group>
      <Cube position={[7, 8, 0]} />
      <Walls />
    </group>
  );
};

const App = () => {
  const distance = 80;
  const angle = (45 * Math.PI) / 180;
  const cameraX = distance * Math.sin(angle);
  const cameraY = distance * Math.sin(angle);
  const cameraZ = distance * Math.cos(angle);

  return (
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
  );
};

export default App;
