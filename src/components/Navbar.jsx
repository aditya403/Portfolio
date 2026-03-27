import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import useMagnetic from '../hooks/useMagnetic';

const LINKS = [
  ['Home','hero'],['About','about'],['Skills','skills'],
  ['Experience','experience'],['Projects','projects'],['LeetCode','leetcode'],['Contact','contact'],
];

function MagneticLink({ children, ...props }) {
  const { ref, x, y } = useMagnetic(0.25);
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>
      <Link {...props}>{children}</Link>
    </motion.div>
  );
}

function MagneticDiv({ children, strength = 0.15, style, className, ...props }) {
  const { ref, x, y } = useMagnetic(strength);
  return (
    <motion.div ref={ref} style={{ x, y, ...style }} className={className} {...props}>
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,255,136,0.08)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px' }}>
        {/* Logo */}
        <MagneticDiv strength={0.15}>
          <Link to="hero" smooth duration={500} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg,#00ff88,#00d4ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 13, color: '#0a0a0a', letterSpacing: '-0.5px',
              fontFamily: "'JetBrains Mono', monospace",
              boxShadow: '0 0 20px rgba(0,255,136,0.4)',
            }}>AM</div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.02em' }}>Aditya Mishra</span>
          </Link>
        </MagneticDiv>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 2, listStyle: 'none', alignItems: 'center', position: 'relative' }} className="desktop-nav">
          {LINKS.map(([label, id]) => (
            <li key={id} style={{ position: 'relative' }}>
              <MagneticLink
                to={id} smooth duration={500} offset={-70} spy
                style={{ display: 'block', padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: active === id ? '#fff' : 'rgba(255,255,255,0.55)', transition: 'color 0.2s', textDecoration: 'none', position: 'relative', zIndex: 1 }}
                onSetActive={() => setActive(id)}
                onMouseEnter={e => { e.target.style.color='#fff'; }}
                onMouseLeave={e => { if (active !== id) e.target.style.color='rgba(255,255,255,0.55)'; }}
              >{label}</MagneticLink>
              {active === id && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 20, height: 2, borderRadius: 1,
                    background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="desktop-nav">
          <MagneticDiv strength={0.3}>
            <Link to="contact" smooth duration={500} offset={-70} className="btn-primary" style={{ padding: '10px 22px', fontSize: 13 }}>
              <span>Let&apos;s Talk</span>
            </Link>
          </MagneticDiv>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="mobile-burger"
          style={{ display: 'none', background: 'none', border: 'none', color: '#fff', padding: 4 }}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(24px)', borderTop: '1px solid rgba(0,255,136,0.08)', padding: '16px 20px 28px' }}>
          {LINKS.map(([label, id]) => (
            <Link key={id} to={id} smooth duration={500} offset={-70}
              style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid rgba(0,255,136,0.06)', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
              onClick={() => setOpen(false)}
            >{label}</Link>
          ))}
          <Link to="contact" smooth duration={500} className="btn-primary" style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }} onClick={() => setOpen(false)}>
            <span>Let&apos;s Talk</span>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
