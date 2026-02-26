'use client';

import Script from 'next/script';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import type { VideoConfig } from '../../../data/seo/video-config';
import { getYouTubeThumbnail, getYouTubeEmbedUrl, getYouTubeWatchUrl } from '../../../data/seo/video-config';

interface VideoEmbedProps {
  video: VideoConfig;
  /** Optional: override the section heading */
  heading?: string;
}

/**
 * VideoEmbed — YouTube video player with VideoObject JSON-LD schema.
 * Uses react-lite-youtube-embed for performance (no iframe until click).
 * Only renders for videos with status === 'live'.
 *
 * Security: JSON-LD content is JSON.stringify() of trusted static VideoConfig
 * data from data/seo/video-config.ts — no user input involved.
 */
export default function VideoEmbed({ video, heading }: VideoEmbedProps) {
  if (video.status !== 'live') return null;

  const thumbnailUrl = video.thumbnailUrl || getYouTubeThumbnail(video.youtubeId);

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: getYouTubeWatchUrl(video.youtubeId),
    embedUrl: getYouTubeEmbedUrl(video.youtubeId),
    publisher: {
      '@type': 'Organization',
      name: 'Disaster Recovery Australia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://disasterrecovery.com.au/logos/3D NRP Logo.png',
      },
    },
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>
        )}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <LiteYouTubeEmbed
            id={video.youtubeId}
            title={video.title}
            poster="maxresdefault"
            noCookie={true}
          />
        </div>
        <p className="mt-4 text-gray-600 text-sm">{video.description}</p>
      </div>
      <Script
        id={`video-schema-${video.youtubeId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
    </section>
  );
}
