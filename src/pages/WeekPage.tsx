import { useParams } from 'react-router-dom';
import { campConfig, isValidWeekId, WeekId, WeekSection } from '../config/campConfig';
import { getWeekContent } from '../content/contentRegistry';
import { LockedWeekPage } from '../components/LockedWeekPage';
import { WeekLayout } from '../components/WeekLayout';
import { NotFoundPage } from './NotFoundPage';

interface WeekPageProps {
  section?: WeekSection;
}

export function WeekPage({ section = 'instructions' }: WeekPageProps) {
  const { weekId } = useParams<{ weekId: string }>();

  if (!isValidWeekId(weekId)) {
    return <NotFoundPage />;
  }

  const id = Number(weekId) as WeekId;
  const week = campConfig.weeks[id];

  if (!week.released) {
    return <LockedWeekPage week={week} requestedSection={section} />;
  }

  const content = getWeekContent(id);
  return <WeekLayout week={week} section={section} content={content} />;
}
