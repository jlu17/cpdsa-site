import { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import { getEvents, getDJs } from '@/lib/graphql';
import PageHero from '@/components/ui/PageHero';
import ScheduleWithDrawer from './_components/ScheduleWithDrawer';
import { splitEvents } from './_components/scheduleUtils';
import { COLORS } from '@/lib/constants/colors';

export const metadata: Metadata = {
  title: `Schedule — ${SITE.shortName}`,
  description: 'See who\'s spinning at the Skater\'s Circle in Central Park this week and all season long.',
};

export default async function SchedulePage() {
  const [events, djs] = await Promise.all([getEvents(), getDJs()]);
  const { thisWeek, upcoming } = splitEvents(events);

  return (
    <div className="flex flex-col gap-6 items-center pt-6 w-full">
      <ScheduleWithDrawer thisWeek={thisWeek} upcoming={upcoming} djs={djs} />
    </div>
  );
}
