import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

const STATS = [
  { headline: '30+ YEARS', sub: 'of free roller skating' },
  { headline: 'ALL SUMMER LONG', sub: 'most Saturdays and Sundays' },
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

const mvgHeadingStyle = {
  fontFamily: FONTS.anton,
  fontSize: FONT_SIZES.cardHeading,
  color: '#ffffff',
  lineHeight: 1.1,
} as const;

const mvgBodyStyle = {
  fontFamily: FONTS.poppins,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.body,
  color: 'rgba(255,255,255,0.85)',
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
          <p style={headingStyle} className="pt-8">ABOUT THE CPDSA</p>
          <div className="flex flex-col gap-4">
            <p style={bodyStyle}>
              The Central Park Dance Skaters Association manages free roller skating sessions in partnership with the City Agencies—Parks Department, the Police Department and the Central Park Conservancy, obtaining all permits necessary to organize legally sanctioned, safe and secure events.
            </p>
            <p style={bodyStyle}>
              The CPDSA acts as a liaison between the skaters who enjoy attending the events and the City Agencies.
            </p>
          </div>
        </div>
      </div>

      {/* Green stat bar */}
      <div
        className="flex w-full px-4 py-6"
        style={{ backgroundColor: COLORS.brand.green }}
      >
        {STATS.map(({ headline, sub }, i) => (
          <div
            key={headline}
            className="flex flex-col gap-1 flex-1 px-8 py-6"
            style={{
              borderRight: i < STATS.length - 1 ? `1px solid ${COLORS.brand.yellow}` : undefined,
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
        <div className="flex-shrink-0 w-[329px] p-6">
          <img
            src="/about-mission-photo.jpg"
            alt="Community skaters at Central Park"
            className="w-full h-full object-cover rounded-[4px]"
          />
        </div>

        {/* Two text columns */}
        <div className="flex flex-1">
          {/* Left column: Mission + Vision */}
          <div className="flex flex-col gap-6 flex-1 px-6 py-8">
            <div className="flex flex-col gap-3">
              <p style={mvgHeadingStyle}>OUR MISSION</p>
              <p style={mvgBodyStyle}>
                Our mission is to offer present and future generations a free, open-air roller skating experience with live DJ music at &ldquo;The Skate Circle&rdquo; in New York City&rsquo;s Central Park, on most weekend days during the warmer months (April through October).
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p style={mvgHeadingStyle}>OUR VISION</p>
              <p style={mvgBodyStyle}>
                Our vision is to become a City institution so that the Skate Circle is designated as an official recreational area. This would include renaming &ldquo;Dead Road&rdquo;&mdash;the road segment of Central Park where the CPDSA sets up The Skate Circle&mdash;&ldquo;Skaters Road.&rdquo;
              </p>
            </div>
          </div>

          {/* Right column: Goals */}
          <div
            className="flex flex-col gap-3 flex-1 px-6 py-8"
          >
            <p style={mvgHeadingStyle}>OUR GOALS</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p style={{ ...mvgBodyStyle, fontWeight: FONT_WEIGHTS.semibold, color: '#ffffff' }}>
                  Short-term goals
                </p>
                <p style={mvgBodyStyle}>
                  To enhance the experience of the skaters by refining the CPDSA operating guidelines, improving its sound system and continuing to book the best DJs who understand roller skating and what music keeps skaters rolling.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p style={{ ...mvgBodyStyle, fontWeight: FONT_WEIGHTS.semibold, color: '#ffffff' }}>
                  Long-term goals
                </p>
                <p style={mvgBodyStyle}>
                  To work more closely with the City and Private Businesses to achieve sustainability and permanent status of City Recreational Area. This would include having The Skate Circle repaved, resurfaced and maintained to provide a smoother skating surface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
