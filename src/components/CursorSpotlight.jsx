import { useRef, useEffect } from 'react';

const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export default function CursorSpotlight({ color = 'rgba(0,255,136,0.06)', size = 600 }) {
  const containerRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    if (!canHover) return;
    const el = containerRef.current?.parentElement;
    if (!el) return;

    let scheduled = false;
    const handler = (e) => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (!spotRef.current) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        spotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, [size]);

  if (!canHover) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        borderRadius: 'inherit',
      }}
    >
      <div
        ref={spotRef}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          left: 0,
          top: 0,
          background: `radial-gradient(circle, ${color}, transparent 60%)`,
          pointerEvents: 'none',
          willChange: 'transform',
          transform: 'translate(-1000px, -1000px)',
        }}
      />
    </div>
  );
}
