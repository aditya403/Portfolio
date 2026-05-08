import { Mail, Code2, ArrowUpRight, Send } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import useReveal from '../hooks/useReveal';
import { personal } from '../data/portfolio';

const channels = [
  { key: 'email',    Icon: Mail,     label: 'Email',     value: personal.email,                              href: `mailto:${personal.email}`, color: '#10b981' },
  { key: 'github',   Icon: Github,   label: 'GitHub',    value: `@${personal.githubUsername}`,               href: personal.github,            color: '#8b5cf6' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn',  value: 'in/adityamishra2710',                       href: personal.linkedin,          color: '#0ea5e9' },
  { key: 'leetcode', Icon: Code2,    label: 'LeetCode',  value: `@${personal.leetcodeUsername}`,             href: personal.leetcode,          color: '#f59e0b' },
];

export default function Contact() {
  const ref = useReveal();
  const refGrid = useReveal();
  return (
    <section id="contact" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div ref={ref} className="fade-up">
          <div className="eyebrow">Contact</div>
          <h2 className="display" style={{ fontSize: 'clamp(48px, 8vw, 112px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 16, color: 'var(--fg)' }}>
            Let's<br />
            <span className="g-text">talk.</span>
          </h2>
          <p style={{ color: 'var(--fg-mute)', fontSize: 17, lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
            Got an automation problem to solve, a project in mind, or just want to say hi? My inbox is open.
          </p>

          {/* Big email CTA */}
          <a
            href={`mailto:${personal.email}`}
            className="btn btn-primary"
            style={{ fontSize: 16, padding: '16px 28px', borderRadius: 14, marginBottom: 56 }}
          >
            <Send size={16} />
            <span>{personal.email}</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Channel grid */}
        <div ref={refGrid} className="fade-up-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 14 }}>
          {channels.map(({ key, Icon, label, value, href, color }) => (
            <a
              key={key}
              href={href}
              target={key === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="card card-hover"
              style={{ padding: 22, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                display: 'grid', placeItems: 'center',
                background: `${color}14`, border: `1px solid ${color}30`,
                flexShrink: 0,
              }}>
                <Icon size={19} style={{ color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--fg-dim)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {value}
                </div>
              </div>
              <ArrowUpRight size={16} style={{ color: 'var(--fg-dim)', flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
