import { motion } from 'framer-motion';
import { MapPin, Cpu, BookOpen, Atom } from 'lucide-react';
import { personal, interests } from '../data/portfolio';
import TiltCard from './TiltCard';
import OdometerNumber from './OdometerNumber';
import ScanlinePhoto from './ScanlinePhoto';

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 28, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

function StatRing({ value, suffix, label, color, max = 100 }) {
  const pct = (parseInt(value) / max) * 100;
  const r = 38;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 90, height: 90 }}>
        <svg width={90} height={90} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={45} cy={45} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
          <motion.circle
            cx={45} cy={45} r={r} fill="none" stroke={color} strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - (circ * Math.min(pct, 100) / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
            <OdometerNumber value={value} suffix={suffix} />
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" style={{ width: '100%', padding: '120px 0', position: 'relative' }}>
      <div className="wrap">
        <motion.div {...anim()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>02 — About</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <h2 className="section-title">A little about myself</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 16 }}>
          {/* Photo + Bio */}
          <motion.div {...anim(0.05)} style={{ gridColumn: 'span 2' }}>
            <TiltCard maxTilt={8} className="card" style={{ padding: '32px', height: '100%' }}>
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <ScanlinePhoto src="/aditya_image.jpeg" alt="Aditya Mishra" style={{ width: 180, height: 220, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,0.2)', marginBottom: 14, textTransform: 'uppercase' }}>Background</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 14 }}>
                    {personal.summary}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
                    Beyond automation, I&apos;m drawn to{' '}
                    <span style={{ color: '#00d4ff' }}>Quantum Physics</span> and{' '}
                    <span style={{ color: '#ffaa00' }}>mathematics</span> — the same love of elegant systems
                    that drives my engineering work.
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Location */}
          <motion.div {...anim(0.1)}>
            <TiltCard maxTilt={8} className="card" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <MapPin size={22} color="#00ff88" />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 800, color: '#fff' }}>PUNE, INDIA</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88' }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'rgba(0,255,136,0.6)', fontFamily: "'JetBrains Mono', monospace" }}>OPEN TO REMOTE</span>
                </div>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 4 }}>
                {['#00ff88','#00d4ff','#ff3366'].map((c, i) => (
                  <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: c, opacity: 0.3 + i * 0.2 }}/>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Stats */}
          {[
            { num: '3', suffix: '+', label: 'Years at FIS', color: '#00ff88', max: 10 },
            { num: '3100', suffix: '+', label: 'Hrs Saved / yr', color: '#ffaa00', max: 5000 },
            { num: '4', suffix: '', label: 'Automation systems', color: '#00d4ff', max: 10 },
          ].map(({ num, suffix, label, color, max }, i) => (
            <motion.div key={label} {...anim(0.12 + i * 0.07)}>
              <TiltCard maxTilt={8} className="card" style={{ padding: '28px', textAlign: 'center' }}>
                <StatRing value={num} suffix={suffix} label={label} color={color} max={max} />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Interests */}
        <motion.div {...anim(0.25)} className="card" style={{ marginTop: 16 }}>
          <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: 2, textTransform: 'uppercase', flexShrink: 0 }}>Interests</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {interests.map(item => (
                <motion.span
                  key={item} className="pill" style={{ fontSize: 12 }}
                  whileHover={{ scale: 1.05, opacity: [1, 0.4, 1, 0.4, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
