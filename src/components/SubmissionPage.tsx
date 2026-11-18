import { CalendarClock, ExternalLink } from 'lucide-react';
import { WeekSubmissionContent } from '../content/types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface SubmissionPageProps {
  content: WeekSubmissionContent | null;
}

export function SubmissionPage({ content }: SubmissionPageProps) {
  if (!content) {
    return (
      <div className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-8 text-center">
        <p className="text-sm text-[#4B5E77]">
          Submission details have not been published yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8">
        <h2 className="font-display mb-4 border-b border-[#E5DEC9] pb-3 text-xl font-semibold text-[#13243C]">
          Submission Guidelines
        </h2>
        <MarkdownRenderer content={content.guidelinesMarkdown} />
      </section>

      <section className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8">
        <h2 className="font-display mb-4 border-b border-[#E5DEC9] pb-3 text-xl font-semibold text-[#13243C]">
          Required Deliverables
        </h2>
        <ul className="space-y-3">
          {content.requiredDeliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-[#33465F] sm:text-base">
              <span className="mt-0.5 font-mono text-xs font-semibold text-[#B8354B] tabular-nums">
                0{idx + 1}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#B8354B]">
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
              <span>SUBMISSION DEADLINE</span>
            </div>
            <p className="text-base font-medium text-[#13243C]">{content.deadlineText}</p>
          </div>

          <a
            href={content.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1E3A5F] px-6 py-3 text-sm font-semibold text-[#FFFCF7] transition-colors hover:bg-[#B8354B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
          >
            <span>Open Submission Form</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {content.notesMarkdown && (
          <div className="mt-6 border-t border-[#E5DEC9] pt-5">
            <MarkdownRenderer content={content.notesMarkdown} />
          </div>
        )}
      </section>
    </div>
  );
}
