import { Fragment } from 'react';
import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { formatUpcomingDate, EVENT_TIME, getEventDjNames, pairEventsByWeekend } from './scheduleUtils';

const DJ_FONT_SIZE = 56;
import DJNameDisplay from './DJNameDisplay';

const DATE_COLOR = '#204630';

export default function UpcomingSection({ events, onDjClick }: { events: SkateEvent[]; onDjClick?: (name: string) => void }) {
  if (events.length === 0) return null;

  return (
    <section className="w-full flex flex-col pb-12">
      <div className="px-6 py-2 h-[42px] flex items-center">
        <p style={{
          fontFamily: FONTS.poppins,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: 20,
          color: COLORS.text.primary,
          letterSpacing: '-0.5px',
        }}>
          Upcoming
        </p>
      </div>

      <div className="flex flex-wrap w-full">
        {pairEventsByWeekend(events).map(({ left, right, isNewWeekend }) => (
          <Fragment key={left.databaseId}>
            <EventCell event={left} showTopBorder={isNewWeekend} onDjClick={onDjClick} />
            {right ? (
              <EventCell event={right} showTopBorder={isNewWeekend} onDjClick={onDjClick} />
            ) : (
              <div className="hidden sm:block w-1/2" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function EventCell({
  event,
  showTopBorder,
  onDjClick,
}: {
  event: SkateEvent;
  showTopBorder: boolean;
  onDjClick?: (name: string) => void;
}) {
  return (
    <div
      className={`flex flex-col justify-end px-6 py-2 w-full sm:w-1/2${
        showTopBorder ? ' border-t border-black/15' : ''
      }`}
    >
      {/* Date + time */}
      <p style={{
        fontFamily: FONTS.poppins,
        fontWeight: FONT_WEIGHTS.semibold,
        fontSize: FONT_SIZES.body,
        color: DATE_COLOR,
        letterSpacing: '0.49px',
        lineHeight: 1.4,
        marginBottom: 4,
      }}>
        <span style={{ fontSize: FONT_SIZES.body + 6 }}>
          {formatUpcomingDate(event.eventFields.eventDate)}
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

      {/* DJ name(s) */}
      <DJNameDisplay
        names={getEventDjNames(event)}
        onDjClick={onDjClick}
        mobileFontSize={48}
        desktopFontSize={DJ_FONT_SIZE}
        color={COLORS.brand.green}
        cancelled={event.eventFields.isEventCanceled ?? false}
        cancelReason={event.eventFields.eventCancelationReason}
      />
    </div>
  );
}
