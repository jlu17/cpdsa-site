'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import OurStoryTab from './OurStoryTab';
import OurHistoryTab from './OurHistoryTab';
import AboutGreaseSection from './AboutGreaseSection';

type Tab = 'story' | 'history';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'story', label: 'Our Story' },
  { id: 'history', label: 'Our History' },
];

export default function AboutTabSwitcher() {
  const [active, setActive] = useState<Tab>('story');

  return (
    <div className="flex flex-col w-full">
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
      {active === 'story' ? <OurStoryTab /> : <OurHistoryTab />}

      {/* Always-visible sections */}
      <AboutGreaseSection />
    </div>
  );
}
