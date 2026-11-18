import { WeekId } from '../config/campConfig';

export interface DownloadableResource {
  label: string;
  description?: string;
  href: string;
  fileType?: string;
}

export interface EmbeddedVideo {
  title: string;
  embedUrl: string;
  caption?: string;
}

export interface WeekInstructionsContent {
  overviewMarkdown: string;
  prerequisitesMarkdown: string;
  softwareInstallationMarkdown: string;
  learningResourcesMarkdown: string;
  proceduresMarkdown: string;
  troubleshootingMarkdown: string;
  downloads?: DownloadableResource[];
  videos?: EmbeddedVideo[];
}

export interface WeekTasksContent {
  objectivesMarkdown: string;
  problemStatementsMarkdown: string;
  requirementsMarkdown: string;
  expectedOutputsMarkdown: string;
  evaluationCriteriaMarkdown: string;
  downloads?: DownloadableResource[];
}

export interface WeekSubmissionContent {
  guidelinesMarkdown: string;
  requiredDeliverables: string[];
  deadlineText: string;
  formUrl: string;
  notesMarkdown?: string;
}

export interface ReleasedWeekContent {
  weekId: WeekId;
  instructions: WeekInstructionsContent;
  tasks: WeekTasksContent;
  submission: WeekSubmissionContent;
}

export interface LeaderboardEntry {
  rank: number;
  participantName: string;
  identifier?: string;
  weekScores: Partial<Record<WeekId, number>>;
  totalScore: number;
}
