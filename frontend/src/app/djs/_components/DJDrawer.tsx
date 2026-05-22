'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { DJ } from '@/lib/graphql';
import { FONTS, FONT_WEIGHTS, FONT_SIZES } from '@/lib/constants/typography';

export default function DJDrawer({ dj, onClose }: { dj: DJ; onClose: () => void }) {
  const { djName, djBio, djPhoto } = dj.djFields;
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

        {/* Photo + bio — stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {photoUrl && (
            <div className="relative w-full sm:w-[301px] sm:h-[300px] sm:flex-shrink-0 aspect-square sm:aspect-auto rounded-[4px] overflow-hidden">
              <Image
                src={photoUrl}
                alt={altText}
                fill
                className="object-cover"
              />
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
