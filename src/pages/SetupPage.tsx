import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Check, Info } from 'lucide-react';
import { campConfig } from '../config/campConfig';
import { INSTALLATION_GUIDES } from '../config/setupGuides';
import { LockedWeekPage } from '../components/LockedWeekPage';
import { StatusBadge } from '../components/StatusBadge';
import { SetupStep } from '../components/setup/SetupStep';
import { InstallationGuideLink } from '../components/setup/InstallationGuideLink';
import { OperatingSystemSelector } from '../components/setup/OperatingSystemSelector';
import { VerificationCheckpoint } from '../components/setup/VerificationCheckpoint';
import {
  FINAL_CHECKLIST_ITEMS,
  SetupChecklist,
} from '../components/setup/SetupChecklist';
import { TroubleshootingSection } from '../components/setup/TroubleshootingSection';

const STEP_STORAGE_KEY = 'amc_wc2026_setup_steps_v1';
const CHECKLIST_STORAGE_KEY = 'amc_wc2026_setup_checklist_v1';

interface StepVerificationState {
  cad: boolean;
  ubuntu: boolean;
  ros2: boolean;
}

const DEFAULT_STEP_STATE: StepVerificationState = {
  cad: false,
  ubuntu: false,
  ros2: false,
};

const DEFAULT_CHECKLIST_STATE: boolean[] = FINAL_CHECKLIST_ITEMS.map(() => false);

const TOC_ITEMS = [
  { id: 'before-you-begin', label: 'Before You Begin' },
  { id: 'cad-installation', label: 'CAD Installation' },
  { id: 'ubuntu-setup', label: 'Ubuntu Setup' },
  { id: 'ros2-installation', label: 'ROS 2 Installation' },
  { id: 'final-checklist', label: 'Final Checklist' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
] as const;

const BEFORE_YOU_BEGIN_ITEMS = [
  'Use a laptop or desktop computer for the installation process.',
  'Ensure you have a stable internet connection.',
  'Keep your laptop connected to a charger during lengthy installations.',
  'Make sure you have sufficient free storage space.',
  'Save your work and back up important files before making changes to your operating system.',
  'Read the complete installation guide before starting each major procedure.',
  'Follow the instructions for your operating system.',
  'Do not rush through disk partitioning, BIOS settings, or operating system installation.',
];

const CAD_STEPS = [
  'Open the CAD installation guide using the button below.',
  'Read the system requirements and installation instructions.',
  'Try installing SolidWorks if your computer supports it and you have appropriate access.',
  'If SolidWorks is not suitable for your system, follow the Fusion 360 instructions instead.',
  'Launch your chosen CAD software.',
  'Create a simple sketch or basic 3D model to verify that the software works.',
];

const ROS2_STEPS = [
  'Start your Ubuntu 22.04 environment.',
  'Open the ROS 2 installation guide.',
  'Follow the installation instructions in the exact order provided.',
  'Install ROS 2 Humble and the required dependencies.',
  'Install the Gazebo version specified in the guide.',
  'Configure your ROS environment.',
  'Complete the verification commands.',
  'Confirm that the required ROS 2 examples and simulator launch successfully.',
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function SetupPage() {
  const { preCamp } = campConfig;

  const [stepVerified, setStepVerified] = useState<StepVerificationState>(() =>
    loadFromStorage(STEP_STORAGE_KEY, DEFAULT_STEP_STATE)
  );
  const [checklist, setChecklist] = useState<boolean[]>(() => {
    const saved = loadFromStorage<boolean[]>(CHECKLIST_STORAGE_KEY, DEFAULT_CHECKLIST_STATE);
    return Array.isArray(saved) && saved.length === FINAL_CHECKLIST_ITEMS.length
      ? saved
      : DEFAULT_CHECKLIST_STATE;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STEP_STORAGE_KEY, JSON.stringify(stepVerified));
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, [stepVerified]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checklist));
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, [checklist]);

  if (!preCamp.released) {
    return <LockedWeekPage preCamp={preCamp} />;
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleChecklistItem = (idx: number) => {
    setChecklist((prev) => prev.map((item, i) => (i === idx ? !item : item)));
  };

  const resetChecklist = () => {
    setChecklist(DEFAULT_CHECKLIST_STATE);
    try {
      window.localStorage.removeItem(CHECKLIST_STORAGE_KEY);
    } catch {
      // Ignore storage removal errors
    }
  };

  const stageProgress = [
    { key: 'cad' as const, num: '01', label: 'CAD', targetId: 'cad-installation' },
    { key: 'ubuntu' as const, num: '02', label: 'Ubuntu 22.04', targetId: 'ubuntu-setup' },
    { key: 'ros2' as const, num: '03', label: 'ROS 2 & Gazebo', targetId: 'ros2-installation' },
  ];

  const completedStages = stageProgress.filter((s) => stepVerified[s.key]).length;

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-[#F8F5EE]">
      {/* 1. Welcome & Introduction Header */}
      <div className="border-b border-[#E5DEC9] bg-[#FFFCF7]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#5A6C84] transition-colors hover:text-[#B8354B]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs font-semibold tracking-wide text-[#B8354B]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Setup Deadline: December 4, 2026</span>
                </span>
                <span aria-hidden="true" className="text-[#C8BFA8]">·</span>
                <span className="text-[#5A6C84]">{preCamp.subtitle}</span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-[-0.025em] text-[#13243C] sm:text-4xl">
                Pre-Camp <span className="text-[#B8354B]">Setup</span>
              </h1>

              <div
                aria-hidden="true"
                className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[#DE546A] to-[#1E3A5F]"
              />
            </div>

            <StatusBadge released={preCamp.released} />
          </div>

          <div className="mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-[#33465F] sm:text-base">
            <p className="font-semibold text-[#13243C]">
              Welcome to the AMC Winter Camp 2026!
            </p>
            <p>
              Before we begin our three-week journey into CAD, robotics, and UAV engineering, we
              need to make sure your computer is ready.
            </p>
            <p>
              This page will guide you through installing the software required for the camp. You
              do not need prior experience with these tools.
            </p>
            <p>
              We have prepared detailed installation guides for each step. Follow them carefully,
              complete the verification checks, and make sure your software is working before
              proceeding.
            </p>
            <p className="font-medium text-[#13243C]">
              The official Winter Camp begins on December 5, 2026. Please complete your setup by
              December 4.
            </p>
          </div>

          {/* Compact 3-Stage Progress Indicator + Internal Table of Contents */}
          <div className="mt-8 space-y-4 border-t border-[#EFE9DC] pt-6">
            <div className="flex flex-col gap-3 rounded-xl border border-[#E5DEC9] bg-[#F8F5EE] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {stageProgress.map((stage, idx) => {
                  const isDone = stepVerified[stage.key];
                  return (
                    <div key={stage.key} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => scrollToSection(stage.targetId)}
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
                          isDone
                            ? 'border-[#1E3A5F] bg-[#1E3A5F] text-[#FFFCF7]'
                            : 'border-[#E5DEC9] bg-[#FFFCF7] text-[#33465F] hover:border-[#DE546A] hover:text-[#B8354B]'
                        }`}
                      >
                        {isDone ? (
                          <Check className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <span className="font-mono text-[#B8354B]">{stage.num}</span>
                        )}
                        <span>{stage.label}</span>
                      </button>
                      {idx < stageProgress.length - 1 && (
                        <span aria-hidden="true" className="text-xs text-[#9DB0C7]">
                          →
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <span className="font-mono text-xs font-semibold text-[#1E3A5F] tabular-nums shrink-0">
                {completedStages} of 3 stages verified
              </span>
            </div>

            {/* Table of Contents */}
            <nav aria-label="Setup page table of contents" className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[11px] font-semibold text-[#5A6C84] uppercase">
                Jump to:
              </span>
              {TOC_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-md border border-[#E5DEC9] bg-[#FFFCF7] px-3 py-1.5 text-xs font-medium text-[#33465F] transition-colors hover:border-[#DE546A] hover:bg-[#FDF1F3] hover:text-[#B8354B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        {/* Before You Begin */}
        <section
          id="before-you-begin"
          className="scroll-mt-24 rounded-2xl border border-[#E5DEC9] bg-[#FFFCF7] p-6 shadow-xs sm:p-8"
        >
          <div className="space-y-2 border-b border-[#EFE9DC] pb-4">
            <p className="font-mono text-xs font-semibold tracking-wider text-[#B8354B]">
              PREPARATION GUIDELINES
            </p>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#13243C] sm:text-3xl">
              Before You <span className="text-[#B8354B]">Begin</span>
            </h2>
            <p className="text-sm text-[#4B5E77]">Please keep the following in mind:</p>
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BEFORE_YOU_BEGIN_ITEMS.map((item, idx) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#E5DEC9] bg-[#F8F5EE] p-4"
              >
                <span className="mt-0.5 font-mono text-xs font-semibold text-[#B8354B] tabular-nums shrink-0">
                  0{idx + 1}.
                </span>
                <span className="text-sm leading-relaxed text-[#33465F]">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#E5DEC9] bg-[#F8F5EE] px-4 py-3.5 text-sm text-[#33465F]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1E3A5F]" aria-hidden="true" />
            <p>
              <strong className="font-semibold text-[#13243C]">Important:</strong> The
              installation guides are hosted on the official AMC GitHub repository. Each guide opens
              in a new tab so you can keep this checklist open while following the instructions.
            </p>
          </div>
        </section>

        {/* Vertical Step-by-Step Progression: 01 -> 02 -> 03 */}
        <div className="space-y-10">
          {/* Step 1 — CAD Software Installation */}
          <SetupStep
            id="cad-installation"
            stepNumber="01"
            heading="Install Your CAD Software"
            subheading="Computer-Aided Design (CAD)"
            completed={stepVerified.cad}
          >
            <div className="space-y-3 text-sm leading-relaxed text-[#33465F] sm:text-base">
              <p>
                CAD software allows engineers to create precise 3D models of mechanical components
                and assemblies.
              </p>
              <p>
                During Week 1, you will use CAD tools to understand engineering design and develop
                practical modelling skills.
              </p>
              <p>
                We highly recommend installing SolidWorks as your primary CAD software. If
                SolidWorks is unavailable, incompatible with your computer, or cannot be installed
                successfully, you may use Fusion 360 as an alternative.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-[#13243C]">
                What you need to do
              </h3>
              <ol className="space-y-2 text-sm leading-relaxed text-[#33465F]">
                {CAD_STEPS.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-xs font-semibold text-[#B8354B] tabular-nums shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[#F3C5CE] bg-[#FDF1F3] px-4 py-3.5 text-sm text-[#33465F]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#B8354B]" aria-hidden="true" />
              <p>
                SolidWorks is primarily intended for Windows. macOS users should follow the
                guide&apos;s alternative software instructions. Do not attempt to install
                unsupported software configurations.
              </p>
            </div>

            <div className="space-y-2.5">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#5A6C84] uppercase">
                Installation Guide
              </p>
              <div>
                <InstallationGuideLink
                  label={INSTALLATION_GUIDES.solidworksFusion360.label}
                  url={INSTALLATION_GUIDES.solidworksFusion360.url}
                />
              </div>
            </div>

            <VerificationCheckpoint
              title="CAD Setup Complete When:"
              criteria="You can open SolidWorks or Fusion 360, create a new design, draw a simple sketch, and save your work without errors."
              checkboxLabel="I have installed and tested my CAD software."
              checked={stepVerified.cad}
              onToggle={() =>
                setStepVerified((prev) => ({ ...prev, cad: !prev.cad }))
              }
            />
          </SetupStep>

          {/* Step 2 — Ubuntu 22.04 LTS Setup */}
          <SetupStep
            id="ubuntu-setup"
            stepNumber="02"
            heading="Prepare Your Linux Environment"
            subheading="Ubuntu 22.04 LTS"
            completed={stepVerified.ubuntu}
          >
            <div className="space-y-3 text-sm leading-relaxed text-[#33465F] sm:text-base">
              <p>
                ROS 2 is commonly developed and used in Linux environments. For this Winter Camp, we
                will use Ubuntu 22.04 LTS as the reference operating system for our ROS 2 learning
                activities.
              </p>
              <p>
                If you currently use Windows or macOS, follow the appropriate guide below to prepare
                a compatible Ubuntu environment.
              </p>
              <p className="font-medium text-[#13243C]">
                Choose the instructions based on your computer&apos;s operating system. Do not
                follow both guides.
              </p>
            </div>

            <OperatingSystemSelector />

            <VerificationCheckpoint
              title="Ubuntu Setup Complete When:"
              criteria="You can start your Ubuntu 22.04 environment, open a terminal, and successfully run basic Linux commands."
              command="lsb_release -a"
              commandExplanation="This command displays information about your Linux distribution. Confirm that your environment reports Ubuntu 22.04."
              checkboxLabel="My Ubuntu 22.04 environment is ready."
              checked={stepVerified.ubuntu}
              onToggle={() =>
                setStepVerified((prev) => ({ ...prev, ubuntu: !prev.ubuntu }))
              }
            />
          </SetupStep>

          {/* Step 3 — ROS 2 Installation */}
          <SetupStep
            id="ros2-installation"
            stepNumber="03"
            heading="Install ROS 2 and Simulation Tools"
            subheading="ROS 2 Humble and Gazebo"
            completed={stepVerified.ros2}
            isLast
          >
            <div className="space-y-3 text-sm leading-relaxed text-[#33465F] sm:text-base">
              <p>
                Robot Operating System 2 (ROS 2) is a framework used to develop robotics software.
              </p>
              <p>
                During Week 2, you will learn how robots communicate through ROS 2 nodes, topics,
                and messages, and how robotic systems can be tested using simulation.
              </p>
              <p>
                Once your Ubuntu environment is ready, the next step is to install ROS 2 and the
                required simulation tools.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-[#13243C]">
                What you need to do
              </h3>
              <ol className="space-y-2 text-sm leading-relaxed text-[#33465F]">
                {ROS2_STEPS.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-xs font-semibold text-[#B8354B] tabular-nums shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-2.5">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#5A6C84] uppercase">
                Installation Guide
              </p>
              <div>
                <InstallationGuideLink
                  label={INSTALLATION_GUIDES.ros2.label}
                  url={INSTALLATION_GUIDES.ros2.url}
                />
              </div>
            </div>

            <VerificationCheckpoint
              title="ROS 2 Setup Complete When:"
              criteria={
                'You can open a terminal, access the ROS 2 command-line tools, and successfully run the verification examples provided in the installation guide.\n\nYou should also be able to launch the simulator using the method specified in the guide.'
              }
              command="ros2 --help"
              commandExplanation="If ROS 2 has been installed and the environment is configured correctly, this command should display the available ROS 2 command-line options."
              commandCaveat="Note: This command alone does not verify the complete ROS and Gazebo setup."
              checkboxLabel="I have installed ROS 2 and verified the required simulation tools."
              checked={stepVerified.ros2}
              onToggle={() =>
                setStepVerified((prev) => ({ ...prev, ros2: !prev.ros2 }))
              }
            />
          </SetupStep>
        </div>

        {/* 5. Final Installation Checklist */}
        <SetupChecklist
          checkedItems={checklist}
          onToggleItem={toggleChecklistItem}
          onReset={resetChecklist}
        />

        {/* 6. Troubleshooting and Help */}
        <TroubleshootingSection />
      </div>
    </div>
  );
}
