import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export default function TiltCard({ children, maxTilt = 12, className = '', style = {}, ...props }) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);

  const sRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const sRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e) => {
    if (!ref.current || !canHover) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt);
    rotateX.set(-py * maxTilt);
    shineX.set((px + 0.5) * 100);
    shineY.set((py + 0.5) * 100);
  }, [maxTilt, rotateX, rotateY, shineX, shineY]);

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    shineX.set(50);
    shineY.set(50);
    setHovering(false);
  }, [rotateX, rotateY, shineX, shineY]);

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        className={className}
        style={{
          ...style,
          rotateX: sRotateX,
          rotateY: sRotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
        onMouseMove={(e) => { handleMove(e); setHovering(true); }}
        onMouseLeave={handleLeave}
        {...props}
      >
        {children}
        {/* Shine overlay */}
        {hovering && canHover && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 10,
              background: `radial-gradient(circle at ${shineX.get()}% ${shineY.get()}%, rgba(0,255,136,0.1), transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
