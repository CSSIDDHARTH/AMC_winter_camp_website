import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Snowflake } from 'lucide-react';
import { WinterSnowfall } from './WinterSnowfall';
import { HeroFlightAnimation } from './HeroFlightAnimation';
import { HeroCloudLayer } from './HeroCloudLayer';

export function HeroSection() {
  const [backdropError, setBackdropError] = useState(false);
  const parallaxRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1..1
    parallaxRef.current = { x: nx, y: ny };
  };

  const handleMouseLeave = () => {
    parallaxRef.current = { x: 0, y: 0 };
  };

  const handleScrollToRoadmap = () => {
    const roadmap = document.getElementById('roadmap');
    roadmap?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b border-[#E5DEC9] bg-gradient-to-b from-[#BFD8F0] via-[#DFECF7] to-[#FFFCF7]"
    >
      {/* Expansive Sky & Sunlit Clouds Backdrop Image */}
      {!backdropError && (
        <img
          src="/src/assets/images/hero_sky_clouds_backdrop_1794915378609.jpg"
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBackdropError(true)}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right-top opacity-95 saturate-[1.08]"
        />
      )}

      {/* Atmospheric Left Readability Scrim (keeps right sky luminous & crisp) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(102deg, rgba(255,252,247,0.92) 0%, rgba(248,245,238,0.78) 38%, rgba(248,245,238,0.28) 66%, rgba(220,235,248,0.06) 100%)',
        }}
      />

      {/* Soft Horizon Cloud Blend into Page Surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FFFCF7] via-[#FFFCF7]/75 to-transparent"
      />

      {/* Volumetric Drifting Clouds & Sunlight Glow */}
      <HeroCloudLayer />

      {/* Subtle High-Altitude Trajectory Arcs */}
      <svg
        viewBox="0 0 1200 540"
        className="pointer-events-none absolute inset-0 h-full w-full text-[#1E3A5F]/12"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M -40 365 C 260 310, 560 135, 1020 142"
          stroke="currentColor"
          strokeDasharray="5 7"
          strokeWidth="1.4"
        />
        <path
          d="M 180 455 C 480 395, 790 275, 1210 175"
          stroke="#DE546A"
          strokeOpacity="0.22"
          strokeDasharray="4 7"
          strokeWidth="1.2"
        />
      </svg>

      {/* Realistic 3D-Perspective Flying Drones & Autonomous UAV */}
      <HeroFlightAnimation parallaxRef={parallaxRef} />

      {/* Multi-Depth Winter Snow Particles */}
      <WinterSnowfall />

      <div className="relative z-20 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#33465F] sm:text-sm">
              <span className="font-semibold text-[#B8354B]">Aeromodelling Club</span>
              <span aria-hidden="true" className="text-[#9DB0C7]">·</span>
              <span>Indian Institute of Technology (BHU), Varanasi</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl font-bold tracking-tight text-[#13243C] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.06] text-balance">
                AMC WINTER CAMP 2026–27
              </h1>
              <p className="font-mono text-base font-semibold tracking-wide text-[#B8354B] sm:text-lg">
                1 Dec – 21 Dec
              </p>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-[#253852] sm:text-lg">
              An immersive three-week learning experience organized by the Aeromodelling Club, IIT (BHU),
              designed to introduce aspiring engineers to Computer-Aided Design, Robot Operating System (ROS 2),
              and engineering component selection through structured learning and hands-on challenges.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToRoadmap}
                className="group inline-flex items-center gap-2.5 rounded-md bg-[#1E3A5F] px-6 py-3.5 text-sm font-semibold text-[#FFFCF7] shadow-[0_8px_20px_-6px_rgba(30,58,95,0.45)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#B8354B] hover:shadow-[0_10px_24px_-6px_rgba(184,53,75,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F5EE]"
              >
                <span>Explore the Roadmap</span>
                <ArrowDownRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="mt-12 border-t border-[#1E3A5F]/15 pt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#33465F]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#B8354B]">
              <Snowflake className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Winter Edition</span>
            </span>
            <span aria-hidden="true" className="text-[#9DB0C7]">/</span>
            <span>1 Dec – 21 Dec</span>
            <span aria-hidden="true" className="text-[#9DB0C7]">/</span>
            <span>03 Structured Weeks</span>
            <span aria-hidden="true" className="text-[#9DB0C7]">/</span>
            <span>CAD · ROS 2 · UAV Systems</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
