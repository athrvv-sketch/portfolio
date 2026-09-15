import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";
import React from "react";

type MagneticProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Wraps a CTA and shifts it a few px toward the cursor as the
 * pointer approaches — plain distance-based transform, no library.
 */
export function MagneticButton<T extends ElementType = "button">({
  as,
  children,
  className,
  ...rest
}: MagneticProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "button") as ElementType;

  function handleMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28}px)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }

  return React.createElement(
    Tag,
    {
      ref,
      onPointerMove: handleMove,
      onPointerLeave: handleLeave,
      className,
      style: { transition: "transform 0.35s var(--world-ease)" },
      ...rest,
    },
    children
  );
}
