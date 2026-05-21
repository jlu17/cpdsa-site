import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

interface Direction {
  label: string;
  anchor: string;
  steps: string[];
}

/**
 * Directions content — replace steps with CMS content when available.
 */
const DIRECTIONS: Direction[] = [
  {
    label: 'From 72nd Street',
    anchor: '72nd',
    steps: [
      'Enter Central Park at 72nd Street and Central Park West.',
      'Walk south along the main path toward the Naumburg Bandshell.',
      'The Skate Circle is on your left, adjacent to the Mall.',
    ],
  },
  {
    label: 'From West 67th Street',
      anchor: '67th',
    steps: [
      'Enter Central Park at West 67th Street.',
      'Head northeast along the path toward the Mall.',
      'You will see the Skate Circle on your right.',
    ],
  },
  {
    label: 'From the South entrances',
    anchor: 'south',
    steps: [
      'Enter at Columbus Circle (59th St) or any southern entrance.',
      'Follow the main path north toward the Mall and Literary Walk.',
      'The Skate Circle is at the north end of the Literary Walk.',
    ],
  },
];

const bodyStyle = {
  fontFamily: FONTS.poppins,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.body,
  color: COLORS.text.body,
  letterSpacing: '0.16px',
} as const;

export default function DirectionsTab() {
  return (
    <div className="flex flex-col gap-8 p-6 w-[747px] flex-shrink-0">
      {/* Google Maps link */}
      <a
        href={SITE.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center h-10 px-4 rounded-full text-white text-sm self-start"
        style={{ backgroundColor: COLORS.brand.purple, fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium }}
      >
        Open in Google Maps
      </a>

      {/* Direction groups */}
      {DIRECTIONS.map(({ label, anchor, steps }) => (
        <div key={anchor} id={anchor} className="flex flex-col gap-3">
          <p
            style={{
              fontFamily: FONTS.anton,
              fontSize: FONT_SIZES.sectionHeading,
              color: COLORS.text.body,
              lineHeight: 1.2,
            }}
          >
            {label.toUpperCase()}
          </p>
          <ol className="flex flex-col gap-2 list-decimal list-inside">
            {steps.map((step) => (
              <li key={step} style={bodyStyle}>{step}</li>
            ))}
          </ol>
        </div>
      ))}

      {/* Map */}
      <div className="relative rounded-[4px] overflow-hidden w-full h-[420px]">
        <img
          src="/skate-circle-aerial.jpg"
          alt="Aerial view of the Skater's Circle in Central Park"
          className="w-full h-full object-cover"
        />
        <a
          href={SITE.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4 flex items-center justify-center h-10 px-4 rounded-full bg-black text-white text-sm"
          style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium }}
        >
          Google Maps
        </a>
      </div>
    </div>
  );
}
