---
name: report
description: Use after a reproduction run completes (or after /reproduce-paper Step 16 close) to render a single-page interactive HTML report — the shareable scientific deliverable. Triggers on "render report", "make HTML report", "publish reproduction", "share results", "send this run". Five-stage skill: tiny pre-flight verifier (mechanical) → polish subagent (UI/UX-tuned editor) → mechanical organize → render via template → terminal /verify --mode close. Generic over papers, observables, and data shapes.
---

# report

Render a single-page interactive HTML report from a reproduction run, designed as a shareable deliverable (Slack drop, email attachment, talk handout). Figure-first, prose-suppressed, paper-vs-ours mandatory. Audience: collaborators, grad students, lab visitors who have ~5 seconds before deciding the page is worth their time.

The skill is **organizer + tiny verifier + UI/UX-tuned editor + renderer**, not a passive renderer. It owns the audience experience — comforting the reader is of top priority, never delegated to whoever happened to call the skill.

- *Tiny pre-flight verifier* (mechanical, the skill itself) — cheap evidence-consistency checks before render. No subagent dispatch.
- *Polish subagent* (UI/UX-tuned editor brief, source-fenced) — writes the editorial sidecar `editorial.json`. Same model/effort/settings as main agent (per CLAUDE.md "Subagents match the main agent" rule); cross-caller quality variance is mitigated structurally via the precise brief, the detailed `docs/DESIGN.md`, and the close-mode audit — never via silent model swap.
- *Organize* (mechanical, deterministic rules) — chip set from claims+verify, featured figure from protocol order, highlighted cell from `central_param`. No LLM judgment in this stage.
- *Render* (template merger, mechanical) — compose into the figure-first HTML genre per `docs/DESIGN.md`. Mechanical fallbacks for any null editorial fields.
- *Terminal `/verify --mode close`* (independent reviewer) — audits the rendered HTML against sources + DESIGN.md + mobile rendering. The reviewer's verdict is embedded in the HTML for downstream auditability.

Words exist as scaffolding around figures; never as walls. **Above-the-fold word budget ≤ 100.** The skill never authors prose itself — only the polish subagent, source-fenced via its brief, does. This prevents the over-trust failure logged as `O1` in `docs/milestone-log.md`.

## When to activate

- Terminal step of `/reproduce-paper` (after Step 16 close produces `run-report.md` + `figs/`).
- Standalone via `/report <run-dir>` after any reproduction run with the contract bundle present.
- When the user says "send me a report" / "publish this run" / "share these results" / "make an HTML report".
- **Not** for `solve` sessions or other reproduction runs without a `protocol.toml` + `run-report.md` — the skill blocks at pre-flight (Stage 1) and surfaces the gap via `AskUserQuestion` rather than rendering against incomplete evidence.

## Inputs

A `<run-dir>` (e.g. `results/tfim_fig4_paper_grade/`) containing the contract bundle Codex's reproduction-evidence work landed in commit `a75327f` (and refined since):

| Required | Path | Purpose |
|---|---|---|
| ✓ | `protocol.toml` | Run contract: `[artifact]`, `[[sources]]` with `authority`, `[[claims]]`, `[[deviations]]`, `[[checks]]`, `[[figures]]` pointers, optional top-level `featured_figure` and `central_param` overrides |
| ✓ | `run-report.md` | Close-mode bounded narrative (Setup, Settings, Result per figure, Verification status, Evidence map, Protocol status, Residual uncertainty, Reproduction) |
| ✓ | `cells/<id>/manifest.json` (or `cells/manifest_<...>.json`) | Per-cell evidence with `evidence_class = "current_run"`, `protocol_hash`, `script_hash`, claim ids, payload |
| ✓ | `verify/verify_<artifact>_<date>.md` | Verify reports backing the chip statuses (one per claim or check that ran) |
| ✓ | `figs/<id>.png` | Static plot for each `[[figures]]` entry |
| ✓ | `figs/<id>.json` | Data + axes for each `[[figures]]` entry (interactive plot source); generic `(x, y, curves, err)` schema per `/reproduce-paper` Step 16 |
| optional | `flow.toml` + `progress/events.jsonl` + `progress/state.toml` | Flow gate ledger (per `tools/flow/README.md`) — read for the provenance footer (cluster, run id, dates, gate status) when present |
| optional | `editorial.json` | Polish subagent output from a prior render; reused if hash matches input pack, regenerated otherwise |

If any required input is missing, the pre-flight verifier (Stage 1) blocks and surfaces the gap via `AskUserQuestion` with options to repair, render-with-fallbacks, or stop.

## Workflow

Five stages, in order. The skill never advances past a stage that fails its checks; failures are surfaced via `AskUserQuestion` per the `Superpowers:brainstorming` pattern (recommended option first, each with one-line pros / cons).

### Stage 1 — Pre-flight verifier (mechanical, the skill itself)

Cheap evidence-consistency checks. **No subagent dispatch; no LLM judgment.** Block render and surface gaps if any fail.

Run via `tools/skills/report/scripts/preflight.py <run-dir>`. Exit code 0 = pass; non-zero with structured stderr / stdout JSON = fail with reasons.

Checks performed:

- `<run-dir>/protocol.toml` exists, parses, has `[artifact]` + `[[sources]]` + `[[claims]]` + `[[figures]]`.
- `<run-dir>/run-report.md` exists; contains required H2/H3 sections (Setup, Settings, Result, Verification status, Evidence map, Protocol status).
- Every `[[claims]]` id appears at least once in `run-report.md`'s Evidence map.
- Every `cells/<id>/manifest.json` carries `evidence_class = "current_run"` and `protocol_hash` matching `protocol.toml`'s computed hash.
- Every `[[figures]].paper_path` resolves to an existing file.
- Every `[[figures]].ours_path` exists.
- Every `[[figures]].data_path` (when set) exists, parses as JSON, has the schema `{label, axes, data}` per `/reproduce-paper` Step 16.
- No `verify/verify_*.md` is older than `protocol.toml` (would be stale per Codex's `a75327f` freshness rule).

When `tools/cli/flow` is configured for the run, also: `flow next results/<run>` should not return the close gate as runnable — i.e., the close gate must be PASS before `/report` proceeds. If close is open, the skill blocks with the option to run `/reproduce-paper` Step 16 first.

On fail: emit a structured diagnostic and present the user with `AskUserQuestion` options:

> Pre-flight failed: `<count>` issues. (1) Repair the gaps — recommended; (2) Render anyway with `--allow-incomplete`, gaps recorded as `editorial.json.gaps`; (3) Stop.

### Stage 2 — Polish subagent (UI/UX-tuned editor)

Dispatch a polish subagent **with the same model id, reasoning/effort level, service tier, sandbox, approval policy, and tool-access settings as the main agent** (CLAUDE.md "Subagents match the main agent" rule — no downgrades, no silent upgrades). Cross-caller quality variance is mitigated structurally: this brief is precise, the supplied evidence pack is curated, `docs/DESIGN.md` is detailed, organize is mechanical, and the close-mode audit (Stage 5) catches drift. **Never via subagent model swap.**

The subagent reads the full evidence pack and writes `<run-dir>/editorial.json`. Cached (hashed against the input pack); regenerated when any input hash changes. To force regeneration: `rm <run-dir>/editorial.json`. When `tools/cli/flow` is in use, register `editorial.json` as a flow artifact (`flow artifact add <run> editorial editorial.json --kind editorial --producer <attempt>`) so flow's auto-invalidation handles staleness.

**Subagent brief (use verbatim when dispatching):**

> You are a UI/UX-tuned editor for a scientific demo report destined for collaborators, grad students, and lab visitors. Audience-first: comfort the reader, hide the jargon, the figure is the hero, words are scaffolding. **Above-the-fold word budget ≤ 100. Each prose field stays ≤ 1 sentence unless the brief explicitly allows two.**
>
> Read the supplied evidence pack: `protocol.toml`, `run-report.md`, every `cells/<id>/manifest.json`, every `verify/verify_<…>.md` (and any top-level `verify_*.md`), and `figs/<id>.{png,json}` for **every** `[[figures]]` entry — not just the featured one. Produce a structured JSON `editorial.json` populating the fields below. **Every sentence and phrase you write must cite an evidence-pack file:line in a `sourced_by` array.** No invention. No paraphrase that drifts from the source's claim. If a field cannot be sourced, leave it null and add it to the top-level `gaps` list with the reason.
>
> Output schema:
>
> ```json
> {
>   "headline": { "text": "…one sentence: claim + framing…", "sourced_by": [...] },
>   "claims": [
>     { "id": "fig4.symmetry", "display_label": "symmetry sector", "popover": "…one sentence…", "sourced_by": [...] }
>   ],
>   "deviations": [
>     { "id": "backend", "display_label": "MPS backend", "popover": "…one sentence…",
>       "discrepancy_paragraph": "…1-2 sentence prose for the discrepancy panel…", "sourced_by": [...] }
>   ],
>   "figures": [
>     { "label": "<protocol fig id>", "caption_paper": "…one sentence…", "caption_ours": "…one sentence…",
>       "paper_context": "…one sentence quoted/paraphrased from the paper's own framing of WHY this figure exists…",
>       "sourced_by": [...] }
>   ],
>   "glossary": [
>     { "key": "cl", "symbol": "c_L(h)", "name": "Subleading increment c_L(h)",
>       "body": "…one sentence…", "formula": "c_L = 2 M_2(L/2) − M_2(L)", "sourced_by": [...] }
>   ],
>   "discrepancy_headline": "…one sentence; renders as the bottom-panel <h3>…",
>   "gaps": []
> }
> ```
>
> **Required for multi-figure runs:** emit one `figures[]` entry per `[[figures]]` in protocol.toml — every additional figure renders below the chip strip and needs its own `caption_paper` + `caption_ours`. The `figures[i].label` must equal the `[[figures]].id` (e.g., `"fig4a"`, `"fig4b_inset"`).
>
> **Inline markup (in any prose field):**
> - `[[<glossary-key>|display text]]` — wraps display in a glossary tooltip span. The `<glossary-key>` must match `glossary[i].key`. Example: `[[cl|c_L(h)]]` produces `<span class="sym" data-term="cl">c<sub>L</sub>(h)</span>` and the glossbox shows `glossary[i].name/body/formula` on hover/tap.
> - `*italic phrase*` — emphasizes via `<em>`.
> - `_X` and `_{XX}` → subscripts; `^X` and `^{XX}` → superscripts; Greek words (`alpha`, `chi`, `sigma`, …) → Unicode; `<=`/`>=`/`!=`/`+/-`/`\approx`/`~=` → `≤≥≠±≈`. The renderer applies these automatically — write plain ASCII, not HTML.
>
> **Style:** terse, scientific-confident, no marketing voice, no first-person, no rhetorical questions, no exclamation marks. Declarative sentences, modest length.
>
> **Worked examples (cadence to imitate; substitute your own observables/symbols):**
>
> - Headline: `"Subleading magic [[cl|c_L(h)]] across the critical region — *paper vs reproduction.*"` (sets up the contrast in 10 words; one symbol with tooltip; one italicized framing.)
> - Claim chip popover (✓): `"Conserved Z₂ parity respected. Ground-state sector matches the paper at every cell."` (one-sentence story: what was checked + outcome.)
> - Claim chip popover (⚠): `"L=128 reproduces the paper's c_L ≈ -0.5 dip at h_c. Smaller L falls short by 5-20×."` (cite a number when verify supports one.)
> - Deviation popover: `"MPS at χ=30 in place of the paper's TTN. Energy converges to 0.03% at L=16, so the c_L disagreement is too large to be backend-only."` (states the deviation + why the obvious blame doesn't stick.)
> - Pending chip popover: `"Independent TTN run at L=128 to confirm c_L magnitude — the open obligation in the contract."` (specific, scoped, declared.)
> - Discrepancy headline: `"Largest disagreements sit in the ordered phase at small L; the L=128 critical-point dip recovers."` (where it goes wrong + where it works, in one sentence.)
> - Caption (paper side): `"Subleading term [[cl|c_L]] = 2 [[m2|M_2]](L/2) − [[m2|M_2]](L) of the Rényi-2 SRE on the 1D quantum Ising chain across h ∈ [0.8, 1.2] for L ∈ {16, 32, 64, 128}."` (definition + observable + grid + sizes; no editorializing.)
> - Caption (ours side): `"Same observable on the same h-grid. MPS-PBC at χ=30, bridge-normalizer estimator. L=128 dip at h_c reproduces; smaller L overshoots in the ordered phase."` (what's the same + what's different + result, one sentence.)
> - Paper context: `"(Sec. III.) The [[cl|c_L]] estimator demonstrates that the Pauli-Markov chain method efficiently extracts SRE density across system sizes — this figure is the *efficiency claim* in operational form."` (paper-faithful answer to *why* the figure exists, in the paper's own framing. Renderer prepends the **From the paper** label automatically, so don't repeat it. Lead with the paper section in parens, then the substance.)
>
> **Self-contained for non-specialists.** Assume the reader does NOT know your specific paper, your specific model, or your project-internal shorthand. They have general physics vocabulary (Hamiltonian, ground state, critical point, DMRG, MPS, ED) but no paper-specific context. Every model name spelled out on first use ("transverse-field Ising model (TFIM)" not "TFIM"). Every symbol used in the headline, captions, deviation popovers, or discrepancy paragraphs MUST have a `glossary[]` entry with a matching `key`, so the inline `[[key|display]]` markup wires up a hover/tap tooltip. Method shorthand ("increment trick", "bridge estimator", "Pauli-Markov chain") must either be expanded inline or carry a glossary tooltip on first use.
>
> **Deviations are not buried.** If `protocol.deviations[]` is non-empty, write a one-sentence `discrepancy_headline` that names the most impactful deviation in plain language (e.g., "We use MPS where the paper uses TTN; smaller system sizes overshoot in the ordered phase."). Each `deviations[i].discrepancy_paragraph` stays ≤ 2 sentences and quantifies the impact ("5-20× overshoot in 13 of 28 cells") when the verify reports support a number. The renderer's discrepancy panel highlights these in warn color; your prose carries the substance.
>
> The downstream renderer composes your fields into a figure-first HTML; the verify-close subagent audits your sources.

If the polish subagent returns `gaps`: surface them via `AskUserQuestion` (fix-or-render-with-fallbacks). The render falls back to mechanical defaults (Stage 4 below) for unfilled fields.

**Starter template:** `tools/templates/reproduce-paper/editorial.json.example` provides a populated skeleton with placeholder values and inline comments explaining the inline-markup conventions and `sourced_by` requirement. Fresh agents on a new topic should fork this file rather than improvising the schema from the brief.

### Stage 3 — Organize (mechanical, the skill itself)

Apply deterministic selection rules over (raw evidence + `editorial.json`). **No LLM judgment in this stage.** All rules implemented as functions in `tools/skills/report/scripts/render.py`.

- **Featured figure** ← `protocol.featured_figure` if declared; else first `[[figures]]` entry by protocol order.
- **Highlighted cell in hover-callout default** ← cell at `protocol.central_param` if declared; else cell with smallest `se`; else first by id.
- **Chip set** ← one chip per claim (status from verify reports — `✓` if all backing verify reports passed, `⚠` if any failed, `muted` if no verify report exists). Then one chip per deviation (always `⚠`). Capped at 6 visible; further chips spill into a "more" expandable.
- **Discrepancy ordering** ← deviations referenced by failing checks first; then deviations referenced by claims; then unreferenced deviations.
- **Evidence map** ← rendered from `run-report.md` Evidence map section, parsed structurally (one bullet per claim → source → manifest → verify).
- **Provenance footer** ← `progress/state.toml` (cluster, run id, dates, gate status) if `flow.toml` exists; else `[artifact]` + git for harness commit.

### Stage 4 — Render (mechanical, the skill itself)

Compose organized payload into the figure-first HTML genre per `docs/DESIGN.md`. Implementation: `tools/skills/report/scripts/render.py` reads the template at `tools/skills/report/templates/report.html.tmpl` and substitutes placeholders.

Output: `<run-dir>/report_<run-id>_<YYYY-MM-DD>.html` (a complete, self-contained HTML file) + `<run-dir>/report_latest.html` symlink (or copy on Windows).

The HTML embeds:

- **Inline base64 paper PNG** (per `[[figures]].paper_path`; downscale via `pdftoppm -r 150` if > 500KB).
- **Inline JS const** for `figs/<id>.json` data (the interactive plot source).
- **Google Fonts CDN preconnect with system fallback** (`Source Serif 4`, `Inter`, `JetBrains Mono` → `Georgia`, `system-ui`, `ui-monospace`). Optional base64 inline if `protocol.report.fonts = "embed"`.
- **Inline editorial fields** from `editorial.json`.

If a field in `editorial.json` is null/missing, the renderer applies the mechanical fallback:

| Field missing | Fallback |
|---|---|
| `headline.text` | `protocol.[[claims]][0].statement` verbatim |
| `claims[i].display_label` | claim `id` (e.g. `fig4.symmetry`) |
| `claims[i].popover` | claim `statement` |
| `deviations[i].display_label` | deviation `id` |
| `deviations[i].discrepancy_paragraph` | bullet list of deviation `statement`s in the discrepancy panel |
| `figures[i].caption_paper` | "Paper" + `paper_attribution` if available |
| `figures[i].caption_ours` | "Reproduction · " + `run_id` |
| `glossary[i]` for any inline symbol | symbol rendered without tooltip (still readable, no help cursor) |

Genre layout (from `docs/DESIGN.md` §10–§12):

```
TOP BAR  ──  [arXiv pill]  Authors — Paper title.  Venue · arxiv link        Run meta block
HERO    ──  Claim line (32px serif, ≤ 1 line on desktop)               Tag (cells · wall)
            ┌─ Paper Fig N ─────────┐  ┌─ Reproduction (interactive) ────┐
            │   PNG (primary)       │  │   inline SVG plot                │
            │   caption_paper       │  │   caption_ours                   │
            └───────────────────────┘  └──────────────────────────────────┘
STRIP   ──  ✓ chip  ✓ chip  ⚠ chip  ⚠ chip  muted chip      (hint: tap for manifest)
HINT    ──  ↓ Contract · Discrepancy · Provenance
BELOW   ──  ┌─ Contract ──────────────┐  ┌─ Discrepancy ──────────────┐
            │   sources, claims,       │  │   deviation list with       │
            │   deviations, budget     │  │   discrepancy_paragraph     │
            └──────────────────────────┘  └──────────────────────────────┘
            ┌─ Provenance (4 cols: Run · Cluster · Source · Harness) ──┐
            └───────────────────────────────────────────────────────────┘
DRAWERS ──  Cell drawer (right desktop / bottom mobile) — full manifest
            Glossary tooltip — symbol → name + body + formula
            Hover callout — magnetic dot + per-cell summary
```

**File-size budget:** 1MB soft cap; warn at soft, refuse at 5MB hard cap. Most reports land at 100-300KB.

**Embedded provenance footer** (mandatory):

```
Report ID: <run-id> @ <YYYY-MM-DD>
Verify hash: <hash> (from /verify --mode close)
Generated: <ISO timestamp>
```

### Stage 5 — Terminal `/verify --mode close` (subagent, independent)

Dispatch `/verify --mode close` against the rendered HTML. The reviewer subagent matches the main agent's model/effort/settings per CLAUDE.md (same rule as Stage 2). The brief is adversarial — *trust nothing*; trace every editorial sentence; check DESIGN.md compliance; check mobile rendering. The audit's deliverable is a structured per-axis status table; the calling skill (this one) translates findings into ratifiable forks via `AskUserQuestion` per `verify/SKILL.md` Composition.

When `tools/cli/flow` is in use: dispatch as a flow attempt against a `report-review` (or `audience-facing`) gate (`flow attempt start <run> report-review --kind verify --actor agent:report-reviewer`). The attempt finishes with `pass | fail | block` and writes its report to `verify/verify_report_<YYYY-MM-DD>.md`.

Verdict (per `verify/SKILL.md` close mode):

- `✓` ships.
- `⚠` requires explicit user accept via `AskUserQuestion`.
- `✗` blocks ship.

The verifier's verdict is embedded in the rendered HTML's `<head>` as a `<meta name="report-review" content="<status>:<hash>">` for downstream auditability.

If `✗`: present `AskUserQuestion` — (1) repair editorial fields; (2) repair source evidence; (3) demote to `assumption` in protocol contract; (4) stop. **One round only**; the agent does not loop.

## Mandatory genre elements

The skill refuses to render without these. Failure surfaces as `AskUserQuestion`:

- **Paper figure embed**: every `[[figures]]` entry must resolve to an existing PNG. No "we'll add the paper figure later" — the comparison is the report's reason for being.
- **Claim line**: from `editorial.json.headline.text`; if missing, fallback `protocol.[[claims]][0].statement` verbatim.
- **Side-by-side hero**: paper PNG | interactive plot. No standalone "ours" view.
- **Status chip strip**: minimum 1 chip; every chip backed by a verify report or a protocol deviation.
- **Contract panel**: rendered from `protocol.toml`, all sections.
- **Evidence map drilldown**: every claim → source → manifest → verify report path is clickable.

## Output

`<run-dir>/report_<run-id>_<YYYY-MM-DD>.html`

`<run-dir>/report_latest.html` (symlink to the newest; copy on platforms without symlink support).

Embedded in the rendered HTML's provenance footer (mandatory):

```
Report ID: <run-id> @ <YYYY-MM-DD>
Verify hash: <hash> (from /verify --mode close)
Generated: <ISO timestamp>
```

## Discipline (hard rules)

- **No prose generation in the skill itself.** Only the polish subagent (Stage 2), source-fenced via the brief, may produce editorial text. The skill's organize and render stages are mechanical.
- **Self-contained for non-specialists.** The reader is a competent scientist who knows general vocabulary (Hamiltonian, ground state, DMRG, critical point, ED, MPS) but **does not know your project-specific terms**. They have not read your prior plans, prior runs, prior chats, or even the paper. Every model name (e.g., "TFIM"), every symbol (`c_L`, `h`, `M_2`, `χ`), every method shorthand (e.g., "increment trick", "bridge estimator") must either be expanded on first use OR carry a glossary tooltip. The polish brief enforces this; the verify-close audit checks it.
- **Paper figure mandatory.** Refuse to render without it. The skill does not have a "no-comparison" mode.
- **Deviations must be visually loud.** A run with `[[deviations]]` shows a deviation banner under the headline ("⚠ N declared deviations from the paper · backend, estimator, …") that scrolls into focus. Warn chips use terracotta, not muted parchment. The discrepancy panel header is in the warm-warn color, not the default olive. Readers must not be able to skim the report and miss the deviations.
- **Verify-close gate mandatory.** Never ship without Stage 5; never auto-accept `✗`.
- **Cite-or-flag every editorial sentence.** Every editorial field carries `sourced_by`; the verifier checks the trace.
- **Agent's prior turns are not a primary source.** Per `docs/milestone-log.md` `O1. Agents over-trust cached content`.
- **Chip status never invented from prose.** Status comes from verify reports or protocol deviations, not from the polish subagent's interpretation.
- **Subagents match main agent.** No silent upgrades or downgrades for polish or close-mode reviewer (CLAUDE.md "Subagents match the main agent"; spec §14.9). Cross-caller variance mitigated structurally.
- **One verify-fix round only.** No infinite loops; surface to user via `AskUserQuestion` after one round.
- **Hint-class evidence cannot drive a chip.** Per Codex's `a75327f` evidence taxonomy: only `current_run` verify reports back chip statuses. KB cards, prior plans, old figures are hints; the skill ignores them when picking chips.

## Composition

- Called as the terminal step of `/reproduce-paper` (after Step 16 close).
- Standalone via `/report <run-dir>` for any reproduction with the contract bundle.
- Calls `/verify --mode close` (and only `close`; not `protocol`, `script`, `result`, `kb-card`, `plan`, or `mismatch`) for the terminal gate.
- Reads from `download-ref` outputs (paper figures under `knowledge-base/literature/<method>/.figures/`); the arXiv-source-extraction enhancement is tracked as a follow-up (per design spec §11), the skill works with PDF-page extractions today.
- Composes with `tools/cli/flow` (per `tools/flow/README.md`) when present: pre-flight reads `flow status`; editorial sidecar registers as a flow artifact; close-mode audit registers as a flow attempt against `report-review` gate. Operation degrades gracefully when `flow.toml` is absent.
- Does **not** call `/parameter-scan`, `/slurm`, `/scaling-fit`, or `/cross-method-check` — those are upstream evidence producers consumed via the run dir.

## Anti-patterns (auto-reject)

- Synthesizing data; quoting numbers from KB cards as if from the paper.
- Chip status invented from agent prose (must come from verify reports or protocol deviations).
- Shipping without `/verify --mode close`.
- Renaming the section sequence (top-bar / hero / strip / scroll-hint / below) — the genre is fixed.
- Dropping the paper figure to "simplify" the layout.
- Promoting `hint`-class evidence to drive a chip.
- Looping the verify-fix round more than once.
- Downgrading or upgrading subagent models.
- Treating `execution_summary.md` as evidence (per Codex's `a75327f` change — operational only).
- Swapping the inline SVG plot for a third-party charting library (Plotly / D3 / Chart.js) — violates the standalone-deliverable size budget per `docs/DESIGN.md` §11.

## Example invocation

```
$ /report results/tfim_fig4_paper_grade/

[Stage 1] Pre-flight verifier...
  ✓ protocol.toml parses, all required sections present
  ✓ run-report.md sections complete
  ✓ 28/28 cell manifests carry evidence_class=current_run, matching protocol_hash
  ✓ figs/fig4a.png + figs/fig4a.json exist
  ✓ paper figure resolves: knowledge-base/literature/magic/.figures/arxiv__2305.18541/2305.18541.pdf-8-0.png

[Stage 2] Polish subagent (matched to main agent's model/effort)...
  Editorial sidecar written: results/tfim_fig4_paper_grade/editorial.json
  Fields populated: headline, 2 claims, 2 deviations, 1 figure, 1 glossary entry
  Gaps: none

[Stage 3] Organize...
  Featured figure: fig4a
  Highlighted cell: L=128, h=1.00 (central_param match)
  Chips: 5 (✓ symmetry, ✓ limit-check L=8, ⚠ MPS backend, ⚠ estimator, muted cross-method pending)

[Stage 4] Render...
  Output: results/tfim_fig4_paper_grade/report_tfim_fig4_paper_grade_2026-05-14.html
  Symlink: results/tfim_fig4_paper_grade/report_latest.html
  Size: 187 KB (under 1 MB soft cap)

[Stage 5] /verify --mode close (matched to main agent's model/effort)...
  ✓ Source-fidelity audit: 0 editorial-leak findings
  ✓ DESIGN.md compliance: passed
  ✓ Mobile rendering at 375×667: no overflow, all interactive elements have tap paths

✓ Report ready: results/tfim_fig4_paper_grade/report_tfim_fig4_paper_grade_2026-05-14.html
```
