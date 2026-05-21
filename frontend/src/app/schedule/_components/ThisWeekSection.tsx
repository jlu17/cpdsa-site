import { CalendarDays } from 'lucide-react';
import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { formatThisWeekDate, EVENT_TIME } from './scheduleUtils';

const DATE_COLOR = '#204630';

export default function ThisWeekSection({ events }: { events: SkateEvent[] }) {
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
          This week
        </p>
      </div>

      <div className="flex flex-wrap w-full">
        {events.map((event, i) => (
          <div
            key={event.databaseId}
            className="flex flex-col justify-end px-6 py-2"
            style={{
              width: '50%',
              minHeight: 235,
              borderRight: i % 2 === 0 ? `2px solid ${COLORS.brand.purple}` : undefined,
            }}
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

            {/* DJ name */}
            <p
              className="uppercase leading-[1.05] min-w-full"
              style={{
                fontFamily: FONTS.anton,
                fontSize: 120,
                color: COLORS.brand.purple,
                letterSpacing: '0.26px',
              }}
            >
              {event.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
