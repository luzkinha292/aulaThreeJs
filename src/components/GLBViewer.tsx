import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

interface GLBModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

function GLBModel({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
}: GLBModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const clonedScene = scene.clone();

  return (
    <group ref={meshRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={clonedScene} />
    </group>
  );
}

interface GLBViewerProps {
  modelUrl: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  scale: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableControls?: boolean;
  showEnvironment?: boolean;
  className?: string;
  name?: string;
}

const GLBViewer = ({
  modelUrl,
  backgroundColor = "#FF0000",
  width = "100%",
  height = "100%",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  enableControls = true,
  showEnvironment = true,
  className,
  name = 'McQueen #95'
}: GLBViewerProps) => {
  return (
    <div className={className} style={{ width, height }}>
      <Canvas
        camera={{ position: [0, -2, 5], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      > 
        <color attach="background" args={[backgroundColor]}/>
        {showEnvironment && <Environment preset="sunset" />}

        {enableControls && (
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={6}
                maxDistance={14}
                autoRotate={false}
                />
        )}

        <Suspense fallback={null}>
        <GLBModel
        url={modelUrl}
        scale={scale}
        position={position}
        rotation={rotation}
        autoRotate={autoRotate}/> 
        </Suspense>
        <Html position={[-0.8,3,0]}> 
          <h1>{name}</h1>
        </Html>
        </Canvas>
    </div>
  );
};

export default GLBViewer;