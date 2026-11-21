import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Compass,
  FileCheck2,
  RotateCw,
  Send,
  Trophy,
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'Briefing',
    title: 'Read the instructions',
    description:
      'Review the weekly overview, setup prerequisites, and step-by-step technical documentation.',
    icon: BookOpen,
  },
  {
    step: '02',
    phase: 'Exploration',
    title: 'Study the provided resources',
    description:
      'Work through curated references, CAD assemblies, ROS 2 guides, and engineering notes.',
    icon: Compass,
  },
  {
    step: '03',
    phase: 'Execution',
    title: 'Complete the assigned tasks',
    description:
      'Apply your understanding to solve the problem statements and build the expected deliverables.',
    icon: FileCheck2,
  },
  {
    step: '04',
    phase: 'Delivery',
    title: 'Submit the required deliverables',
    description:
      'Package your outputs cleanly and submit them via the official weekly Google Form.',
    icon: Send,
  },
  {
    step: '05',
    phase: 'Evaluation',
    title: 'Track your performance',
    description:
      'Monitor your evaluation progress on the camp leaderboard after its official release.',
    icon: Trophy,
  },
];

interface FlowCardProps {
  item: (typeof WORKFLOW_STEPS)[number];
  index: number;
}

function FlowCard({ item, index }: FlowCardProps) {
  const Icon = item.icon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col justify-between rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-5 shadow-xs transition-colors duration-150 hover:border-[#DE546A]"
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-2 border-b border-[#EFE9DC] pb-3">
          <div className="flex items-center gap-2 font-mono text-xs tabular-nums">
            <span className="flex h-6 w-6 items-center justify-center rounded border border-[#F3C5CE] bg-[#FDF1F3] font-semibold text-[#B8354B]">
              {item.step}
            </span>
            <span className="text-[#4B5E77] font-medium">{item.phase}</span>
          </div>
          <Icon
            className="h-4 w-4 text-[#7A8799] transition-colors group-hover:text-[#1E3A5F]"
            aria-hidden="true"
          />
        </div>

        <h3 className="font-display text-base font-bold tracking-tight text-[#13243C] transition-colors group-hover:text-[#B8354B]">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4B5E77]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function WorkflowSection() {
  const topRow = WORKFLOW_STEPS.slice(0, 3);
  const bottomRow = WORKFLOW_STEPS.slice(3, 5);

  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-[#E5DEC9] bg-[#FFFCF7]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-[#B8354B]">
              <span>Weekly Cycle</span>
              <span aria-hidden="true" className="text-[#C8BFA8]">·</span>
              <span className="text-[#5A6C84]">05 Stages</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.025em] leading-[1.08] text-[#13243C] sm:text-4xl text-balance">
              How the Camp <span className="text-[#B8354B]">Works</span>
            </h2>
            <div
              aria-hidden="true"
              className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[#DE546A] to-[#1E3A5F]"
            />
            <p className="pt-1 text-sm leading-relaxed text-[#4B5E77] sm:text-base">
              Each weekly module follows a structured five-stage engineering workflow from initial setup to leaderboard evaluation.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5A6C84]">
            <RotateCw className="h-3.5 w-3.5 text-[#DE546A]" aria-hidden="true" />
            <span>Repeats Across Weeks 01 – 03</span>
          </div>
        </div>

        {/* Desktop Two-Tier Flowchart (lg and up) */}
        <div className="hidden lg:block rounded-2xl border border-[#E5DEC9] bg-[#F8F5EE] p-8 blueprint-grid-fine">
          {/* Tier 1: Steps 01 -> 02 -> 03 */}
          <div className="grid grid-cols-[1fr_44px_1fr_44px_1fr] items-stretch">
            {topRow.map((item, idx) => (
              <div key={item.step} className="contents">
                <FlowCard item={item} index={idx} />
                {idx < topRow.length - 1 && (
                  <div className="flex items-center justify-center" aria-hidden="true">
                    <div className="flex w-full items-center">
                      <div className="h-[2px] flex-1 bg-[#1E3A5F]/45" />
                      <ArrowRight className="h-4 w-4 -ml-1 text-[#1E3A5F] shrink-0" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stepped Return Bus Connector from Step 03 down to Step 04 */}
          <div className="relative h-16 w-full" aria-hidden="true">
            <svg
              viewBox="0 0 1000 64"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
            >
              <path
                d="M 835 0 L 835 30 Q 835 36 829 36 L 171 36 Q 165 36 165 42 L 165 60"
                stroke="#1E3A5F"
                strokeOpacity="0.65"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 159 54 L 165 62 L 171 54"
                stroke="#DE546A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Tier 2: Steps 04 -> 05 + Cycle Return Loop */}
          <div className="grid grid-cols-[1fr_44px_1fr_44px_1fr] items-stretch">
            <FlowCard item={bottomRow[0]} index={3} />

            <div className="flex items-center justify-center" aria-hidden="true">
              <div className="flex w-full items-center">
                <div className="h-[2px] flex-1 bg-[#1E3A5F]/45" />
                <ArrowRight className="h-4 w-4 -ml-1 text-[#1E3A5F] shrink-0" />
              </div>
            </div>

            <FlowCard item={bottomRow[1]} index={4} />

            <div className="flex items-center justify-center" aria-hidden="true">
              <div className="flex w-full items-center">
                <div className="h-[2px] flex-1 border-t-2 border-dashed border-[#DE546A]/60" />
                <ArrowRight className="h-4 w-4 -ml-1 text-[#DE546A] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-dashed border-[#DE546A]/60 bg-[#FFFCF7]/90 p-5 text-left">
              <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold text-[#B8354B]">
                <RotateCw className="h-4 w-4" aria-hidden="true" />
                <span>NEXT MODULE</span>
              </div>
              <p className="font-display text-sm font-semibold text-[#13243C]">
                Advance to Next Week
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#4B5E77]">
                Repeat the cycle as new weekly tasks unlock progressively across CAD, ROS 2, and Component Selection.
              </p>
            </div>
          </div>
        </div>

        {/* Tablet & Mobile Vertical Flowchart (< lg) */}
        <ol className="lg:hidden space-y-2">
          {WORKFLOW_STEPS.map((item, idx) => (
            <li key={item.step} className="flex flex-col items-stretch">
              <FlowCard item={item} index={idx} />
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="flex justify-center py-1.5" aria-hidden="true">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-[2px] bg-[#1E3A5F]/45" />
                    <ArrowDown className="h-4 w-4 -mt-1 text-[#DE546A]" />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
