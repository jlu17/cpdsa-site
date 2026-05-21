import { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import { getEvents } from '@/lib/graphql';
import PageHero from '@/components/ui/PageHero';
import ThisWeekSection from './_components/ThisWeekSection';
import UpcomingSection from './_components/UpcomingSection';
import { splitEvents } from './_components/scheduleUtils';

export const metadata: Metadata = {
  title: `Schedule — ${SITE.shortName}`,
  description: 'See who\'s spinning at the Skater\'s Circle in Central Park this week and all season long.',
};

export default async function SchedulePage() {
  const events = await getEvents();
  const { thisWeek, upcoming } = splitEvents(events);

  return (
    <div className="flex flex-col gap-6 items-center pt-6 w-full">
      <PageHero title="SCHEDULE" />
      <div className="flex flex-col w-full gap-4">
        <ThisWeekSection events={thisWeek} />
        <UpcomingSection events={upcoming} />
      </div>
    </div>
  );
}
