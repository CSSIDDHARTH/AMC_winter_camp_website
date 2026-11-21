import { useState } from 'react';
import { AlertTriangle, Apple, Laptop } from 'lucide-react';
import { INSTALLATION_GUIDES } from '../../config/setupGuides';
import { InstallationGuideLink } from './InstallationGuideLink';

type OsChoice = 'windows' | 'macos';

const WARNING_POINTS = [
  'Back up your important data.',
  'Follow the instructions for your specific computer.',
  'Do not delete or format partitions unless you are certain of their purpose.',
  'Be especially careful with encryption, recovery settings, and bootloader changes.',
  'Ask for help if you are unsure about a step.',
];

export function OperatingSystemSelector() {
  const [selectedOs, setSelectedOs] = useState<OsChoice>('windows');

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-[#13243C]">
            Operating System Selection
          </h3>

          <div
            role="tablist"
            aria-label="Choose your computer operating system"
            className="inline-flex rounded-lg border border-[#E5DEC9] bg-[#F8F5EE] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedOs === 'windows'}
              onClick={() => setSelectedOs('windows')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
                selectedOs === 'windows'
                  ? 'bg-[#1E3A5F] text-[#FFFCF7]'
                  : 'text-[#4B5E77] hover:text-[#13243C]'
              }`}
            >
              Windows Laptop / PC
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedOs === 'macos'}
              onClick={() => setSelectedOs('macos')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
                selectedOs === 'macos'
                  ? 'bg-[#1E3A5F] text-[#FFFCF7]'
                  : 'text-[#4B5E77] hover:text-[#13243C]'
              }`}
            >
              MacBook / macOS
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Windows Laptop / PC Card */}
          <div
            onClick={() => setSelectedOs('windows')}
            className={`flex flex-col justify-between rounded-xl border p-5 transition-colors cursor-pointer ${
              selectedOs === 'windows'
                ? 'border-[#DE546A] bg-[#FDF1F3]/45'
                : 'border-[#E5DEC9] bg-[#F8F5EE]/70 opacity-85 hover:opacity-100'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DEC9] bg-[#FFFCF7] text-[#1E3A5F]">
                    <Laptop className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h4 className="font-display text-base font-bold text-[#13243C]">
                    Windows Laptop / PC
                  </h4>
                </div>
                {selectedOs === 'windows' && (
                  <span className="font-mono text-[11px] font-semibold text-[#B8354B]">
                    Selected
                  </span>
                )}
              </div>

              <div className="space-y-2.5 text-sm leading-relaxed text-[#33465F]">
                <p>
                  If your laptop currently runs Windows, follow our Windows-to-Ubuntu installation
                  guide.
                </p>
                <p>
                  The guide explains how to prepare your computer for Ubuntu 22.04, including
                  dual-boot considerations and the necessary precautions.
                </p>
                <p>
                  Dual booting allows you to keep Windows while installing Ubuntu separately, but
                  modifying disk partitions involves risk. Back up important files before
                  proceeding.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E5DEC9]">
              <InstallationGuideLink
                label={INSTALLATION_GUIDES.ubuntuWindows.label}
                url={INSTALLATION_GUIDES.ubuntuWindows.url}
                variant={selectedOs === 'windows' ? 'primary' : 'secondary'}
              />
            </div>
          </div>

          {/* MacBook / macOS Card */}
          <div
            onClick={() => setSelectedOs('macos')}
            className={`flex flex-col justify-between rounded-xl border p-5 transition-colors cursor-pointer ${
              selectedOs === 'macos'
                ? 'border-[#DE546A] bg-[#FDF1F3]/45'
                : 'border-[#E5DEC9] bg-[#F8F5EE]/70 opacity-85 hover:opacity-100'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DEC9] bg-[#FFFCF7] text-[#1E3A5F]">
                    <Apple className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h4 className="font-display text-base font-bold text-[#13243C]">
                    MacBook / macOS
                  </h4>
                </div>
                {selectedOs === 'macos' && (
                  <span className="font-mono text-[11px] font-semibold text-[#B8354B]">
                    Selected
                  </span>
                )}
              </div>

              <div className="space-y-2.5 text-sm leading-relaxed text-[#33465F]">
                <p>If you use a MacBook, follow the dedicated macOS guide.</p>
                <p>
                  Ubuntu installation methods differ depending on whether your Mac uses an Intel
                  processor or Apple Silicon.
                </p>
                <p>
                  Identify your Mac&apos;s processor before proceeding, and follow only the method
                  supported by your hardware and the guide.
                </p>
              </div>

              <p className="rounded-lg border border-[#E5DEC9] bg-[#FFFCF7] px-3.5 py-2.5 text-xs leading-relaxed text-[#4B5E77]">
                To check your Mac&apos;s processor, open{' '}
                <span className="font-semibold text-[#13243C]">
                  Apple Menu → About This Mac
                </span>
                . Look for the Chip or Processor information.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E5DEC9]">
              <InstallationGuideLink
                label={INSTALLATION_GUIDES.ubuntuMac.label}
                url={INSTALLATION_GUIDES.ubuntuMac.url}
                variant={selectedOs === 'macos' ? 'primary' : 'secondary'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Important Warning: Read Before Installing Ubuntu */}
      <div className="rounded-xl border border-[#F3C5CE] bg-[#FDF1F3] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#B8354B]" aria-hidden="true" />
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#13243C]">
              Read Before Installing Ubuntu
            </h4>
            <p className="text-sm leading-relaxed text-[#33465F]">
              Installing or dual-booting an operating system may involve modifying disk partitions
              and boot settings.
            </p>
            <p className="text-sm font-medium text-[#13243C]">Before proceeding:</p>
            <ul className="space-y-1.5 text-sm text-[#33465F] list-disc pl-5">
              {WARNING_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="text-sm font-medium leading-relaxed text-[#B8354B]">
              Never proceed with an unfamiliar disk operation simply to finish the installation
              quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
