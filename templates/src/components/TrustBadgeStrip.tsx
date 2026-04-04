export default function TrustBadgeStrip() {
  return (
    <div style={{ background: '#f8fafc', padding: '25px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
          {['FULLY INSURED', '5-STAR RATED', 'FREE CONSULTATION', 'SATISFACTION GUARANTEE'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '4px', color: '#64748b' }}>
                ✓ {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
