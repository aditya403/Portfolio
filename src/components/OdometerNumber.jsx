import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Digit({ value, delay = 0 }) {
  return (
    <span style={{ display: 'inline-block', height: '1em', overflow: 'hidden', lineHeight: 1 }}>
      <motion.span
        initial={{ y: '-100%' }}
        animate={{ y: `${-value * 10}%` }}
        transition={{ type: 'spring', stiffness: 80, damping: 14, delay }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '10em',
        }}
      >
        {[0,1,2,3,4,5,6,7,8,9].map(d => (
          <span key={d} style={{ height: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function OdometerNumber({ value, suffix = '', className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);

  // Parse value into digits and non-digit chars
  const str = String(value);
  const parts = str.split('');

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', alignItems: 'baseline', fontVariantNumeric: 'tabular-nums', ...style }}>
      {show ? (
        parts.map((ch, i) => {
          const d = parseInt(ch);
          if (isNaN(d)) {
            return <span key={i}>{ch}</span>;
          }
          return <Digit key={i} value={d} delay={0.05 * (parts.length - i)} />;
        })
      ) : (
        <span style={{ opacity: 0 }}>{str}</span>
      )}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
