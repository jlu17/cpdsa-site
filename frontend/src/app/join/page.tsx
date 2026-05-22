import { Metadata } from 'next';
import { SITE } from '@/lib/constants/site';
import PageHero from '@/components/ui/PageHero';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';

export const metadata: Metadata = {
  title: `Join Us — ${SITE.shortName}`,
};

export default function JoinPage() {
  return (
    <div className="flex flex-col gap-6 items-center pt-6 w-full">
      <PageHero title="JOIN US" />
      <div className="px-6 py-12 w-full">
        <p
          style={{
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 16,
            color: COLORS.text.muted,
          }}
        >
          Work in progress — check back soon.
        </p>
      </div>
    </div>
  );
}
