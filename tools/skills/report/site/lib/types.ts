// Editorial-pack types mirroring tools/skills/report/SKILL.md → Schema.
// Build-time data (lib/data.ts) is typed against these; components consume
// them directly. Single-word fields throughout — see SKILL.md.

export type Cite = string | null;

export interface Sourced { text: string; cite: Cite; }
export interface ProblemBlock {
  kind: 'background' | 'open_question' | 'why_it_matters' | string;
  text: string;
  cite: Cite;
  scope: string | null;
}

// Visual-anchor schema (additive to the original paper|ours pair). The polish
// subagent emits these fields when the paper centrally identifies a defining
// equation, key facts, or a Hilbert-space dimension. Fall back to old paper/
// ours prose when missing. All fields paper-agnostic.

export interface MathExpr {
  tex: string;                   // authoritative LaTeX for KaTeX
  unicode_fallback?: string;     // pre-rendered Unicode for SSR-fail / a11y
  cite?: Cite;
}
export interface KeyFact {
  label: string;
  value?: string;                // plain text (no math)
  value_tex?: string;            // LaTeX form (rendered via <Math inline>)
  value_unicode?: string;        // Unicode fallback for value_tex
  cite?: Cite;
}
export interface DimensionAnchor {
  value_tex: string;
  value_unicode?: string;
  at?: string;                   // "at L = 32"
  cite?: Cite;
}
export interface MethodBadge { label: string; tone?: 'primary' | 'olive' | 'stone' }
export interface OperationalRow {
  name: string;
  value?: string;
  value_tex?: string;
  value_unicode?: string;
}

export interface Model {
  id: string;
  name: string;
  paper: Sourced;
  ours: Sourced;
  // visual-anchor fields (null = polish subagent didn't emit; renderer falls back to paper/ours prose):
  equation?: MathExpr | null;
  summary?: Sourced | null;
  key_facts?: KeyFact[];
  dimension?: DimensionAnchor | null;
  delta_from_paper?: string | null;
}
export interface Method {
  id: string;
  name: string;
  paper: Sourced;
  ours: Sourced;
  deviation?: string | null;
  headline?: MathExpr | null;
  badge?: MethodBadge | null;
  operational?: OperationalRow[];
}
export interface Param {
  name: string;
  values: (number | string)[];
  scope: string | null;
  why: Sourced;
  // audience-readable display fields (null = polish subagent didn't emit):
  label?: string | null;
  scope_label?: string | null;
  values_tex?: string[] | null;
  values_unicode?: string[] | null;
}
export interface Assumption {
  text: string;
  scope: string | null;
  why: Sourced;
  label?: string | null;
  text_tex?: string | null;
  text_unicode?: string | null;
  scope_label?: string | null;
}
export interface Deviation {
  id: string;
  statement: string;
  why: string;
  display_label?: string | null;
  discrepancy_paragraph?: string | null;
}

export type VerdictStatus = 'match' | 'partial' | 'fail' | 'unknown';
export interface Verdict {
  status: VerdictStatus;
  label: string;
  detail: string;
  cite?: Cite;             // optional — polish subagent attaches a source pointer
}

export interface Chip {
  id: string;
  label: string;
  popover: string;
  status: 'ok' | 'warn' | 'muted';
  cite: Cite;
}

export interface FigureMeta {
  id: string;
  display_id?: string | null;
  caption_paper: string;
  caption_ours: string;
  paper_attribution?: string | null;
  paper_data_url: string;             // base64 inlined by build.mjs
  ours_data_url: string;              // base64-inlined or JSON-embedded
}

export interface Provenance {
  run: { run_id: string; n_cells: number; total_wall_h: number };
  cluster: string;
  source: { paper_id: string; url: string | null };
  harness: { report_id: string; date: string };
}

export interface Meta {
  paperId: string;
  runId: string;
  title: string;
  description: string;
  authors: string;
  venue: string;
  url: string | null;
  stage: 'plan' | 'append';
  toc: { title: string; url: string; depth: number }[];
}

export interface Headline { text: string; cite: Cite }
