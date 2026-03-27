import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, ArrowDown } from 'lucide-react';
import GlitchText from './GlitchText';
import OdometerNumber from './OdometerNumber';
import useMagnetic from '../hooks/useMagnetic';

function MagneticWrap({ children, strength = 0.3 }) {
  const { ref, x, y } = useMagnetic(strength);
  return <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>{children}</motion.div>;
}

export default function Hero({ booted }) {
  return (
    <section id="hero" style={{
      minHeight: '100vh', width: '100%', position: 'relative',
      display: 'flex', alignItems: 'center',
      padding: '60px 0 0', overflow: 'hidden',
    }}>
      <div className="hero-grid" />

      <div className="wrap" style={{ paddingTop: 60, paddingBottom: 80, width: '100%' }}>
        {/* Section marker */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={booted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>01 — Introduction</span>
          <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }}
          />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>Open to work</span>
        </motion.div>

        {/* BIG name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={booted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 20 }}
        >
          <div className="display" style={{ fontSize: 'clamp(36px,10vw,120px)', letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff' }}>
            ADITYA
          </div>
          <div className="display g-text" style={{ fontSize: 'clamp(36px,10vw,120px)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            MISHRA
          </div>
        </motion.div>

        {/* Role with glitch */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={booted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}
        >
          <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg,#00ff88,#00d4ff)', borderRadius: 1, flexShrink: 0 }}/>
          <GlitchText
            text="NETWORK AUTOMATION ENGINEER"
            trigger={booted}
            speed={25}
            style={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)' }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, maxWidth: 520, marginBottom: 40 }}
        >
          I build{' '}
          <span style={{ color: '#00ff88', fontWeight: 600 }}>high-impact automation</span> for
          enterprise networks — turning hours of manual ops into{' '}
          <span style={{ color: '#00d4ff', fontWeight: 600 }}>deterministic, zero-touch</span> pipelines.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
        >
          <MagneticWrap strength={0.3}>
            <Link to="projects" smooth duration={500} offset={-70} className="btn-primary">
              <span>View my work <ArrowRight size={15}/></span>
            </Link>
          </MagneticWrap>
          <MagneticWrap strength={0.3}>
            <Link to="contact" smooth duration={500} offset={-70} className="btn-outline">
              Let's Talk
            </Link>
          </MagneticWrap>
        </motion.div>

        {/* Stats as system readouts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
        >
          {[
            { num: '3', suffix: '+', label: 'YEARS' },
            { num: '3100', suffix: '+', label: 'HRS SAVED' },
            { num: '4', suffix: '', label: 'SYSTEMS' },
          ].map(({ num, suffix, label }) => (
            <div key={label} style={{
              padding: '14px 18px',
              border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: 12,
              background: 'rgba(0,255,136,0.03)',
              flex: '1 1 90px',
              minWidth: 0,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28, fontWeight: 700, color: '#00ff88',
                textShadow: '0 0 20px rgba(0,255,136,0.3)',
              }}>
                <OdometerNumber value={num} suffix={suffix} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={booted ? { opacity: 1 } : {}} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: 'rgba(0,255,136,0.3)', textTransform: 'uppercase' }}>scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} color="rgba(0,255,136,0.4)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
