import { AlertTriangle } from 'lucide-react';
import type { Deviation, DeltaStatement } from '@/lib/types';
import { Cite } from './cite';
import { Math } from './math';
import { MathInText } from './math-in-text';
import { MethodBadge } from './stat-chip';

// Structured "What didn't match" card: replaces the flat Cards-grid layout.
// Each deviation renders as a two-column delta — paper-did | ours-did —
// each with a method-family badge, math-rendered statement, and cite pill.
// The `Why?` reasoning lives behind a native <details> reveal so the page
// stays scannable but the depth is one click away. Falls back gracefully to
// the existing discrepancy / statement / reason prose when the polish layer
// hasn't emitted the structured fields.

export function DeviationDelta({ deviation: d }: { deviation: Deviation }) {
  const headline = d.headline ?? d.display_label ?? humanizeKind(d.kind);
  const summary  = d.discrepancy_paragraph ?? d.statement;
  const why      = d.why ?? d.reason ?? '';

  // Stack-route deviations don't have a literal "Paper" side; relabel as
  // "Reference route" when kind === 'stack' so the eyebrow stays honest.
  const paperLabel = d.kind === 'stack' ? 'Reference route' : 'Paper did';

  return (
    <article className="deviation-delta-card not-prose">
      <header className="deviation-delta-head">
        <AlertTriangle aria-hidden />
        <div>
          <div className="eyebrow">What didn't match</div>
          <h4>{headline}</h4>
        </div>
      </header>

      <div className="deviation-delta-grid">
        <DeltaPane
          side="paper"
          label={paperLabel}
          delta={d.paper_did}
          fallback={d.from}
        />
        <DeltaPane
          side="ours"
          label="This run did"
          delta={d.ours_did}
          fallback={d.to}
        />
      </div>

      {summary && (
        <p className="deviation-summary">
          <MathInText text={summary} />
          {d.cite && <Cite cite={d.cite} />}
        </p>
      )}

      {why && (
        <details className="deviation-why">
          <summary><span className="why-eyebrow">Why?</span></summary>
          <p>
            <MathInText text={why} />
          </p>
        </details>
      )}
    </article>
  );
}

function DeltaPane({
  side, label, delta, fallback,
}: {
  side: 'paper' | 'ours';
  label: string;
  delta?: DeltaStatement | null;
  fallback?: string | null;
}) {
  const badgeTone = side === 'ours' ? 'primary' : 'olive';
  return (
    <div className={`delta-pane delta-pane-${side}`}>
      <div className="delta-pane-head">
        <span className={`delta-pane-label ${side === 'ours' ? 'brand' : ''}`}>{label}</span>
        {delta?.badge && (
          <MethodBadge label={delta.badge.label} tone={delta.badge.tone ?? badgeTone} />
        )}
      </div>
      <div className="delta-pane-body">
        {delta?.tex
          ? <Math tex={delta.tex} fallback={delta.unicode_fallback ?? fallback ?? ''} />
          : <MathInText text={delta?.unicode_fallback ?? fallback ?? ''} />}
        {delta?.cite && <Cite cite={delta.cite} />}
      </div>
    </div>
  );
}

function humanizeKind(kind?: string | null): string {
  if (!kind) return 'Documented exception';
  // Methods, stacks, data, routes, etc. — keep audience-readable.
  const map: Record<string, string> = {
    method: 'Method deviation',
    stack:  'Stack deviation',
    data:   'Data deviation',
    route:  'Route deviation',
  };
  return map[kind] ?? `${kind[0].toUpperCase()}${kind.slice(1)} deviation`;
}
