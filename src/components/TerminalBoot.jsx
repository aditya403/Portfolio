import { useState, useEffect } from 'react';

export default function TerminalBoot({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Quick flash, then reveal content — keeps the CRT vibe without blocking LCP
    const t = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 500);
    return () => clearTimeout(t);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'crtFlicker 0.5s ease forwards',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(14px, 2vw, 18px)',
        color: '#00ff88',
      }}>
        &gt; initializing...<span style={{ animation: 'neonPulse 0.5s ease-in-out infinite' }}>_</span>
      </div>
    </div>
  );
}
