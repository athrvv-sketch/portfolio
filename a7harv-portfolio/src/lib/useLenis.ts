import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./ease";

/**
 * Boots Lenis and ties it to GSAP's ticker so ScrollTrigger, the
 * camera rig, and every reveal all read the same scroll clock.
 * Disabled entirely under prefers-reduced-motion / low-power mode,
 * where the browser's native scroll takes over.
 */
export function useLenis(enabled: boolean, onScroll?: (progress: number) => void) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: { progress: number }) => {
      onScroll?.(e.progress);
      ScrollTrigger.update();
    });

    function raf(time: number) {
      lenis.raf(time);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (value !== undefined) lenis.scrollTo(value, { immediate: true });
        return lenis.scroll ?? window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, onScroll]);

  return lenisRef;
}
