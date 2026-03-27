import { useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollVideo({ src, sectionRef, style }) {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = v * video.duration;
    }
  });

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      style={{
        width: '100%',
        maxWidth: 600,
        borderRadius: 16,
        filter: 'drop-shadow(0 0 40px rgba(0,255,136,0.3)) drop-shadow(0 0 80px rgba(0,255,136,0.1))',
        ...style,
      }}
    />
  );
}
