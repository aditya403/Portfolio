import { motion } from 'framer-motion';
import { Mail, Code2, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personal } from '../data/portfolio';
import ScrollVelocityText from './ScrollVelocityText';
import GlitchText from './GlitchText';
import TiltCard from './TiltCard';
import useMagnetic from '../hooks/useMagnetic';

function MagneticWrap({ children, strength = 0.35 }) {
  const { ref, x, y } = useMagnetic(strength);
  return <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>{children}</motion.div>;
}

const links = [
  { label: 'Email', href: `mailto:${personal.email}`, Icon: Mail, color: '#00ff88', value: personal.email },
  { label: 'GitHub', href: personal.github, Icon: GithubIcon, color: '#e2e8f0', value: `@${personal.githubUsername}` },
  { label: 'LinkedIn', href: personal.linkedin, Icon: LinkedinIcon, color: '#0a66c2', value: 'adityamishra2710' },
  { label: 'LeetCode', href: personal.leetcode, Icon: Code2, color: '#ffaa00', value: `@${personal.leetcodeUsername}` },
];

export default function Contact() {
  return (
    <section id="contact" style={{ width: '100%', minHeight: '100vh', padding: '120px 0 80px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute', width: 800, height: 800,
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>07 — Contact</span>
          <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: 16 }}>
          <div className="contact-headline" style={{ color: 'rgba(255,255,255,0.12)' }}>
            <ScrollVelocityText>LET&apos;S BUILD</ScrollVelocityText>
          </div>
          <div className="contact-headline g-text" style={{ letterSpacing: '-0.04em' }}>
            <GlitchText text="SOMETHING" trigger="inView" speed={50} as="span" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
          </div>
          <div className="contact-headline">
            <ScrollVelocityText>GREAT.</ScrollVelocityText>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', maxWidth: 520, lineHeight: 1.85, marginBottom: 48 }}>
          Have an exciting automation challenge, a collaboration idea, or just want to say hello?
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ marginBottom: 64 }}>
          <MagneticWrap strength={0.4}>
            <a href={`mailto:${personal.email}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                fontSize: 'clamp(14px,2vw,20px)', fontWeight: 700,
                color: '#0a0a0a', textDecoration: 'none',
                padding: '18px 36px', borderRadius: 50, background: '#00ff88',
                animation: 'breatheGlow 2s ease-in-out infinite', transition: 'transform 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Mail size={18} /> {personal.email} <ArrowUpRight size={16} />
            </a>
          </MagneticWrap>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
          {links.map(({ label, href, Icon, color, value }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }}>
              <TiltCard maxTilt={8}>
                <a href={href} target={label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                  className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
                  </div>
                  <ArrowUpRight size={14} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
