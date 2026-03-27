import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowUp } from 'lucide-react';
import { personal } from '../data/portfolio';
import useMagnetic from '../hooks/useMagnetic';

function MagneticTop() {
  const { ref, x, y } = useMagnetic(0.4);
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>
      <Link to="hero" smooth duration={700}
        style={{
          width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)',
          color: '#00ff88', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.25)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.3)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <ArrowUp size={16} />
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer style={{ width: '100%', padding: '40px 0 28px', borderTop: '1px solid rgba(0,255,136,0.06)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} {personal.name} · Built with <span style={{ color: '#00ff88' }}>React</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={`mailto:${personal.email}`}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.target.style.color = '#00ff88'; e.target.style.textShadow = '0 0 10px rgba(0,255,136,0.4)'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.3)'; e.target.style.textShadow = 'none'; }}
            >{personal.email}</a>
            <MagneticTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
