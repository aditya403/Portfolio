import { useState, useEffect } from 'react';

const LINES = [
  '> initializing portfolio...',
  '> loading engineer: ADITYA MISHRA',
  '> status: READY',
];
const CHAR_SPEED = 40;

export default function TerminalBoot({ onComplete }) {
  const [phase, setPhase] = useState('flicker');
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (phase !== 'flicker') return;
    const t = setTimeout(() => setPhase('typing'), 600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (lineIdx >= LINES.length) {
      setPhase('done');
      setTimeout(() => onComplete?.(), 400);
      return;
    }
    const line = LINES[lineIdx];
    if (charIdx <= line.length) {
      const t = setTimeout(() => {
        setCurrentLine(line.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(t);
    } else {
      setLines(prev => [...prev, line]);
      setCurrentLine('');
      setLineIdx(l => l + 1);
      setCharIdx(0);
    }
  }, [phase, lineIdx, charIdx, onComplete]);

  useEffect(() => {
    const i = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(i);
  }, []);

  if (phase === 'flicker') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#0a0a0a',
        animation: 'crtFlicker 0.6s ease forwards',
      }} />
    );
  }

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(14px, 2vw, 18px)',
        color: '#00ff88',
        maxWidth: 600, padding: 32,
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: 8, opacity: 0.6 }}>{l}</div>
        ))}
        <div>
          {currentLine}
          <span style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s', color: '#00ff88' }}>_</span>
        </div>
      </div>
    </div>
  );
}
