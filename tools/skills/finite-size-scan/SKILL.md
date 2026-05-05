---
name: finite-size-scan
description: Use when the user wants to sweep system size `L` for any observable on any model — to extrapolate to the thermodynamic limit, locate a transition, or characterize finite-size effects. Generic over model and observable.
---

# finite-size-scan

Sweep `L` (or the lattice's natural size parameter) over a list of values for a single observable. Produce a structured size-indexed result, an auto-generated convergence plot, and a brief report. Composes with any `physics/*` and `models/*` skill.

## When to activate

- User asks "how does this depend on `L`?"
- A model-skill workflow needs a finite-size extrapolation as part of verification or as a follow-up.
- A `physics/*` skill needs sizes to characterize scaling (criticality, spin-liquid candidate, magic, confinement).
- After any single-`L` calculation, this skill is the canonical follow-up offered through `solve`.

## Inputs

- A *model skill* and *its parameter point* (the calling skill provides this — `finite-size-scan` does not pick the model).
- An *observable* (a name resolved by the model skill, e.g., `E/N`, `gap`, `m_1`, `L(ρ_AB)`, structure-factor peak).
- A *size list* `[L_1, L_2, …]`. Default heuristic when the user does not specify: a geometric/quadratic sequence chosen to span the regime where the observable is expected to scale (e.g., `[8, 16, 32, 64, 128]` for 1D entry-level work). The calling skill or the user overrides; this primitive does not hardcode lattice-specific sizes.
- Optional convergence-parameter override per size (e.g., bond dim `χ(L)` or basis size `dim(L)`).

## Workflow

1. For each `L` in the list, dispatch the model-skill calculation at the specified parameter point. Use the model skill's recommended method and convergence parameter.
2. Auto-bump the convergence parameter if the model skill flags non-convergence at that `L` (per AGENTS.md "Convergence" verification rule §3).
3. Collect `(L, observable, observable_uncertainty)` rows. Persist as `results/<run>/finite-size-scan.csv` plus a metadata header.
4. Auto-generate a plot of `observable(L)` (with error bars when present) via `scientific-visualization`. Save to `results/<run>/finite-size-scan.png`.
5. Run an auto-convergence check on the *trend*: monotonic / asymptoting / oscillating / divergent. Flag in the report.
6. Hand back the table + plot + flag to the calling skill (or the user via `solve`).

## Convergence check (auto)

The skill labels the trend in three categories without committing to a fit:

- **Asymptoting** — successive differences shrink monotonically; thermodynamic-limit extrapolation is sensible.
- **Critical-like** — power-law-looking growth or decay with `L`; flag for `/scaling-fit`.
- **Drifting / oscillating** — neither asymptoting nor a clean power-law; surface the failure mode (insufficient sizes, bond-dim too small, wrong sector?).

The diagnosis is a label, not a conclusion. The calling skill or the user picks the next step.

## Output

- `results/<run>/finite-size-scan.csv` — `L, observable, uncertainty, convergence_param, run_metadata`.
- `results/<run>/finite-size-scan.png` — `observable(L)` plot.
- A 2–3-line report: trend label, recommended next step.
- `scripts/<run>/finite-size-scan.jl` — reproducible Julia script that re-runs the whole sweep.

## Composition

- After this skill runs, common follow-ups (offered via `AskUserQuestion`):
  - `/scaling-fit` (Recommended for critical-like trends) — extract exponent / collapse.
  - `/parameter-scan` — extend to a 2D `(L, parameter)` grid.
  - `/cross-method-check` — re-run a small `L` with an independent method as confirmation.
  - Done.

## Notes

- This skill does *not* hold any physics content. It is generic over model, observable, and what the calling skill asks for.
- The convergence-parameter logic delegates to the model skill (and method card) — `finite-size-scan` does not know what `χ` should be at `L = 128`; the model skill does.
- For embarrassingly-parallel sweeps with many sizes, route through `/slurm-grid` before this skill.
