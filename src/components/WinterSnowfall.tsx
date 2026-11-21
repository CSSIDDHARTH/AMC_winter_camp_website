import { motion, useReducedMotion } from 'motion/react';

interface SnowParticle {
  id: number;
  leftPercent: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
  blurPx: number;
}

const SNOW_PARTICLES: SnowParticle[] = [
  { id: 1, leftPercent: 5, size: 7, duration: 12, delay: 0, driftX: 44, opacity: 0.72, blurPx: 1 },
  { id: 2, leftPercent: 11, size: 4, duration: 15, delay: 1.8, driftX: 28, opacity: 0.55, blurPx: 0 },
  { id: 3, leftPercent: 18, size: 9, duration: 10.5, delay: 0.7, driftX: 52, opacity: 0.45, blurPx: 2 },
  { id: 4, leftPercent: 24, size: 3.5, duration: 13.5, delay: 3.1, driftX: 24, opacity: 0.65, blurPx: 0 },
  { id: 5, leftPercent: 31, size: 6, duration: 11.5, delay: 0.4, driftX: 38, opacity: 0.68, blurPx: 0.5 },
  { id: 6, leftPercent: 38, size: 4.5, duration: 14.5, delay: 4.2, driftX: 30, opacity: 0.58, blurPx: 0 },
  { id: 7, leftPercent: 45, size: 8, duration: 10, delay: 1.2, driftX: 48, opacity: 0.48, blurPx: 1.5 },
  { id: 8, leftPercent: 51, size: 3.5, duration: 16, delay: 2.8, driftX: 22, opacity: 0.62, blurPx: 0 },
  { id: 9, leftPercent: 58, size: 6.5, duration: 11.8, delay: 0.2, driftX: 42, opacity: 0.7, blurPx: 0.8 },
  { id: 10, leftPercent: 64, size: 4, duration: 13.2, delay: 3.6, driftX: 26, opacity: 0.6, blurPx: 0 },
  { id: 11, leftPercent: 70, size: 10, duration: 9.8, delay: 1.9, driftX: 55, opacity: 0.42, blurPx: 2 },
  { id: 12, leftPercent: 76, size: 4.5, duration: 14.2, delay: 0.9, driftX: 34, opacity: 0.66, blurPx: 0 },
  { id: 13, leftPercent: 82, size: 7, duration: 11.2, delay: 2.5, driftX: 46, opacity: 0.64, blurPx: 1 },
  { id: 14, leftPercent: 88, size: 3.5, duration: 15.2, delay: 1.3, driftX: 25, opacity: 0.56, blurPx: 0 },
  { id: 15, leftPercent: 93, size: 8.5, duration: 10.6, delay: 0.5, driftX: 50, opacity: 0.48, blurPx: 1.5 },
  { id: 16, leftPercent: 97, size: 4, duration: 13.8, delay: 2.9, driftX: 30, opacity: 0.62, blurPx: 0 },
];

export function WinterSnowfall() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {SNOW_PARTICLES.slice(0, 8).map((flake) => (
          <span
            key={flake.id}
            style={{
              left: `${flake.leftPercent}%`,
              top: `${(flake.id * 11) % 80}%`,
              width: flake.size,
              height: flake.size,
              opacity: flake.opacity * 0.75,
              filter: flake.blurPx ? `blur(${flake.blurPx}px)` : undefined,
            }}
            className="absolute block rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SNOW_PARTICLES.map((flake) => (
        <motion.span
          key={flake.id}
          initial={{ y: -20, x: 0, opacity: 0 }}
          animate={{
            y: [-20, 560],
            x: [0, flake.driftX * 0.55, flake.driftX],
            opacity: [0, flake.opacity, flake.opacity * 0.9, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: `${flake.leftPercent}%`,
            top: 0,
            width: flake.size,
            height: flake.size,
            filter: flake.blurPx ? `blur(${flake.blurPx}px)` : undefined,
          }}
          className="absolute block rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)] will-change-transform"
        />
      ))}
    </div>
  );
}
