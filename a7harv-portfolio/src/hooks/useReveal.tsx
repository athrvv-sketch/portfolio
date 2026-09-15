import { useEffect, useRef, type ReactNode } from "react";
import { gsap, WORLD_EASE } from "@/lib/ease";
import { useReducedMotion } from "./useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "scale";

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
};

const AXIS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  scale: { scale: 1 },
};

/**
 * Wraps content in a scroll-triggered reveal that reads from the
 * shared worldDrift ease. Each call site picks its own direction,
 * distance and delay so the page never reads as one fade-up
 * template repeated down the scroll.
 */
export function Reveal({
  children,
  direction = "up",
  distance = 36,
  duration = 1.1,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const axis = AXIS[direction];
    const from: gsap.TweenVars = { opacity: 0 };
    if (axis.x) from.x = axis.x * distance;
    if (axis.y) from.y = axis.y * distance;
    if (axis.scale) from.scale = 0.94;

    const tween = gsap.fromTo(
      el,
      from,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: WORLD_EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, distance, duration, delay, reducedMotion]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
