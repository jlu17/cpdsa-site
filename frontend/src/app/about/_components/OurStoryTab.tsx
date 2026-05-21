import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

const STATS = [
  { headline: '30+ YEARS', sub: 'of free roller skating' },
  { headline: 'EVERY SUNDAY', sub: 'all summer long, rain or shine' },
  { headline: '100%', sub: 'volunteer-run & community-funded' },
] as const;

const headingStyle = {
  fontFamily: FONTS.anton,
  fontSize: FONT_SIZES.sectionHeading,
  color: COLORS.text.body,
  lineHeight: 1.1,
} as const;

const bodyStyle = {
  fontFamily: FONTS.poppins,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.body,
  color: COLORS.text.body,
  letterSpacing: '0.16px',
  lineHeight: 1.6,
} as const;

export default function OurStoryTab() {
  return (
    <div className="flex flex-col w-full">
      {/* About the CPDSA — image + text */}
      <div className="flex items-start gap-8 px-6 py-8">
        <div className="flex-shrink-0 w-[598px] rounded-[4px] overflow-hidden" style={{ height: 420 }}>
          <img
            src="/about-cpdsa-photo.jpg"
            alt="Skaters at the Skater's Circle in Central Park"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 flex-1 pt-2">
          <p style={headingStyle}>ABOUT THE CPDSA</p>
          <div className="flex flex-col gap-4">
            <p style={bodyStyle}>
              {SITE.orgLegalName} {SITE.orgDescription}
            </p>
            <p style={bodyStyle}>
              Every Sunday from spring through fall, the Skater&apos;s Circle at Central Park comes alive with music,
              movement, and community. We set up our DJ booth, roll out the sound system, and open the floor to
              anyone who wants to skate — no tickets, no admission, no barriers.
            </p>
            <p style={bodyStyle}>
              Driven entirely by volunteers and sustained by the generosity of our community, we have welcomed
              skaters of every age, skill level, and background for over three decades. Whether you&apos;re a first-timer
              lacing up or a seasoned dancer who&apos;s been coming since the &apos;90s, you belong here.
            </p>
          </div>
        </div>
      </div>

      {/* Green stat bar */}
      <div
        className="flex w-full"
        style={{ backgroundColor: COLORS.brand.green }}
      >
        {STATS.map(({ headline, sub }, i) => (
          <div
            key={headline}
            className="flex flex-col gap-1 flex-1 px-8 py-6"
            style={{
              borderRight: i < STATS.length - 1 ? `2px solid ${COLORS.brand.yellow}` : undefined,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.anton,
                fontSize: FONT_SIZES.cardHeading,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              {headline}
            </p>
            <p
              style={{
                fontFamily: FONTS.poppins,
                fontWeight: FONT_WEIGHTS.medium,
                fontSize: FONT_SIZES.body,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.16px',
              }}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Purple Mission / Vision / Goals card */}
      <div
        className="flex items-stretch mx-6 my-8 rounded-[4px] overflow-hidden"
        style={{ backgroundColor: COLORS.brand.purple }}
      >
        {/* Left image */}
        <div className="flex-shrink-0 w-[329px]">
          <img
            src="/about-mission-photo.jpg"
            alt="Community skaters at Central Park"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Three text columns */}
        <div className="flex flex-1">
          {[
            {
              heading: 'MISSION',
              body: `To provide free, family-friendly roller skating and live music to the diverse communities of New York City, preserving a beloved Central Park tradition for generations to come.`,
            },
            {
              heading: 'VISION',
              body: `A Central Park where everyone — regardless of age, background, or ability — is welcome to dance, skate, and celebrate together every summer.`,
            },
            {
              heading: 'GOALS',
              body: `Grow our volunteer base, sustain free weekly programming, secure equipment for skaters in need, and deepen our roots in the communities that make Central Park home.`,
            },
          ].map(({ heading, body }, i) => (
            <div
              key={heading}
              className="flex flex-col gap-3 flex-1 px-6 py-8"
              style={{
                borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.2)` : undefined,
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.anton,
                  fontSize: FONT_SIZES.cardHeading,
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}
              >
                {heading}
              </p>
              <p
                style={{
                  fontFamily: FONTS.poppins,
                  fontWeight: FONT_WEIGHTS.regular,
                  fontSize: FONT_SIZES.body,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.16px',
                  lineHeight: 1.6,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
