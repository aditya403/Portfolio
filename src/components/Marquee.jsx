import useReveal from '../hooks/useReveal';
import { skills } from '../data/portfolio';

export default function Marquee() {
  const ref = useReveal();
  const refRows = useReveal();
  return (
    <section id="skills" aria-label="Tech stack">
      <div className="wrap">
        <div ref={ref} className="fade-up" style={{ marginBottom: 36 }}>
          <div className="eyebrow">Skills</div>
          <h2 className="section-title">Stack at a glance.</h2>
          <p className="section-sub">
            What I reach for when I'm building. Languages, frameworks, and the systems thinking behind them.
          </p>
        </div>

        <div ref={refRows} className="fade-up stack-card">
          <div className="stack-rows">
            {skills.map((group) => (
              <div key={group.category} className="stack-row">
                <div className="stack-row-label">
                  <span className="stack-row-dot" style={{ background: group.color }} />
                  <span>{group.category}</span>
                </div>
                <div className="stack-row-items">
                  {group.items.map((item, i) => (
                    <span key={item} className="stack-row-item">
                      <span className="stack-row-text">{item}</span>
                      {i < group.items.length - 1 && <span className="stack-row-sep">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
