import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Send } from 'lucide-react';
import CommandPalette from './CommandPalette';

const LINKS = [
  ['About',      'about'],
  ['Skills',     'skills'],
  ['Experience', 'experience'],
  ['Projects',   'projects'],
  ['LeetCode',   'leetcode'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(250, 250, 249, 0.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
        {/* Logo */}
        <Link to="hero" smooth duration={500} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            display: 'grid', placeItems: 'center',
            background: 'var(--fg)',
            color: 'var(--bg)',
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: '-0.04em',
            fontFamily: "'Inter Tight', sans-serif",
          }}>AM</div>
          <span style={{ color: 'var(--fg)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em' }} className="nav-name">
            Aditya Mishra
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: 'flex', gap: 4, listStyle: 'none', alignItems: 'center' }}>
          {LINKS.map(([label, id]) => (
            <li key={id} style={{ position: 'relative' }}>
              <Link
                to={id}
                smooth
                duration={500}
                offset={-70}
                spy
                onSetActive={() => setActive(id)}
                style={{
                  display: 'inline-block',
                  padding: '8px 14px',
                  fontSize: 13.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: active === id ? 'var(--fg)' : 'var(--fg-dim)',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {label}
                {active === id && (
                  <span style={{
                    position: 'absolute',
                    left: '50%', bottom: 0,
                    transform: 'translateX(-50%)',
                    width: 18, height: 2,
                    borderRadius: 1,
                    background: 'var(--fg)',
                  }} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA cluster */}
        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CommandPalette />
          <Link to="contact" smooth duration={500} offset={-70} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
            <Send size={14} />
            <span>Let's talk</span>
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
          className="nav-burger"
          style={{ display: 'none', background: 'transparent', border: 'none', color: 'var(--fg)', padding: 6, cursor: 'pointer' }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--border)', padding: '14px 24px 22px', boxShadow: 'var(--shadow-md)' }}>
          {LINKS.map(([label, id]) => (
            <Link
              key={id}
              to={id}
              smooth
              duration={500}
              offset={-70}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '12px 0', borderBottom: '1px dashed var(--border)', fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="contact"
            smooth duration={500} offset={-70}
            className="btn btn-primary"
            style={{ marginTop: 18, justifyContent: 'center', width: '100%' }}
            onClick={() => setOpen(false)}
          >
            <Send size={14} /> Let's talk
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .nav-links, .nav-cta { display: none !important; }
          .nav-burger { display: block !important; }
        }
        @media (max-width: 460px) {
          .nav-name { display: none; }
        }
      `}</style>
    </nav>
  );
}
