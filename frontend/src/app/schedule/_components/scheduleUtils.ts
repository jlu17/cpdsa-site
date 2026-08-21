import { SkateEvent } from '@/lib/graphql';

export const EVENT_TIME = '2:45 – 6:45 pm';

/** Returns the Monday of the week containing `date` (UTC). */
function startOfWeekUTC(date: Date): Date {
  const d = new Date(date);
  const day = d.getUTCDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // Monday-anchored
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export function splitEvents(events: SkateEvent[]): {
  thisWeek: SkateEvent[];
  upcoming: SkateEvent[];
} {
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  const weekStart = startOfWeekUTC(todayUTC);
  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekStart.getUTCDate() + 7);

  const sorted = [...events]
    .filter(e => new Date(e.eventFields.eventDate) >= todayUTC)
    .sort((a, b) =>
      new Date(a.eventFields.eventDate).getTime() - new Date(b.eventFields.eventDate).getTime()
    );

  return {
    thisWeek: sorted.filter(e => {
      const d = new Date(e.eventFields.eventDate);
      return d >= weekStart && d < weekEnd;
    }),
    upcoming: sorted.filter(e => {
      const d = new Date(e.eventFields.eventDate);
      return d >= weekEnd;
    }),
  };
}

/** Extracts ordered DJ names from an event's eventDjs field. */
export function getEventDjNames(event: SkateEvent): string[] {
  if (!event.eventFields.eventDjs) return [];
  return event.eventFields.eventDjs
    .map(dj => dj.eventDj.edges[0]?.node.djFields.djName)
    .filter((name): name is string => Boolean(name));
}

/** "SATURDAY, MAY 23" — format used in This Week section */
export function formatThisWeekDate(dateStr: string): string {
  const d = new Date(dateStr);
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = d.getUTCDate();
  return `${weekday}, ${month} ${day}`.toUpperCase();
}

/** "SATURDAY, MAY 23" — format used in Upcoming section */
export function formatUpcomingDate(dateStr: string): string {
  return formatThisWeekDate(dateStr);
}


/** Group an array into consecutive pairs: [a,b,c,d,e] → [[a,b],[c,d],[e,null]] */
export function pairUp<T>(arr: T[]): [T, T | null][] {
  const pairs: [T, T | null][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1] ?? null]);
  }
  return pairs;
}

/** Returns the Friday (UTC) that begins the weekend containing `date`. */
function weekendStartUTC(date: Date): Date {
  const d = new Date(date);
  const day = d.getUTCDay(); // 0 = Sunday ... 6 = Saturday
  const offset = (day + 2) % 7; // Fri -> 0, Sat -> 1, Sun -> 2, Mon -> 3, Tue -> 4, ...
  d.setUTCDate(d.getUTCDate() - offset);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/** Groups sorted events into weekend clusters (Friday through Monday). */
function groupByWeekend(events: SkateEvent[]): SkateEvent[][] {
  const groups: SkateEvent[][] = [];
  let currentKey: number | null = null;

  for (const event of events) {
    const key = weekendStartUTC(new Date(event.eventFields.eventDate)).getTime();
    if (key !== currentKey) {
      groups.push([]);
      currentKey = key;
    }
    groups[groups.length - 1].push(event);
  }

  return groups;
}

export interface WeekendRow {
  left: SkateEvent;
  right: SkateEvent | null;
  /** True if this row is the first row of its weekend (vs. a continuation row). */
  isNewWeekend: boolean;
}

/**
 * Pairs events into two-column rows, grouped by weekend so a new weekend
 * always starts on a fresh row — even when the prior weekend had an odd
 * number of events (e.g. a Saturday/Sunday/Monday holiday run).
 */
export function pairEventsByWeekend(events: SkateEvent[]): WeekendRow[] {
  return groupByWeekend(events).flatMap(group =>
    pairUp(group).map(([left, right], i) => ({ left, right, isNewWeekend: i === 0 }))
  );
}
