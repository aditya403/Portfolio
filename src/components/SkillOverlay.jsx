import { motion, useTransform } from 'framer-motion';
import { skills } from '../data/portfolio';

const POSITIONS = [
  { side: 'left', top: '20%' },
  { side: 'right', top: '30%' },
  { side: 'left', top: '65%' },
  { side: 'right', top: '15%' },
  { side: 'left', top: '45%' },
  { side: 'right', top: '55%' },
];

const PHASE_RANGES = [
  [0, 0.2],
  [0.2, 0.4],
  [0.4, 0.6],
  [0.6, 0.8],
  [0.6, 0.8],
  [0.8, 1.0],
];

function SkillGroup({ category, items, color, position, scrollProgress, phaseRange }) {
  const fadeIn = Math.max(0, phaseRange[0] - 0.05);
  const fadeOut = Math.min(1, phaseRange[1] + 0.15);

  const opacity = useTransform(
    scrollProgress,
    [fadeIn, phaseRange[0], phaseRange[1], fadeOut],
    [0, 1, 1, phaseRange[1] >= 0.8 ? 1 : 0.3]
  );

  const x = useTransform(
    scrollProgress,
    [fadeIn, phaseRange[0]],
    [position.side === 'left' ? -40 : 40, 0]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        [position.side]: '5%',
        top: position.top,
        opacity, x,
        maxWidth: 200,
        zIndex: 2,
      }}
    >
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 3,
        textTransform: 'uppercase', color, marginBottom: 10,
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {category}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(item => (
          <div
            key={item}
            style={{
              padding: '6px 14px', borderRadius: 50,
              fontSize: 12, fontWeight: 500, color: '#e8e8e8',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${color}33`,
              whiteSpace: 'nowrap', transition: 'all 0.2s', cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.borderColor = `${color}88`;
              e.currentTarget.style.background = `${color}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = `${color}33`;
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillOverlay({ scrollProgress }) {
  return (
    <>
      {skills.map((cat, i) => (
        <SkillGroup
          key={cat.category}
          category={cat.category}
          items={cat.items}
          color={cat.color}
          position={POSITIONS[i]}
          scrollProgress={scrollProgress}
          phaseRange={PHASE_RANGES[i]}
        />
      ))}
    </>
  );
}
