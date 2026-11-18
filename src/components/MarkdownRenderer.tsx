import React, { useState } from 'react';
import { Check, Copy, AlertTriangle, Info, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const isTerminal = language === 'bash' || language === 'sh' || language === 'shell' || language === 'zsh';

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-[#E5DEC9] bg-[#13243C]">
      <div className="flex items-center justify-between border-b border-[#1E3A5F] bg-[#0D1A2D] px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#E5DEC9]">
          {isTerminal && <Terminal className="h-3.5 w-3.5 text-[#DE546A]" aria-hidden="true" />}
          <span>{language || 'code'}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded border border-[#2C4B75] bg-[#13243C] px-2.5 py-1 text-xs font-medium text-[#F8F5EE] transition-colors hover:border-[#DE546A] hover:text-[#FDF1F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]"
          aria-label="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#DE546A]" aria-hidden="true" />
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
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-[#F8F5EE]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="rounded border border-[#E5DEC9] bg-[#F8F5EE] px-1.5 py-0.5 font-mono text-[0.85em] text-[#1E3A5F]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-[#13243C]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#B8354B] underline decoration-[#DE546A]/50 underline-offset-4 transition-colors hover:text-[#1E3A5F]"
        >
          {label}
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content.trim()) {
    return null;
  }

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push(<CodeBlock key={`code-${i}`} code={codeLines.join('\n')} language={language} />);
      i++;
      continue;
    }

    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const firstLine = quoteLines[0] || '';
      const isWarning = firstLine.startsWith('[!WARNING]');
      const isNote = firstLine.startsWith('[!NOTE]');
      const bodyLines = isWarning || isNote ? quoteLines.slice(1) : quoteLines;

      blocks.push(
        <div
          key={`callout-${i}`}
          className={`my-5 rounded-lg border p-4 ${
            isWarning
              ? 'border-[#F3C5CE] bg-[#FDF1F3] text-[#5B1825]'
              : 'border-[#1E3A5F]/20 bg-[#F8F5EE] text-[#13243C]'
          }`}
        >
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
            {isWarning ? (
              <>
                <AlertTriangle className="h-4 w-4 text-[#B8354B]" aria-hidden="true" />
                <span className="text-[#B8354B]">Important Warning</span>
              </>
            ) : (
              <>
                <Info className="h-4 w-4 text-[#1E3A5F]" aria-hidden="true" />
                <span className="text-[#1E3A5F]">Technical Note</span>
              </>
            )}
          </div>
          <div className="space-y-1 text-sm leading-relaxed">
            {bodyLines.map((qLine, qIdx) => (
              <p key={qIdx}>{renderInlineFormatting(qLine)}</p>
            ))}
          </div>
        </div>
      );
      continue;
    }

    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      blocks.push(
        <figure key={`img-${i}`} className="my-6 overflow-hidden rounded-lg border border-[#E5DEC9] bg-[#F8F5EE]">
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            className="max-h-[460px] w-full object-contain"
          />
          {alt && (
            <figcaption className="border-t border-[#E5DEC9] px-4 py-2.5 text-xs text-[#4B5E77]">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:-]+\|/.test(lines[i + 1])) {
      const parseRow = (row: string) =>
        row
          .trim()
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((cell) => cell.trim());

      const headers = parseRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        rows.push(parseRow(lines[i]));
        i++;
      }

      blocks.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-lg border border-[#E5DEC9]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5DEC9] bg-[#F8F5EE]">
                {headers.map((h, hIdx) => (
                  <th key={hIdx} className="px-4 py-3 font-semibold text-[#13243C]">
                    {renderInlineFormatting(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9DC] bg-[#FFFCF7]">
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-[#33465F] tabular-nums">
                      {renderInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={`h3-${i}`} className="mt-6 mb-2.5 text-lg font-semibold text-[#13243C]">
          {renderInlineFormatting(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={`h2-${i}`} className="mt-8 mb-3 text-xl font-semibold text-[#13243C]">
          {renderInlineFormatting(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push(
        <h1 key={`h1-${i}`} className="mt-8 mb-4 text-2xl font-bold text-[#13243C]">
          {renderInlineFormatting(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="my-4 list-decimal space-y-2 pl-6 text-[#33465F] leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineFormatting(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="my-4 list-disc space-y-2 pl-6 text-[#33465F] leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    blocks.push(
      <p key={`p-${i}`} className="my-3 text-[#33465F] leading-relaxed">
        {renderInlineFormatting(line)}
      </p>
    );
    i++;
  }

  return <div className="max-w-none">{blocks}</div>;
}
