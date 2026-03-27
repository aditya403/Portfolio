import { useEffect, useRef } from 'react';

const POOL_SIZE = 8;
const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export default function ParticleCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!canHover) return;

    // Particle pool
    const pool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed; top: 0; left: 0; z-index: 99998;
        width: 3px; height: 3px; border-radius: 50%;
        background: #00ff88; pointer-events: none;
        opacity: 0; transition: opacity 0.3s;
      `;
      document.body.appendChild(el);
      pool.push(el);
    }

    let pIdx = 0;
    let lastX = -100, lastY = -100;
    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let hovered = false;
    let clicked = false;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 12) {
        const p = pool[pIdx % POOL_SIZE];
        p.style.left = `${e.clientX - 1.5}px`;
        p.style.top = `${e.clientY - 1.5}px`;
        p.style.opacity = '0.6';
        setTimeout(() => { p.style.opacity = '0'; }, 50);
        pIdx++;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    let rafId;
    const animate = () => {
      ring.x += (pos.x - ring.x) * 0.12;
      ring.y += (pos.y - ring.y) * 0.12;
      if (ringRef.current) {
        const s = hovered ? 56 : clicked ? 12 : 40;
        ringRef.current.style.width = s + 'px';
        ringRef.current.style.height = s + 'px';
        ringRef.current.style.borderColor = hovered ? 'rgba(255,51,102,0.8)' : 'rgba(0,255,136,0.4)';
        ringRef.current.style.transform =
          `translate(${ring.x - s / 2}px, ${ring.y - s / 2}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.background = hovered ? '#ff3366' : '#00ff88';
        dotRef.current.style.boxShadow = `0 0 ${hovered ? 14 : 8}px ${hovered ? '#ff3366' : '#00ff88'}`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onDown = () => { clicked = true; };
    const onUp = () => { clicked = false; };

    // Use event delegation instead of MutationObserver
    const onOverCapture = (e) => {
      if (e.target.closest('a,button,[role="button"]')) hovered = true;
    };
    const onOutCapture = (e) => {
      if (e.target.closest('a,button,[role="button"]')) hovered = false;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOverCapture, true);
    document.addEventListener('mouseout', onOutCapture, true);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOverCapture, true);
      document.removeEventListener('mouseout', onOutCapture, true);
      cancelAnimationFrame(rafId);
      pool.forEach(el => el.remove());
    };
  }, []);

  if (!canHover) return null;

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: 40, height: 40,
          border: '1.5px solid rgba(0,255,136,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'width 0.25s, height 0.25s, border-color 0.25s',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: 8, height: 8,
          background: '#00ff88',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'background 0.2s, width 0.15s, height 0.15s',
          boxShadow: '0 0 8px #00ff88',
        }}
      />
    </>
  );
}
