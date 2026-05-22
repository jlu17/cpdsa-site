import Image from 'next/image';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';

export default function DJGreaseSection() {
  return (
    <div
      className="flex items-stretch w-full rounded-[4px] overflow-hidden mx-6"
      style={{ backgroundColor: COLORS.brand.purple, maxWidth: 'calc(100% - 48px)' }}
    >
      {/* Text */}
      <div className="flex flex-col gap-6 justify-center p-6 w-[696px] flex-shrink-0">
        <p
          style={{
            fontFamily: FONTS.anton,
            fontSize: FONT_SIZES.sectionHeading,
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          grease the wheels
        </p>

        <p
          style={{
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.regular,
            fontSize: FONT_SIZES.body,
            color: '#ffffff',
            letterSpacing: '0.16px',
            lineHeight: 1.6,
            maxWidth: 550,
          }}
        >
          We are a nonprofit organization, and memberships and donations allow us to pay
          for permits, sound equipment, and other essential operating costs necessary to
          keep the CPDSA Skate Circle rolling.
          <br /><br />
          Without your support there is no Skate Circle.
        </p>

        {/* White button with purple text */}
        <a
          href="#donate"
          className="inline-flex items-center justify-center h-10 px-5 rounded-full self-start"
          style={{
            backgroundColor: '#ffffff',
            color: COLORS.brand.purple,
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: FONT_SIZES.body,
          }}
        >
          Donate
        </a>
      </div>

      {/* Photo */}
      <div className="flex-1 relative" style={{ minHeight: 368 }}>
        <Image
          src="/djs-grease-photo.jpg"
          alt="CPDSA volunteers and community at the Skater's Circle"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
