import { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

export default function ScrollVelocityText({ children, factor = 0.04, className = '', style = {} }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 100, damping: 30 });

  const skewX = useTransform(smoothVelocity, [-1000, 0, 1000], [-8, 0, 8]);
  const scaleY = useTransform(smoothVelocity, [-1000, 0, 1000], [1.04, 1, 1.04]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        skewX,
        scaleY,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </motion.span>
  );
}
