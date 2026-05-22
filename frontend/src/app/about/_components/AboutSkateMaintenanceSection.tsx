import Image from 'next/image';
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
            The CPDSA is only run by volunteers. We need your help in the fields of administration and operation, 
            including setting up and breaking down the skate circle for each session.
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
      <div className="flex-shrink-0 w-[560px] relative overflow-hidden" style={{ height: 420 }}>
        <Image
          src="/about-skate-maintenance.jpg"
          alt="Close-up of roller skates being maintained"
          fill
          className="object-cover object-bottom"
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>
    </div>
  );
}
