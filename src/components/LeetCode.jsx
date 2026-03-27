import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Trophy, Target, CheckCircle } from 'lucide-react';
import { personal } from '../data/portfolio';
import TiltCard from './TiltCard';
import OdometerNumber from './OdometerNumber';

function GlowRing({ solved, total, color, label, size = 100 }) {
  const pct = total > 0 ? (solved / total) * 100 : 0;
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={5} />
          <motion.circle
            cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - (circ * pct / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 900, color, fontFamily: "'JetBrains Mono', monospace" }}>{solved}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>/ {total}</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{label}</div>
    </div>
  );
}

export default function LeetCode() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${personal.leetcodeUsername}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { if (d.status === 'error') throw new Error(); setStats(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const StatCard = ({ label, value, Icon, color }) => (
    <TiltCard maxTilt={8} className="card" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
          {value != null ? (
            typeof value === 'string' && value.startsWith('#')
              ? <><span style={{ fontSize: 18, opacity: 0.5 }}>#</span><OdometerNumber value={value.replace(/[#,]/g, '')} /></>
              : typeof value === 'string' && value.endsWith('%')
                ? <OdometerNumber value={value.replace('%', '')} suffix="%" />
                : <OdometerNumber value={String(value)} />
          ) : '—'}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{label}</div>
      </div>
    </TiltCard>
  );

  return (
    <section id="leetcode" style={{ width: '100%', padding: 'clamp(60px, 10vw, 100px) 0' }}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>06 — Problem Solving</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            LeetCode Stats
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: [0, 1, 0.5, 1] }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <Trophy size={28} color="#ffaa00" style={{ filter: 'drop-shadow(0 0 8px rgba(255,170,0,0.4))' }} />
            </motion.span>
          </h2>
        </motion.div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap: 20 }}>
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 130, borderRadius: 20 }} />)}
          </div>
        )}

        {error && (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            <p style={{ marginBottom: 16 }}>Could not load LeetCode stats.</p>
            <a href={personal.leetcode} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <Code2 size={16}/> View Profile
            </a>
          </div>
        )}

        {!loading && !error && stats && (
          <>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap: 16, marginBottom: 24 }}>
              <StatCard label="Total Solved" value={stats.totalSolved} Icon={CheckCircle} color="#00ff88" />
              <StatCard label="Global Ranking" value={stats.ranking ? `#${stats.ranking.toLocaleString()}` : null} Icon={Trophy} color="#ffaa00" />
              <StatCard label="Acceptance Rate" value={stats.acceptanceRate ? `${stats.acceptanceRate}%` : null} Icon={Target} color="#00d4ff" />
              <StatCard label="Contribution Pts" value={stats.contributionPoints} Icon={Code2} color="#ff3366" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="card" style={{ padding: '28px 32px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Difficulty Breakdown</p>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
                <GlowRing label="Easy" solved={stats.easySolved} total={stats.totalEasy} color="#22c55e" />
                <GlowRing label="Medium" solved={stats.mediumSolved} total={stats.totalMedium} color="#ffaa00" />
                <GlowRing label="Hard" solved={stats.hardSolved} total={stats.totalHard} color="#ff3366" />
              </div>
            </motion.div>
          </>
        )}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: 28 }}>
          <a href={personal.leetcode} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Code2 size={16} /> View LeetCode Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
