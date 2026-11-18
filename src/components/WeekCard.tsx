import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WeekConfig } from '../config/campConfig';
import { StatusBadge } from './StatusBadge';
import { WeekSchematic } from './WeekSchematic';

interface WeekCardProps {
  week: WeekConfig;
  waypointLabel?: string;
}

export function WeekCard({ week, waypointLabel }: WeekCardProps) {
  return (
    <Link
      to={`/week/${week.id}`}
      className="group flex h-full flex-col justify-between rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-sm shadow-[#13243C]/5 transition-colors duration-150 hover:border-[#DE546A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#1E3A5F] tabular-nums">
            {waypointLabel && (
              <>
                <span className="text-[#B8354B]">{waypointLabel}</span>
                <span aria-hidden="true" className="text-[#D4CCB8]">·</span>
              </>
            )}
            <span>WEEK 0{week.id}</span>
          </div>
          <StatusBadge released={week.released} />
        </div>

        <div className="mb-5 overflow-hidden rounded-lg border border-[#E5DEC9] bg-[#F8F5EE] p-2">
          <WeekSchematic weekId={week.id} />
        </div>

        <h3 className="font-display text-lg font-semibold text-[#13243C] transition-colors group-hover:text-[#B8354B] sm:text-xl">
          {week.roadmapTitle}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-[#4B5E77]">
          {week.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#EFE9DC] pt-4 text-xs font-semibold text-[#1E3A5F] transition-colors group-hover:text-[#B8354B]">
        <span>{week.released ? 'Open Week Module' : 'View Release Status'}</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
