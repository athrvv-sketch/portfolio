import { useEffect, useRef } from "react";

export function CursorSpotlight({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      if (el) {
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="cursor-spotlight" />;
}
