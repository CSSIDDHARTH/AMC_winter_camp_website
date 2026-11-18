import { Download, PlayCircle } from 'lucide-react';
import { WeekInstructionsContent } from '../content/types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface InstructionsPageProps {
  content: WeekInstructionsContent | null;
}

export function InstructionsPage({ content }: InstructionsPageProps) {
  if (!content) {
    return (
      <div className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-8 text-center">
        <p className="text-sm text-[#4B5E77]">
          Instructions content module has not been published yet.
        </p>
      </div>
    );
  }

  const sections = [
    { id: 'overview', title: 'Overview', body: content.overviewMarkdown },
    { id: 'prerequisites', title: 'Prerequisites', body: content.prerequisitesMarkdown },
    { id: 'installation', title: 'Software Installation', body: content.softwareInstallationMarkdown },
    { id: 'resources', title: 'Learning Resources', body: content.learningResourcesMarkdown },
    { id: 'procedures', title: 'Detailed Step-by-Step Procedures', body: content.proceduresMarkdown },
    { id: 'troubleshooting', title: 'Troubleshooting', body: content.troubleshootingMarkdown },
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

      {content.videos && content.videos.length > 0 && (
        <section className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8">
          <h2 className="font-display mb-4 flex items-center gap-2 border-b border-[#E5DEC9] pb-3 text-xl font-semibold text-[#13243C]">
            <PlayCircle className="h-5 w-5 text-[#DE546A]" aria-hidden="true" />
            <span>Video Walkthroughs</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.videos.map((video) => (
              <div key={video.embedUrl} className="space-y-2">
                <div className="aspect-video overflow-hidden rounded-lg border border-[#E5DEC9] bg-[#F8F5EE]">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-sm font-medium text-[#13243C]">{video.title}</p>
                {video.caption && <p className="text-xs text-[#4B5E77]">{video.caption}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.downloads && content.downloads.length > 0 && (
        <section className="rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8">
          <h2 className="font-display mb-4 border-b border-[#E5DEC9] pb-3 text-xl font-semibold text-[#13243C]">
            Downloadable Resources
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
