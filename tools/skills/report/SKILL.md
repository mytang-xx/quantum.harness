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
