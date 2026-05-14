# Report Skill — Design Spec

> **Date:** 2026-05-14
> **Status:** Draft pending user review
> **Scope artifacts:** `docs/DESIGN.md`, `tools/skills/report/SKILL.md`, small additions to `tools/skills/reproduce-paper/SKILL.md` and `tools/templates/reproduce-paper/protocol.toml`

## 1. Goal

Produce a single-page interactive HTML report for any reproduction run, suitable as a shareable scientific deliverable (Slack drop, email attachment, talk handout). Audience: collaborators, grad students, lab visitors. Constraint: a person opening the file from a link gets the result and trust signals in five seconds, can drill in for depth, and never reads more than a hundred words at a glance.

## 2. Audience-first principle

Comfort the reader. The figure is the hero. Words are scaffolding. Trust signals are visible without paragraphs. Drilldowns are optional. Above-the-fold word budget ≤ 100. This principle has primacy over architectural purity, naming conventions, or upstream-author convenience.

## 3. Foundation — already landed by Codex

This spec layers above commit `a75327f Tighten reproduction evidence workflow`. The report skill consumes Codex's evidence contract; it does not re-invent it.

- **Evidence taxonomy** (`AGENTS.md`): `primary | trusted_reference | current_run | hint | assumption | deviation`. Hints quarantined; cannot close a claim without primary confirmation or current-run regeneration. Old scripts/figures/data/plans default to `hint`.
- **Run directory contract** (`tools/skills/reproduce-paper/SKILL.md`): `protocol.toml` + `reproduce-plan.toml` + `progress/run_manifest.toml` + `cells/<id>/manifest.json` + `verify/verify_<artifact>_<date>.md` + `figs/<id>.png` + `execution_summary.md` + `run-report.md` + `consolidated.{jl,py}`.
- **Provenance fields on manifests**: `evidence_class = "current_run"`, `protocol_hash`, `script_hash`, `claim_ids`, `assumptions`, `deviations`, `stack_id`, `profile_id`, `artifact_paths`.
- **`run-report.md` canonical sections**: Setup / Settings / Result per figure / Verification status / Evidence map / Protocol status / Residual uncertainty / Reproduction.
- **Verify modes**: `protocol | kb-card | script | result | close`. Close mode already audits the bundle of `run-report.md` + consolidated script + protocol + verify reports + manifests.

## 4. The over-trust observation that motivated the verify gate

`docs/milestone-log.md` entry `O1. Agents over-trust cached content (2026-05-14)`. During brainstorm iteration, a v5 prototype rendered a fabricated reference range (`paper c_L ∈ [−0.10, −0.05]`) as if sourced; trace showed the agent had never opened the paper, KB cards, or extracted figures. The proposed mechanism #4 from that entry — *mandatory verify gate on user-facing artifacts* — is realized in this spec as the report skill's terminal stage.

## 5. Architecture — five stages

The report skill is **organizer + tiny verifier + UI/UX-tuned editor + renderer**, in that order, with an independent terminal audit. The skill does not assume the calling agent has UI/UX taste; the editorial polish lives inside the skill via a dispatched subagent.

### Stage 1 — Pre-flight verifier (mechanical, the skill itself)

Cheap evidence-consistency checks. Block render and surface gaps via `AskUserQuestion` if any fail.

- `protocol.toml` exists and parses; required sections present (`[artifact]`, `[[sources]]`, `[[claims]]`, `[[checks]]`).
- `run-report.md` exists; required sections present (Setup, Settings, Result per figure, Verification status, Evidence map, Protocol status).
- Every `[[claims]]` id appears at least once in `run-report.md`'s Evidence map.
- Every `cells/<id>/manifest.json` carries `evidence_class = "current_run"` and a `protocol_hash` matching `protocol.toml`'s computed hash.
- `figs/<id>.png` and `figs/<id>.json` exist for every figure declared in `protocol.[[figures]]`. (`figs/<id>.json` is a small additional close-step output specified in §10.)
- Every `[[figures]].paper_path` resolves to an existing file.
- No `verify/` reports older than the `protocol.toml` mtime (would be stale).

### Stage 2 — Polish subagent (UI/UX-tuned editor)

Dispatch a polish subagent **with the same model id, reasoning/effort level, service tier, sandbox, approval policy, and tool-access settings as the main agent** (per CLAUDE.md "Subagents match the main agent" rule — no downgrades, no silent upgrades). When variation across callers is a quality risk (e.g., Codex callers may produce weaker UI/UX than Claude callers), the mitigation is **structural**, not via subagent model swap:
- the polish subagent's brief is precise and example-laden (§5.2.1 below);
- DESIGN.md is detailed enough to constrain output regardless of model;
- the organize stage is mechanical (no LLM judgment);
- the close-mode audit (§5.5) catches editorial drift before ship.

If observed quality across callers proves uneven on production runs, that becomes a milestone-log observation, not a silent model override.

The subagent reads the full evidence pack and writes an editorial sidecar `results/<run>/editorial.json`.

**Subagent brief (verbatim, in the SKILL.md):**

> You are a UI/UX-tuned editor for a scientific demo report destined for collaborators, grad students, and lab visitors. Audience-first: comfort the reader, hide the jargon, the figure is the hero, words are scaffolding. Above-the-fold word budget ≤ 100.
>
> Read the supplied evidence pack: `protocol.toml`, `run-report.md`, every `cells/<id>/manifest.json`, every `verify/verify_<…>.md`, and `figs/<id>.{png,json}`. Produce a structured JSON `editorial.json` populating the fields below. **Every sentence and phrase you write must cite an evidence-pack file:line in a `sourced_by` array.** No invention. No paraphrase that drifts from the source's claim. If a field cannot be sourced, leave it null and add it to a top-level `gaps` list with the reason.
>
> Output schema:
> ```json
> {
>   "headline": { "text": "…one sentence: claim + framing…", "sourced_by": ["protocol.toml#L12", "run-report.md#L8"] },
>   "claims": [
>     { "id": "fig4.symmetry", "display_label": "symmetry sector", "popover": "…one sentence detail…", "sourced_by": [...] }
>   ],
>   "deviations": [
>     { "id": "backend", "display_label": "MPS backend", "popover": "…one sentence…", "discrepancy_paragraph": "…optional 1-2 sentence prose for the discrepancy panel…", "sourced_by": [...] }
>   ],
>   "figures": [
>     { "label": "fig4a", "caption_paper": "…one sentence…", "caption_ours": "…one sentence…", "sourced_by": [...] }
>   ],
>   "glossary": [
>     { "symbol": "c_L(h)", "name": "Subleading increment c_L(h)", "body": "…one sentence…", "formula": "c_L = 2 M₂(L/2) − M₂(L)", "sourced_by": [...] }
>   ],
>   "gaps": []
> }
> ```
>
> Style guide: terse, scientific-confident, no marketing voice, no first-person, no rhetorical questions, no exclamation marks. Use Anthropic Serif (display) and Inter (UI) cadence — declarative sentences, modest length, generous whitespace implied. The downstream renderer will compose your fields into a figure-first HTML; the verify-close subagent will audit your sources.

The sidecar is current-run evidence: hashed against the input pack; cached at `results/<run>/editorial.json`; regenerated when any input hash changes.

### Stage 3 — Organize (mechanical, the skill itself)

Apply deterministic selection rules over (raw evidence + editorial sidecar).

- **Featured figure** ← first `[[figures]]` entry by protocol order, overridable by `protocol.featured_figure`.
- **Highlighted cell in hover-callout default** ← cell at `protocol.central_param` if declared; else cell with smallest `se`; else first by id.
- **Chip set** ← one chip per claim (status from verify reports — `✓` if all backing verify reports passed, `⚠` if any failed, `muted` if no verify report exists). Then one chip per deviation (always `⚠`). Capped at 6; further chips spill into a "more" expandable.
- **Discrepancy ordering** ← deviations referenced by failing checks first; then deviations referenced by claims; then unreferenced deviations.
- **Evidence map** ← rendered from `run-report.md` Evidence map section, parsed structurally.
- **Provenance footer** ← `progress/run_manifest.toml` (cluster, run id, dates) + git (harness commit).

These are RULES, not authoring decisions. Each is mechanically applied with no LLM judgment.

### Stage 4 — Render (mechanical, the skill itself)

Compose organized payload into the figure-first HTML genre per DESIGN.md. The genre is fixed:

```
TOP BAR ────────────────────────────────────────────────────────────────────────
  [arXiv pill]  Authors — Paper title.  Venue · arxiv link        Run meta block
HERO ───────────────────────────────────────────────────────────────────────────
  Claim line (32px serif, ≤ 1 line on desktop)                 Tag (cell · wall)
  ┌─ Paper Fig N ────────┐  ┌─ Reproduction (interactive) ─────┐
  │   PNG (primary)       │  │   SVG plot from figs/<id>.json   │
  │   caption_paper       │  │   caption_ours                   │
  └───────────────────────┘  └──────────────────────────────────┘
STATUS STRIP ──────────────────────────────────────────────────────────────────
  ✓ chip  ✓ chip  ⚠ chip  ⚠ chip  muted chip          (hint: tap for manifest)
SCROLL HINT ────────────────────────────────────────────────────────────────── ↓
BELOW THE FOLD ────────────────────────────────────────────────────────────────
  ┌─ Contract ──────────────┐  ┌─ Discrepancy ──────────────┐
  │   sources, claims,       │  │   deviation list with       │
  │   deviations, budget     │  │   discrepancy_paragraph     │
  └──────────────────────────┘  └──────────────────────────────┘
  ┌─ Provenance (4 cols: Run · Cluster · Source · Harness) ────┐
  └─────────────────────────────────────────────────────────────┘
DRAWERS / OVERLAYS ────────────────────────────────────────────────────────────
  Cell drawer (right-side desktop / bottom sheet mobile) — full manifest
  Glossary tooltip — symbol → name + body + formula
  Hover callout — magnetic dot + per-cell summary
```

Output: `results/<run>/report_<run-id>_<YYYY-MM-DD>.html` + `results/<run>/report_latest.html` symlink.

### Stage 5 — Terminal verify (subagent, independent)

Dispatch `/verify --mode close` against the rendered HTML. The reviewer subagent's brief includes:

- Source-fidelity audit: every editorial sentence (from `editorial.json`) must trace to its declared `sourced_by` evidence; verify the trace by grep.
- DESIGN.md compliance audit: rendered components match DESIGN.md specs (palette, typography, spacing, responsive behavior, tap-fallback).
- Mobile-render check: load at 375×667; assert no horizontal overflow, all interactive elements have a tap path, touch targets ≥ 44×44px.

Verdict: `✓` ships; `⚠` requires explicit user accept; `✗` blocks ship.

## 6. Mandatory genre elements

The skill refuses to render without these. Failure surfaces as `AskUserQuestion` with options to repair.

- **Paper figure embed**: every `[[figures]]` entry must resolve to an existing PNG. No "we'll add the paper figure later" — the comparison is the report's reason for being.
- **Claim line**: from `editorial.json.headline.text`; if missing, fallback is `protocol.[[claims]][0].statement` verbatim.
- **Side-by-side hero**: paper PNG | interactive plot. No standalone "ours" view.
- **Status chip strip**: minimum 1 chip; every chip backed by a verify report or a protocol deviation.
- **Contract panel**: rendered from `protocol.toml`, all sections.
- **Evidence map drilldown**: every claim → source → manifest → verify report path is clickable.

## 7. Visual language — `docs/DESIGN.md`

A separate artifact, vendored from `nexu-io/open-design/design-systems/claude/DESIGN.md` (Apache-2.0 attribution preserved in header) + harness extensions. Self-contained: a fresh agent reads only DESIGN.md and produces compliant HTML.

Sections (mirrors the upstream):
1. **Theme & atmosphere** — warm parchment, editorial gravitas, scientific restraint.
2. **Color palette** — full Claude warm palette (`parchment #f5f4ed`, `ivory #faf9f5`, `sand #e8e6dc`, `terracotta #c96442`, `coral #d97757`, `near-black #141413`, `charcoal #4d4c48`, `olive #5e5d59`, `stone #87867f`, `silver #b0aea5`, `border-cream #f0eee6`, `ring-warm #d1cfc5`) + harness-specific roles (`paper-band rgba(94,93,89,0.10)`, `warn = terracotta`, `ok = olive`).
3. **Typography** — `Source Serif 4` (display 500), `Inter` (body 400/450/500/600), `JetBrains Mono` (code 400/500). Hierarchy table: hero claim 32-56px, panel-title 16-22px, body 14-18px, label 10-11px caps-tracked, meta 11-12px mono. Self-containment: prefer system fallbacks (Georgia, system-ui, ui-monospace); CDN load is allowed; degrade gracefully.
4. **Components** (full HTML + CSS specs, drop-in):
   - Top bar
   - Panel card (paper + ours containers)
   - Chip + chip-pop (hover popover with one-sentence detail)
   - Glossbox (symbol tooltip with name + body + formula)
   - Callout (dark hover-on-data-point box)
   - Drawer + drawer-backdrop (cell manifest deep-dive)
   - Toggle (pill button for paper-y-window match etc.)
   - Legend item (with focus/dim behavior)
   - Contract grid (label / value rows)
   - Discrepancy panel (deviation list)
   - Provenance footer (4-column row)
   - Plot SVG conventions: `axis`, `grid`, `tick`, `curve` (with focus/dim), `errbar`, `pt` (with hit-area expansion), `paper-band`, `hcline`, `zero`
5. **Layout** — 8px spacing scale, max-width 880-1240px (regions vary), generous editorial pacing (≥ 56px between major sections), border-radius scale (sharp 4 → comfortable 8-12 → very 16-24px).
6. **Depth & elevation** — ring-shadow philosophy (`0 0 0 1px` warm-grey), whisper drop-shadow (`rgba(20,20,19,0.05) 0 4px 24px`) for elevated panels. No traditional drop shadows.
7. **Motion** — timing scale (140ms / 220ms / 280ms), easings (`ease`, `cubic-bezier(0.32, 0.72, 0, 1)`), animations: `draw` (curve stroke-dashoffset), `slideIn` (drawer), `bandFade`, `bob` (scroll hint). Restraint: nothing bouncy, nothing spinny.
8. **Self-containment** — paper PNG inlined as base64 (≤ 500KB per image; downscale via `pdftoppm -r 150` if exceeded); data inlined as JS const; fonts via Google CDN preconnect with system fallback (or base64-inline when explicitly requested via `protocol.report.fonts = "embed"`); no external JS / CSS at runtime; total file size budget < 1MB for typical reports, hard cap 5MB.
9. **Do's and Don'ts** — anti-patterns: cool greys, bold serifs, sans-serif headlines, traditional drop shadows, dashboard-of-chips at top, prose paragraphs above the fold, emoji as semantic info.
10. **Responsive behavior** — three breakpoints. Tablet ≤ 991px: tighter padding, drawer 380px, below-fold collapses to single column. Mobile ≤ 640px: side-by-side stacks (paper above, ours below), drawer becomes bottom sheet sliding up, hero claim drops 32→22px, status chip strip wraps tighter, fig-controls move below panel-title.
11. **Hover-or-tap** — every hover-revealed element responds to tap on `(hover: none)` viewports. First tap reveals; second tap or tap-outside dismisses. Touch targets ≥ 44×44px (data points have invisible 14px transparent stroke around the visible 3.6px dot).
12. **Dark mode** — Claude reference's dark variant rendered when `prefers-color-scheme: dark`. Background switches to `near-black #141413`, surfaces to `dark-surface #30302e`, text to `silver #b0aea5`, borders to `border-dark #30302e`. Terracotta and serif/mono unchanged.
13. **Accessibility** — WCAG-AA contrast (terracotta-on-parchment passes; verify each pair). Keyboard nav: `Tab` cycles interactive elements; `Esc` closes drawer/glossbox; legend items have `role="button"`. Screen-reader semantics: chips use `<button>` with `aria-describedby` pointing to the popover; SVG plot has `<title>` and `<desc>` summarizing the figure; data points have `aria-label` with their (L, h, c_L, ±σ).
14. **Print** — minimal print stylesheet: hide chips and drawer; expand contract panel and discrepancy inline; serif body remains.
15. **Agent prompt guide** — copy-pasteable component prompts for fresh agents: "create a chip with hover-popover", "create a side-by-side panel-card", "create a hero with parchment background and serif claim line".

Length target: 600-800 lines, similar density to the nexu-io upstream.

## 8. Skill workflow — `tools/skills/report/SKILL.md`

Sections (mirrors `verify/SKILL.md` style):

0. **Frontmatter**: `name: report`, description triggers — "render report", "make HTML report", "publish reproduction", "share results", "send this run".
1. **Purpose**: a single-page interactive HTML report from a reproduction run, designed as a shareable deliverable. Figure-first, prose-suppressed, paper-vs-ours mandatory. Organizer + tiny verifier + UI/UX-tuned editor + renderer + close-mode audit.
2. **When to activate**: terminal step of `/reproduce-paper`; standalone via `/report <run-dir>`; when the user says "send me a report" / "publish this run".
3. **Inputs**: `<run-dir>` containing the Codex contract bundle (`protocol.toml`, `run-report.md`, `cells/`, `verify/`, `figs/`, `progress/run_manifest.toml`).
4. **Workflow** (the five stages above, expanded with cross-references and failure modes).
5. **Mandatory genre elements** (the §6 list).
6. **Editorial sidecar**: schema, polish-subagent brief, cache-invalidation rule, `gaps` list handling.
7. **Tiny pre-flight verifier**: list of mechanical checks.
8. **Output**: filename convention `results/<run>/report_<run-id>_<YYYY-MM-DD>.html` + `report_latest.html` symlink + embedded `Report ID: <run-id> @ <date>` block in provenance footer + `Verify hash: <hash>` from the close-mode subagent.
9. **Failure modes & defaults** (table).
10. **Composition**: relationship to `/reproduce-paper` (terminal step), `/verify` (close-mode terminal audit), `download-ref` (preferred source for paper figures via the arXiv-source enhancement flagged in §11).
11. **Discipline (hard rules)**: no prose generation in the skill itself (only in the polish subagent, source-fenced); paper figure mandatory; verify-close gate mandatory; cite-or-flag every editorial sentence; chip status never invented from prose; refuse to ship with `✗` close-mode findings.
12. **Anti-patterns (auto-reject)**: synthesizing data; quoting numbers from KB cards as if from paper; chip status invented from agent prose; shipping without verify; renaming the section sequence; dropping the paper figure; promoting `hint`-class evidence to drive a chip.
13. **Examples**: one walked-through invocation: `/report results/tfim_fig4_paper_grade/`, showing inputs, polish subagent output, organize+render output, close audit verdict, final HTML.

Length target: 250 lines.

## 9. Small additions to existing artifacts

### 9.1 `tools/templates/reproduce-paper/protocol.toml`

Add `[[figures]]` block (pointer-only, no data schema):

```toml
[[figures]]
label = "fig4a"
paper_path = "knowledge-base/literature/<method>/.figures/arxiv__<id>/<extracted-png>"
paper_authority = "primary"   # primary | trusted_reference | hint
paper_attribution = "Tarabunga et al. 2023, Fig 4(a)"
ours_path = "results/<run>/figs/fig4a.png"
data_path = "results/<run>/figs/fig4a.json"   # optional; if present, interactive plot
claim_ids = ["fig4.shape", "fig4.minimum"]
```

Optional editorial-seed fields (consumed as hints by the polish subagent):
- `featured_figure = "fig4a"` at top level (overrides default first-by-order rule).
- `central_param = { h = 1.0 }` at top level (drives highlighted-cell selection).
- `report = { fonts = "cdn" | "embed" }` at top level (overrides DESIGN.md font default).

### 9.2 `tools/skills/reproduce-paper/SKILL.md` step 16 (Close)

Add to the close step's deliverables:

> For each figure, produce both `figs/<id>.png` (already required) AND `figs/<id>.json` (new), where the JSON has the schema:
>
> ```json
> {
>   "label": "fig4a",
>   "axes": {
>     "x":      { "field": "h",  "label": "transverse field h" },
>     "y":      { "field": "cL", "label": "c_L" },
>     "curves": { "field": "L",  "label_template": "L = {L}" },
>     "err":    { "field": "se" }
>   },
>   "data": [
>     { "L": 16, "h": 0.8, "cL": 0.86, "se": 0.006, "manifest": "manifest_L16_h0.80.json", "wall": 934.66, "accept": 0.125, "when": "2026-05-07 15:52" }
>   ]
> }
> ```
>
> The schema is paper-agnostic: `(x, y, curves, err)` over any field names. The producing script declares its own axes; nothing is hardcoded in the report skill or `/reproduce-paper`. Generic over data shapes (1D scan = omit `curves`; 3D scan = wrap in tabs).

### 9.3 `tools/skills/verify/SKILL.md` close mode

Extend close-mode axes with one entry:

> 7. **Audience-facing artifact compliance** — when the close target includes a rendered HTML report (`report_<…>.html`), audit (a) every editorial sentence in `editorial.json` traces to its declared `sourced_by` evidence; (b) the rendered HTML matches DESIGN.md specs; (c) mobile rendering passes the mechanical checks (no overflow at 375×667, every interactive element has a tap path, touch targets ≥ 44×44px).
>
> Severity tags: existing `supported / unsupported-claim / hint-leak / stale-artifact / provenance-gap / open-gate / hidden-deviation / repro-gap`, plus new `editorial-leak` (editorial sentence has no source) and `design-drift` (component deviates from DESIGN.md).

## 10. Defaulted decisions (locked in spec, not open)

| Decision | Default | Override |
|---|---|---|
| Filename | `results/<run>/report_<run-id>_<YYYY-MM-DD>.html` | none — convention is fixed |
| Latest pointer | `report_latest.html` symlink | skip on platforms without symlink (Windows): copy instead |
| Font self-containment | Google CDN with system fallback | `protocol.report.fonts = "embed"` for base64 inline |
| Paper figure size cap | 500KB per inlined PNG | downscale via `pdftoppm -r 150` if exceeded; warn if still over |
| Total HTML size budget | 1MB soft, 5MB hard | warn at soft, refuse at hard |
| Mobile breakpoint | 640px | DESIGN.md owns the @media value |
| Tablet breakpoint | 991px | DESIGN.md owns |
| Dark mode | auto (`prefers-color-scheme: dark`) | none |
| Accessibility | WCAG-AA contrast, full keyboard nav, ARIA on interactives | none — hard rule |
| Print stylesheet | minimal (hide chips/drawer, expand panels) | none |
| Verify-fix loop | one round; if `✗` remains, block and surface to user via `AskUserQuestion` (fix-or-promote-to-assumption) | none — no infinite loops |
| Cache invalidation | `editorial.json` regenerated when any input hash changes | manual: `rm editorial.json` |

## 11. Follow-ups (not in this spec)

- **arXiv source extraction in `download-ref`**: current `.figures/` are PDF-page extractions (lossy crops). Enhance `download-ref` to fetch arXiv e-print source (`arxiv.org/e-print/<id>`), extract original figure files (vector PDF/EPS, full fidelity), store under `.figures/arxiv__<id>/source/`. The report skill prefers source-extracted figures over PDF-page extractions when both exist. Falls back to PDF-page extraction when source isn't uploaded (some old papers).
- **Mobile-render mechanical check**: implement the headless-browser assertion script that the close-mode subagent invokes (no horizontal overflow, tap paths, touch-target sizes). Likely Playwright or Puppeteer.
- **Cross-caller polish quality observation**: §5.2 locks "subagent matches main agent" with structural mitigation. If editorial quality varies materially across callers (Codex vs Claude vs Cursor) in production, log to `docs/milestone-log.md` and propose either tighter brief / stronger structural guardrails — never a silent model override.
- **Cell aggregation for huge runs**: when a run has 1000+ cells, inlining everything blows the size budget. Add a paginated cell-list pattern (lazy-load drawer entries) to DESIGN.md and SKILL.md.

## 12. Implementation order

1. **First**: small additions to `protocol.toml` template and `reproduce-paper` close step (`figs/<id>.json` schema). Independent of the report skill; compatible with existing `/reproduce-paper` users.
2. **Second**: `docs/DESIGN.md` vendored from nexu-io claude system + harness extensions. The visual grammar must exist before the renderer can compose against it.
3. **Third**: `tools/skills/report/SKILL.md` — the workflow over 1+2.
4. **Fourth**: `tools/skills/verify/SKILL.md` close-mode extension (audience-facing artifact compliance axis).
5. **Fifth**: dogfood — render `results/tfim_fig4_paper_grade/` through the new skill and check against the v7 prototype.

## 13. Acceptance criteria

The spec is implementable when:

- A fresh agent (no session context) reads `tools/skills/report/SKILL.md` + `docs/DESIGN.md` and produces an HTML for `results/tfim_fig4_paper_grade/` that satisfies all of: (a) figure-first hero (paper Fig 4(a) PNG | interactive c_L-vs-h plot side-by-side, above the fold); (b) parchment background, terracotta accent only, Source Serif 4 / Inter / JetBrains Mono typography; (c) status chip strip with each chip backed by a verify report; (d) below-fold contract + discrepancy + provenance panels; (e) hover-callout on data points (desktop) and tap-to-drawer on mobile, with magnetic point hit area and focus-dim across legend/curves; (f) glossbox tooltip on the title symbol `c_L(h)`; (g) responsive collapse to single-column at ≤640px with bottom-sheet drawer; (h) ≤ 100 visible words above the fold. The agent prompts only via the skill's specified `AskUserQuestion` forks; no ad-hoc judgment calls.
- The polish subagent's output `editorial.json` has zero `gaps` for a run with a complete protocol + run-report.
- The close-mode verify subagent passes the rendered HTML with `✓` on all axes.
- The HTML opens and is readable on iPhone SE (375×667) and on a 27" desktop monitor without horizontal scroll, drawer overlap, or hover-only affordances.
- File size is under the 1MB soft cap for the validation paper.
- No editorial sentence in the rendered HTML has `editorial-leak` severity in close mode.

## 14. User-locked considerations

These are constraints and principles the user established during the brainstorm. Each is now load-bearing in the spec; a fresh agent must not weaken, relax, or work around any of them. Section pointers note where each is enforced.

### 14.1 Audience and tone

- **Comforting the audience is of top priority.** This overrides architectural purity, naming conventions, and upstream-author convenience when they conflict. → §2.
- **"People don't like to read a lot of words" — "a lot of words at the first glance is DISGUSTING".** Figure-first, prose-suppressed. Above-the-fold word budget ≤ 100. → §2, §6.
- **Self-contained: do not assume readers have paper-specific context** beyond general domain knowledge. Paper title, id, definitions of every non-trivial symbol must be inline (top bar + glossary tooltips). → §6.
- **No informal narratives.** "What we ran" was explicitly rejected as casual. Voice is confident, terse, scientific; declarative sentences; no first-person; no rhetorical questions; no exclamation marks. → §5.2 polish-subagent brief style guide.

### 14.2 Visual identity

- **Claude design language with Claude fonts.** Reference: `github.com/nexu-io/open-design/design-systems/claude/DESIGN.md`. Vendored, not re-invented. → §7.
- **Warm-only neutrals; no Apple-system grays; no cool blue-grays anywhere.** → §7.2, §7.9 do/don't.
- **Beautiful interaction.** Restraint, not gimmicks; ring shadows not drop; serif headlines not bold; calm motion. → §7.4, §7.6, §7.7.

### 14.3 Layout and interaction

- **Narrative scroll layout** (selected from 3 options early in brainstorm). Single page; figure-first hero; below-fold for depth. → §5.4 genre.
- **Side-by-side paper-vs-ours hero.** "Shall we put the fig from paper into the html?" — paper figure embed is structurally mandatory. → §6.
- **Standalone HTML deliverable, single file.** Shareable as Slack drop / email attachment. → §7.8 self-containment.
- **Interactive figures are default, not opt-in.** "I want interactive figs". Hover-callout, click-drawer, focus-dim, glossary tooltips. → §5.4, §9.2 `figs/<id>.json` produced by close step.
- **Hover to toggle between curves; hover to see timestamps on a case.** → §5.4 + §7.4 interaction patterns.
- **On-demand reveal for verification details, not foreground.** Status chip strip with hover popovers; full verify reports drilldown-only. → §5.4.
- **Few necessary equations only.** Glossary tooltips on inline symbols; no equation walls. → §5.2 polish brief constraint.

### 14.4 Mobile and responsive

- **Single HTML file works on both laptop and mobile.** Verified on real iPhone. → §7.10–§7.11, §10 breakpoints.
- **Tap-fallback for every hover affordance on touch devices.** Single chip open at a time, tap-outside dismisses. → §7.11.

### 14.5 Data and content sourcing

- **"Do not use synthesized data" — always real evidence from runs.** → §3 evidence taxonomy, §5.1 pre-flight verifier checks `evidence_class = "current_run"`.
- **Embed the paper's own figure** (extracted from arXiv source preferentially; PDF-page extraction as fallback). The comparison is the report's reason for being. → §6 mandatory, §11 arXiv-source enhancement follow-up.
- **Surface the run's contract.** "For the run, do we have some contract there?" — the protocol.toml is rendered as a first-class panel, not buried. → §5.4 contract panel.

### 14.6 Anti-hallucination discipline

- **The v5 fabrication ("paper c_L ∈ [−0.10, −0.05]") must never recur.** Triggered the over-trust observation. → §4.
- **"Polish our harness to avoid this from happening again"** — fix is structural (mandatory verify gate on user-facing artifacts), not a one-off. → §4, §5.5, §9.3.
- **Agents over-trust *cached* content** — KB cards, existing code, existing data, figures in plans, *and the agent's own prior turns*. → §4 cross-refs `docs/milestone-log.md` O1.
- **"Subagents to review with critical mind"** — the verify gate is mandatory, not optional, and the reviewer is adversarial (skeptic stance). → §5.5.

### 14.7 Skill architecture

- **Skill name: `report`** (not `report-html`). → §8 frontmatter.
- **"Not only a render, it's an organizer with tiny verifier."** Organizer makes deterministic editorial selections; tiny verifier runs mechanical pre-flight checks. → §5.
- **"DESIGN.md settles UI and part of UX; the report skill settles UX."** Clear boundary. DESIGN.md = visual + interaction grammar; SKILL.md = section sequence + selection rules + verify gate. → §7 vs §8.
- **"UI/UX part is OVER the latest Codex changes."** Layered architecture: Codex owns the reproduction-evidence layer; the report skill sits above it and owns audience experience. → §3 foundation.
- **Codex agents are weak at UI/UX presenting; the report skill must compensate structurally** — but **not** by upgrading subagent models. → §5.2 (precise brief, mechanical organize, close-mode audit).

### 14.8 Generic over data shapes

- **"Won't this extension to the protocol.toml schema hardcode too much things? For different cases the data might be totally different. Shall we keep them in natural language format as in those run specs?"** Minimize protocol additions; data axes self-describe per figure in a generic JSON sibling. → §9.1 minimal `[[figures]]` pointer pairs only; §9.2 `figs/<id>.json` companion with generic `(x, y, curves, err)` schema over any field names.

### 14.9 Subagent discipline

- **"For any subagent, should not use downgraded one (always the same as your model id, effort and other settings)."** Applies to polish AND close-mode verify subagents — *and forbids silent upgrades just as much as silent downgrades*. → §5.2, §5.5; §11 locks structural mitigation, never silent model override.

### 14.10 Deliverable identity

- **"The HTML itself should be deliverable and maybe named with some id or timestamp."** Filename carries the run id and date. Self-identifying when downloaded out of context. Embedded Report ID + verify hash in provenance footer for verbal reference. → §10 filename + symlink + embedded id.

### 14.11 Fresh-agent fitness

- **"Should include enough details for fresh agents, not only for you having enough context and several rounds of interactions with me."** Both DESIGN.md and SKILL.md must read end-to-end for an agent with zero session context. → §7 DESIGN.md target 600-800 lines (executable spec); §8 SKILL.md target ~250 lines (modeled on `verify/SKILL.md` style).
- **"Review end-to-end and think from FIRST PRINCIPLES. Anywhere unclear and need fresh agents to think and decide ad hoc?"** → drove the §10 defaulted-decisions table, the five-stage architecture, and the cite-or-flag organization. No "decide ad hoc" leeway in the spec.

### 14.12 Process discipline

- **Use the latest Codex changes as the foundation, don't re-invent.** → §3 explicitly cites commit `a75327f Tighten reproduction evidence workflow`; §9 keeps the additions minimal and additive, never overlapping with what Codex already specified.

## 15. Out of scope

- Multi-paper / cross-paper meta-reports.
- Live-updating reports (websocket / server-sent events).
- Embedded computation (the report does not run code in the browser; it visualizes pre-computed evidence).
- LaTeX equation rendering beyond what unicode + KaTeX-free CSS achieves.
- i18n / localization.
- Compatibility with browsers older than current evergreen (Safari 17, Chrome 120, Firefox 120).
