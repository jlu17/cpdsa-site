import Image from 'next/image';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

export default function DJSkateSection() {
  return (
    <div className="flex items-stretch w-full">
      {/* Text */}
      <div className="flex flex-col gap-6 justify-center p-6 w-[696px] flex-shrink-0">
        <p
          style={{
            fontFamily: FONTS.anton,
            fontSize: FONT_SIZES.sectionHeading,
            color: COLORS.text.body,
            lineHeight: 1.2,
          }}
        >
          skate maintenance
        </p>

        <p
          style={{
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.regular,
            fontSize: FONT_SIZES.body,
            color: COLORS.text.body,
            letterSpacing: '0.16px',
            lineHeight: 1.6,
            maxWidth: 550,
          }}
        >
          The CPDSA is only run by volunteers. We need your help in the fields of
          administration and operation, including setting up and breaking down the
          skate circle for each session.
        </p>

        <a
          href={SITE.volunteerFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 px-5 rounded-full text-white self-start"
          style={{
            backgroundColor: COLORS.brand.purple,
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: FONT_SIZES.body,
          }}
        >
          Volunteer with us
        </a>
      </div>

      {/* Photo */}
      <div className="flex-1 relative" style={{ minHeight: 315 }}>
        <Image
          src="/djs-skate-maintenance.jpg"
          alt="Roller skates being maintained"
          fill
          className="object-cover"
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>
    </div>
  );
}
