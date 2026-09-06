import { useMemo } from "react";
import { motion } from "framer-motion";

// Soft ambient particles / glow blobs — deliberately sparse so they
// never compete with the photography.
export default function BackgroundFX({ variant = "light", density = 14 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * 6,
      })),
    [density]
  );

  const dotColor = variant === "dark" ? "rgba(255,255,255,0.55)" : "rgba(201,169,110,0.55)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* blurred gradient blobs */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            variant === "dark"
              ? "radial-gradient(circle, rgba(201,169,110,0.35), transparent 70%)"
              : "radial-gradient(circle, var(--rose-light), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            variant === "dark"
              ? "radial-gradient(circle, rgba(138,90,114,0.4), transparent 70%)"
              : "radial-gradient(circle, var(--lavender), transparent 70%)",
        }}
      />

      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: dotColor,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
