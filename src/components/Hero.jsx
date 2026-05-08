import { Link } from 'react-scroll';
import { ArrowRight, Mail, Sparkles, Download } from 'lucide-react';
import { Github } from './SocialIcons';
import useReveal from '../hooks/useReveal';
import { personal } from '../data/portfolio';

const RESUME_HREF = '/aditya_mishra_resume.pdf';

export default function Hero() {
  const ref = useReveal();
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', paddingTop: 110, paddingBottom: 80 }}>
      <div className="grid-overlay" />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="fade-up-stagger hero-grid">
          {/* LEFT — text content */}
          <div className="hero-text">
            {/* Status badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--bg-elev)', boxShadow: 'var(--shadow-sm)', marginBottom: 24 }}>
              <span className="live-dot" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--fg-mute)', letterSpacing: '0.04em' }}>
                Open to opportunities
              </span>
              <span style={{ width: 1, height: 12, background: 'var(--border-strong)' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--fg-dim)' }}>
                Pune, IN
              </span>
            </div>

            {/* Greeting */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, color: 'var(--fg-dim)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
              <span style={{ width: 24, height: 1, background: 'var(--fg-faint)' }} />
              <span>Hi, I'm</span>
            </div>

            {/* Massive name */}
            <h1 className="display hero-name" style={{ marginBottom: 8 }}>
              <span style={{ color: 'var(--fg)' }}>Aditya </span>
              <span className="g-text">Mishra</span>
            </h1>

            {/* Role */}
            <h2 className="display" style={{ fontSize: 'clamp(20px, 2.6vw, 28px)', fontWeight: 600, color: 'var(--fg-mute)', letterSpacing: '-0.02em', marginBottom: 24, marginTop: 12 }}>
              Software Engineer at <span style={{ color: 'var(--fg)' }}>FIS</span>.
            </h2>

            {/* Description */}
            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: 'var(--fg-mute)', maxWidth: 540, marginBottom: 32 }}>
              I build backend systems and AI-driven automation for enterprise infrastructure — NLP-powered intake agents,
              workflow orchestration, governance frameworks — that have saved <span style={{ color: 'var(--fg)', fontWeight: 600 }}>7,000+ engineering hours</span> a year.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="projects" smooth duration={500} offset={-80} className="btn btn-primary">
                <span>See my work</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={RESUME_HREF}
                download="aditya_mishra_resume.pdf"
                className="btn btn-ghost"
                aria-label="Download resume (PDF)"
              >
                <Download size={16} />
                <span>Resume</span>
              </a>
              <Link to="contact" smooth duration={500} offset={-80} className="btn btn-ghost">
                <Mail size={16} />
                <span>Get in touch</span>
              </Link>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="GitHub">
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 560 }}>
              {[
                { num: personal.stats.years,       label: 'Yrs experience' },
                { num: personal.stats.hoursSaved,  label: 'Hours saved / yr' },
                { num: personal.stats.automations, label: 'Systems shipped' },
              ].map((s) => (
                <div key={s.label} className="card card-hover" style={{ padding: '16px 18px', borderRadius: 14 }}>
                  <div className="stat-number" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)' }}>{s.num}</div>
                  <div className="stat-label" style={{ marginTop: 6, fontSize: 10 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="hero-visual">
            <div className="hero-photo" style={{ width: 'clamp(220px, 30vw, 360px)', aspectRatio: '4 / 5' }}>
              <img src="/aditya_image.webp" alt="Aditya Mishra" width="360" height="450" />
              <span className="hero-photo-frame" />

              {/* Floating badge: bottom-right */}
              <div className="float-badge" style={{ bottom: -18, right: -16 }}>
                <Sparkles size={12} style={{ color: 'var(--warm)' }} />
                <span>7,000+ hrs saved / yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', color: 'var(--fg-faint)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span>scroll</span>
        <span style={{ width: 1, height: 28, background: 'linear-gradient(180deg, var(--fg-faint), transparent)' }} />
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr; gap: 36px; }
          .hero-visual { order: -1; }
        }
      `}</style>
    </section>
  );
}
