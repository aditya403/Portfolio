import { useState } from 'react';

export default function ScanlinePhoto({ src, alt, style }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        border: '1px solid rgba(0,255,136,0.2)',
        animation: 'breatheGlow 3s ease-in-out infinite',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async"
        width="180" height="220"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 48%, rgba(0,255,136,0.08) 50%, transparent 52%)',
        backgroundSize: '100% 8px', pointerEvents: 'none', opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'rgba(0,255,136,0.4)',
        boxShadow: '0 0 20px rgba(0,255,136,0.3)',
        animation: `scanline ${hovered ? '1.5s' : '4s'} linear infinite`,
        pointerEvents: 'none',
      }} />
      {hovered && (
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, fontWeight: 700, letterSpacing: 2,
          color: '#00ff88', textTransform: 'uppercase',
          animation: 'neonPulse 0.5s ease-in-out infinite',
        }}>
          SCANNING...
        </div>
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.8) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
