'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import GuidelinesTab from './GuidelinesTab';
import DirectionsTab from './DirectionsTab';
import SkateMap from './SkateMap';

type Tab = 'guidelines' | 'directions';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'directions', label: 'Directions' },
];

export default function TabSwitcher() {
  const [active, setActive] = useState<Tab>('guidelines');

  return (
    <>
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

      {/* Content */}
      <div className="flex items-start w-full rounded-[4px]">
        {active === 'guidelines' ? <GuidelinesTab /> : <DirectionsTab />}
        <SkateMap />
      </div>
    </>
  );
}
