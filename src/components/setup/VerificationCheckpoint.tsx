import { useState } from 'react';
import { Check, CheckSquare, Copy, Square } from 'lucide-react';

interface VerificationCheckpointProps {
  title: string;
  criteria: string;
  checkboxLabel: string;
  checked: boolean;
  onToggle: () => void;
  command?: string;
  commandExplanation?: string;
  commandCaveat?: string;
}

export function VerificationCheckpoint({
  title,
  criteria,
  checkboxLabel,
  checked,
  onToggle,
  command,
  commandExplanation,
  commandCaveat,
}: VerificationCheckpointProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!command) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#E5DEC9] bg-[#F8F5EE] p-5 sm:p-6">
      <div className="space-y-3">
        <p className="font-mono text-xs font-semibold tracking-wider text-[#1E3A5F] uppercase">
          Verification Check
        </p>
        <h3 className="font-display text-base font-bold text-[#13243C] sm:text-lg">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[#33465F] whitespace-pre-line">
          {criteria}
        </p>

        {command && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-[#243B5C] bg-[#13243C] px-4 py-2.5 text-[#FFFCF7]">
              <code className="font-mono text-xs sm:text-sm text-[#F8F5EE] overflow-x-auto">
                {command}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={`Copy command ${command}`}
                className="inline-flex items-center gap-1.5 rounded border border-[#2B466B] bg-[#1B314F] px-2.5 py-1 font-mono text-[11px] font-medium text-[#F8F5EE] transition-colors hover:border-[#DE546A] hover:text-[#F48B9B] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#F48B9B]" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            {commandExplanation && (
              <p className="text-xs leading-relaxed text-[#4B5E77]">
                {commandExplanation}
              </p>
            )}
            {commandCaveat && (
              <p className="text-xs font-medium text-[#B8354B]">
                {commandCaveat}
              </p>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-[#E5DEC9]">
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={onToggle}
            className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
              checked
                ? 'border-[#1E3A5F] bg-[#FFFCF7] text-[#13243C]'
                : 'border-[#E5DEC9] bg-[#FFFCF7] text-[#33465F] hover:border-[#DE546A]'
            }`}
          >
            {checked ? (
              <CheckSquare className="h-5 w-5 shrink-0 text-[#B8354B]" aria-hidden="true" />
            ) : (
              <Square className="h-5 w-5 shrink-0 text-[#7A8799]" aria-hidden="true" />
            )}
            <span>{checkboxLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
