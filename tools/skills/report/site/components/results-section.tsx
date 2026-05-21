import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { AlertTriangle } from 'lucide-react';
import type { Verdict, Chip, FigureMeta, Deviation, Provenance } from '@/lib/types';

const VERDICT_ICON: Record<Verdict['status'], string> = {
  match: '✓', partial: '◐', fail: '✗', unknown: '?',
};

export function ResultsSection({
  verdict, chips, figures, deviations, provenance,
  pending, wallClockEstimate, expectedOutput, headline,
}: {
  verdict: Verdict;
  chips: Chip[];
  figures: FigureMeta[];
  deviations: Deviation[];
  provenance: Provenance;
  pending: boolean;
  wallClockEstimate: string;
  expectedOutput: string;
  headline?: { text: string; cite?: string | null };
}) {
  return (
    <section id="results" className="page">
      <header>
        <h2>Results</h2>
        <span className="subtitle">{pending ? 'pending — confirm to run' : 'what we found'}</span>
      </header>
      <div className="space-y-12">

        {pending ? (
          <Callout type="info" title="Pending — confirm to run">
            <p className="m-0 mb-2">
              The Methodology section above declares the run we propose. Compute has
              not started. Read it through, then ratify in chat.
            </p>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-4 not-prose">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[color:var(--terracotta)]">Wall-clock estimate</dt>
                <dd className="font-mono text-sm mt-1 text-[color:var(--charcoal)]">{wallClockEstimate || '—'}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[color:var(--terracotta)]">Expected output</dt>
                <dd className="text-sm mt-1 text-[color:var(--charcoal)]">{expectedOutput || '—'}</dd>
              </div>
            </dl>
          </Callout>
        ) : (
          <>
            {/* Hero verdict — Results is the payoff; dominant visual element */}
            <div className={`verdict-hero ${verdict.status} not-prose`}>
              <div className="verdict-icon" aria-hidden>{VERDICT_ICON[verdict.status]}</div>
              <div>
                <div className="verdict-eyebrow">Verdict</div>
                <h3 className="verdict-label">{verdict.label}</h3>
                <p className="verdict-detail">{verdict.detail}</p>
                {chips.length > 0 && (
                  <div className="verdict-chips">
                    {chips.map(c => (
                      <span key={c.id} className={`chip ${c.status}`} title={c.popover}>
                        {c.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Figures — paper vs reproduction, side-by-side, click to open full-size */}
            {figures.length > 0 && (
              <section>
                <div className="figures-header not-prose">
                  <h3 className="text-xl font-semibold m-0 text-[color:var(--near-black)]">Figures</h3>
                  <span className="text-[11px] tracking-[0.04em] text-[color:var(--stone)]">
                    {figures.length} figure{figures.length > 1 ? 's' : ''} · paper vs reproduction
                  </span>
                </div>
                <div className="space-y-14 mt-8">
                  {figures.map((f, i) => (
                    <figure key={f.id} id={`fig-${f.id}`} className="figure-pair not-prose">
                      <div className="figure-pair-meta">
                        <span className="eyebrow">Figure {i + 1} of {figures.length} · {f.display_id ?? f.id}</span>
                        {f.paper_attribution && (
                          <span className="figure-attribution">{f.paper_attribution}</span>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="figure-panel-large">
                          <div className="panel-head">
                            <span className="label">Paper · reference</span>
                          </div>
                          {f.paper_data_url && (
                            <div className="img-frame">
                              <img src={f.paper_data_url} alt={f.caption_paper || `Paper figure ${f.id}`} />
                            </div>
                          )}
                          {f.caption_paper && (
                            <p className="figure-caption">{f.caption_paper}</p>
                          )}
                        </div>
                        <div className="figure-panel-large brand">
                          <div className="panel-head">
                            <span className="label brand">This run · reproduction</span>
                          </div>
                          {f.ours_data_url && (
                            <div className="img-frame">
                              <img src={f.ours_data_url} alt={f.caption_ours || `Reproduction of ${f.id}`} />
                            </div>
                          )}
                          {f.caption_ours && (
                            <p className="figure-caption">{f.caption_ours}</p>
                          )}
                        </div>
                      </div>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* What didn't match — Cards grid, terracotta-toned */}
            {deviations.length > 0 && (
              <section id="what-didnt-match">
                <h3 className="text-xl font-semibold mb-5 mt-0 text-[color:var(--near-black)]">What didn't match</h3>
                <Cards className="not-prose">
                  {deviations.map(d => (
                    <Card
                      key={d.id}
                      className="report-card report-card-warn"
                      icon={<AlertTriangle />}
                      title={d.display_label ?? 'Documented exception'}
                    >
                      <p className="report-card-body">{d.discrepancy_paragraph ?? d.statement}</p>
                      {d.why && (
                        <p className="report-card-body mt-2">
                          <span className="why-eyebrow">Why?</span>{d.why}
                        </p>
                      )}
                    </Card>
                  ))}
                </Cards>
              </section>
            )}

            {/* Where this came from */}
            <section className="not-prose">
              <h3 className="text-xl font-semibold mb-4 mt-0 text-[color:var(--near-black)]">Where this came from</h3>
              <div className="prov-grid">
                <div>
                  <div className="label">Run</div>
                  <div className="value">{provenance.run.run_id}</div>
                  <div className="sub">{provenance.run.n_cells} cells · {provenance.run.total_wall_h.toFixed(1)} wall-h</div>
                </div>
                <div>
                  <div className="label">Cluster</div>
                  <div className="value">{provenance.cluster || '—'}</div>
                </div>
                <div>
                  <div className="label">Source</div>
                  <div className="value">
                    {provenance.source.url
                      ? <a href={provenance.source.url} className="hover:text-[color:var(--terracotta)]">{provenance.source.paper_id}</a>
                      : provenance.source.paper_id}
                  </div>
                </div>
                <div>
                  <div className="label">Harness</div>
                  <div className="value">{provenance.harness.report_id}</div>
                  <div className="sub">rendered {provenance.harness.date}</div>
                </div>
              </div>
            </section>
          </>
        )}

      </div>
    </section>
  );
}
