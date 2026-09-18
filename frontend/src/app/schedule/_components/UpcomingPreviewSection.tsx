import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { SkateEvent } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
import { formatThisWeekDate, getEventDjs } from './scheduleUtils';

const DATE_COLOR = '#204630';
const FALLBACK_BG = '#a7a7a7';

export default function UpcomingPreviewSection({ events }: { events: SkateEvent[] }) {
  if (events.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-4 py-4">
      <div className="px-6 flex items-center justify-between gap-4 flex-wrap">
        <p
          style={{ fontFamily: FONTS.anton, fontSize: FONT_SIZES.sectionHeading, lineHeight: 1.2, color: COLORS.brand.purple }}
        >
          UPCOMING AT THE CIRCLE
        </p>
        <Link
          href="/schedule"
          className="flex items-center justify-center h-10 px-4 rounded-full text-white text-sm whitespace-nowrap"
          style={{ backgroundColor: COLORS.brand.purple, fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium }}
        >
          See full Schedule
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {events.map(event => (
          <EventCard key={event.databaseId} event={event} />
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: SkateEvent }) {
  const djs = getEventDjs(event);
  const cancelled = event.eventFields.isEventCanceled ?? false;

  return (
    <div className="flex flex-col gap-2">
      {/* Date + time */}
      <div className="flex items-start gap-2">
        <CalendarDays size={18} style={{ color: DATE_COLOR, flexShrink: 0, marginTop: 2 }} />
        <p style={{
          fontFamily: FONTS.poppins,
          fontWeight: FONT_WEIGHTS.semibold,
          fontSize: FONT_SIZES.body,
          color: DATE_COLOR,
          letterSpacing: '0.3px',
          lineHeight: 1.35,
        }}>
          {formatThisWeekDate(event.eventFields.eventDate)}
        </p>
      </div>

      {/* Photo tile(s) — split side-by-side when more than one DJ shares the slot */}
      <div className="flex gap-1 w-full aspect-square rounded-[4px] overflow-hidden">
        {djs.length > 0 ? (
          djs.map(dj => (
            <PhotoTile
              key={dj.name}
              name={dj.name}
              photoUrl={dj.photoUrl}
              photoAlt={dj.photoAlt}
              cancelled={cancelled}
              compact={djs.length > 1}
            />
          ))
        ) : (
          <PhotoTile
            name={cancelled ? (event.eventFields.eventCancelationReason ?? 'No Skating') : 'Skating'}
            photoUrl={null}
            photoAlt=""
            cancelled={cancelled}
            compact={false}
          />
        )}
      </div>
    </div>
  );
}

function PhotoTile({
  name,
  photoUrl,
  photoAlt,
  cancelled,
  compact,
}: {
  name: string;
  photoUrl: string | null;
  photoAlt: string;
  cancelled: boolean;
  compact: boolean;
}) {
  return (
    <div
      className="relative flex-1 h-full min-w-0"
      style={{ backgroundColor: cancelled ? '#e5e5e5' : FALLBACK_BG }}
    >
      {photoUrl && !cancelled && (
        <Image src={photoUrl} alt={photoAlt} fill className="object-cover" />
      )}

      {/* Vignette — darkens the bottom edge so the name stays legible over any photo */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)' }}
      />

      <p
        className="absolute bottom-0 left-0 right-0 p-3 uppercase leading-[1.1] truncate"
        style={{
          fontFamily: FONTS.anton,
          fontSize: compact ? 16 : 22,
          color: cancelled ? 'rgba(0,0,0,0.6)' : '#ffffff',
        }}
      >
        {name}
      </p>
    </div>
  );
}
