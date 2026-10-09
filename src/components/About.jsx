import { MapPin, Sparkles, Workflow } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { personal, interests } from '../data/portfolio';

export default function About() {
  const ref = useReveal();
  const refGrid = useReveal();

  return (
    <section id="about">
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="fade-up">
          <div className="eyebrow">About</div>
          <h2 className="section-title">
            About me.
          </h2>
          <p className="section-sub">
            Four+ years building enterprise network automation at FIS. My work pairs Ansible and Resolve.io workflows
            with ServiceNow integration across multi-vendor firewalls, load balancers, SSL, and router operations.
          </p>
        </div>

        {/* Bento grid */}
        <div
          ref={refGrid}
          className="fade-up-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridAutoRows: 'minmax(120px, auto)',
            gap: 16,
          }}
        >
          {/* Bio */}
          <div className="card card-hover" style={{ gridColumn: 'span 4', padding: 28 }}>
            <div className="num-badge" style={{ marginBottom: 12 }}>// summary</div>
            <p style={{ color: 'var(--fg-mute)', lineHeight: 1.75, fontSize: 14.5 }}>
              {personal.summary}
            </p>
          </div>

          {/* Stats card */}
          <div className="card card-hover" style={{ gridColumn: 'span 2', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="num-badge">// impact</div>
            <div>
              <div className="stat-number" style={{ fontSize: 'clamp(40px, 5vw, 60px)' }}>{personal.stats.hoursSaved}</div>
              <div className="stat-label" style={{ marginTop: 6 }}>Engineering hours saved / yr</div>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 18 }}>
              {[1,2,3,4,5,6,7,8].map((i) => (
                <span key={i} style={{
                  flex: 1, height: 6, borderRadius: 2,
                  background: i <= 6 ? `linear-gradient(90deg, var(--primary), var(--secondary))` : 'rgba(15, 23, 42, 0.08)',
                }} />
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="card card-hover" style={{ gridColumn: 'span 2', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.22)' }}>
                <MapPin size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <div className="num-badge">// based in</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)' }}>{personal.location}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-dim)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="live-dot" style={{ width: 6, height: 6 }} /> Open to remote · UTC+5:30
              </div>
            </div>
          </div>

          {/* Currently */}
          <div className="card card-hover" style={{ gridColumn: 'span 4', padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.22)' }}>
                <Workflow size={18} style={{ color: 'var(--warm)' }} />
              </div>
              <div className="num-badge">// currently</div>
            </div>
            <div style={{ color: 'var(--fg)', fontSize: 16, lineHeight: 1.65 }}>
              Leading end-to-end network automation design and delivery across firewall, load balancer, SSL certificate,
              router configuration, validation, and decommissioning workflows — collectively saving{' '}
              <span style={{ color: 'var(--warm)', fontWeight: 600 }}>13,000+ hrs</span> annually.
            </div>
          </div>

          {/* Interests — full row */}
          <div className="card card-hover" style={{ gridColumn: 'span 6', padding: 24, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.22)' }}>
                <Sparkles size={18} style={{ color: 'var(--tertiary)' }} />
              </div>
              <div className="num-badge">// outside work</div>
            </div>
            <div style={{ flex: 1, minWidth: 200, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {interests.map(i => (
                <span key={i} className="pill" style={{ background: 'transparent', borderColor: 'var(--border)' }}>{i}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          #about .card { grid-column: span 6 !important; }
        }
      `}</style>
    </section>
  );
}
