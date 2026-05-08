import { ArrowUp, Heart } from 'lucide-react';
import { Link } from 'react-scroll';
import { personal } from '../data/portfolio';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0', position: 'relative', zIndex: 1, background: 'var(--bg)' }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--fg-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
          <span>© {new Date().getFullYear()} {personal.name}</span>
          <span style={{ color: 'var(--fg-faint)' }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            built with <Heart size={11} style={{ color: 'var(--rose)', fill: 'var(--rose)' }} /> + React
          </span>
        </div>

        <Link
          to="hero"
          smooth
          duration={500}
          aria-label="Back to top"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px',
            border: '1px solid var(--border-strong)',
            borderRadius: 999,
            color: 'var(--fg-mute)',
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: 'var(--bg-elev)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--fg)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--fg-mute)'; }}
        >
          <ArrowUp size={13} /> Back to top
        </Link>
      </div>
    </footer>
  );
}
