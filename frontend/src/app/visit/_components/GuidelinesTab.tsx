import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

/**
 * Static guideline content — when WPGraphQL is wired up, fetch this
 * from a WordPress page/post via getPageBySlug('skate-circle-guidelines').
 */
const INTRO_PARAGRAPHS = [
  'Dancers without skates are welcome as long as they follow the CPDSA rules. These common sense guidelines are designed to create a safe, clean, secure atmosphere in the Skate Circle.',
  'The area south of the central rink is for freestyle skating and skate dancing. Stay within the lines painted on the ground. Do not place anything on the ground in the dance skating area.',
] as const;

const RULES = [
  'Children under 14 must wear a helmet. No speed skating.',
  'No backpacks or shoulder bags while skating. No glass bottles.',
  'No littering. Please throw trash in the designated receptacles.',
  'No Vending. No Pets. No smoking allowed in Central Park.',
  'No alcoholic beverages. No illicit drugs.',
] as const;

const bodyStyle = {
  fontFamily: FONTS.poppins,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.body,
  color: COLORS.text.body,
  letterSpacing: '0.16px',
} as const;

export default function GuidelinesTab() {
  return (
    <div className="flex flex-col gap-4 p-6 w-[747px] flex-shrink-0 self-stretch">
      {/* Section heading */}
      <p
        style={{
          fontFamily: FONTS.anton,
          fontSize: FONT_SIZES.sectionHeading,
          color: COLORS.text.body,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        PLEASE READ BEFORE ARRIVAL
      </p>

      {/* Intro paragraphs */}
      <div className="flex flex-col gap-4 w-[550px]">
        {INTRO_PARAGRAPHS.map((text) => (
          <p key={text} style={bodyStyle}>{text}</p>
        ))}
      </div>

      {/* Rules — separated by bottom border */}
      <div
        className="flex flex-col gap-1 pb-4 w-[521px]"
        style={{ borderBottom: `1px solid ${COLORS.border.default}` }}
      >
        {RULES.map((rule) => (
          <p key={rule} style={bodyStyle}>{rule}</p>
        ))}
      </div>

      {/* Bucket hat note */}
      <div className="w-[414px]">
        <p style={bodyStyle}>
          Our amazing bucket hat looks great on all ages, but is{' '}
          <span className="underline">not protective enough for the young ones</span>.{' '}
          <span style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.brand.green }}>
            Thank you for cooperating with CPDSA guidelines and staffers
          </span>
          <span style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.bold, color: COLORS.text.body }}>.</span>
        </p>
      </div>

      {/* Bucket hat image */}
      <div className="relative overflow-hidden rounded w-[376px] h-[244px]">
        <img
          src="/bucket-hat.jpg"
          alt="CPDSA bucket hat"
          className="absolute inset-0 w-full h-[154%] object-cover max-w-none"
          style={{ top: '-24.59%' }}
        />
      </div>

      {/* Swag CTA */}
      <div className="flex justify-center w-[376px]">
        <a
          href={SITE.swagUrl}
          className="flex items-center justify-center h-10 px-4 rounded-full text-white text-sm"
          style={{ backgroundColor: COLORS.brand.purple, fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium }}
        >
          Get that swag!
        </a>
      </div>
    </div>
  );
}
