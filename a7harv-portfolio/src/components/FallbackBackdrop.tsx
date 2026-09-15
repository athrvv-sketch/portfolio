export function FallbackBackdrop() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(120% 90% at 20% 10%, #391218 0%, #17080b 55%), radial-gradient(80% 60% at 85% 80%, rgba(232,163,61,0.08), transparent 60%)",
      }}
    />
  );
}
