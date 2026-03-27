import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from '../data/portfolio';
import TiltCard from './TiltCard';
import GlitchText from './GlitchText';
import OdometerNumber from './OdometerNumber';
import SonarDot from './SonarDot';
import ScrollVelocityText from './ScrollVelocityText';

function TimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} style={{
      position: 'absolute', left: 18, top: 8, bottom: 8, width: 2,
      background: 'rgba(0,255,136,0.06)', borderRadius: 1,
    }}>
      <motion.div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '100%', transformOrigin: 'top',
        background: 'linear-gradient(to bottom, #00ff88 0%, rgba(0,255,136,0.1) 100%)',
        borderRadius: 1, scaleY,
      }} />
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" style={{ width: '100%', padding: '120px 0' }}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>04 — Work History</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <h2 className="section-title">
            <ScrollVelocityText>Experience</ScrollVelocityText>
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <TimelineLine />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, rotate: 3, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{ paddingLeft: 56, position: 'relative' }}
              >
                <div style={{ position: 'absolute', left: 10, top: 32 }}>
                  <SonarDot />
                </div>

                <TiltCard maxTilt={6} className="card" style={{ padding: '32px 36px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 6 }}>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>{job.role}</h3>
                      <span style={{ fontSize: 13, fontWeight: 700, display: 'inline-block' }}>
                        <GlitchText text={job.company} trigger="inView" speed={40} style={{ color: '#00ff88' }} />
                      </span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 50, padding: '4px 14px', marginBottom: 6, display: 'inline-block',
                      }}>{job.period}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{job.location}</div>
                    </div>
                  </div>

                  {/* Impact callout */}
                  {job.highlights.some(h => h.includes('hours')) && (
                    <div style={{
                      margin: '16px 0 20px', padding: '18px 24px', borderRadius: 12,
                      background: 'rgba(0,255,136,0.04)',
                      border: '1px solid rgba(0,255,136,0.1)',
                      backgroundImage: 'linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: 'rgba(0,255,136,0.4)', marginBottom: 10, textTransform: 'uppercase' }}>ANNUAL IMPACT</div>
                      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {job.highlights
                          .filter(h => /\d+\+?\s*(?:engineering\s*)?hours?/i.test(h))
                          .flatMap(h => h.match(/[\d,]+\+?\s*(?:engineering\s*)?hours?/gi) || [])
                          .slice(0, 3)
                          .map((metric, m) => (
                            <span key={m} style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 28, fontWeight: 900, color: '#00ff88',
                              textShadow: '0 0 20px rgba(0,255,136,0.3)',
                            }}>{metric}</span>
                          ))}
                      </div>
                    </div>
                  )}

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    {job.highlights.map((pt, j) => (
                      <li key={j} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                        <span style={{ color: '#00ff88', marginTop: 4, flexShrink: 0, fontWeight: 900 }}>›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {job.techStack.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
