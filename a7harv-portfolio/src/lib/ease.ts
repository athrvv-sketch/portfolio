import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);

/**
 * "worldDrift" — the single named ease shared by the 3D camera, the
 * background parallax, and every foreground scroll reveal. Slow
 * settle with a touch of overshoot resistance near the end, so
 * nothing in the scene ever feels like a generic power2.out.
 */
export const WORLD_EASE = CustomEase.create(
  "worldDrift",
  "M0,0 C0.16,0 0.24,0.85 0.36,0.95 0.52,1.02 0.7,1 1,1"
);

export { gsap, ScrollTrigger };
