export default function Divider({ label }) {
  return (
    <div className="wrap" style={{ padding: '8px 24px', position: 'relative', zIndex: 1 }}>
      <div className="rule-divider" aria-hidden="true">
        <span className="rule-divider-line" />
        {label && <span className="rule-divider-label">{label}</span>}
        <span className="rule-divider-line" />
      </div>
    </div>
  );
}
