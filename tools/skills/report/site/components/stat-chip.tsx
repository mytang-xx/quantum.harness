import { Math } from './math';

// StatChip: tight ivory block with eyebrow label + value. The value may be
// plain text or math (when value_tex is provided, rendered via <Math inline>).
// Used in Model key-facts strips, Method operational rows, Parameters.

export function StatChip({
  label, value, value_tex, value_unicode, cite,
}: {
  label: string;
  value?: string;
  value_tex?: string | null;
  value_unicode?: string | null;
  cite?: string | null;
}) {
  return (
    <div className="stat-chip">
      <div className="stat-chip-label">{label}</div>
      <div className="stat-chip-value">
        {value_tex
          ? <Math tex={value_tex} fallback={value_unicode ?? ''} />
          : (value ?? value_unicode ?? '')}
      </div>
    </div>
  );
}

// MethodBadge: small pill identifying the method family ("Exact diagonalization",
// "Tensor network", "Monte Carlo", "Variational", "DMFT"). Tones:
// primary = terracotta, olive = neutral, stone = muted.

export function MethodBadge({
  label, tone = 'primary',
}: { label: string; tone?: 'primary' | 'olive' | 'stone' }) {
  return <span className={`method-badge method-badge-${tone}`}>{label}</span>;
}
