import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

export default function AboutSkateMaintenanceSection() {
  return (
    <div className="flex items-stretch w-full">
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
          SKATE MAINTENANCE
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
            Keeping skates in top condition is a labor of love. Our maintenance volunteers
            clean bearings, replace wheels, and check every pair of rentals before each
            Sunday session — so everyone who laces up can skate with confidence.
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
            Have a knack for mechanics or just want to help? Join our skate maintenance
            crew and make a hands-on difference every week.
          </p>
        </div>

        <a
          href={SITE.volunteerFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 px-6 rounded-full text-white text-sm self-start"
          style={{
            backgroundColor: COLORS.brand.purple,
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.medium,
          }}
        >
          Volunteer with us
        </a>
      </div>

      {/* Photo */}
      <div className="flex-shrink-0 w-[560px]" style={{ minHeight: 420 }}>
        <img
          src="/about-skate-maintenance.jpg"
          alt="Close-up of roller skates being maintained"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>
    </div>
  );
}
