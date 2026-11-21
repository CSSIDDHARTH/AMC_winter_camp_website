export type WeekId = 1 | 2 | 3;

export type WeekSection = 'instructions' | 'tasks' | 'submission';

export interface PreCampConfig {
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  shortDateLabel: string;
  released: boolean;
}

export interface WeekConfig {
  id: WeekId;
  title: string;
  shortTitle: string;
  releaseDate: string;
  endDate: string;
  dateRange: string;
  released: boolean;
  roadmapTitle: string;
  description: string;
}

export interface CampSchedule {
  campTitle: string;
  campTagline: string;
  campDateRange: string;
  campDurationLabel: string;
  preCampHeroNote: string;
  footerLabel: string;
}

export interface CampConfig {
  preCamp: PreCampConfig;
  weeks: Record<WeekId, WeekConfig>;
  leaderboardReleased: boolean;
}

export const campSchedule: CampSchedule = {
  campTitle: 'AMC WINTER CAMP 2026',
  campTagline: 'Your First Flight Into Innovation.',
  campDateRange: 'December 5–25, 2026',
  campDurationLabel: '21 days',
  preCampHeroNote: 'Pre-Camp Setup · Complete by December 4',
  footerLabel: 'AMC Winter Camp 2026 (December 5–25, 2026)',
};

export const campConfig: CampConfig = {
  preCamp: {
    title: 'Pre-Camp Setup',
    subtitle: 'Get Ready for Your First Flight',
    description:
      'Before the Winter Camp officially begins, participants are expected to install and configure the required software. This two-day preparation phase ensures that everyone is ready to begin the hands-on learning modules from December 5.',
    startDate: '2026-12-03',
    endDate: '2026-12-04',
    dateLabel: 'December 3–4, 2026',
    shortDateLabel: 'Complete by Dec 4',
    released: true,
  },
  weeks: {
    1: {
      id: 1,
      title: 'Computer-Aided Design',
      shortTitle: 'CAD',
      releaseDate: '2026-12-05',
      endDate: '2026-12-11',
      dateRange: 'December 5–11, 2026',
      released: false,
      roadmapTitle: 'Week 1 — Computer-Aided Design (CAD)',
      description:
        'Introduction to 3D modelling, parametric design, mechanical components and assemblies.',
    },
    2: {
      id: 2,
      title: 'ROS 2',
      shortTitle: 'ROS 2',
      releaseDate: '2026-12-12',
      endDate: '2026-12-18',
      dateRange: 'December 12–18, 2026',
      released: false,
      roadmapTitle: 'Week 2 — ROS 2',
      description:
        'Introduction to robotics software, ROS nodes, topics, communication, simulation and control.',
    },
    3: {
      id: 3,
      title: 'Component Selection',
      shortTitle: 'Component Selection',
      releaseDate: '2026-12-19',
      endDate: '2026-12-25',
      dateRange: 'December 19–25, 2026',
      released: false,
      roadmapTitle: 'Week 3 — Component Selection',
      description:
        'Understanding and selecting engineering components, with a focus on UAV systems, component compatibility and design trade-offs.',
    },
  },
  leaderboardReleased: false,
};

export const WEEK_IDS: WeekId[] = [1, 2, 3];

export function isValidWeekId(value: string | undefined): value is `${WeekId}` {
  return value === '1' || value === '2' || value === '3';
}
