import { Briefcase } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { experience } from '../data/portfolio';

export default function Experience() {
  const ref = useReveal();
  const refList = useReveal();
  return (
    <section id="experience">
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="fade-up">
          <div className="eyebrow">Experience</div>
          <h2 className="section-title">
            Experience.
          </h2>
          <p className="section-sub">
            Four+ years at FIS shipping backend systems and AI-driven automation.
          </p>
        </div>

        <div ref={refList} className="fade-up-stagger" style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: 11,
            top: 14,
            bottom: 14,
            width: 1,
            background: 'linear-gradient(180deg, var(--primary) 0%, var(--border-strong) 25%, var(--border) 100%)',
          }} />

          {experience.map((job, i) => (
            <div key={i} className="exp-item" style={{ position: 'relative', marginBottom: i === experience.length - 1 ? 0 : 28 }}>
              {/* Timeline ring — lights up green on hover */}
              <div className="timeline-ring" style={{
                position: 'absolute',
                left: -27,
                top: 30,
              }} />

              <div className="card card-hover" style={{ padding: 'clamp(20px, 3vw, 30px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', flexShrink: 0, marginTop: 2 }}>
                      <Briefcase size={18} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                        {job.role}
                      </h3>
                      <div style={{ fontSize: 14, color: 'var(--fg-mute)' }}>
                        <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{job.company}</span>
                        <span style={{ color: 'var(--fg-faint)', margin: '0 8px' }}>·</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: 'var(--fg-mute)',
                    padding: '6px 12px',
                    borderRadius: 999,
                    border: '1px solid var(--border-strong)',
                    background: 'var(--bg-elev)',
                    flexShrink: 0,
                  }}>
                    {job.period}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                  {job.highlights.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', gap: 12, color: 'var(--fg-mute)', fontSize: 14, lineHeight: 1.7 }}>
                      <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>▸</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {job.techStack.map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
