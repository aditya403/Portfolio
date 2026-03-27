import { motion } from 'framer-motion';

export default function SonarDot({ color = '#00ff88' }) {
  return (
    <div style={{ position: 'relative', width: 18, height: 18 }}>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: color, border: '3px solid #0a0a0a',
          boxShadow: `0 0 12px ${color}`,
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        whileInView={{ scale: 3, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `2px solid ${color}`,
        }}
      />
    </div>
  );
}
