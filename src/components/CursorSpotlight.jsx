import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onEnter = () => { el.style.opacity = '1'; };
    const onLeave = () => { el.style.opacity = '0'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
}
