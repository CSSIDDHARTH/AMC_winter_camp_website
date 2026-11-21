import { HelpCircle } from 'lucide-react';
import { OFFICIAL_HELP_CHANNEL } from '../../config/setupGuides';

const TROUBLESHOOTING_STEPS = [
  {
    number: '1',
    title: 'Read the Error Carefully',
    description:
      'Check the exact error message. Avoid repeating installation commands without understanding why the previous attempt failed.',
  },
  {
    number: '2',
    title: 'Review the GitHub Guide',
    description:
      'Return to the relevant installation guide and check whether you missed a prerequisite, configuration step, or verification command.',
  },
  {
    number: '3',
    title: 'Check Your Operating System',
    description:
      'Make sure the instructions match your operating system, processor architecture, and software version.',
  },
  {
    number: '4',
    title: 'Document the Problem',
    description:
      'If the issue persists, record the command you ran, the error message, your operating system, and what you have already tried.',
  },
  {
    number: '5',
    title: 'Ask for Assistance',
    description:
      'Share the relevant details with the Winter Camp coordinators through the official communication channel.',
  },
];

export function TroubleshootingSection() {
  return (
    <section
      id="troubleshooting"
      className="scroll-mt-24 rounded-2xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8"
    >
      <div className="space-y-2 border-b border-[#EFE9DC] pb-5">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#B8354B]">
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>TROUBLESHOOTING &amp; SUPPORT</span>
        </div>
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#13243C] sm:text-3xl">
          Facing Installation <span className="text-[#B8354B]">Problems?</span>
        </h2>
        <p className="text-sm leading-relaxed text-[#4B5E77] sm:text-base">
          Software installation can sometimes be challenging, especially if this is your first time
          working with engineering tools or Linux.
        </p>
        <p className="text-sm leading-relaxed text-[#4B5E77]">
          If you encounter a problem, don&apos;t worry. Follow these steps before trying again.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TROUBLESHOOTING_STEPS.map((step) => (
          <div
            key={step.number}
            className="rounded-xl border border-[#E5DEC9] bg-[#F8F5EE] p-5 space-y-2"
          >
            <p className="font-mono text-xs font-semibold text-[#B8354B] tabular-nums">
              0{step.number}.
            </p>
            <h3 className="font-display text-base font-bold text-[#13243C]">
              {step.number}. {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#4B5E77]">{step.description}</p>
          </div>
        ))}

        {/* Configurable Placeholder for Official Help Channel */}
        <div className="rounded-xl border border-dashed border-[#1E3A5F]/35 bg-[#FFFCF7] p-5 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <p className="font-mono text-xs font-semibold text-[#1E3A5F]">OFFICIAL HELP CHANNEL</p>
            <p className="text-sm leading-relaxed text-[#4B5E77]">
              {OFFICIAL_HELP_CHANNEL.label}
            </p>
          </div>
          {OFFICIAL_HELP_CHANNEL.url && (
            <a
              href={OFFICIAL_HELP_CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold text-[#B8354B] underline underline-offset-4 hover:text-[#1E3A5F]"
            >
              Open Official Help Channel
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
