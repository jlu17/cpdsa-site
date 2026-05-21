'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { PiggyBank, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants/navigation';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 h-[122px] flex items-center gap-4">
        <Link href="/" className="flex-shrink-0">
          <img
            src="/cpdsa-logo.webp"
            alt="CPDSA"
            className="h-[100px] w-auto"
            style={{ mixBlendMode: 'multiply' }}
          />
        </Link>

        {/* Weather widget */}
        <div
          className="hidden md:flex items-center gap-3 px-2 py-4 rounded-[14px] shadow-md flex-shrink-0"
          style={{ border: `2px solid ${COLORS.ui.weatherBorder}`, height: 48 }}
        >
          <WeatherIcon />
          <div className="flex items-start leading-none">
            <span style={{ fontFamily: FONTS.anton, fontSize: 32, lineHeight: '40px', letterSpacing: '0.37px' }}>
              72
            </span>
            <span style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.light, fontSize: 20, lineHeight: '28px', letterSpacing: '-0.45px', marginTop: 6 }}>
              °F
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center flex-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center h-12 px-6 text-sm whitespace-nowrap tracking-[0.14px] transition-colors"
                style={{
                  fontFamily: FONTS.poppins,
                  fontWeight: active ? FONT_WEIGHTS.bold : FONT_WEIGHTS.medium,
                  color: active ? COLORS.text.body : COLORS.text.primary,
                  borderBottom: active ? `3px solid ${COLORS.brand.purple}` : '3px solid transparent',
                  borderRadius: active ? '4px 4px 0 0' : undefined,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/donate"
          className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-full text-white text-sm whitespace-nowrap"
          style={{ backgroundColor: COLORS.brand.purple, fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium }}
        >
          <PiggyBank size={15} />
          Donate
        </Link>

        <button className="md:hidden ml-auto p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 flex flex-col gap-4 text-sm"
          style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: isActive(link.href) ? COLORS.brand.purple : COLORS.text.primary }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-white w-fit"
            style={{ backgroundColor: COLORS.brand.purple }}
          >
            <PiggyBank size={15} />
            Donate
          </Link>
        </div>
      )}
    </header>
  );
}

function WeatherIcon() {
  return (
    <svg width="32" height="30" viewBox="0 0 32 30" fill="none" aria-hidden="true">
      <circle cx="16" cy="15" r="7" fill={COLORS.brand.yellow} />
      {[0, 45, 90, 135].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return (
          <g key={deg}>
            <line x1={16 + cos * 9} y1={15 + sin * 9} x2={16 + cos * 13} y2={15 + sin * 13} stroke={COLORS.brand.yellow} strokeWidth="2" strokeLinecap="round" />
            <line x1={16 - cos * 9} y1={15 - sin * 9} x2={16 - cos * 13} y2={15 - sin * 13} stroke={COLORS.brand.yellow} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}
