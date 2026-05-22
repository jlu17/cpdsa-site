export const NAV_LINKS = [
  { href: '/schedule', label: 'Schedule' },
  { href: '/visit', label: 'The Skate Circle' },
  { href: '/djs', label: 'Our DJs' },
  { href: '/about', label: 'Our Story' },
  { href: '/join', label: 'Join us' },
  { href: '/media', label: 'Media' },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
