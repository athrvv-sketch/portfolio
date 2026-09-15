import { createContext, useContext, useRef, type ReactNode } from "react";

export type WorldState = {
  /** 0–1 scroll progress, mutated in place every frame (no re-render cost) */
  progress: { current: number };
  /** current section's accent hex, read by particles + rim light */
  accent: { current: string };
};

const WorldCtx = createContext<WorldState | null>(null);

export function WorldProvider({ children }: { children: ReactNode }) {
  const progress = useRef(0);
  const accent = useRef("#7a1220");
  return (
    <WorldCtx.Provider value={{ progress, accent }}>{children}</WorldCtx.Provider>
  );
}

export function useWorld() {
  const ctx = useContext(WorldCtx);
  if (!ctx) throw new Error("useWorld must be used inside <WorldProvider>");
  return ctx;
}
