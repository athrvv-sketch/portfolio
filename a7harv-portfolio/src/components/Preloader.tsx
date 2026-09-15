import { motion, AnimatePresence } from "framer-motion";

/**
 * BYTE, downsized: a quick hand-drawn doodle instead of a 3D
 * character. One appearance only, on the loading screen — a loose,
 * sketchy line mark in the ember accent, gone the moment the scene
 * is ready.
 */
function DoodleByte() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <path
        d="M20 44c-3-9 2-19 12-21 9-2 18 3 20 12 1 6-1 11-5 14-1 4 1 6 3 7-4 1-8 0-10-3-4 1-9 1-13-1-1 2-3 3-6 3 2-2 2-4 1-6-3-2-2-4-2-5z"
        stroke="var(--color-ember)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 26c-1-4 0-8 3-9M45 27c2-4 1-8-1-10"
        stroke="var(--color-ember)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="31" cy="38" r="1.4" fill="var(--color-ember)" />
      <circle cx="44" cy="37" r="1.4" fill="var(--color-ember)" />
      <path d="M35 44c1 1 3 1 4 0" stroke="var(--color-ember)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Preloader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <DoodleByte />
          </motion.div>
          <p className="font-display text-sm tracking-wide text-muted">entering the cut room…</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
