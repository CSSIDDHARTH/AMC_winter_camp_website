import { motion, useReducedMotion } from 'motion/react';
import { Compass, Plane, SlidersHorizontal, Wrench } from 'lucide-react';

const PILLARS = [
  {
    index: '01.',
    title: 'Hands-On Practice',
    description:
      'Pair concise technical guides with practical weekly builds so every concept sticks through direct execution.',
    icon: Wrench,
  },
  {
    index: '02.',
    title: 'Real Engineering',
    description:
      'Tackle challenges shaped by genuine UAV constraints—mechanical tolerances, software flow, and payload trade-offs.',
    icon: SlidersHorizontal,
  },
  {
    index: '03.',
    title: 'Self-Paced Inquiry',
    description:
      'Explore documentation, test your own designs, and build problem-solving confidence beyond step-by-step recipes.',
    icon: Compass,
  },
  {
    index: '04.',
    title: 'Flight Integration',
    description:
      'Connect mechanical CAD, ROS 2 autonomy, and hardware selection into cohesive aerial system workflows.',
    icon: Plane,
  },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-b border-[#E5DEC9] bg-[#FFFCF7]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Balanced Editorial Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 border-b border-[#EFE9DC] pb-10 lg:grid-cols-12 lg:items-end lg:gap-12"
        >
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-[#B8354B]">
              <span>1 Dec – 21 Dec</span>
              <span aria-hidden="true" className="text-[#C8BFA8]">·</span>
              <span className="text-[#5A6C84]">Camp Overview</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.025em] leading-[1.08] text-[#13243C] sm:text-4xl text-balance">
              About the <span className="text-[#B8354B]">Winter Camp</span>
            </h2>
            <div
              aria-hidden="true"
              className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[#DE546A] to-[#1E3A5F]"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-[#33465F] max-w-2xl lg:ml-auto">
              Built to turn curiosity into practical aeromodelling skill, the AMC Winter Camp replaces
              passive lectures with focused weekly projects across 3D CAD design, ROS 2 robotics, and
              UAV component selection.
            </p>
          </div>
        </motion.div>

        {/* Four Sequential Objective Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.index}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.15, delay: 0, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex h-full flex-col rounded-xl border border-[#E5DEC9] bg-[#F8F5EE] p-6 transition-colors duration-150 hover:border-[#DE546A] hover:bg-[#FFFCF7] will-change-transform"
              >
                <div className="mb-4 flex items-center justify-between border-b border-[#E5DEC9] pb-3">
                  <span className="font-mono text-xs font-semibold text-[#B8354B] tabular-nums">
                    {pillar.index}
                  </span>
                  <Icon
                    className="h-4 w-4 text-[#1E3A5F]/75 transition-colors duration-150 group-hover:text-[#B8354B]"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-display text-lg font-bold tracking-tight text-[#13243C] transition-colors duration-150 group-hover:text-[#B8354B]">
                  {pillar.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#4B5E77]">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
