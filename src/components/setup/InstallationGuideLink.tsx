import { ExternalLink } from 'lucide-react';

interface InstallationGuideLinkProps {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary';
}

export function InstallationGuideLink({
  label,
  url,
  variant = 'primary',
}: InstallationGuideLinkProps) {
  const styles =
    variant === 'primary'
      ? 'bg-[#1E3A5F] text-[#FFFCF7] hover:bg-[#B8354B] shadow-xs'
      : 'border border-[#1E3A5F]/25 bg-[#F8F5EE] text-[#1E3A5F] hover:border-[#DE546A] hover:bg-[#FDF1F3] hover:text-[#B8354B]';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-2 ${styles}`}
    >
      <span>{label}</span>
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
