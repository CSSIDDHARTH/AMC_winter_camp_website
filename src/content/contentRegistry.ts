import { WeekId } from '../config/campConfig';
import { ReleasedWeekContent } from './types';

/**
 * Content registry for released weeks.
 *
 * Unreleased weeks intentionally resolve to null so no confidential tasks,
 * instructions, assets, or submission URLs are bundled into production builds.
 * When releasing a week, import its Markdown/content module here and flip
 * `released: true` in `src/config/campConfig.ts`.
 */
const weekContentRegistry: Partial<Record<WeekId, ReleasedWeekContent>> = {};

export function getWeekContent(weekId: WeekId): ReleasedWeekContent | null {
  return weekContentRegistry[weekId] ?? null;
}
