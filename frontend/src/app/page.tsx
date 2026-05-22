import Link from 'next/link';
import Image from 'next/image';
import { PiggyBank } from 'lucide-react';
import { getEvents } from '@/lib/graphql';
import { splitEvents } from './schedule/_components/scheduleUtils';
import ThisWeekSection from './schedule/_components/ThisWeekSection';

const communityPhoto = '/community-photo.jpg';
const mapPhoto = '/map-photo.jpg';
const volunteersPhoto = '/volunteers-photo.jpg';
const skatesPhoto = '/skates-photo.jpg';

export default async function Home() {
  const events = await getEvents();
  const { thisWeek, upcoming } = splitEvents(events);
  const displayEvents = thisWeek.length > 0 ? thisWeek : upcoming.slice(0, 2);

  return (
    <>
      {/* ── Upcoming Schedule ── */}
      <section className="w-full flex flex-col">
        <ThisWeekSection events={displayEvents} heading="Upcoming Schedule" />

        {/* See full Schedule button */}
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

      {/* ── We Are ── */}
      <section className="flex w-full rounded-[4px]" style={{ backgroundColor: '#2b8d01' }}>
        {/* Left: copy */}
        <div className="flex flex-col gap-2 items-start justify-center p-6 w-1/2 self-stretch">
          <p
            className="text-white whitespace-nowrap"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 64, lineHeight: 1.2 }}
          >
            WE ARE
          </p>
          <div className="pb-4 w-[550px] max-w-full">
            <p
              className="text-white text-base tracking-[0.16px]"
              style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400 }}
            >
              We are the Central Park Dance Skaters Association. We are a family-friendly organization that offers present and future generations a free, open-air, roller-skating experience with live DJs in the heart of Central Park.
            </p>
          </div>
          <Link
            href="/about"
            className="flex items-center justify-center h-10 px-4 rounded-full bg-white text-black text-sm"
            style={{ fontFamily: 'var(--font-poppins)', fontWeight: 500 }}
          >
            Our Mission
          </Link>
        </div>

        {/* Right: photo */}
        <div className="flex-1 relative overflow-hidden rounded-[4px] min-h-[327px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={communityPhoto}
            alt="CPDSA community"
            className="absolute inset-0 w-full h-[152%] object-cover max-w-none"
            style={{ top: '-11.36%' }}
          />
        </div>
      </section>

      {/* ── Visit the Skate Circle ── */}
      <section className="flex w-full rounded-[4px]">
        {/* Left: copy — narrow column like Figma (368px) */}
        <div className="flex flex-col items-start justify-between pt-6 px-6 pb-6 w-[368px] flex-shrink-0">
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
          <div className="flex flex-col mt-4">
            {['From 72nd Street', 'From West 67th Street', 'From the South entrances'].map((label) => (
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

        {/* Right: Map */}
        <div className="flex-1 relative h-[424px]">
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
      </section>

      {/* ── Grease the Wheels ── */}
      <section className="flex w-full rounded-[4px] h-[368px]">
        {/* Left: photo */}
        <div className="flex-1 relative overflow-hidden rounded-[4px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={volunteersPhoto}
            alt="CPDSA volunteers"
            className="absolute w-[113.6%] max-w-none object-cover"
            style={{ height: '143%', left: '-4.11%', top: '-18.11%' }}
          />
        </div>

        {/* Right: copy */}
        <div className="flex flex-col gap-2 items-start justify-center p-6 w-1/2">
          <p
            className="text-black whitespace-nowrap"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 64, lineHeight: 1.2 }}
          >
            GREASE THE WHEELS
          </p>
          <div className="pb-4 w-[550px] max-w-full">
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

      {/* ── Skate Maintenance ── */}
      <section className="flex w-full rounded-[4px]">
        {/* Left: copy */}
        <div className="flex flex-col gap-2 items-start justify-center p-6 w-1/2">
          <p
            className="whitespace-nowrap"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 64, lineHeight: 1.2, color: 'rgba(0,0,0,0.9)' }}
          >
            SKATE MAINTENANCE
          </p>
          <div className="pb-4 w-[550px] max-w-full">
            <p
              className="text-base tracking-[0.16px]"
              style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400, color: 'rgba(0,0,0,0.9)' }}
            >
              The CPDSA is only run by volunteers. We need your help in the fields of administration and operation, including setting up and breaking down the skate circle for each session.
            </p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSexample/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 px-4 rounded-full text-white text-sm"
            style={{ backgroundColor: '#6633cc', fontFamily: 'var(--font-poppins)', fontWeight: 500 }}
          >
            Volunteer with us
          </a>
        </div>

        {/* Right: b&w skates photo */}
        <div className="w-1/2 relative overflow-hidden rounded-[4px] h-[315px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skatesPhoto}
            alt="Roller skates"
            className="absolute max-w-none"
            style={{ width: '106.59%', height: '428%', left: '-2.87%', top: '-313.76%' }}
          />
        </div>
      </section>
    </>
  );
}
