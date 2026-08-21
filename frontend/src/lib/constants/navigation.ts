export const NAV_LINKS = [
  { href: '/schedule', label: 'Schedule' },
  { href: '/visit', label: 'Visit' },
  { href: '/djs', label: 'Our DJs' },
  { href: '/about', label: 'Our Story' },
  { href: '/media', label: 'Media' },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
