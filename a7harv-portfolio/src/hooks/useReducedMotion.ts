import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

type NavigatorWithHardware = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/** Rough heuristic for "skip the heavy 3D scene" — never exact, just cautious. */
export function useLowPower() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithHardware;
    const smallScreen = window.innerWidth < 720;
    const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lowMemory = (nav.deviceMemory ?? 8) <= 4;
    const saveData = nav.connection?.saveData === true;
    setLowPower(saveData || (smallScreen && (fewCores || lowMemory)));
  }, []);

  return lowPower;
}
