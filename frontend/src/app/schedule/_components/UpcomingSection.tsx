import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { formatUpcomingDate, EVENT_TIME, upcomingDjFontSize } from './scheduleUtils';

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
        {events.map((event, i) => (
          <EventCell
            key={event.databaseId}
            event={event}
            isLeft={i % 2 === 0}
            onDjClick={onDjClick}
          />
        ))}
      </div>
    </section>
  );
}

function EventCell({
  event,
  isLeft,
  onDjClick,
}: {
  event: SkateEvent;
  isLeft: boolean;
  onDjClick?: (name: string) => void;
}) {
  return (
    <div
      className={`flex flex-col justify-end px-6 py-2 w-full sm:w-1/2 min-h-[100px] sm:min-h-[180px] border-t border-black/15${
        isLeft ? ' sm:border-r sm:border-r-black/15' : ''
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
        {formatUpcomingDate(event.eventFields.eventDate)}
        <br />
        {EVENT_TIME}
      </p>

      {/* DJ name — smaller on mobile, larger on desktop */}
      <p
        className="block sm:hidden uppercase leading-[1.05] w-full"
        onClick={() => onDjClick?.(event.title)}
        style={{
          fontFamily: FONTS.anton,
          fontSize: 48,
          color: COLORS.brand.green,
          letterSpacing: '0.26px',
          cursor: onDjClick ? 'pointer' : undefined,
        }}
      >
        {event.title}
      </p>
      <p
        className="hidden sm:block uppercase leading-[1.05] w-full"
        onClick={() => onDjClick?.(event.title)}
        style={{
          fontFamily: FONTS.anton,
          fontSize: upcomingDjFontSize(event.title),
          color: COLORS.brand.green,
          letterSpacing: '0.26px',
          cursor: onDjClick ? 'pointer' : undefined,
        }}
      >
        {event.title}
      </p>
    </div>
  );
}
