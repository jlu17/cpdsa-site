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
    </div>
  );
}
