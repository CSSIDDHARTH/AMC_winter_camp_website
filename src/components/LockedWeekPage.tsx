import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Lock } from 'lucide-react';
import { WeekConfig, WeekSection } from '../config/campConfig';
import { StatusBadge } from './StatusBadge';

interface LockedWeekPageProps {
  week: WeekConfig;
  requestedSection?: WeekSection;
}

const SECTION_LABELS: Record<WeekSection, string> = {
  instructions: 'Instructions',
  tasks: 'Tasks',
  submission: 'Submission',
};

export function LockedWeekPage({ week, requestedSection }: LockedWeekPageProps) {
  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-[#F8F5EE] px-4 py-16 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl rounded-2xl border border-[#E5DEC9] bg-[#FFFCF7] p-8 text-center shadow-xs sm:p-12"
      >
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-wider text-[#1E3A5F]">
            WEEK 0{week.id} — {week.title.toUpperCase()}
          </span>
          {requestedSection && (
            <>
              <span aria-hidden="true" className="text-[#D4CCB8]">·</span>
              <span className="font-mono text-xs text-[#5A6C84]">
                {SECTION_LABELS[requestedSection]}
              </span>
            </>
          )}
        </div>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-[#F3C5CE] bg-[#FDF1F3]">
          <Lock className="h-8 w-8 text-[#B8354B]" aria-hidden="true" />
        </div>

        <div className="mb-4 flex justify-center">
          <StatusBadge released={false} />
        </div>

        <h1 className="font-display text-3xl font-extrabold tracking-[-0.025em] text-[#13243C] sm:text-4xl text-balance">
          Not Released <span className="text-[#B8354B]">Yet</span>
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#4B5E77] sm:text-base">
          The instructions, tasks, and submission details for this week have not been released yet.
          Stay tuned for the official announcement.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1E3A5F] px-5 py-2.5 text-sm font-semibold text-[#FFFCF7] transition-colors hover:bg-[#B8354B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
