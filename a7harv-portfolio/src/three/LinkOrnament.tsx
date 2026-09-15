import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const SHAPES = ["icosahedron", "torus", "octahedron", "torusKnot", "dodecahedron"] as const;

function SpinningShape({ shape, color }: { shape: (typeof SHAPES)[number]; color: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.6;
    ref.current.rotation.y += delta * 0.9;
  });

  const geometry =
    shape === "icosahedron" ? (
      <icosahedronGeometry args={[1, 0]} />
    ) : shape === "torus" ? (
      <torusGeometry args={[0.7, 0.28, 8, 24]} />
    ) : shape === "octahedron" ? (
      <octahedronGeometry args={[1, 0]} />
    ) : shape === "torusKnot" ? (
      <torusKnotGeometry args={[0.6, 0.2, 64, 8]} />
    ) : (
      <dodecahedronGeometry args={[1, 0]} />
    );

  return (
    <mesh ref={ref}>
      {geometry}
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

export function LinkOrnament({ index, color }: { index: number; color: string }) {
  const shape = SHAPES[index % SHAPES.length];
  return (
    <div className="pointer-events-none h-16 w-16 opacity-80">
      <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
        <SpinningShape shape={shape} color={color} />
      </Canvas>
    </div>
  );
}
