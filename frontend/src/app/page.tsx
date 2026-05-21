import Link from 'next/link';
import { PiggyBank } from 'lucide-react';
import { getUpcomingEvents } from '@/lib/graphql';

const communityPhoto = '/community-photo.jpg';
const mapPhoto = '/map-photo.jpg';
const volunteersPhoto = '/volunteers-photo.jpg';
const skatesPhoto = '/skates-photo.jpg';

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
    monthDay: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
}

export default async function Home() {
  const events = await getUpcomingEvents();
  const next2 = events.slice(0, 2);

  return (
    <>
      {/* ── Upcoming Schedule ── */}
      <section className="w-full">
        {/* Heading */}
        <div className="flex items-center h-[34px] px-6">
          <p style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 20, lineHeight: '40px', letterSpacing: '-0.5px' }}>
            Upcoming Schedule
          </p>
        </div>

        {/* Two event columns */}
        <div className="flex w-full">
          {next2.map((event, i) => {
            const { weekday, monthDay } = formatEventDate(event.date);
            const djName = event.eventFields?.djName ?? event.title;
            const isFirst = i === 0;

            return (
              <div
                key={event.id}
                className="flex flex-col items-start justify-end px-6 py-4 flex-1"
                style={isFirst ? { borderRight: '2px solid #6633CC' } : {}}
              >
                {/* Date row */}
                <div className="flex items-center gap-3 mb-1">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4.82143 0C5.3558 0 5.78571 0.445833 5.78571 1V2.66667H12.2143V1C12.2143 0.445833 12.6442 0 13.1786 0C13.7129 0 14.1429 0.445833 14.1429 1V2.66667H15.4286C16.8469 2.66667 18 3.8625 18 5.33333V17.3333C18 18.8042 16.8469 20 15.4286 20H2.57143C1.15313 20 0 18.8042 0 17.3333V5.33333C0 3.8625 1.15313 2.66667 2.57143 2.66667H3.85714V1C3.85714 0.445833 4.28705 0 4.82143 0ZM15.4286 18C15.7821 18 16.0714 17.7 16.0714 17.3333V14.6667H12.5357V18H15.4286ZM16.0714 12.6667V9.33333H12.5357V12.6667H16.0714ZM10.6071 12.6667V9.33333H7.39286V12.6667H10.6071ZM5.46429 12.6667V9.33333H1.92857V12.6667H5.46429ZM1.92857 14.6667V17.3333C1.92857 17.7 2.21786 18 2.57143 18H5.46429V14.6667H1.92857ZM7.39286 14.6667V18H10.6071V14.6667H7.39286ZM4.82143 4.66667H2.57143C2.21786 4.66667 1.92857 4.96667 1.92857 5.33333V7.33333H16.0714V5.33333C16.0714 4.96667 15.7821 4.66667 15.4286 4.66667H4.82143Z" fill="#6633CC"/>
                  </svg>
                  <p
                    className="uppercase whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 16, lineHeight: '20px', letterSpacing: '0.49px', color: '#204630' }}
                  >
                    {weekday}, {monthDay}
                    <br />
                    2:45 – 6:45 PM
                  </p>
                </div>

                {/* Giant DJ name */}
                <div
                  className="min-w-full overflow-x-hidden"
                  style={{
                    fontFamily: 'var(--font-anton)',
                    fontSize: 100,
                    color: '#6633CC',
                  }}
                >
                  <p>{djName}</p>
                </div>
              </div>
            );
          })}
        </div>

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
          <img
            src={mapPhoto}
            alt="Map of the Skate Circle in Central Park"
            className="absolute inset-0 w-full h-full object-cover rounded-[4px]"
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
