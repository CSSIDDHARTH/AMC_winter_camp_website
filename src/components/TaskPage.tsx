import { Download } from 'lucide-react';
import { WeekTasksContent } from '../content/types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface TaskPageProps {
  content: WeekTasksContent | null;
}

export function TaskPage({ content }: TaskPageProps) {
  if (!content) {
    return (
      <div className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-8 text-center">
        <p className="text-sm text-[#4B5E77]">
          Tasks content module has not been published yet.
        </p>
      </div>
    );
  }

  const sections = [
    { id: 'objectives', title: 'Task Objectives', body: content.objectivesMarkdown },
    { id: 'problem-statements', title: 'Problem Statements', body: content.problemStatementsMarkdown },
    { id: 'requirements', title: 'Requirements', body: content.requirementsMarkdown },
    { id: 'expected-outputs', title: 'Expected Outputs', body: content.expectedOutputsMarkdown },
    { id: 'evaluation', title: 'Evaluation Criteria', body: content.evaluationCriteriaMarkdown },
  ];

  return (
    <div className="space-y-10">
      {sections.map(
        (sec) =>
          sec.body.trim() !== '' && (
            <section
              key={sec.id}
              id={sec.id}
              className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8"
            >
              <h2 className="font-display mb-4 border-b border-[#E5DEC9] pb-3 text-xl font-semibold text-[#13243C]">
                {sec.title}
              </h2>
              <MarkdownRenderer content={sec.body} />
            </section>
          )
      )}

      {content.downloads && content.downloads.length > 0 && (
        <section className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8">
          <h2 className="font-display mb-4 border-b border-[#E5DEC9] pb-3 text-xl font-semibold text-[#13243C]">
            Task Reference Files
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.downloads.map((res) => (
              <a
                key={res.href}
                href={res.href}
                download
                className="flex items-start justify-between gap-4 rounded-lg border border-[#E5DEC9] bg-[#F8F5EE] p-4 transition-colors hover:border-[#DE546A]"
              >
                <div>
                  <p className="text-sm font-medium text-[#13243C]">{res.label}</p>
                  {res.description && (
                    <p className="mt-1 text-xs text-[#4B5E77]">{res.description}</p>
                  )}
                </div>
                <Download className="h-4 w-4 text-[#1E3A5F] shrink-0 mt-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
