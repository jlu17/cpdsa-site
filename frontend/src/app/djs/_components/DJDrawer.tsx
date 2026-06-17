'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Globe } from 'lucide-react';
import { DJ } from '@/lib/graphql';
import { FONTS, FONT_WEIGHTS, FONT_SIZES } from '@/lib/constants/typography';

const ICON_COLOR = 'rgba(255,255,255,0.9)';

const SOCIAL_PLATFORMS = [
  {
    key: 'djInstagramLink' as const,
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z" />
      </svg>
    ),
  },
  {
    key: 'djSoundcloudLink' as const,
    label: 'SoundCloud',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={ICON_COLOR}>
        <path d="M11.5 8.87V17h9.13a2.72 2.72 0 0 0 0-5.44c-.14 0-.28.01-.42.03A5.32 5.32 0 0 0 11.5 8.87zM2.81 13.01a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 0 0-2.4 0zm1.94-.98v2.44c-.3.14-.62.22-.94.22V11.8c.32 0 .64.08.94.2zm1.69-.53v3.15c-.3.12-.62.19-.94.19V11.3c.32 0 .64.07.94.2zm1.69-1v4.65c-.3.1-.62.16-.94.16V10.3c.32 0 .64.07.94.2zm1.69-1v6.15c-.3.1-.62.15-.94.15V9.34c.32 0 .64.06.94.16z" />
      </svg>
    ),
  },
  {
    key: 'djMixcloudLink' as const,
    label: 'Mixcloud',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={ICON_COLOR}>
        <path d="M2 20L7 6l5 8 5-8 5 14H2z" />
      </svg>
    ),
  },
  {
    key: 'djYoutubeLink' as const,
    label: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    key: 'djFacebookLink' as const,
    label: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    key: 'djWebsiteLink' as const,
    label: 'Website',
    icon: <Globe size={18} stroke={ICON_COLOR} />,
  },
];

export default function DJDrawer({ dj, onClose }: { dj: DJ; onClose: () => void }) {
  const { djName, djBio, djPhoto, djSocials } = dj.djFields;
  const photoUrl = djPhoto?.node.sourceUrl ?? '';
  const altText = djPhoto?.node.altText || djName;

  // Trigger transition after first paint so the browser sees the starting position
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Slide out, then unmount
  const handleClose = () => setVisible(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 300ms ease-in-out',
        }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative flex flex-col gap-6 overflow-y-auto px-8 py-10 w-full sm:w-[752px]"
        style={{
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.92)',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 320ms ease-in-out',
        }}
        onTransitionEnd={() => { if (!visible) onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label={djName}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 flex items-center justify-center rounded-full"
          style={{ color: 'rgba(255,255,255,0.9)' }}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Name */}
        <p
          style={{
            fontFamily: FONTS.anton,
            fontSize: 49,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '0.26px',
          }}
        >
          {djName}
        </p>

        {/* Photo + bio — always stacked */}
        <div className="flex flex-col gap-6">
          {photoUrl && (
            <div className="relative w-full max-w-[400px] aspect-square rounded-[4px] overflow-hidden">
              <Image
                src={photoUrl}
                alt={altText}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* Social links */}
          {djSocials && (
            <div className="flex gap-3">
              {SOCIAL_PLATFORMS.filter(p => djSocials[p.key]).map(({ key, label, icon }) => (
                <a
                  key={key}
                  href={djSocials[key]!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          )}

          <p
            style={{
              fontFamily: FONTS.poppins,
              fontWeight: FONT_WEIGHTS.regular,
              fontSize: FONT_SIZES.body,
              color: 'rgba(247,223,223,0.9)',
              letterSpacing: '0.16px',
              lineHeight: 1.6,
            }}
          >
            {djBio}
          </p>
        </div>
      </div>
    </div>
  );
}
