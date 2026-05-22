import Image from 'next/image';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';

interface Props {
  photoSrc: string;
  photoAlt: string;
  bgColor: string;
  photoSide?: 'left' | 'right';
  textColor?: string;
  buttons: React.ReactNode;
  className?: string;
}

export default function GreaseSection({
  photoSrc,
  photoAlt,
  bgColor,
  photoSide = 'left',
  textColor = COLORS.text.body,
  buttons,
  className = '',
}: Props) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch w-full ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`w-full h-[300px] sm:flex-shrink-0 sm:w-[560px] sm:h-auto sm:min-h-[480px] relative${
          photoSide === 'right' ? ' sm:order-last' : ''
        }`}
      >
        <Image src={photoSrc} alt={photoAlt} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-center gap-6 px-6 py-8 sm:px-12 sm:py-10 flex-1">
        <p
          style={{
            fontFamily: FONTS.anton,
            fontSize: FONT_SIZES.sectionHeading,
            color: textColor,
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
              color: textColor,
              letterSpacing: '0.16px',
              lineHeight: 1.6,
            }}
          >
            We are a nonprofit organization, and memberships and donations allow us to pay
            for permits, sound equipment, and other essential operating costs necessary to
            keep the CPDSA Skate Circle rolling.
          </p>
          <p
            style={{
              fontFamily: FONTS.poppins,
              fontWeight: FONT_WEIGHTS.regular,
              fontSize: FONT_SIZES.body,
              color: textColor,
              letterSpacing: '0.16px',
              lineHeight: 1.6,
            }}
          >
            Without your support there is no Skate Circle.
          </p>
        </div>

        <div className="flex gap-4">{buttons}</div>
      </div>
    </div>
  );
}
