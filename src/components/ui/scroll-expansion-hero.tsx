'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Set up natural scroll tracking on the wrapper container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly transform media scale based on scroll progress
  // Animation reaches full-screen at 75% scroll, allowing the user to view content in the remaining track scroll
  const mediaWidth = useTransform(
    scrollYProgress,
    [0, 0.75],
    [isMobile ? '300px' : '360px', '100vw']
  );
  
  const mediaHeight = useTransform(
    scrollYProgress,
    [0, 0.75],
    ['420px', '100vh']
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.75],
    ['1.5rem', '0px']
  );

  // Background and title texts move outward
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textTranslateLeft = useTransform(
    scrollYProgress,
    [0, 0.75],
    ['0vw', isMobile ? '-120vw' : '-80vw']
  );
  const textTranslateRight = useTransform(
    scrollYProgress,
    [0, 0.75],
    ['0vw', isMobile ? '120vw' : '80vw']
  );

  // Fade in children content as the media reaches full expansion
  const contentOpacity = useTransform(scrollYProgress, [0.68, 0.9], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.68, 0.9], [40, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] bg-transparent overflow-visible"
    >
      {/* Sticky container that keeps elements locked in viewport while user scrolls track */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Image (Fades out as we scroll) */}
        <motion.div
          className="absolute inset-0 z-0 w-full h-full"
          style={{ opacity: bgOpacity }}
        >
          <Image
            src={bgImageSrc}
            alt="Background"
            fill
            className="object-cover object-center w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/40" />
        </motion.div>

        {/* Expanding Media Box */}
        <motion.div
          className="absolute z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
          style={{
            width: mediaWidth,
            height: mediaHeight,
            borderRadius: borderRadius,
          }}
        >
          {mediaType === 'video' ? (
            mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be') ? (
              <div className="relative w-full h-full pointer-events-none">
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    mediaSrc.includes('embed')
                      ? mediaSrc +
                        (mediaSrc.includes('?') ? '&' : '?') +
                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                      : mediaSrc.replace('watch?v=', 'embed/') +
                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                        (mediaSrc.split('v=')[1] || '')
                  }
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              </div>
            ) : (
              <div className="relative w-full h-full pointer-events-none">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              </div>
            )
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={mediaSrc}
                alt={title || 'Media content'}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/35 pointer-events-none" />
            </div>
          )}

          {/* Scrolling instructions overlay shown initially inside expanding box */}
          <motion.div 
            className="absolute z-20 left-0 right-0 bottom-8 flex flex-col items-center justify-center text-center text-cyan-200 px-4"
            style={{ opacity: bgOpacity }}
          >
            {date && <p className="text-sm uppercase tracking-[0.2em] font-semibold text-cyan-300">{date}</p>}
            {scrollToExpand && <p className="text-xs text-cyan-100/70 mt-1.5 font-medium">{scrollToExpand}</p>}
          </motion.div>
        </motion.div>

        {/* Dynamic Blend Typography (Moves outward) */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none text-center px-4 w-full h-full ${
            textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
          }`}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-cyan-100 tracking-tight"
            style={{ x: textTranslateLeft }}
          >
            {firstWord}
          </motion.h2>
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-cyan-100 tracking-tight mt-2"
            style={{ x: textTranslateRight }}
          >
            {restOfTitle}
          </motion.h2>
        </div>

        {/* Scroll Reveal Content Overlay (Fades in when media is fully expanded) */}
        <motion.div
          className="absolute inset-0 z-30 overflow-y-auto flex flex-col justify-start items-center px-4 py-24 scrollbar-none"
          style={{ opacity: contentOpacity, y: contentY, pointerEvents: useTransform(scrollYProgress, p => p > 0.7 ? 'auto' : 'none') as unknown as React.CSSProperties['pointerEvents'] }}
        >
          <div className="w-full max-w-5xl bg-slate-950/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/5 shadow-2xl mt-12 mb-8">
            {children}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
