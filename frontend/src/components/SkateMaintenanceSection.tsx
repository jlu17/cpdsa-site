import Image from 'next/image';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

interface Props {
  photoSrc: string;
  photoAlt: string;
  objectPosition?: string;
}

export default function SkateMaintenanceSection({
  photoSrc,
  photoAlt,
  objectPosition = 'center',
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch w-full">
      <div className="flex flex-col justify-center gap-6 px-6 py-8 sm:px-12 sm:py-10 flex-1">
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
            The CPDSA is only run by volunteers. We need your help in the fields of
            administration and operation, including setting up and breaking down the skate
            circle for each session.
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

      <div className="w-full h-[300px] sm:flex-shrink-0 sm:w-[560px] sm:h-[420px] relative overflow-hidden">
        <Image
          src={photoSrc}
          alt={photoAlt}
          fill
          className="object-cover"
          style={{ objectPosition, filter: 'grayscale(100%)' }}
        />
      </div>
    </div>
  );
}
