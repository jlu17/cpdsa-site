# CPDSA Site — Frontend

Next.js 14 App Router site for the Central Park Dance Skaters Association.

## Tech stack

- **Next.js 14** App Router, all pages are server components unless marked `'use client'`
- **Tailwind v4** — configured via `@import "tailwindcss"` + `@theme` block in `src/app/globals.css`; no `tailwind.config.js`
- **TypeScript**, ESLint (`eslint-config-next`), husky + lint-staged pre-commit hook that runs `next lint`
- **Data**: WordPress GraphQL backend (`NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL`); queries and types in `src/lib/graphql.ts`

## Styling conventions

**Colors** — never hardcode hex values inline. Import from `src/lib/constants/colors.ts`:
```ts
import { COLORS } from '@/lib/constants/colors';
// COLORS.brand.{green, yellow, purple}
// COLORS.text.{primary, body, muted, footerPrimary, footerMuted}
// COLORS.border.{default, subtle, footerDefault}
// COLORS.surface.{footerBg, footerIcon}
```
One-off colors used in a single component can be a local `const` at the top of that file.

**Typography** — import from `src/lib/constants/typography.ts`:
```ts
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/typography';
// FONTS.anton / FONTS.poppins  (CSS variable references)
// FONT_SIZES.sectionHeading (64) / cardHeading (36) / body (16) / etc.
// FONT_WEIGHTS.regular (400) / medium (500) / semibold (600) / bold (700)
```

**Rule**: inline `style` props for colors and font properties (no Tailwind breakpoint support on inline styles); Tailwind classes for layout, spacing, sizing, and anything that needs responsive variants.

## Responsive layout pattern

Breakpoint: `sm:` (640 px). Mobile-first.

Standard section pattern:
```tsx
<div className="flex flex-col sm:flex-row items-stretch w-full">
  {/* Fixed-width column */}
  <div className="w-full h-[300px] sm:flex-shrink-0 sm:w-[560px] sm:h-auto sm:min-h-[480px] relative">
    <Image fill className="object-cover" />
  </div>
  {/* Flexible column */}
  <div className="flex flex-col gap-6 px-6 py-8 sm:px-12 sm:py-10 flex-1">
    ...
  </div>
</div>
```

To put photo on the right on desktop while keeping it on top on mobile, add `sm:order-last` to the photo div (keep it first in DOM).

## Images

All `<img>` tags must be `<Image>` from `next/image`. Two patterns:

- **Fixed dimensions**: `<Image src="..." width={X} height={Y} />`
- **Fill parent**: wrap in a `relative` div with explicit height, then `<Image fill className="object-cover" />`

Remote hostnames allowed (`next.config.js`): `img.youtube.com`, `*.wordpress.com`, `cpdsa.org`, `localhost`. Add new domains there.

Exception: parallax images using percentage-based CSS positioning use `<img>` with `// eslint-disable-next-line @next/next/no-img-element`.

## Site constants

```ts
import { SITE } from '@/lib/constants/site';
// SITE.shortName / fullName / orgLegalName / volunteerFormUrl / googleMapsUrl
```

## Pages and key components

| Route | Page file | Notes |
|-------|-----------|-------|
| `/` | `src/app/page.tsx` | Homepage with hero, We Are, Visit, Grease, Skate Maintenance sections |
| `/about` | `src/app/about/page.tsx` | Tabs: Our Story, Our History + Grease/Skate sections below |
| `/schedule` | `src/app/schedule/page.tsx` | This Week + Upcoming; DJ names use step-down font sizing per `scheduleUtils.ts` |
| `/djs` | `src/app/djs/page.tsx` | DJ grid + slide-out drawer |
| `/visit` | `src/app/visit/page.tsx` | Desktop: tabbed (Guidelines / Directions); Mobile: stacked (both always visible) |
| `/media` | `src/app/media/page.tsx` | Tabbed press/video content |
| `/join` | `src/app/join/page.tsx` | Membership/join page |

**Shared layout components** (`src/components/`):
- `Navigation.tsx` — top nav
- `Footer.tsx` — footer with logo, quick links (hidden mobile), socials
- `GreaseSection.tsx` — parameterized Grease the Wheels section (used by About + DJs pages). Props: `photoSrc`, `photoAlt`, `bgColor`, `photoSide` (`'left'|'right'`), `textColor`, `buttons` (ReactNode), `className`
- `SkateMaintenanceSection.tsx` — parameterized Skate Maintenance section (used by About + DJs pages). Props: `photoSrc`, `photoAlt`, `objectPosition`
- `ui/PageHero.tsx` — interior page yellow Anton hero banner

**About page** (`src/app/about/_components/`):
- `AboutTabSwitcher.tsx` — handles tab state; tabs are kept on mobile
- `OurStoryTab.tsx`, `OurHistoryTab.tsx` — tab content
- `AboutGreaseSection.tsx`, `AboutSkateMaintenanceSection.tsx` — thin wrappers around shared components

**DJ page** (`src/app/djs/_components/`):
- `DJGrid.tsx` — 1 col mobile / 2 col sm / 4 col md
- `DJCard.tsx` — individual card with fill image
- `DJDrawer.tsx` — full-width on mobile, 752px on desktop; photo + bio stacked on mobile, side-by-side on desktop
- `DJGreaseSection.tsx`, `DJSkateSection.tsx` — thin wrappers around shared components

**Schedule** (`src/app/schedule/_components/`):
- `scheduleUtils.ts` — date formatting, `splitEvents`, font size step-down functions (`djFontSize`, `djFontSizeMobile`, `upcomingDjFontSize`, `upcomingDjFontSizeMobile`)
- DJ names render two `<p>` elements (`block sm:hidden` / `hidden sm:block`) to use different font sizes on mobile vs desktop

**Visit page** (`src/app/visit/_components/`):
- `TabSwitcher.tsx` — `hidden sm:block` desktop tabs + `flex sm:hidden` mobile stacked layout in same file
- `SkateMap.tsx` — uses `aspect-[643/833]` Tailwind class for proportional scaling (no fixed height)

## Running locally

```bash
npm run dev      # start dev server (port 3000)
npx next lint    # lint — runs automatically on commit via husky
```

Restart the dev server after changes to `next.config.js`.
