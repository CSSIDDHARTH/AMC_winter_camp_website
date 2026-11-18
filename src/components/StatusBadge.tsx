import { Lock, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  released: boolean;
  className?: string;
}

export function StatusBadge({ released, className = '' }: StatusBadgeProps) {
  if (released) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded border border-[#1E3A5F]/30 bg-[#1E3A5F]/8 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider text-[#1E3A5F] whitespace-nowrap shrink-0 ${className}`}
      >
        <CheckCircle2 className="h-3.5 w-3.5 text-[#1E3A5F]" aria-hidden="true" />
        <span>RELEASED</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border border-[#DDD4BF] bg-[#F8F5EE] px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider text-[#33465F] whitespace-nowrap shrink-0 ${className}`}
    >
      <Lock className="h-3.5 w-3.5 text-[#B8354B]" aria-hidden="true" />
      <span>NOT RELEASED</span>
    </span>
  );
}
