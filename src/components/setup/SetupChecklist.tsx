import { CheckCircle2, CheckSquare, RotateCcw, Square } from 'lucide-react';

export const FINAL_CHECKLIST_ITEMS = [
  'I have installed SolidWorks or Fusion 360.',
  'I can create and save a simple CAD model.',
  'I have prepared my Ubuntu 22.04 environment.',
  'I can open the Ubuntu terminal and run basic commands.',
  'I have installed ROS 2 Humble.',
  'I have completed the ROS 2 verification steps.',
  'I have installed and tested the required Gazebo simulator.',
] as const;

interface SetupChecklistProps {
  checkedItems: boolean[];
  onToggleItem: (index: number) => void;
  onReset: () => void;
}

export function SetupChecklist({
  checkedItems,
  onToggleItem,
  onReset,
}: SetupChecklistProps) {
  const totalCount = FINAL_CHECKLIST_ITEMS.length;
  const completedCount = checkedItems.filter(Boolean).length;
  const allCompleted = completedCount === totalCount;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <section
      id="final-checklist"
      className="scroll-mt-24 rounded-2xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8"
    >
      <div className="flex flex-col gap-4 border-b border-[#EFE9DC] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold tracking-wider text-[#B8354B]">
            FINAL SETUP CHECKLIST
          </p>
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#13243C] sm:text-3xl">
            Ready for <span className="text-[#B8354B]">Winter Camp?</span>
          </h2>
          <p className="text-sm leading-relaxed text-[#4B5E77] sm:text-base">
            Before December 5, make sure you have completed the following preparations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-xs font-semibold text-[#1E3A5F] tabular-nums">
            {completedCount} of {totalCount} checks completed
          </span>
          <button
            type="button"
            onClick={onReset}
            disabled={completedCount === 0}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#E5DEC9] bg-[#F8F5EE] px-3 py-1.5 text-xs font-medium text-[#33465F] transition-colors hover:border-[#DE546A] hover:text-[#B8354B] disabled:opacity-45 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset Checklist</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <div
          aria-hidden="true"
          className="h-2 w-full overflow-hidden rounded-full bg-[#EFE9DC]"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#DE546A] transition-[width] duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Checklist Items */}
      <ul className="mt-6 space-y-2.5">
        {FINAL_CHECKLIST_ITEMS.map((label, index) => {
          const isChecked = Boolean(checkedItems[index]);
          return (
            <li key={label}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggleItem(index)}
                className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
                  isChecked
                    ? 'border-[#1E3A5F] bg-[#F8F5EE] text-[#13243C]'
                    : 'border-[#E5DEC9] bg-[#FFFCF7] text-[#33465F] hover:border-[#DE546A]'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="h-5 w-5 shrink-0 text-[#B8354B]" aria-hidden="true" />
                ) : (
                  <Square className="h-5 w-5 shrink-0 text-[#7A8799]" aria-hidden="true" />
                )}
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Completion State Banner */}
      {allCompleted && (
        <div className="mt-6 rounded-xl border border-[#1E3A5F]/25 bg-[#F8F5EE] p-6">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#B8354B]" aria-hidden="true" />
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-[#13243C]">
                You&apos;re Ready for Winter Camp!
              </h3>
              <p className="text-sm leading-relaxed text-[#33465F]">
                Great work! Your software environment is prepared.
              </p>
              <p className="text-sm leading-relaxed text-[#33465F]">
                The Winter Camp officially begins on December 5, 2026. Keep your installation
                guides bookmarked, as you may need to refer to them during the camp.
              </p>
              <p className="text-sm font-semibold text-[#B8354B]">See you in Week 1!</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
