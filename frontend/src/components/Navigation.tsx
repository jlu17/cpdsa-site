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
      <div className="max-w-[1440px] mx-auto h-[80px] flex items-center gap-4 px-6">
        <Link href="/" className="flex-shrink-0">
          <img
            src="/cpdsa-logo.png"
            alt="CPDSA"
            className="h-[60px] w-auto"
            style={{ mixBlendMode: 'multiply' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center flex-1 justify-end">
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
          href="/join"
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
            href="/join"
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
