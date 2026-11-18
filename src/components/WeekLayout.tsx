import { Link, NavLink } from 'react-router-dom';
import { ArrowLeft, BookOpen, ClipboardList, Send } from 'lucide-react';
import { WeekConfig, WeekSection } from '../config/campConfig';
import { StatusBadge } from './StatusBadge';
import { ReleasedWeekContent } from '../content/types';
import { InstructionsPage } from './InstructionsPage';
import { TaskPage } from './TaskPage';
import { SubmissionPage } from './SubmissionPage';

interface WeekLayoutProps {
  week: WeekConfig;
  section: WeekSection;
  content: ReleasedWeekContent | null;
}

const TABS: { key: WeekSection; label: string; icon: typeof BookOpen }[] = [
  { key: 'instructions', label: 'Instructions', icon: BookOpen },
  { key: 'tasks', label: 'Tasks', icon: ClipboardList },
  { key: 'submission', label: 'Submission', icon: Send },
];

export function WeekLayout({ week, section, content }: WeekLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-12rem)] bg-[#F8F5EE]">
      <div className="border-b border-[#E5DEC9] bg-[#FFFCF7]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#5A6C84] transition-colors hover:text-[#B8354B]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#B8354B]">
                WEEK 0{week.id}
              </p>
              <h1 className="font-display text-3xl font-extrabold tracking-[-0.025em] text-[#13243C] sm:text-4xl">
                {week.title}
              </h1>
              <p className="max-w-2xl text-sm text-[#4B5E77]">{week.description}</p>
            </div>
            <StatusBadge released={week.released} />
          </div>

          <nav aria-label={`Week ${week.id} sections`} className="mt-8 flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.key}
                  to={`/week/${week.id}/${tab.key}`}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'border-[#F3C5CE] bg-[#FDF1F3] text-[#B8354B]'
                        : 'border-[#E5DEC9] bg-[#FFFCF7] text-[#4B5E77] hover:border-[#DE546A]/60 hover:text-[#13243C]'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{tab.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {section === 'instructions' && <InstructionsPage content={content?.instructions ?? null} />}
        {section === 'tasks' && <TaskPage content={content?.tasks ?? null} />}
        {section === 'submission' && <SubmissionPage content={content?.submission ?? null} />}
      </div>
    </div>
  );
}
