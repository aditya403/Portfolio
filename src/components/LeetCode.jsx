import { useEffect, useState } from 'react';
import { Trophy, Target, CheckCircle2, Code2, ArrowUpRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { personal } from '../data/portfolio';

function Ring({ solved = 0, total = 0, label, color }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div className="ring is-visible" style={{ '--p': pct, '--ring-color': color }}>
        <span>
          {solved}
          <small>/ {total || '—'}</small>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{label}</div>
        <div className="num-badge" style={{ color }}>{pct}% solved</div>
      </div>
    </div>
  );
}

function StatBlock({ icon: Icon, label, value, color }) {
  return (
    <div className="card card-hover" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, display: 'grid', placeItems: 'center', background: `${color}14`, border: `1px solid ${color}30` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
          {value ?? '—'}
        </div>
        <div className="stat-label" style={{ marginTop: 6 }}>{label}</div>
      </div>
    </div>
  );
}

export default function LeetCode() {
  const ref = useReveal();
  const refStats = useReveal();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${personal.leetcodeUsername}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { if (d.status === 'error') throw new Error(); setStats(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="leetcode">
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="fade-up">
          <div className="eyebrow">05 / LeetCode</div>
          <h2 className="section-title">
            Problem solving.
          </h2>
          <p className="section-sub">
            Live stats from my <a href={personal.leetcode} target="_blank" rel="noopener noreferrer" className="arrow-link" style={{ color: 'var(--primary)' }}>LeetCode profile</a>.
          </p>
        </div>

        {loading && (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--fg-dim)' }}>
            Loading stats…
          </div>
        )}

        {error && (
          <div className="card" style={{ padding: 36, textAlign: 'center' }}>
            <p style={{ color: 'var(--fg-mute)', marginBottom: 16 }}>Couldn't load LeetCode stats.</p>
            <a href={personal.leetcode} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'inline-flex' }}>
              <Code2 size={15} /> View profile <ArrowUpRight size={14} />
            </a>
          </div>
        )}

        {!loading && !error && stats && (
          <>
            <div ref={refStats} className="fade-up-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
              <StatBlock icon={CheckCircle2} label="Total solved"     value={stats.totalSolved}                                         color="#10b981" />
              <StatBlock icon={Trophy}       label="Global ranking"   value={stats.ranking ? `#${stats.ranking.toLocaleString()}` : null} color="#f59e0b" />
              <StatBlock icon={Target}       label="Acceptance rate"  value={stats.acceptanceRate != null ? `${stats.acceptanceRate}%` : null} color="#0ea5e9" />
              <StatBlock icon={Code2}        label="Contribution pts" value={stats.contributionPoints}                                  color="#8b5cf6" />
            </div>

            <div className="card" style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
              <div className="num-badge" style={{ marginBottom: 24 }}>// difficulty breakdown</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 28, justifyItems: 'center' }}>
                <Ring solved={stats.easySolved}   total={stats.totalEasy}   label="Easy"   color="#10b981" />
                <Ring solved={stats.mediumSolved} total={stats.totalMedium} label="Medium" color="#f59e0b" />
                <Ring solved={stats.hardSolved}   total={stats.totalHard}   label="Hard"   color="#f43f5e" />
              </div>
            </div>

            <div style={{ marginTop: 28, textAlign: 'center' }}>
              <a href={personal.leetcode} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Code2 size={15} /> View full profile <ArrowUpRight size={14} />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
