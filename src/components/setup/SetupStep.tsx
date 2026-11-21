import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface SetupStepProps {
  id: string;
  stepNumber: string;
  heading: string;
  subheading: string;
  completed?: boolean;
  isLast?: boolean;
  children: ReactNode;
}

export function SetupStep({
  id,
  stepNumber,
  heading,
  subheading,
  completed = false,
  isLast = false,
  children,
}: SetupStepProps) {
  return (
    <section id={id} className="relative scroll-mt-24 pl-10 sm:pl-14">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute top-11 bottom-0 left-[15px] sm:left-[19px] w-0.5 bg-[#E5DEC9]"
        />
      )}

      {/* Numbered Progression Marker */}
      <div
        aria-hidden="true"
        className={`absolute top-1 left-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 font-mono text-xs sm:text-sm font-bold tabular-nums transition-colors ${
          completed
            ? 'border-[#1E3A5F] bg-[#1E3A5F] text-[#FFFCF7]'
            : 'border-[#DE546A] bg-[#FFFCF7] text-[#1E3A5F]'
        }`}
      >
        {completed ? <Check className="h-4 w-4" /> : stepNumber}
      </div>

      {/* Step Card Container */}
      <div className="rounded-2xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8">
        <div className="border-b border-[#EFE9DC] pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs font-semibold tracking-wider text-[#B8354B]">
              STEP {stepNumber} · {subheading}
            </p>
            {completed && (
              <span className="font-mono text-xs font-semibold text-[#1E3A5F]">
                Verified
              </span>
            )}
          </div>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#13243C] sm:text-3xl text-balance">
            {stepNumber} — {heading}
          </h2>
          <div
            aria-hidden="true"
            className="mt-3 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#DE546A] to-[#1E3A5F]"
          />
        </div>

        <div className="mt-6 space-y-6">{children}</div>
      </div>
    </section>
  );
}
