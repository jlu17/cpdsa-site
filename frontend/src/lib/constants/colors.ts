/**
 * Brand color tokens — single source of truth.
 * All inline style color references should import from here.
 * Tailwind utility classes (e.g. bg-white, text-black) are fine as-is.
 */
export const COLORS = {
  brand: {
    green: '#2b8d01',
    yellow: '#fec603',
    purple: '#6633cc',
  },
  ui: {
    weatherBorder: '#51a2ff',
    bench: '#da1026',
  },
  text: {
    primary: '#1e1e1e',
    body: 'rgba(0,0,0,0.9)',
    muted: 'rgba(0,0,0,0.6)',
    footerPrimary: 'rgba(255,255,255,0.9)',
    footerMuted: 'rgba(255,255,255,0.6)',
  },
  border: {
    default: 'rgba(0,0,0,0.15)',
    subtle: 'rgba(0,0,0,0.4)',
    footerDefault: 'rgba(255,255,255,0.15)',
  },
  surface: {
    footerBg: '#140f1d',
    footerIcon: 'rgba(255,255,255,0.15)',
  },
} as const;
