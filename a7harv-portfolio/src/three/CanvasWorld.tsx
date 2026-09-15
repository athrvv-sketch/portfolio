import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { CameraRig } from "./CameraRig";
import { FloatingPanel } from "./FloatingPanel";
import { DustField } from "./DustField";

const PANELS: { position: [number, number, number]; color: string; seed: number }[] = [
  { position: [1.8, 0.6, 2.2], color: "#e8a33d", seed: 0 },
  { position: [-2, -0.3, 0.4], color: "#c79b5e", seed: 1.4 },
  { position: [0.6, 0.9, -1.6], color: "#7a1220", seed: 2.8 },
  { position: [-1.4, 0.2, -3.4], color: "#e8a33d", seed: 4.1 },
  { position: [1.2, -0.6, -5.2], color: "#c79b5e", seed: 5.6 },
];

export function CanvasWorld() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ fov: 45, position: [0, 0.4, 6] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#17080b"]} />
        <fog attach="fog" args={["#17080b", 4, 16]} />

        {/* shared light source: warm key + cool-brass rim, matching the CSS palette */}
        <ambientLight intensity={0.25} color="#c79b5e" />
        <directionalLight position={[3, 4, 5]} intensity={1.1} color="#f3e9dd" />
        <pointLight position={[-4, -1, -2]} intensity={0.6} color="#e8a33d" />

        <CameraRig />
        <DustField />

        <Physics gravity={[0, -0.4, 0]}>
          {PANELS.map((p) => (
            <FloatingPanel key={p.seed} position={p.position} color={p.color} seed={p.seed} />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
}
