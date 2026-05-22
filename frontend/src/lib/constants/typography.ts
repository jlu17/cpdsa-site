/**
 * Typography tokens.
 * CSS variable references for font families (defined in layout.tsx via next/font).
 * Font sizes that appear across multiple pages live here.
 */
export const FONTS = {
  anton: 'var(--font-anton)',
  poppins: 'var(--font-poppins)',
} as const;

export const FONT_SIZES = {
  /** Interior page hero title — large yellow Anton heading */
  pageHero: 120,
  /** Major section headings (We Are, Grease the Wheels, etc.) */
  sectionHeading: 64,
  /** Card sub-headings (Mission, Vision, Goals) */
  cardHeading: 36,
  /** Schedule DJ name — intentionally enormous */
  djName: 192,
  /** Upcoming events DJ name */
  scheduleEvent: 92,
  body: 16,
  nav: 14,
  caption: 12,
} as const;

export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;
