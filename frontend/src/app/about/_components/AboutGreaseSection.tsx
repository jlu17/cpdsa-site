import GreaseSection from '@/components/GreaseSection';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

const LAVENDER = '#db9fff';

export default function AboutGreaseSection() {
  return (
    <GreaseSection
      photoSrc="/about-grease-photo.jpg"
      photoAlt="CPDSA volunteers at the Skater's Circle"
      bgColor={LAVENDER}
      photoSide="left"
      textColor={COLORS.text.body}
      buttons={
        <>
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
        </>
      }
    />
  );
}
