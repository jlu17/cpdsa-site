'use client';

import { Fragment } from 'react';
import { CalendarDays } from 'lucide-react';
import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { formatThisWeekDate, EVENT_TIME, getEventDjNames, pairEventsByWeekend } from './scheduleUtils';

const DJ_FONT_SIZE = 72;
import DJNameDisplay from './DJNameDisplay';

const DATE_COLOR = '#204630';
const SECTION_BG = 'rgba(102, 51, 204, 0.08)';

export default function ThisWeekSection({ events, onDjClick, heading = 'This week', showBackground = true }: { events: SkateEvent[]; onDjClick?: (name: string) => void; heading?: string; showBackground?: boolean }) {
  if (events.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-2 py-4" style={{ backgroundColor: showBackground ? SECTION_BG : 'transparent' }}>
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
        {pairEventsByWeekend(events).map(({ left, right }) => (
          <Fragment key={left.databaseId}>
            <EventCard event={left} bordered onDjClick={onDjClick} />
            {right ? (
              <EventCard event={right} bordered={false} onDjClick={onDjClick} />
            ) : (
              <div className="hidden sm:block w-1/2" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function EventCard({
  event,
  bordered,
  onDjClick,
}: {
  event: SkateEvent;
  bordered: boolean;
  onDjClick?: (name: string) => void;
}) {
  return (
    <div
      className={`flex flex-col justify-end px-6 py-2 w-full sm:w-1/2${
        bordered ? ' border-b-2 border-[#6633cc] sm:border-b-0 sm:border-r-2' : ''
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
          <span style={{ fontSize: FONT_SIZES.body + 6 }}>
            {formatThisWeekDate(event.eventFields.eventDate)}
          </span>
          {event.eventFields.eventHelperText && (
            <span
              className="inline-block align-middle"
              style={{
                backgroundColor: '#fff',
                color: DATE_COLOR,
                border: `1.5px solid ${DATE_COLOR}`,
                fontSize: 12,
                fontWeight: FONT_WEIGHTS.semibold,
                letterSpacing: '0.3px',
                padding: '2px 8px',
                borderRadius: 9999,
                marginLeft: 8,
              }}
            >
              {event.eventFields.eventHelperText}
            </span>
          )}
          <br />
          {EVENT_TIME}
        </p>
      </div>

      {/* DJ name(s) */}
      <DJNameDisplay
        names={getEventDjNames(event)}
        onDjClick={onDjClick}
        mobileFontSize={56}
        desktopFontSize={DJ_FONT_SIZE}
        color={COLORS.brand.purple}
        cancelled={event.eventFields.isEventCanceled ?? false}
        cancelReason={event.eventFields.eventCancelationReason}
      />
    </div>
  );
}
