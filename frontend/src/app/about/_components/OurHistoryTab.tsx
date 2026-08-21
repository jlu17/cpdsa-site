'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';

// Matches the sticky navbar's h-[80px] so items scrolled underneath it aren't counted as visible.
const NAVBAR_HEIGHT = 80;

const YEAR_COLORS = {
  green: COLORS.brand.green,
  red: '#ec1d24',
  purple: COLORS.brand.purple,
} as const;

const MILESTONES = [
  {
    year: '1930s',
    subtitle: ['halloween', '1936'],
    color: 'green' as const,
    body: 'Famous New York photographs from the 1890s show people ice skating on the Lake and the Boat Basin in Central Park. Roller Skating in the park was popular in the 1930s, which is depicted in a vintage poster for a roller skating event that took place on Halloween 1936.',
  },
  {
    year: '1950s',
    subtitle: ['bandshell', '1951'],
    color: 'green' as const,
    body: 'There is a mention of roller skating in the Bandshell area in the book "Catcher In The Rye," which was published on July 16, 1951.',
  },
  {
    year: '1970s',
    subtitle: ['dead road', 'good skates'],
    color: 'green' as const,
    body: 'The current generation of roller skating on the Dead Road began in around 1978 when a roller skate rental business called "Good Skates" started to operate at the Mineral Springs facility just west of the Dead Road. Roller skating was very popular at that time and soon that whole area of the park was teeming with skaters. A number of skaters painted guide lines on the pavement in the form of two concentric circles. Skating became a regular part of the fabric of that area of Central Park.',
  },
  {
    year: '1994',
    subtitle: ['dead road', 'petition'],
    color: 'red' as const,
    body: 'In 1994, when the north end of the Dead Road was repaved as part of the Bethesda Fountain and Bandshell restorations, skaters learned about a map being produced by the Parks Department that showed Volleyball courts covering the whole area. A few skaters produced a petition demanding a voice in how the area was going to be used. Six hundred skaters and concerned citizens signed this petition and a loosely organized Ad Hoc committee met with Parks Department officials in a dialogue designed to find an accommodation for the skating community. An agreement was reached and the skaters began a cooperative effort to work with the Parks Department. This agreement lasted as long as the Dinkins Administration stayed in office.',
  },
  {
    year: '1995',
    subtitle: ['free assembly', 'giuliani'],
    color: 'red' as const,
    body: 'In April of 1995, the newly elected Giuliani Administration reneged on the agreement and began to wage a campaign to chase the skaters out of the park. The new Administration was able to change the municipal code governing the number of people who could assemble freely without a special-event permit, reducing the number from fifty to fifteen people. The Administration was also able to push through a requirement that anyone using an amplified sound device had to have a special-event permit from the Parks Department and an amplified sound permit for that device from the police.',
  },
  {
    year: '1995',
    subtitle: ['enter the', 'CPDSA'],
    color: 'purple' as const,
    body: 'Faced with the prospect of being thrown out of the Park, a group of skaters formed the Central Park Dance Skaters Association (CPDSA) and went to work organizing the skaters, consulting with lawyers and informing the media about this abridgment of their rights. Over the following three months, the Central Park Dance Skaters Association waged a campaign to win back their rights to skate to music in the park.',
  },
  {
    year: '1995',
    subtitle: ['the skaters', 'organize'],
    color: 'purple' as const,
    body: 'When the Administration finally realized that they could not get rid of the skaters, they met with the CPDSA representatives and granted the CPDSA the right to obtain all the requisite permits needed to legally hold skating events. In the end, the attempt to rid the park of skaters had the opposite effect, forcing skaters to organize and get all the requisite permits while gaining the support of some of the officials in power. Since then, the CPDSA has continued to do whatever is necessary to keep The Skate Circle rolling on warm weekend days.',
  },
] as const;

export default function OurHistoryTab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Advance to the next milestone as soon as the current one's top edge
    // starts sliding under the navbar — recomputed on every scroll so it
    // stays correct in both directions, rather than waiting for a milestone
    // to fully clear the navbar (which left a dead zone between rows).
    let ticking = false;

    const updateActive = () => {
      let next = 0;
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= NAVBAR_HEIGHT) {
          next = Math.min(i + 1, itemRefs.current.length - 1);
        }
      });
      setActiveIndex(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start px-6 sm:pl-12 sm:pr-24 py-8">
      {/* Image — full width on mobile, fixed column on desktop */}
      <div className="w-full h-[280px] sm:flex-shrink-0 sm:w-[400px] sm:h-[600px] relative rounded-[4px] overflow-hidden">
        <Image
          src="/about-history-photo.jpg"
          alt="Vintage roller skating at Central Park"
          fill
          className="object-cover"
        />
      </div>

      {/* Timeline entries */}
      <div className="flex flex-col gap-8 flex-1">
        {MILESTONES.map(({ year, subtitle, color, body }, i) => {
          const yearColor = YEAR_COLORS[color];
          const isFeatured = i === activeIndex;
          return (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className="flex gap-4 items-start"
            >
              {/* Year + subtitle label */}
              <div
                className="flex-shrink-0 w-[250px] flex gap-2 items-center transition-colors duration-300"
                style={{
                  backgroundColor: isFeatured ? '#ffffff' : 'transparent',
                  border: `2px solid ${isFeatured ? yearColor : 'transparent'}`,
                  borderRadius: 4,
                  padding: 8,
                  boxShadow: isFeatured ? '0px 6px 8px rgba(92,92,92,0.16)' : 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: FONTS.anton,
                    fontSize: FONT_SIZES.cardHeading,
                    color: yearColor,
                    lineHeight: 1,
                    letterSpacing: '0.49px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {year}
                </p>
                <div
                  style={{
                    fontFamily: FONTS.poppins,
                    fontSize: '16px',
                    color: '#0d3b00',
                    lineHeight: '18px',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                  }}
                >
                  <p style={{ fontWeight: FONT_WEIGHTS.medium }}>{subtitle[0]}</p>
                  <p style={{ fontWeight: FONT_WEIGHTS.semibold }}>{subtitle[1]}</p>
                </div>
              </div>

              {/* Body text */}
              <p
                className="flex-1 pl-4"
                style={{
                  fontFamily: FONTS.poppins,
                  fontWeight: FONT_WEIGHTS.regular,
                  fontSize: FONT_SIZES.body,
                  color: COLORS.text.body,
                  letterSpacing: '0.16px',
                  lineHeight: 1.6,
                }}
              >
                {body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
