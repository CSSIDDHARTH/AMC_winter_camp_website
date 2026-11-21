import { motion, useReducedMotion } from 'motion/react';
import winterUavArtwork from '../assets/images/hero_winter_drones_planes_1794906168754.jpg';

/**
 * One cinematic artwork layer replaces the former faux-3D flying SVGs,
 * rotating radar target and simulated telemetry.
 *
 * A very slow camera drift gives the scene depth without pretending a
 * still image is physically simulated 3D flight.
 */
export function HeroFlightAnimation() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-y-0 right-[-6%] w-[112%] opacity-20 sm:right-[-3%] sm:w-[75%] sm:opacity-75 lg:right-0 lg:w-[64%] lg:opacity-95"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 18%, black 50%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 18%, black 50%)',
        }}
      >
        <motion.img
          src={winterUavArtwork}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[55%_40%] saturate-[0.88] contrast-[1.02]"
          initial={reducedMotion ? false : { opacity: 0, scale: 1.08 }}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  scale: [1.04, 1.095, 1.04],
                  x: [0, -18, 0],
                  y: [0, 7, 0],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 28,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }
          }
        />
      </div>

      {/* A natural horizon fade keeps the artwork behind the page content. */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFFCF7] via-[#FFFCF7]/65 to-transparent sm:h-32" />
    </div>
  );
}
