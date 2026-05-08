import { useEffect, useState } from 'react';
import { Star, GitFork, ArrowUpRight, FolderGit2, Sparkles } from 'lucide-react';
import { Github } from './SocialIcons';
import useReveal from '../hooks/useReveal';
import { personal, workProjects } from '../data/portfolio';

const ALLOWED = ['leetcode-tracker', 'resume-builder'];

const langColor = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', Groovy: '#4298b8', Shell: '#89e051',
  CSS: '#563d7c', HTML: '#e34c26', Go: '#00ADD8',
};

/* ───────────── Selected Work — Brittany-style list rows ───────────── */
function WorkRow({ proj, index }) {
  return (
    <div className="work-row" tabIndex={0}>
      <div className="work-row-period">{proj.period}</div>
      <div className="work-row-body">
        <div className="work-row-head">
          <h4 className="work-row-title">
            <span className="work-row-num">{String(index + 1).padStart(2, '0')}</span>
            <span>{proj.name}</span>
          </h4>
          <div className="work-row-state">
            <span className={`work-row-pulse ${proj.state}`} />
            <span>{proj.state}</span>
          </div>
        </div>
        <p className="work-row-blurb">{proj.blurb}</p>
        <div className="work-row-foot">
          <div className="work-row-tech">
            {proj.tech.map(t => <span key={t} className="pill">{t}</span>)}
          </div>
          <div className="work-row-metric">
            <span className="work-row-metric-num">{proj.metric}</span>
            <span className="work-row-metric-sub">{proj.metricSub}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── GitHub featured + secondary cards ───────────── */
function CardSkeleton({ featured }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', gridColumn: featured ? 'span 8' : 'span 4', minHeight: featured ? 320 : 240 }}>
      <div style={{ height: 4, background: 'rgba(15, 23, 42, 0.06)' }} />
      <div style={{ padding: 28 }}>
        <div style={{ width: '60%', height: 22, background: 'rgba(15, 23, 42, 0.05)', borderRadius: 6, marginBottom: 16 }} />
        <div style={{ width: '90%', height: 13, background: 'rgba(15, 23, 42, 0.04)', borderRadius: 4, marginBottom: 8 }} />
        <div style={{ width: '70%', height: 13, background: 'rgba(15, 23, 42, 0.04)', borderRadius: 4 }} />
      </div>
    </div>
  );
}

function FeaturedCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover gh-featured"
      style={{ gridColumn: 'span 8' }}
    >
      <div className="gh-featured-banner">
        <span className="gh-featured-tag">
          <Sparkles size={11} style={{ color: 'var(--warm)' }} /> Featured
        </span>
        <span className="gh-featured-updated">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
          updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>
      <div className="gh-card-body">
        <div className="gh-card-head">
          <div className="gh-card-icon"><FolderGit2 size={18} style={{ color: 'var(--primary)' }} /></div>
          <div>
            <div className="num-badge">01</div>
            <h3 className="gh-card-title" style={{ fontSize: 24 }}>{repo.name}</h3>
          </div>
          <ArrowUpRight size={18} className="gh-card-arrow" />
        </div>
        <p className="gh-card-blurb" style={{ fontSize: 15 }}>{repo.description || 'A project on GitHub.'}</p>
        <div className="gh-card-foot">
          {repo.language && (
            <div className="gh-card-lang">
              <span className="lang-dot" style={{ background: langColor[repo.language] || '#94a3b8' }} />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="gh-card-stats">
            <span><Star size={13} /> {repo.stargazers_count}</span>
            <span><GitFork size={13} /> {repo.forks_count}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function SecondaryCard({ repo, index }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover gh-secondary"
      style={{ gridColumn: 'span 4' }}
    >
      <div className="gh-card-body">
        <div className="gh-card-head">
          <div className="gh-card-icon"><FolderGit2 size={16} style={{ color: 'var(--secondary)' }} /></div>
          <div>
            <div className="num-badge">0{index + 1}</div>
            <h3 className="gh-card-title">{repo.name}</h3>
          </div>
          <ArrowUpRight size={16} className="gh-card-arrow" />
        </div>
        <p className="gh-card-blurb">{repo.description || 'A project on GitHub.'}</p>
        <div className="gh-card-foot">
          {repo.language && (
            <div className="gh-card-lang">
              <span className="lang-dot" style={{ background: langColor[repo.language] || '#94a3b8' }} />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="gh-card-stats">
            <span><Star size={13} /> {repo.stargazers_count}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const ref = useReveal();
  const refWork = useReveal();
  const refGh = useReveal();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${personal.githubUsername}/repos?sort=updated&per_page=20`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => {
        setRepos(d.filter(r => !r.fork && ALLOWED.includes(r.name)));
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="projects">
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="fade-up">
          <div className="eyebrow">Projects</div>
          <h2 className="section-title">What I've shipped.</h2>
          <p className="section-sub">
            Selected work delivered at FIS, plus open-source side projects on GitHub.
          </p>
        </div>

        {/* ── Selected work list ── */}
        <div className="work-section-head">
          <h3 className="work-section-title">Selected work</h3>
          <div className="work-section-line" />
          <span className="work-section-meta">{workProjects.length} systems</span>
        </div>

        <div ref={refWork} className="fade-up work-list">
          {workProjects.map((p, i) => <WorkRow key={p.name} proj={p} index={i} />)}
        </div>

        {/* ── Side projects ── */}
        <div className="work-section-head" style={{ marginTop: 72 }}>
          <h3 className="work-section-title">Side projects</h3>
          <div className="work-section-line" />
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="ext-link work-section-meta">
            <Github size={13} /> All repos
          </a>
        </div>

        <div ref={refGh} className="fade-up gh-grid">
          {loading && (<><CardSkeleton featured /><CardSkeleton /></>)}
          {error && (
            <div className="card" style={{ padding: 32, textAlign: 'center', gridColumn: '1 / -1' }}>
              <p style={{ color: 'var(--fg-mute)', marginBottom: 16 }}>Couldn't load repositories.</p>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'inline-flex' }}>
                <Github size={15} /> View on GitHub <ArrowUpRight size={14} />
              </a>
            </div>
          )}
          {!loading && !error && repos.map((repo, i) => (
            i === 0
              ? <FeaturedCard key={repo.id} repo={repo} />
              : <SecondaryCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
