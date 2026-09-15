import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useWorld } from "@/lib/WorldContext";
import { Vector3 } from "three";

// Hand-placed camera waypoints, one roughly per section, walked
// through as the visitor scrolls: hero -> gallery -> about ->
// services -> testimonials -> contact.
const WAYPOINTS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [0, 0.4, 6], look: [0, 0.2, 0] },
  { pos: [2.2, 0.8, 3.4], look: [0.6, 0, -1] },
  { pos: [-2.4, 0.2, 1.8], look: [-0.4, 0.1, -2.4] },
  { pos: [1.6, -0.4, -0.6], look: [0, -0.1, -3.6] },
  { pos: [-1.4, 0.6, -2.6], look: [0, 0.2, -5.6] },
  { pos: [0, 0.2, -4.8], look: [0, 0, -8] },
];

function sampleCurve(t: number) {
  const scaled = t * (WAYPOINTS.length - 1);
  const i = Math.min(Math.floor(scaled), WAYPOINTS.length - 2);
  const localT = scaled - i;
  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];
  const pos = new Vector3(...a.pos).lerp(new Vector3(...b.pos), localT);
  const look = new Vector3(...a.look).lerp(new Vector3(...b.look), localT);
  return { pos, look };
}

export function CameraRig() {
  const { camera } = useThree();
  const world = useWorld();
  const smoothed = useRef(0);

  useFrame(() => {
    // ease the raw scroll progress so the camera drifts rather than snaps
    smoothed.current += (world.progress.current - smoothed.current) * 0.06;
    const { pos, look } = sampleCurve(Math.min(Math.max(smoothed.current, 0), 1));
    camera.position.lerp(pos, 0.08);
    const target = look.clone();
    const dir = target.sub(camera.position).normalize();
    const desired = camera.position.clone().add(dir);
    camera.lookAt(desired);
  });

  return null;
}
