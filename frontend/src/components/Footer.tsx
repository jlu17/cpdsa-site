import Link from 'next/link';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';
import { FOOTER_LINK_GROUPS, FOOTER_LEGAL_LINKS, SOCIAL_LINKS } from '@/lib/constants/footer';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: COLORS.surface.footerBg }} className="w-full">
      <div className="max-w-[1440px] mx-auto px-8 pt-8 pb-6 flex flex-col gap-6">

        {/* Top row */}
        <div
          className="flex gap-[94px] items-start pb-6 w-full"
          style={{ borderBottom: `1px solid ${COLORS.border.footerDefault}` }}
        >
          {/* Org info */}
          <div className="flex gap-[17px] items-center w-[486px] flex-shrink-0">
            <img src="/footer-logo.png" alt={SITE.shortName} className="h-[80px] w-[64px] flex-shrink-0" />
            <p className="text-sm h-[90px] w-[334px]" style={{ fontFamily: FONTS.poppins, color: COLORS.text.footerMuted, letterSpacing: '-0.15px' }}>
              <span style={{ fontWeight: FONT_WEIGHTS.semibold, color: COLORS.text.footerPrimary }}>
                {SITE.orgLegalName}
              </span>
              <br />
              <span style={{ fontWeight: FONT_WEIGHTS.regular }}>{SITE.orgDescription}</span>
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-[15px]">
            <p className="text-sm whitespace-nowrap" style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.text.footerPrimary }}>
              Quick links
            </p>
            <div className="flex gap-12 text-sm" style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.regular, color: COLORS.text.footerMuted }}>
              {FOOTER_LINK_GROUPS.map((col, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {col.map((l) => (
                    <Link key={l.href} href={l.href} className="hover:text-white transition-colors whitespace-nowrap">
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4 ml-auto">
            <p className="text-sm whitespace-nowrap" style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.text.footerPrimary }}>
              Socials
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, svgPath }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center h-10 w-10 rounded-full"
                  style={{ backgroundColor: COLORS.surface.footerIcon }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.text.footerPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={svgPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between w-full">
          <p className="text-xs whitespace-nowrap" style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium, color: COLORS.text.footerMuted, letterSpacing: '-0.15px' }}>
            © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
          </p>
          <div className="flex gap-10">
            {FOOTER_LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs hover:text-white transition-colors"
                style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium, color: COLORS.text.footerMuted }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
