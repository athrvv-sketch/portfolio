import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, Plane, Raycaster, Vector2 } from "three";

type Props = {
  position: [number, number, number];
  color: string;
  size?: [number, number];
  seed?: number;
};

const plane = new Plane(new Vector3(0, 0, 1), 0);
const raycaster = new Raycaster();
const pointerNDC = new Vector2(10, 10); // start off-screen

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

export function FloatingPanel({ position, color, size = [1.4, 0.9], seed = 0 }: Props) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const worldPoint = useRef(new Vector3());

  useFrame((state) => {
    const body = bodyRef.current;
    if (!body) return;

    // gentle sinusoidal bob, phase offset per panel so they never sync
    const t = state.clock.elapsedTime;
    const bob = Math.sin(t * 0.6 + seed) * 0.0006;
    body.applyImpulse({ x: 0, y: bob, z: 0 }, true);

    // nudge away from the cursor when it's near, projected onto the panel's depth plane
    plane.constant = -position[2];
    raycaster.setFromCamera(pointerNDC, camera);
    if (raycaster.ray.intersectPlane(plane, worldPoint.current)) {
      const bodyPos = body.translation();
      const dx = bodyPos.x - worldPoint.current.x;
      const dy = bodyPos.y - worldPoint.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1.4 && dist > 0.001) {
        const strength = (1.4 - dist) * 0.0009;
        body.applyImpulse({ x: (dx / dist) * strength, y: (dy / dist) * strength, z: 0 }, true);
      }
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={position}
      type="dynamic"
      colliders="cuboid"
      gravityScale={0.05}
      linearDamping={2.2}
      angularDamping={3}
      restitution={0.2}
    >
      <mesh>
        <planeGeometry args={size} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.15}
          emissive={color}
          emissiveIntensity={0.06}
        />
      </mesh>
    </RigidBody>
  );
}
