export type WeekId = 1 | 2 | 3;

export type WeekSection = 'instructions' | 'tasks' | 'submission';

export interface WeekConfig {
  id: WeekId;
  title: string;
  shortTitle: string;
  released: boolean;
  roadmapTitle: string;
  description: string;
}

export interface CampConfig {
  weeks: Record<WeekId, WeekConfig>;
  leaderboardReleased: boolean;
}

export const campConfig: CampConfig = {
  weeks: {
    1: {
      id: 1,
      title: 'Computer-Aided Design',
      shortTitle: 'CAD',
      released: false,
      roadmapTitle: 'Week 1 — Computer-Aided Design (CAD)',
      description:
        'Introduction to 3D modelling, parametric design, mechanical components and assemblies.',
    },
    2: {
      id: 2,
      title: 'Robot Operating System',
      shortTitle: 'ROS 2',
      released: false,
      roadmapTitle: 'Week 2 — Robot Operating System (ROS 2)',
      description:
        'Introduction to robotics software, ROS nodes, topics, communication, simulation and control.',
    },
    3: {
      id: 3,
      title: 'Component Selection',
      shortTitle: 'Component Selection',
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
