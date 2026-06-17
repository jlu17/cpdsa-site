'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import { getEventDjNames } from './scheduleUtils';

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function CalendarView({
  events,
  onDjClick,
}: {
  events: SkateEvent[];
  onDjClick?: (name: string) => void;
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getUTCFullYear());
  const [month, setMonth] = useState(today.getUTCMonth());

  const eventMap = new Map<string, SkateEvent>();
  events.forEach(e => {
    eventMap.set(e.eventFields.eventDate.slice(0, 10), e);
  });

  const startOffset = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
  const todayStr = today.toISOString().slice(0, 10);

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - startOffset + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return null;
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(dayNum).padStart(2, '0');
    return { day: dayNum, dateStr: `${year}-${mm}-${dd}` };
  });

  const goBack = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const goForward = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  return (
    <div className="w-full px-6 pb-12">
      {/* Month navigation */}
      <div className="flex items-center justify-between py-4">
        <button
          onClick={goBack}
          className="flex items-center justify-center h-8 w-8 rounded-full transition-colors hover:bg-black/5"
          style={{ color: COLORS.text.body }}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <p style={{ fontFamily: FONTS.anton, fontSize: 28, color: COLORS.text.body, letterSpacing: '0.5px' }}>
          {MONTH_NAMES[month].toUpperCase()} {year}
        </p>
        <button
          onClick={goForward}
          className="flex items-center justify-center h-8 w-8 rounded-full transition-colors hover:bg-black/5"
          style={{ color: COLORS.text.body }}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div
        className="grid grid-cols-7 border-l border-t border-b"
        style={{ borderColor: COLORS.border.default }}
      >
        {DAY_HEADERS.map(d => (
          <div
            key={d}
            className="py-2 text-center border-r"
            style={{ borderColor: COLORS.border.default }}
          >
            <span
              className="text-xs"
              style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium, color: COLORS.text.muted }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className="grid grid-cols-7 border-l"
        style={{ borderColor: COLORS.border.default }}
      >
        {cells.map((cell, i) => {
          if (!cell) {
            return (
              <div
                key={i}
                className="min-h-[72px] sm:min-h-[100px] border-r border-b"
                style={{ borderColor: COLORS.border.default }}
              />
            );
          }

          const event = eventMap.get(cell.dateStr);
          const isToday = cell.dateStr === todayStr;
          const cancelled = event?.eventFields.isEventCanceled ?? false;
          const djNames = event ? getEventDjNames(event) : [];

          return (
            <div
              key={i}
              className="min-h-[72px] sm:min-h-[100px] p-1 sm:p-2 border-r border-b flex flex-col gap-1"
              style={{ borderColor: COLORS.border.default }}
            >
              {/* Day number */}
              <span
                className="text-xs sm:text-sm leading-none"
                style={{
                  fontFamily: FONTS.poppins,
                  fontWeight: isToday ? FONT_WEIGHTS.bold : FONT_WEIGHTS.regular,
                  color: isToday ? COLORS.brand.purple : COLORS.text.muted,
                }}
              >
                {cell.day}
              </span>

              {/* Event */}
              {event && (
                cancelled ? (
                  <p
                    className="text-[13px] sm:text-[36px] leading-tight"
                    style={{
                      fontFamily: FONTS.anton,
                      color: 'rgba(0,0,0,0.35)',
                      letterSpacing: '0.2px',
                    }}
                  >
                    {event.eventFields.eventCancelationReason ?? 'NO SKATING'}
                  </p>
                ) : djNames.length === 0 ? (
                  <p
                    className="text-[13px] sm:text-[36px] leading-tight"
                    style={{
                      fontFamily: FONTS.anton,
                      color: COLORS.brand.purple,
                      letterSpacing: '0.2px',
                    }}
                  >
                    Skating
                  </p>
                ) : (
                  djNames.map(name => (
                    <p
                      key={name}
                      className="text-[13px] sm:text-[36px] leading-tight cursor-pointer"
                      onClick={() => onDjClick?.(name)}
                      style={{
                        fontFamily: FONTS.anton,
                        color: COLORS.brand.purple,
                        letterSpacing: '0.2px',
                      }}
                    >
                      {name}
                    </p>
                  ))
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
