import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';

const MILESTONES = [
  { year: '1995', event: 'The Skater\'s Circle opens in Central Park, founded by a small group of passionate roller skaters.' },
  { year: '2000', event: 'CPDSA officially incorporates as a 501(c)(3) non-profit organization.' },
  { year: '2005', event: 'The DJ booth is introduced, transforming the Circle into a destination for dance skating.' },
  { year: '2012', event: 'Community fundraising campaigns help purchase new sound equipment and benches.' },
  { year: '2020', event: 'The pandemic pauses programming for the first time in 25 years; the community rallies online.' },
  { year: '2021', event: 'Triumphant return to the Circle — the largest opening day crowd in the organization\'s history.' },
  { year: '2025', event: '30 years of free skating celebrated with a special anniversary season.' },
] as const;

export default function OurHistoryTab() {
  return (
    <div className="flex flex-col gap-8 px-6 py-8 w-full">
      <p
        style={{
          fontFamily: FONTS.anton,
          fontSize: FONT_SIZES.sectionHeading,
          color: COLORS.text.body,
          lineHeight: 1.1,
        }}
      >
        OUR HISTORY
      </p>

      <div className="flex flex-col gap-0">
        {MILESTONES.map(({ year, event }, i) => (
          <div
            key={year}
            className="flex items-start gap-8 py-6"
            style={{
              borderTop: i > 0 ? `1px solid ${COLORS.border.default}` : undefined,
            }}
          >
            <p
              className="flex-shrink-0 w-20"
              style={{
                fontFamily: FONTS.anton,
                fontSize: FONT_SIZES.cardHeading,
                color: COLORS.brand.purple,
                lineHeight: 1.1,
              }}
            >
              {year}
            </p>
            <p
              className="flex-1 pt-1"
              style={{
                fontFamily: FONTS.poppins,
                fontWeight: FONT_WEIGHTS.regular,
                fontSize: FONT_SIZES.body,
                color: COLORS.text.body,
                letterSpacing: '0.16px',
                lineHeight: 1.6,
              }}
            >
              {event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
