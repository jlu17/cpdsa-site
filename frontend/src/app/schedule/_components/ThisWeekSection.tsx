'use client';

import { CalendarDays } from 'lucide-react';
import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { formatThisWeekDate, EVENT_TIME, getEventDjNames } from './scheduleUtils';
import DJNameDisplay from './DJNameDisplay';

const DATE_COLOR = '#204630';

export default function ThisWeekSection({ events, onDjClick, heading = 'This week' }: { events: SkateEvent[]; onDjClick?: (name: string) => void; heading?: string }) {
  if (events.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-2">
      <div className="px-6 h-[34px] flex items-center">
        <p style={{
          fontFamily: FONTS.poppins,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: 20,
          color: COLORS.text.primary,
          letterSpacing: '-0.5px',
        }}>
          {heading}
        </p>
      </div>

      <div className="flex flex-wrap w-full">
        {events.map((event, i) => (
          <div
            key={event.databaseId}
            className={`flex flex-col justify-end px-6 py-2 w-full sm:w-1/2 min-h-[130px] sm:min-h-[235px]${
              i % 2 === 0
                ? ' border-b-2 border-[#6633cc] sm:border-b-0 sm:border-r-2'
                : ''
            }`}
          >
            {/* Date + time */}
            <div className="flex items-start gap-3 mb-1">
              <CalendarDays
                size={18}
                style={{ color: DATE_COLOR, flexShrink: 0, marginTop: 2 }}
              />
              <p style={{
                fontFamily: FONTS.poppins,
                fontWeight: FONT_WEIGHTS.semibold,
                fontSize: FONT_SIZES.body,
                color: DATE_COLOR,
                letterSpacing: '0.49px',
                lineHeight: 1.25,
              }}>
                {formatThisWeekDate(event.eventFields.eventDate)}
                <br />
                {EVENT_TIME}
              </p>
            </div>

            {/* DJ name(s) */}
            {(() => {
              const names = getEventDjNames(event);
              const displayStr = names.join(' B2B ');
              return (
                <DJNameDisplay
                  names={names}
                  onDjClick={onDjClick}
                  mobileFontSize={56}
                  desktopFontSize={djFontSize(displayStr)}
                  color={COLORS.brand.purple}
                />
              );
            })()}
          </div>
        ))}
      </div>
    </section>
  );
}
