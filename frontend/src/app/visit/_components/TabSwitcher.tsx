'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import GuidelinesTab from './GuidelinesTab';
import DirectionsTab from './DirectionsTab';
import SkateMap from './SkateMap';

type Tab = 'guidelines' | 'directions';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'directions', label: 'Directions' },
];

const DIRECTION_LINKS = ['From 72nd Street', 'From West 67th Street', 'From the South entrances'];

const MAPS_EMBED = (
  <iframe
    src="https://maps.google.com/maps?q=Skater%27s+Circle+Central+Park+New+York+NY&output=embed&z=16"
    className="w-full h-full border-0"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Skater's Circle, Central Park"
  />
);

export default function TabSwitcher() {
  const [active, setActive] = useState<Tab>('guidelines');

  return (
    <>
      {/* ── Desktop: tabbed layout ── */}
      <div className="hidden sm:block w-full">
        {/* Sub-nav */}
        <div
          className="flex items-start px-6 w-full"
          style={{ borderBottom: `1px solid ${COLORS.border.default}` }}
        >
          {TABS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className="flex items-center justify-center h-12 px-6 text-sm whitespace-nowrap tracking-[0.14px] transition-colors"
                style={{
                  fontFamily: FONTS.poppins,
                  fontWeight: isActive ? FONT_WEIGHTS.bold : FONT_WEIGHTS.medium,
                  color: isActive ? COLORS.text.body : COLORS.text.primary,
                  borderBottom: isActive ? `3px solid ${COLORS.text.body}` : '3px solid transparent',
                  borderRadius: '4px 4px 0 0',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex items-start w-full rounded-[4px] pb-8">
          {active === 'guidelines' ? <GuidelinesTab /> : <DirectionsTab />}
          {active === 'guidelines' ? (
            <SkateMap />
          ) : (
            <div className="relative flex-1 overflow-hidden rounded-[4px]" style={{ height: 424 }}>
              {MAPS_EMBED}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile: stacked layout (no tabs) ── */}
      <div className="flex sm:hidden flex-col w-full pb-8">

        {/* Guidelines section */}
        <div className="px-6 pb-2">
          <p
            style={{
              fontFamily: FONTS.anton,
              fontSize: 64,
              color: COLORS.brand.purple,
              lineHeight: 1,
            }}
          >
            SKATE CIRCLE GUIDELINES
          </p>
        </div>
        <GuidelinesTab />
        <div className="px-6 pb-6">
          <SkateMap />
        </div>

        {/* Divider */}
        <div
          className="mx-6 mb-8"
          style={{ borderTop: `1px solid ${COLORS.border.default}` }}
        />

        {/* Directions section */}
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p
            style={{
              fontFamily: FONTS.anton,
              fontSize: 64,
              color: COLORS.text.body,
              lineHeight: 1,
            }}
          >
            HOW TO FIND THE CIRCLE
          </p>
          <p
            style={{
              fontFamily: FONTS.poppins,
              fontWeight: FONT_WEIGHTS.regular,
              fontSize: FONT_SIZES.body,
              color: COLORS.text.body,
              letterSpacing: '0.16px',
            }}
          >
            Please note that there is no skating session on the days Central Park hosts special events. Children under the age of 14 will need a helmet.
          </p>
        </div>

        {/* Google Maps embed */}
        <div className="px-6 pb-4">
          <div className="relative w-full overflow-hidden rounded-[4px]" style={{ height: 300 }}>
            {MAPS_EMBED}
          </div>
        </div>

        {/* Direction anchor links */}
        <div className="flex flex-col px-6 pb-2">
          {DIRECTION_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="py-2 text-base capitalize"
              style={{
                fontFamily: FONTS.poppins,
                fontWeight: FONT_WEIGHTS.semibold,
                color: COLORS.brand.purple,
                letterSpacing: '0.49px',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Step-by-step directions */}
        <DirectionsTab />
      </div>
    </>
  );
}
