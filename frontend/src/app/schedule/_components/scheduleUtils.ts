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

/** "SATURDAY, MAY 23" — format used in This Week section */
export function formatThisWeekDate(dateStr: string): string {
  const d = new Date(dateStr);
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = d.getUTCDate();
  return `${weekday}, ${month} ${day}`.toUpperCase();
}

/** "MAY 23, SATURDAY" — format used in Upcoming section */
export function formatUpcomingDate(dateStr: string): string {
  const d = new Date(dateStr);
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = d.getUTCDate();
  return `${month} ${day}, ${weekday}`.toUpperCase();
}

/** Scales down the DJ name font size for the Upcoming section so long single words stay in column. */
export function upcomingDjFontSize(name: string): number {
  const len = name.length;
  if (len <= 12) return 92;
  if (len <= 16) return 80;
  if (len <= 22) return 68;
  return 56;
}


/** Group an array into consecutive pairs: [a,b,c,d,e] → [[a,b],[c,d],[e,null]] */
export function pairUp<T>(arr: T[]): [T, T | null][] {
  const pairs: [T, T | null][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1] ?? null]);
  }
  return pairs;
}
