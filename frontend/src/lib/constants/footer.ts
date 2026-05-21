export const FOOTER_LINK_GROUPS: Array<Array<{ label: string; href: string }>> = [
  [
    { label: 'About us', href: '/about' },
    { label: 'Our history', href: '/about#history' },
  ],
  [
    { label: 'Schedule', href: '/schedule' },
    { label: 'Media', href: '/media' },
  ],
  [
    { label: "FAQ's", href: '/faq' },
    { label: 'Contact us', href: '/contact' },
  ],
];

export const FOOTER_LEGAL_LINKS: Array<{ label: string; href: string }> = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export const SOCIAL_LINKS: Array<{ label: string; href: string; svgPath: string }> = [
  {
    label: 'Facebook',
    href: '#',
    svgPath: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'Instagram',
    href: '#',
    svgPath:
      'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z',
  },
  {
    label: 'X',
    href: '#',
    svgPath: 'M4 4l16 16M4 20L20 4',
  },
  {
    label: 'YouTube',
    href: '#',
    svgPath:
      'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  },
];
