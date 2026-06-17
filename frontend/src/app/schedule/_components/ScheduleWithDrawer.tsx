'use client';

import { useState } from 'react';
import { DJ, SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import DJDrawer from '@/app/djs/_components/DJDrawer';
import ThisWeekSection from './ThisWeekSection';
import UpcomingSection from './UpcomingSection';
import CalendarView from './CalendarView';

type View = 'list' | 'calendar';

const TABS: Array<{ id: View; label: string }> = [
  { id: 'list', label: 'List' },
  { id: 'calendar', label: 'Calendar' },
];

export default function ScheduleWithDrawer({
  thisWeek,
  upcoming,
  djs,
}: {
  thisWeek: SkateEvent[];
  upcoming: SkateEvent[];
  djs: DJ[];
}) {
  const [view, setView] = useState<View>('list');
  const [selectedDj, setSelectedDj] = useState<DJ | null>(null);

  const handleDjClick = (name: string) => {
    const dj = djs.find(d => d.djFields.djName === name || d.title === name);
    if (dj) setSelectedDj(dj);
  };

  const allEvents = [...thisWeek, ...upcoming];

  return (
    <>
      <div className="flex flex-col w-full">
        {/* Tab toggle */}
        <div
          className="flex items-start px-6 w-full"
          style={{ borderBottom: `1px solid ${COLORS.border.default}` }}
        >
          {TABS.map(({ id, label }) => {
            const isActive = view === id;
            return (
              <button
                key={id}
                onClick={() => setView(id)}
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

        {/* View content */}
        {view === 'list' ? (
          <div className="flex flex-col gap-4 pt-4">
            <ThisWeekSection events={thisWeek} onDjClick={handleDjClick} />
            <UpcomingSection events={upcoming} onDjClick={handleDjClick} />
          </div>
        ) : (
          <CalendarView events={allEvents} onDjClick={handleDjClick} />
        )}
      </div>

      {selectedDj && (
        <DJDrawer dj={selectedDj} onClose={() => setSelectedDj(null)} />
      )}
    </>
  );
}
