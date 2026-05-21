import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

const LAVENDER = '#db9fff';

export default function AboutGreaseSection() {
  return (
    <div
      className="flex items-stretch w-full"
      style={{ backgroundColor: LAVENDER }}
    >
      {/* Photo */}
      <div className="flex-shrink-0 w-[560px]" style={{ minHeight: 480 }}>
        <img
          src="/about-grease-photo.jpg"
          alt="CPDSA volunteers at the Skater's Circle"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center gap-6 px-12 py-10 flex-1">
        <p
          style={{
            fontFamily: FONTS.anton,
            fontSize: FONT_SIZES.sectionHeading,
            color: COLORS.text.body,
            lineHeight: 1.1,
          }}
        >
          GREASE THE WHEELS
        </p>

        <div className="flex flex-col gap-4">
          <p
            style={{
              fontFamily: FONTS.poppins,
              fontWeight: FONT_WEIGHTS.regular,
              fontSize: FONT_SIZES.body,
              color: COLORS.text.body,
              letterSpacing: '0.16px',
              lineHeight: 1.6,
            }}
          >
            Everything we do is powered by volunteers and the generosity of our community.
            From setting up the DJ booth each Sunday to repairing skates and mentoring new
            skaters, every contribution keeps the Circle rolling.
          </p>
          <p
            style={{
              fontFamily: FONTS.poppins,
              fontWeight: FONT_WEIGHTS.regular,
              fontSize: FONT_SIZES.body,
              color: COLORS.text.body,
              letterSpacing: '0.16px',
              lineHeight: 1.6,
            }}
          >
            Your donation directly supports free skate rentals, sound equipment, and
            programming that keeps Central Park alive with music all summer long.
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href={SITE.volunteerFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm"
            style={{
              backgroundColor: COLORS.text.body,
              color: LAVENDER,
              fontFamily: FONTS.poppins,
              fontWeight: FONT_WEIGHTS.medium,
            }}
          >
            Volunteer with us
          </a>
          <a
            href="#donate"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm"
            style={{
              backgroundColor: 'transparent',
              color: COLORS.text.body,
              border: `2px solid ${COLORS.text.body}`,
              fontFamily: FONTS.poppins,
              fontWeight: FONT_WEIGHTS.medium,
            }}
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
}
