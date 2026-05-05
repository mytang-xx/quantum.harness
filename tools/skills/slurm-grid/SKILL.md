---
name: slurm-grid
description: Use when the user wants to submit an embarrassingly-parallel parameter grid (e.g., `(L, parameter)` cells) to a Slurm cluster, collect outputs, and resume on partial completion. Generic over the grid axes; pairs with `/run-stage` for per-cell stages.
---

# slurm-grid

Submit a parameter grid to a Slurm cluster, collect per-cell outputs, and resume on partial completion. Each grid cell is a stage executed via `/run-stage`. Generic over the grid axes (sizes, parameter values, sample sizes, …).

## Existing-skill survey

Before authoring this primitive from scratch, the registry was searched (`ion search slurm`, `ion search grid`, `ion search submitit`). The relevant prior art:

- General-purpose `slurm` skills (e.g., `michaelrizvi/claude-config/skills/slurm`, `uchicago-dsi/ai-sci-skills/skills/slurm`, `kdkyum/slurm-skills/slurm-info-summary`, `heshamfs/materials-simulation-skills/slurm-job-script-generator`) cover sbatch scripting, queue inspection, and cluster discovery — useful as *executors*, but they are not parameter-grid orchestrators.
- `heshamfs/materials-simulation-skills/parameter-optimization` covers DOE / Latin-hypercube sampling for materials simulations — adjacent but optimization-focused, not grid-with-resume.
- No registry skill found that ties (i) a parameter grid to (ii) a method-card-declared stage list with (iii) resume-on-partial-completion semantics. The closest patterns are scattered across the skills above.

This primitive therefore composes existing slurm-script-generation skills (when installed) with the harness's `/run-stage` manifest mechanism. If the user has a preferred sbatch generator installed, this skill calls into it; otherwise it emits a minimal sbatch.

## When to activate

- User has a `(L, parameter)` (or higher-dimensional) grid to evaluate.
- The harness is on a Slurm-equipped cluster and the calculation is embarrassingly parallel (each cell independent).
- A previous grid run was interrupted and the user wants to resume only the failed / missing cells.

## Inputs

- *Grid axes* — list of named axes with their value lists (e.g., `L: [16, 32, 64, 128]`, `h: [0.8, 0.9, 1.0, 1.1, 1.2]`).
- *Per-cell pipeline* — a method-card-declared stage list (consumed by `/run-stage`), or a single executable command.
- *Slurm config* — partition, time limit, memory, cpu/gpu count per cell. Defaults from the user's cluster profile (or `slurm-info-summary`-style discovery if available); the calling skill / user overrides.
- *Run root* — `results/<run>/` (the grid root).

## Workflow

1. **Plan**: enumerate the cells (Cartesian product of axes). Plan output: `results/<run>/grid.plan.json` listing cell ids and their parameter assignments.
2. **Resume detection**: walk `results/<run>/cells/` and identify completed cells via their manifest files. Build the *to-run* set (cells with no manifest, or manifest tagged `failed`).
3. **Submit**: emit one sbatch array job per partition, with each array index mapped to one cell. Each array element invokes `/run-stage` on the per-cell stage list, writing into `results/<run>/cells/<cell_id>/`.
4. **Monitor**: poll `squeue` (or use `--wait` if the user prefers blocking). Surface job-state transitions as compact status lines.
5. **Collect**: once all cells complete, walk `results/<run>/cells/*/` and assemble a single `results/<run>/grid.csv` with `(axis_1, axis_2, …, observable, uncertainty, runtime, status)` rows.
6. **Diagnose**: count `success` vs `failed` cells. For failures, surface the failure-mode classification (per `/run-stage`'s classification: transient / logic / OOM / convergence-out-of-budget). Offer a *retry-failed-only* re-run.
7. **Hand back** the assembled `grid.csv` to the calling skill (or `solve`).

## Output

- `results/<run>/grid.plan.json` — the plan.
- `results/<run>/cells/<cell_id>/...` — per-cell artifacts (managed by `/run-stage`).
- `results/<run>/grid.csv` — assembled table.
- `results/<run>/grid.report.md` — short status report (cell counts, runtime totals, failure classes).

## Resume semantics

- Re-running on a partially complete grid root: only cells *without* a `success`-tagged manifest are re-submitted.
- Cells tagged `failed` are *not* automatically retried — the user must ratify the retry. (Avoids wasting compute on logic errors.)
- The plan file is immutable per run id; if axes change, the user starts a new run id.

## Composition

- Each cell calls `/run-stage` to walk the method-card-declared stage list. The per-cell pipeline is therefore generic over what the calculation is.
- After completion, the `grid.csv` is the standard input to `/scaling-fit` for finite-size collapse.
- For cluster discovery / sbatch script generation, this skill calls into the user's installed cluster-management skill if available; otherwise emits a minimal sbatch.
- Common follow-ups (offered via `AskUserQuestion`):
  - `/scaling-fit` (Recommended when the grid was a `(L, parameter)` collapse target).
  - `/run-report` — assemble the writeup.
  - Retry-failed — re-submit only the failed cells.
  - Done.

## Notes

- This skill is *content-agnostic*: it does not know what an axis means physically. The calling skill (and the method card it cites) defines that.
- The manifest mechanism is shared with `/run-stage`; this skill does not invent a parallel format.
- For non-Slurm clusters (PBS, LSF, local-only), the same orchestrator applies with a different submission backend; an extension lands when a real problem demands it.
- The genericness gate (Phase-2): this primitive composes for any embarrassingly-parallel grid in the harness — energy vs `(U/t, doping)`, gap vs `(L_y, J2/J1)`, magic vs `(L, h)`, etc. It is not magic-paper-specific.
