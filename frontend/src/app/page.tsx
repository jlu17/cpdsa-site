import Link from 'next/link';
import Image from 'next/image';
import { PiggyBank } from 'lucide-react';
import { getEvents } from '@/lib/graphql';
import { splitEvents } from './schedule/_components/scheduleUtils';
import ThisWeekSection from './schedule/_components/ThisWeekSection';

const communityPhoto = '/community-photo.jpg';
const mapPhoto = '/map-photo.jpg';
const volunteersPhoto = '/volunteers-photo.jpg';

const directionLinks = ['From 72nd Street', 'From West 67th Street', 'From the South entrances'];

export default async function Home() {
  const events = await getEvents();
  const { thisWeek, upcoming } = splitEvents(events);
  const displayEvents = thisWeek.length > 0 ? thisWeek : upcoming.slice(0, 2);

  return (
    <>
      {/* ── Hero ── */}
      <section className="flex flex-col sm:flex-row items-stretch w-full" style={{ backgroundColor: '#2b8d01' }}>
        {/* Text */}
        <div className="flex flex-col gap-6 items-start justify-center px-6 py-10 sm:px-12 sm:py-20 w-full sm:w-[514px] sm:flex-shrink-0">
          <p
            className="block sm:hidden text-white uppercase"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 48, lineHeight: 0.95 }}
          >
            WE ARE<br />THE<br /><span style={{ color: '#c8ffc1' }}>CPDSA</span>
          </p>
          <p
            className="hidden sm:block text-white uppercase"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 120, lineHeight: 0.9 }}
          >
            WE ARE<br />THE<br /><span style={{ color: '#c8ffc1' }}>CPDSA</span>
          </p>
          <p
            className="text-white text-base tracking-[0.16px]"
            style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400 }}
          >
            We are the Central Park Dance Skaters Association. We are a family-friendly organization that offers present and future generations a free, open-air, roller-skating experience with live DJs in the heart of Central Park.
          </p>
          <Link
            href="/about"
            className="flex items-center justify-center h-10 px-4 rounded-full text-black text-sm"
            style={{ backgroundColor: '#c8ffc1', fontFamily: 'var(--font-poppins)', fontWeight: 500 }}
          >
            Our Mission
          </Link>
        </div>

        {/* Photo */}
        <div className="w-full h-[300px] sm:h-auto sm:flex-1 sm:min-h-[520px] relative overflow-hidden">
          <Image
            src={communityPhoto}
            alt="CPDSA community gathered at the Skate Circle"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Upcoming Schedule ── */}
      <section className="w-full flex flex-col">
        <ThisWeekSection events={displayEvents} heading="Upcoming Schedule" showBackground={false} />

        <div className="flex items-center h-[75px] px-6">
          <Link
            href="/schedule"
            className="flex items-center justify-center h-10 px-4 rounded-full text-white text-sm"
            style={{ backgroundColor: '#6633CC', fontFamily: 'var(--font-poppins)', fontWeight: 500 }}
          >
            See full Schedule
          </Link>
        </div>
      </section>

      {/* ── Visit the Skate Circle ── */}
      <section className="flex flex-col sm:flex-row w-full rounded-[4px]">
        {/* Text column */}
        <div className="flex flex-col items-start p-6 w-full sm:w-[368px] sm:flex-shrink-0 sm:justify-between">
          <div>
            <p
              className="text-black leading-none"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 64 }}
            >
              VISIT THE<br />SKATE CIRCLE
            </p>
            <p
              className="text-black text-base tracking-[0.16px] mt-4"
              style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400 }}
            >
              Please note that there is no skating session on the days Central Park hosts special events. Children under the age of 14 will need a helmet.
            </p>
          </div>
          {/* Direction links — desktop only (inside text column) */}
          <div className="hidden sm:flex flex-col mt-4">
            {directionLinks.map((label) => (
              <a
                key={label}
                href={`/visit#${label.toLowerCase().replace(/\s+/g, '-')}`}
                className="py-2 text-base underline whitespace-nowrap tracking-[0.49px] capitalize"
                style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, color: '#6633cc' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="relative w-full h-[300px] sm:flex-1 sm:h-[424px]">
          <Image
            src={mapPhoto}
            alt="Map of the Skate Circle in Central Park"
            fill
            className="object-cover rounded-[4px]"
          />
          <a
            href="https://maps.google.com/?q=Skaters+Circle+Central+Park+New+York"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 left-6 flex items-center justify-center h-10 px-4 rounded-full bg-black text-white text-sm"
            style={{ fontFamily: 'var(--font-poppins)', fontWeight: 500 }}
          >
            Google Maps
          </a>
        </div>

        {/* Direction links — mobile only (below map) */}
        <div className="flex sm:hidden flex-col px-6 pb-2">
          {directionLinks.map((label) => (
            <a
              key={label}
              href={`/visit#${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="py-2 text-base underline whitespace-nowrap tracking-[0.49px] capitalize"
              style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, color: '#6633cc' }}
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* ── Grease the Wheels ── */}
      <section className="flex flex-col sm:flex-row w-full rounded-[4px] sm:h-[368px]">
        {/* Photo (top on mobile, left on desktop) */}
        <div className="w-full h-[327px] sm:h-auto sm:flex-1 relative overflow-hidden rounded-[4px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={volunteersPhoto}
            alt="CPDSA volunteers"
            className="absolute w-[113.6%] max-w-none object-cover"
            style={{ height: '143%', left: '-4.11%', top: '-18.11%' }}
          />
        </div>

        {/* Text (bottom on mobile, right on desktop) */}
        <div className="flex flex-col gap-2 items-start justify-center p-6 w-full sm:w-1/2">
          <p
            className="text-black"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 64, lineHeight: 1.2 }}
          >
            GREASE THE WHEELS
          </p>
          <div className="pb-4 max-w-full">
            <p
              className="text-black text-base tracking-[0.16px]"
              style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400 }}
            >
              We are a nonprofit organization, and memberships and donations allow us to pay for permits, sound equipment, and other essential operating costs necessary to keep the CPDSA Skate Circle rolling.<br />
              Without your support there is no Skate Circle.
            </p>
          </div>
          <a
            href="/donate"
            className="flex items-center gap-2 h-10 px-4 rounded-full text-white text-sm"
            style={{ backgroundColor: '#6633cc', fontFamily: 'var(--font-poppins)', fontWeight: 500 }}
          >
            <PiggyBank size={15} />
            Donate to CPDSA
          </a>
        </div>
      </section>
    </>
  );
}
