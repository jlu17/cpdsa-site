import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS, FONT_SIZES } from '@/lib/constants/typography';
import { SITE } from '@/lib/constants/site';

const FEATURED_PHOTOS = [
  { src: '/media-photo-handstand.jpg', alt: 'Skater balancing on one hand mid-trick at the Skate Circle' },
  { src: '/media-photo-group-dance.jpg', alt: 'A line of skaters dancing together at the Skate Circle' },
  { src: '/media-photo-couple-dance.jpg', alt: 'Two skaters dancing hand in hand at the Skate Circle' },
];

export default function PhotosTab() {
  return (
    <div className="flex flex-col gap-6 px-6 py-6 w-full">
      <h2
        style={{
          fontFamily: FONTS.anton,
          fontSize: FONT_SIZES.sectionHeading,
          lineHeight: 1,
          color: COLORS.text.body,
          letterSpacing: '0.49px',
          textTransform: 'uppercase',
        }}
      >
        2026 Photos
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3
            style={{
              fontFamily: FONTS.anton,
              fontSize: FONT_SIZES.cardHeading,
              lineHeight: 1,
              color: COLORS.text.body,
              letterSpacing: '0.49px',
              textTransform: 'uppercase',
            }}
          >
            Featured photographer: Bob Dea
          </h3>
          <a
            href={SITE.photosAlbumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-white text-sm whitespace-nowrap w-fit"
            style={{ backgroundColor: COLORS.brand.purple, fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium }}
          >
            View full album
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURED_PHOTOS.map(photo => (
            <div key={photo.src} className="relative aspect-[4/3] rounded-[4px] overflow-hidden">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
