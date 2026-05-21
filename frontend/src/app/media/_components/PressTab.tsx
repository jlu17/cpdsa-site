'use client';

import { useState } from 'react';
import { SkateVideo } from '@/lib/graphql';
import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS, FONT_SIZES } from '@/lib/constants/typography';

function getYouTubeId(url: string): string | null {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];
  return null;
}

function getEmbedUrl(url: string): string {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}`;
  return url;
}

function getThumbnailUrl(url: string): string | null {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null;
}

function VideoCard({ video }: { video: SkateVideo }) {
  const [playing, setPlaying] = useState(false);
  const url = video.skateVideo.videoUrl.url;
  const embedUrl = getEmbedUrl(url);
  const thumbnail = getThumbnailUrl(url);

  return (
    <div className="relative rounded-[4px] overflow-hidden flex-shrink-0" style={{ width: 459, height: 258 }}>
      {playing ? (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.skateVideo.videoTitle}
        />
      ) : (
        <>
          {thumbnail ? (
            <img src={thumbnail} alt={video.skateVideo.videoTitle} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span
              style={{
                fontFamily: FONTS.anton,
                fontSize: FONT_SIZES.cardHeading,
                color: 'white',
                lineHeight: 1,
                letterSpacing: '0.49px',
                textTransform: 'uppercase',
              }}
            >
              {video.skateVideo.videoTitle}
            </span>
            <div style={{ fontFamily: FONTS.poppins, fontSize: FONT_SIZES.body, color: 'white' }}>
              <p style={{ fontWeight: FONT_WEIGHTS.medium, lineHeight: '18px', margin: 0 }}>
                {video.skateVideo.videoSubtitle}
              </p>
              <p style={{ lineHeight: '18px', margin: 0 }}>{video.skateVideo.videoYear}</p>
            </div>
          </div>
          <button
            onClick={() => setPlaying(true)}
            className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
            aria-label={`Play ${video.skateVideo.videoTitle}`}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
              <path d="M1 1L13 8L1 15V1Z" fill={COLORS.brand.purple} />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

const FEATURED_CATEGORY = 'Featured';

export default function PressTab({ videos }: { videos: SkateVideo[] }) {
  const featured =
    videos.find((v) => v.videoCategories.nodes.some((c) => c.name === FEATURED_CATEGORY)) ??
    videos[0];

  if (!featured) {
    return (
      <div className="px-6 py-8" style={{ fontFamily: FONTS.poppins, color: COLORS.text.muted }}>
        No videos available.
      </div>
    );
  }

  // Group by category, excluding Featured. Skip videos with no remaining category.
  const byCategory: Record<string, SkateVideo[]> = {};
  for (const video of videos) {
    const cats = video.videoCategories.nodes.filter((c) => c.name !== FEATURED_CATEGORY);
    if (cats.length === 0) continue;
    const key = cats[0].name;
    if (!byCategory[key]) byCategory[key] = [];
    byCategory[key].push(video);
  }

  return (
    <div className="flex flex-col gap-10 px-6 py-6 w-full">
      {/* Featured video */}
      <div className="flex gap-12 items-start w-full">
        <div className="flex-shrink-0 rounded-[4px] overflow-hidden" style={{ width: 696, aspectRatio: '16/9' }}>
          <iframe
            src={getEmbedUrl(featured.skateVideo.videoUrl.url)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={featured.skateVideo.videoTitle}
          />
        </div>
        <div className="flex flex-col gap-4 pt-2" style={{ maxWidth: 500 }}>
          <h2
            style={{
              fontFamily: FONTS.anton,
              fontSize: FONT_SIZES.sectionHeading,
              lineHeight: 1,
              color: COLORS.text.body,
            }}
          >
            {featured.skateVideo.videoTitle}
            {featured.skateVideo.videoSubtitle ? ` - ${featured.skateVideo.videoSubtitle}` : ''}
          </h2>
          <div style={{ fontFamily: FONTS.poppins, fontSize: FONT_SIZES.body, color: COLORS.text.body, letterSpacing: '0.16px', lineHeight: 1.5 }}>
            <p style={{ margin: 0 }}>{featured.title}</p>
            <p style={{ margin: 0 }}>{featured.skateVideo.videoYear}</p>
          </div>
        </div>
      </div>

      {/* Category sections */}
      {Object.entries(byCategory).map(([categoryName, catVideos]) => (
        <div key={categoryName} className="flex flex-col gap-4">
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
            {categoryName}
          </h3>
          <div className="flex flex-wrap gap-2">
            {catVideos.map((video) => (
              <VideoCard key={video.databaseId} video={video} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
