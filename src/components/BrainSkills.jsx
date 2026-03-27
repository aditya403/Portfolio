import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';
const BrainModel = lazy(() => import('./BrainModel'));

export default function BrainSkills() {
  return (
    <section id="skills" style={{ width: '100%', padding: '120px 0 80px', position: 'relative', overflow: 'visible' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="wrap" style={{ position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>03 — Skills</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }} />
          </div>
          <h2 className="section-title">
            <GlitchText text="Skills & Tools" trigger="inView" speed={30} as="span" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }} />
          </h2>
        </motion.div>

        {/* Brain visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            width: '100%',
            height: 'clamp(600px, 85vh, 950px)',
            borderRadius: 24,
            overflow: 'visible',
            border: 'none',
            background: 'transparent',
            position: 'relative',
          }}
        >
          <Suspense fallback={
            <div style={{
              width: '100%', height: '100%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'rgba(0,255,136,0.4)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
            }}>
              Initializing neural map...
            </div>
          }>
            <BrainModel />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
