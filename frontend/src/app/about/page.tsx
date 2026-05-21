import { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import { COLORS } from '@/lib/constants/colors';
import PageHero from '@/components/ui/PageHero';
import AboutTabSwitcher from './_components/AboutTabSwitcher';

export const metadata: Metadata = {
  title: `Our Story — ${SITE.shortName}`,
  description:
    'Learn about the Central Park Dance Skaters Association — our mission, history, and the community that keeps the wheels rolling every summer.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 items-center pt-6">
      {/* Purple title — unique to About page (other pages use yellow) */}
      <PageHero title="ABOUT US" color={COLORS.brand.purple} />
      <AboutTabSwitcher />
    </div>
  );
}
