import GreaseSection from '@/components/GreaseSection';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS, FONT_SIZES } from '@/lib/constants/typography';

export default function DJGreaseSection() {
  return (
    <GreaseSection
      photoSrc="/djs-grease-photo.jpg"
      photoAlt="CPDSA volunteers and community at the Skater's Circle"
      bgColor={COLORS.brand.purple}
      photoSide="right"
      textColor="#ffffff"
      buttons={
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
      }
    />
  );
}
