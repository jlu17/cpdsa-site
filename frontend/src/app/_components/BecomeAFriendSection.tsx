'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';

const SECTION_BG = 'rgba(102, 51, 204, 0.08)';
const MEMBERSHIP_SIGNUP_URL = 'https://www.zeffy.com/en-US/ticketing/central-park-dance-skaters-association-membership';

type Tab = 'membership' | 'donate';

interface Tier {
  name: string;
  price: string;
  validity: React.ReactNode;
  perks: React.ReactNode[];
}

const TIERS: Tier[] = [
  {
    name: 'Bronze Barrel Roller',
    price: '$50',
    validity: <>2026 Membership — Valid until<br />April 18, 2027</>,
    perks: [
      <>
        <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Honey Baby Skates + Service</span>
        <br />10% off service labor
      </>,
      <>
        <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Personalized CPDSA Friend of the Circle Card</span> (pick up in the park on Memorial Day weekend)
      </>,
      <><span style={{ fontWeight: FONT_WEIGHTS.medium }}>Vote</span> in CPDSA elections</>,
    ],
  },
  {
    name: 'Silver Spinner',
    price: '$75',
    validity: <>2026 Membership — Valid until<br />April 18, 2027</>,
    perks: [
      <>
        <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Honey Baby Skates + Service</span>
        <br />10% off service labor &amp; 10% off product
      </>,
      <>
        <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Personalized CPDSA Friend of the Circle Card</span> (pick up in the park on Memorial Day weekend)
      </>,
      <><span style={{ fontWeight: FONT_WEIGHTS.medium }}>Vote</span> in CPDSA elections</>,
    ],
  },
  {
    name: 'Gold Groover',
    price: '$150',
    validity: <>2026 Membership — Valid until<br />April 18, 2027</>,
    perks: [
      <>
        <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Honey Baby Skates + Service</span>
        <br />1 full service tune-up per season
        <br />10% off service labor; 10% off product
      </>,
      <>
        <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Personalized CPDSA Friend of the Circle Card</span> (pick up in the park on Memorial Day weekend)
      </>,
      <>Vote in CPDSA elections</>,
    ],
  },
];

export default function BecomeAFriendSection() {
  const [tab, setTab] = useState<Tab>('membership');

  return (
    <section className="w-full flex flex-col gap-6 px-6 py-10" style={{ backgroundColor: SECTION_BG }}>
      <p
        className="text-black"
        style={{ fontFamily: FONTS.anton, fontSize: 64, lineHeight: 1.2 }}
      >
        BECOME A FRIEND OF THE CIRCLE
      </p>

      {/* Membership / Donate toggle */}
      <div className="flex w-fit">
        <button
          onClick={() => setTab('membership')}
          className="flex items-center justify-center h-10 px-4 rounded-l-[4px] border text-sm whitespace-nowrap"
          style={{
            backgroundColor: tab === 'membership' ? COLORS.brand.purple : 'transparent',
            borderColor: tab === 'membership' ? 'white' : COLORS.border.default,
            color: tab === 'membership' ? 'white' : COLORS.text.body,
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.medium,
          }}
        >
          Membership
        </button>
        <button
          onClick={() => setTab('donate')}
          className="flex items-center justify-center gap-2 h-10 px-4 rounded-r-[4px] border text-sm whitespace-nowrap"
          style={{
            backgroundColor: tab === 'donate' ? COLORS.brand.purple : 'transparent',
            borderColor: tab === 'donate' ? 'white' : COLORS.border.default,
            color: tab === 'donate' ? 'white' : COLORS.text.body,
            fontFamily: FONTS.poppins,
            fontWeight: FONT_WEIGHTS.medium,
          }}
        >
          <Heart size={16} />
          Donate
        </button>
      </div>

      {tab === 'membership' ? (
        <>
          {/* Membership tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TIERS.map(tier => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>

          <a
            href={MEMBERSHIP_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 w-full sm:w-fit sm:px-12 mx-auto rounded-full text-white"
            style={{ backgroundColor: COLORS.brand.purple, fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium, fontSize: 16 }}
          >
            Become a member
          </a>
        </>
      ) : (
        <div className="bg-white rounded-[8px] border-2 border-black/15 p-6">
          <p style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium, fontSize: 16, color: COLORS.text.muted }}>
            TBD information here
          </p>
        </div>
      )}
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div className="flex flex-col gap-6 bg-white rounded-[8px] border-2 border-black/15 p-6">
      <p
        className="text-black"
        style={{ fontFamily: FONTS.anton, fontSize: 40, lineHeight: 1.15 }}
      >
        {tier.name}
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-x-2 gap-y-4 items-start pb-4 border-b" style={{ borderColor: COLORS.border.default }}>
          <p
            className="w-20"
            style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.bold, fontSize: 24, color: COLORS.brand.purple, letterSpacing: '0.24px' }}
          >
            {tier.price}
          </p>
          <p
            className="flex-1 min-w-0"
            style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.regular, fontSize: 16, color: COLORS.text.muted, letterSpacing: '0.16px' }}
          >
            {tier.validity}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.bold, fontSize: 24, color: COLORS.text.body, letterSpacing: '0.24px' }}>
            Perks
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-4" style={{ fontFamily: FONTS.poppins, fontSize: 16, color: COLORS.text.muted, letterSpacing: '0.16px' }}>
            {tier.perks.map((perk, i) => (
              <li key={i}>{perk}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
