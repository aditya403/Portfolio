import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 2,
        scaleX,
        transformOrigin: '0%',
        background: 'linear-gradient(90deg, #00ff88, #00d4ff, #ff3366)',
        zIndex: 999,
        pointerEvents: 'none',
      }}
    />
  );
}
