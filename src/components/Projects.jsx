import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { personal } from '../data/portfolio';
import TiltCard from './TiltCard';
import GlitchText from './GlitchText';

const langColor = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', Groovy: '#4298b8', Shell: '#89e051',
  CSS: '#563d7c', HTML: '#e34c26', Go: '#00ADD8',
};
const accentColors = ['#00ff88', '#00d4ff', '#ffaa00', '#ff3366', '#00d4ff', '#00ff88'];

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${personal.githubUsername}/repos?sort=updated&per_page=6`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setRepos(d.filter(r => !r.fork).slice(0, 6)); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="projects" style={{ width: '100%', padding: 'clamp(60px, 10vw, 120px) 0', position: 'relative' }}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>05 — Open Source</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 56 }}>
            <h2 className="section-title">
              <GlitchText text="GitHub Projects" trigger="inView" speed={35} as="span" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }} />
            </h2>
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 50, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,136,0.4)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <GithubIcon size={14}/> View all <ArrowUpRight size={13}/>
            </a>
          </div>
        </motion.div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,255,136,0.06)' }}>
                <div style={{ height: 8, background: 'rgba(0,255,136,0.04)', animation: 'neonPulse 1.5s ease-in-out infinite' }}/>
                <div style={{ padding: 28 }}>
                  <div className="skeleton" style={{ height: 18, width: '55%', marginBottom: 16 }}/>
                  <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 8 }}/>
                  <div className="skeleton" style={{ height: 13, width: '70%' }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            <p style={{ marginBottom: 16 }}>Could not load repositories.</p>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <GithubIcon size={16}/> View on GitHub
            </a>
          </div>
        )}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap: 20 }}>
            {repos.map((repo, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <motion.div key={repo.id}
                  initial={{ opacity: 0, y: 40, skewX: 8 }}
                  whileInView={{ opacity: 1, y: 0, skewX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard maxTilt={10}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                      className="project-card card-shine"
                      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                      <div style={{ height: 8, width: '100%', background: accent }}/>
                      <div style={{ padding: '24px 26px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 10, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#0a0a0a' }}>
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{repo.name}</span>
                          </div>
                          <ExternalLink size={14} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0, marginTop: 3 }}/>
                        </div>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, flex: 1, marginBottom: 20 }}>
                          {repo.description || 'A project on GitHub — click to explore.'}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                            {repo.language && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: langColor[repo.language] || '#94a3b8', display: 'inline-block' }}/> {repo.language}
                              </span>
                            )}
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12}/> {repo.stargazers_count}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><GitFork size={12}/> {repo.forks_count}</span>
                          </div>
                          <div className="card-reveal" style={{ fontSize: 11, fontWeight: 700, color: accent, display: 'flex', alignItems: 'center', gap: 4 }}>
                            VIEW <ArrowUpRight size={11}/>
                          </div>
                        </div>
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
