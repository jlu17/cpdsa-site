import { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import PageHero from '@/components/ui/PageHero';
import TabSwitcher from './_components/TabSwitcher';

export const metadata: Metadata = {
  title: `The Skate Circle — ${SITE.shortName}`,
  description:
    'Guidelines, directions, and everything you need to know before visiting the Skater\'s Circle in Central Park.',
};

export default function SkateCirclePage() {
  return (
    <div className="flex flex-col gap-6 items-center pt-6">
      <PageHero title="THE SKATE CIRCLE" />
      <TabSwitcher />
    </div>
  );
}
