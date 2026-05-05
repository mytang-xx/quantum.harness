---
name: parameter-scan
description: Use when the user wants to sweep one parameter axis (a Hamiltonian coupling, an estimator knob, or any other scalar control) for any observable on any model. Generic over the axis, the observable, and the model.
---

# parameter-scan

Sweep one scalar parameter axis over a user- or skill-specified list of values, holding everything else fixed, for a single observable. Produces a structured parameter-indexed result, auto-generated plot, and a brief report. Composes naturally with `/finite-size-scan` for 2D `(L, parameter)` grids.

## When to activate

- User asks "how does this depend on `[parameter]`?"
- A model-skill workflow needs a parameter scan to locate a transition or characterize a regime.
- A `physics/*` skill needs a parameter axis to test the diagnostic (criticality, magic across phases, confinement).
- After any single-parameter calculation, this skill is the canonical follow-up offered through `solve`.

## Inputs

- A *model skill* and *its anchor configuration* (size, sector, fixed parameters).
- A *parameter axis* — a name resolved by the model skill (e.g., `h` for TFIM, `D` for spin-1 XXZ, `J2/J1`, `U/t`) or by the algorithm card (e.g., `N_M`, `N_S`, `χ`, `Trotter step`).
- A *value list* on that axis. Default heuristic when the user does not specify: 9–15 evenly spaced points spanning the prompt's regime; the calling skill or the user overrides. This primitive does not hardcode physics-specific values.
- An *observable* — same resolution as in `/finite-size-scan`.

## Workflow

1. For each parameter value in the list, dispatch the model-skill calculation at the anchor configuration with the swept parameter set to that value.
2. Use the model skill's recommended method and convergence parameter; the convergence parameter may itself need to scale with the parameter (e.g., `χ` must grow near criticality).
3. Collect `(parameter, observable, uncertainty)` rows. Persist as `results/<run>/parameter-scan.csv`.
4. Auto-generate `observable(parameter)` plot via `scientific-visualization`. Save to `results/<run>/parameter-scan.png`.
5. Detect *features* on the axis: monotone / peak / valley / crossing / discontinuity. Surface in the report.
6. Hand back the table + plot + feature list to the calling skill (or the user via `solve`).

## Feature detection (auto)

The skill labels what it found on the axis:

- **Monotone** — observable goes one direction across the range.
- **Extremum** — peak or valley at an interior point. Often a critical-point indicator.
- **Crossing** (only meaningful when paired with a size axis from `/finite-size-scan`) — curves at different `L` cross at one point. The Binder-cumulant-like diagnostic for transitions.
- **Discontinuity-like step** — sharp jump suggesting a first-order transition or a sector / convergence problem; flag for follow-up.

Labels are descriptive, not interpretive. The calling skill (e.g., `physics/criticality`, `physics/magic`, `physics/confinement`) interprets the label.

## Output

- `results/<run>/parameter-scan.csv` — `parameter, observable, uncertainty, convergence_param, run_metadata`.
- `results/<run>/parameter-scan.png` — `observable(parameter)` plot.
- A 2–3-line report: feature label(s), recommended next step.
- `scripts/<run>/parameter-scan.jl` — reproducible script.

## Composition

- Pair with `/finite-size-scan` to get the 2D `(L, parameter)` grid; that grid is the standard input to `/scaling-fit` for finite-size collapse.
- For embarrassingly-parallel sweeps, route through `/slurm-grid` before this skill.
- Common follow-ups (offered via `AskUserQuestion`):
  - `/finite-size-scan` (Recommended when the scan reveals a critical-point candidate) — extend to size-indexed grid for collapse.
  - `/scaling-fit` — when a peak / crossing has been located and exponents are wanted.
  - `/cross-method-check` — independent confirmation at one parameter value.
  - Done.

## Notes

- The same primitive sweeps a Hamiltonian coupling (`h`, `Δ`, `D`, `U/t`, …) or an estimator parameter (`N_M`, `N_S`, `χ`, Trotter step). The user / calling skill picks the axis; the primitive does not care.
- This skill does *not* know the physics meaning of the axis. It is generic over the parameter type.
- For frontier regimes, the calling physics skill should invoke `arxiv-search` *before* interpretation; this primitive only produces the data.
