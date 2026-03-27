import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEF';

export default function GlitchText({
  text,
  trigger = 'inView',
  speed = 30,
  className = '',
  style = {},
  as: Tag = 'span',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px', once: true });
  const [display, setDisplay] = useState('');
  const hasRun = useRef(false);

  const scramble = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let iteration = 0;
    const len = text.length;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      iteration += 1 / 2;
      if (iteration >= len) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (trigger === 'inView' && inView) scramble();
    else if (trigger === true) scramble();
  }, [inView, trigger, scramble]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ fontFamily: "'JetBrains Mono', monospace", ...style }}
    >
      {display || (trigger === 'inView' ? '\u00A0'.repeat(text.length) : text)}
    </Tag>
  );
}
