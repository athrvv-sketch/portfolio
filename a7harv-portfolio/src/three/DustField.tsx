import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, type Points as PointsType } from "three";

export function DustField({ count = 260, color = "#e8a33d" }: { count?: number; color?: string }) {
  const ref = useRef<PointsType>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    const posAttr = ref.current.geometry.getAttribute("position") as BufferAttribute;
    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i) + Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.0006;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={color}
        transparent
        opacity={0.5}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
