'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SkateVideo } from '@/lib/graphql';
import PressTab from './PressTab';

type Tab = 'photos' | 'videos' | 'press';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'press', label: 'CPDSA in the media' },
];

export default function MediaTabSwitcher({ videos }: { videos: SkateVideo[] }) {
  const [active, setActive] = useState<Tab>('press');

  return (
    <>
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

      <div className="w-full">
        {active === 'press' && <PressTab videos={videos} />}
        {active === 'photos' && (
          <div className="px-6 py-8" style={{ fontFamily: FONTS.poppins, color: COLORS.text.muted }}>
            Photos coming soon.
          </div>
        )}
        {active === 'videos' && (
          <div className="px-6 py-8" style={{ fontFamily: FONTS.poppins, color: COLORS.text.muted }}>
            Videos coming soon.
          </div>
        )}
      </div>
    </>
  );
}
