import { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import { COLORS } from '@/lib/constants/colors';
import { getDJs } from '@/lib/graphql';
import PageHero from '@/components/ui/PageHero';
import DJGrid from './_components/DJGrid';
import DJGreaseSection from './_components/DJGreaseSection';

export const metadata: Metadata = {
  title: `Our DJs — ${SITE.shortName}`,
  description:
    'Meet the resident and guest DJs who keep the music going at the Skater\'s Circle in Central Park every Sunday.',
};

export default async function DJsPage() {
  const djs = await getDJs();

  return (
    <div className="flex flex-col gap-6 items-center pt-6">
      {/* Purple title — matches About page, per Figma */}
      <PageHero title="OUR DJS" color={COLORS.brand.purple} />
      <DJGrid djs={djs} />
      <DJGreaseSection />
    </div>
  );
}
