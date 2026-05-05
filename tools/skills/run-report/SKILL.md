---
name: run-report
description: Use when a calculation pipeline has produced its outputs and the user wants a consolidated runnable script + structured run report covering setup, settings, result, verification status, and residual uncertainty. Generic; one per session, not per figure.
---

# run-report

Assemble a consolidated runnable script and a structured run report from the manifests, scripts, and result files produced during a session. Generic across model, observable, and method. Per AGENTS.md "Writeup handoff", this is the canonical artifact handed to writing / visualization skills downstream.

## When to activate

- After verification completes for a model-skill workflow.
- When the user signals "ready to write up", "I want to share this", or "save what we did".
- At the end of a session before pivoting to a different problem.
- Automatically at the end of every multi-stage pipeline (each `/run-stage` produces a manifest; `/run-report` consumes them all).

## Inputs

- A *run directory* `results/<run>/` containing:
  - Stage manifests (`<stage>.manifest.json`) from `/run-stage`, or single-shot result files.
  - Auto-saved scripts in `scripts/<run>/` from the model skill / primitives.
  - Plots in `results/<run>/*.png` (convergence, finite-size, scaling-fit).
- The *model-skill identifier* and *observable* used (so the report can cite the right verification-rules and benchmark cards).

## Workflow

1. Walk the run directory: collect every manifest, every script, every plot.
2. Reconstruct the calculation graph: which stage produced which artifact; which observable was the final target.
3. Generate the *consolidated runnable script*:
   - All parameters explicit (no environment variables, no implicit defaults).
   - All stages laid out top-to-bottom with the same artifact names.
   - Reproducible from a fresh checkout against the harness's installed stack (verified via `make help` for tool availability).
   - Write to `results/<run>/consolidated.{jl,py}`.
4. Generate the *run report* (`results/<run>/run-report.md`) with the following structure:
   - **Setup** — model, lattice, sector, parameters.
   - **Settings** — method, convergence parameters, sample sizes; cite the relevant method card.
   - **Result** — final observable value(s) with uncertainty; one-line interpretation if a calling physics skill provided one.
   - **Verification status** — limit / symmetry / convergence / cross-method status, each with a one-line note. Cite `knowledge-base/...` files for benchmarks compared against.
   - **Residual uncertainty** — what is *not* settled (frontier-flag content, convergence at boundary parameters, contested regime).
   - **Reproduction** — the consolidated script path and one-line run command.
5. Embed the auto-generated plots inline in the report (markdown image links to `results/<run>/*.png`).
6. Hand back the report path.

## Run-report sections (template)

```markdown
# Run Report — <model> @ <parameter point>

## Setup
- Model: ...
- Lattice / size: ...
- Sector: ...
- Parameters: ...

## Settings
- Method: ... (see `knowledge-base/methods/<name>.md`)
- Convergence parameter: ... (final value: ...)
- Sample / budget knobs: ...

## Result
- <observable> = <value> ± <uncertainty>
- One-line interpretation: ...

## Verification
- Limit checks: <pass/fail + note>
- Symmetry: <pass/fail + note>
- Convergence: <pass/fail + note>
- Internal consistency: <pass/fail + note>
- Cross-method: <pass/fail + note OR not run, reason>
- Benchmark comparison: <range + match status OR no benchmark, reason>

## Residual uncertainty
- ...

## Reproduction
- Script: `scripts/<run>/consolidated.jl`
- Run: `julia --project=julia-env scripts/<run>/consolidated.jl`
```

The template is adapted by the model skill / calling physics skill — fields they cannot fill stay empty rather than being fabricated.

## Output

- `results/<run>/run-report.md` — the report above.
- `scripts/<run>/consolidated.{jl,py}` — single reproducible script.
- A one-line message: report path + run command.

## Composition

- After `/run-report` produces the artifacts, common follow-ups (offered via `AskUserQuestion`):
  - **Publication-quality figures** — route to `scientific-visualization`.
  - **Paper text** — route to `scientific-writing` / `latex-paper-en`.
  - **Interactive companion** — route to `jupyter-notebook`.
  - **Done** — the writeup handoff is complete.

## Notes

- This skill does *not* invent results. It assembles what `/run-stage` and the model / physics skills produced.
- It does not add interpretation beyond what the calling physics skill embedded in the manifests / scripts.
- For sessions that span multiple model / physics skills, one consolidated report is preferred; the report includes a section per "subproblem" rather than producing many small reports.
- Per AGENTS.md, the writeup handoff is *offered, not forced*. If the user just wants the result and is done, that's a complete session — `/run-report` is still useful as a session summary but is not blocking.
