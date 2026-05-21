import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { formatUpcomingDate, pairUp, EVENT_TIME } from './scheduleUtils';

const DATE_COLOR = '#204630';

export default function UpcomingSection({ events }: { events: SkateEvent[] }) {
  if (events.length === 0) return null;

  const rows = pairUp(events);

  return (
    <section className="w-full flex flex-col">
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

      {rows.map(([left, right], rowIndex) => (
        <div
          key={left.databaseId}
          className="flex flex-wrap w-full"
          style={{ borderTop: `1px solid ${COLORS.border.default}` }}
        >
          {/* Left cell */}
          <EventCell event={left} position="left" />

          {/* Right cell — empty placeholder keeps layout if odd total */}
          {right
            ? <EventCell event={right} position="right" />
            : <div style={{ width: '50%' }} />
          }
        </div>
      ))}
    </section>
  );
}

function EventCell({
  event,
  position,
}: {
  event: SkateEvent;
  position: 'left' | 'right';
}) {
  return (
    <div
      className="flex flex-col justify-end px-6 py-2"
      style={{
        width: '50%',
        minHeight: 180,
        borderRight: position === 'left' ? `1px solid ${COLORS.border.default}` : undefined,
      }}
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
        {formatUpcomingDate(event.eventFields.eventDate)}
        <br />
        {EVENT_TIME}
      </p>

      {/* DJ name */}
      <p
        className="uppercase leading-[1.05] min-w-full"
        style={{
          fontFamily: FONTS.anton,
          fontSize: FONT_SIZES.scheduleEvent,
          color: COLORS.brand.green,
          letterSpacing: '0.26px',
        }}
      >
        {event.title}
      </p>
    </div>
  );
}
