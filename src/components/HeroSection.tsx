import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight, Snowflake } from 'lucide-react';
import { HeroFlightAnimation } from './HeroFlightAnimation';
import { HeroCloudLayer } from './HeroCloudLayer';
import { campSchedule } from '../config/campConfig';
import heroSkyBackdrop from '../assets/images/hero_sky_clouds_backdrop_1794915378609.jpg';

export function HeroSection() {
  const [backdropError, setBackdropError] = useState(false);
  const handleScrollToRoadmap = () => {
    const roadmap = document.getElementById('roadmap');
    roadmap?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative overflow-hidden border-b border-[#E5DEC9] bg-gradient-to-b from-[#BFD8F0] via-[#DFECF7] to-[#FFFCF7]"
    >
      {/* Expansive Sky & Sunlit Clouds Backdrop Image */}
      {!backdropError && (
        <img
          src={heroSkyBackdrop}
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

      {/* A single cinematic UAV scene, with no radar or faux-3D overlays. */}
      <HeroFlightAnimation />

      <div className="relative z-20 mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8 lg:pt-36 lg:pb-28">
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

            <div className="space-y-3.5">
              <h1 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-[#13243C] sm:text-5xl lg:text-[4rem] lg:leading-[1.02] text-balance">
                AMC{' '}
                <span className="bg-gradient-to-r from-[#13243C] via-[#1E3A5F] to-[#B8354B] bg-clip-text text-transparent">
                  WINTER CAMP
                </span>{' '}
                <span className="text-[#B8354B]">2026</span>
              </h1>
              <p className="font-display text-lg font-bold tracking-tight text-[#1E3A5F] sm:text-xl">
                {campSchedule.campTagline}
              </p>
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[#DE546A] to-[#1E3A5F]"
                  />
                  <p className="font-mono text-base font-semibold tracking-wide text-[#B8354B] sm:text-lg">
                    {campSchedule.campDateRange}
                  </p>
                </div>
                <p className="font-mono text-xs font-medium text-[#4B5E77]">
                  {campSchedule.preCampHeroNote}
                </p>
              </div>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-[#253852] sm:text-lg">
              An immersive three-week learning experience organized by the Aeromodelling Club, IIT (BHU),
              designed to introduce aspiring engineers to Computer-Aided Design, Robot Operating System (ROS 2),
              and engineering component selection through structured learning and hands-on challenges.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/setup"
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#1E3A5F] px-6 py-3.5 text-sm font-semibold text-[#FFFCF7] shadow-[0_10px_26px_-8px_rgba(30,58,95,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B8354B] hover:shadow-[0_14px_30px_-10px_rgba(184,53,75,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-2"
              >
                <span>Start Pre-Camp Setup</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <button
                type="button"
                onClick={handleScrollToRoadmap}
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#1E3A5F]/25 bg-[#FFFCF7]/80 px-6 py-3.5 text-sm font-semibold text-[#1E3A5F] shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DE546A] hover:bg-[#FFFCF7] hover:text-[#B8354B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-2"
              >
                <span>Explore the Roadmap</span>
                <ArrowDownRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
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
            <span>{campSchedule.campDateRange}</span>
            <span aria-hidden="true" className="text-[#9DB0C7]">/</span>
            <span>21 Days · 03 Structured Weeks</span>
            <span aria-hidden="true" className="text-[#9DB0C7]">/</span>
            <span>CAD · ROS 2 · UAV Systems</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
