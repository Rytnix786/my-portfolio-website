'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
    background:
      'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS',
    title: 'Immersive Video Experience',
    date: 'Cosmic Journey',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience. This component is perfect for showcasing video content in a modern, interactive way.',
      conclusion:
        'The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    title: 'Dynamic Image Showcase',
    date: 'Underwater Adventure',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.',
      conclusion:
        'The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.',
    },
  },
};

const MediaContentSection = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='max-w-4xl mx-auto py-12 text-slate-100'>
      <h2 className='text-3xl font-bold mb-6 text-white'>
        About This Component
      </h2>
      <p className='text-lg mb-8 leading-relaxed text-slate-300'>
        {currentMedia.about.overview}
      </p>

      <p className='text-lg leading-relaxed text-slate-300'>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen bg-slate-950'>
      {/* Toggles and back navigation */}
      <div className='fixed top-4 left-4 right-4 z-50 flex justify-between items-center'>
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-slate-900/80 border border-white/10 hover:border-white/30 text-white rounded-full backdrop-blur-md transition-all hover:scale-105"
        >
          <ArrowLeft size={16} />
          Dashboard
        </Link>

        <div className='flex gap-2 bg-slate-900/80 p-1 border border-white/10 rounded-xl backdrop-blur-md'>
          <button
            onClick={() => setMediaType('video')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mediaType === 'video'
                ? 'bg-white text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Video
          </button>

          <button
            onClick={() => setMediaType('image')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mediaType === 'image'
                ? 'bg-white text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Image
          </button>
        </div>
      </div>

      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContentSection mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
