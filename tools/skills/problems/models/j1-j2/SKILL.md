---
name: j1-j2
description: Use when the user is working on a J1-J2 spin-model ground-state problem, especially frustrated square-lattice Heisenberg with competing NN and NNN couplings, competing magnetic orders, or spin-liquid candidates.
---

# J1-J2

Solve J1-J2 spin-model ground-state problems. Competing nearest- and next-nearest-neighbor couplings make the regime `J2/J1 ≈ 0.5` (square lattice) one of the canonical hard / contested benchmarks in QMB.

## Diagnose

- **Spin** (S=1/2 default).
- **Lattice** (square default; triangular and other variants exist).
- **`J2/J1` ratio** — drives the phase diagram entirely on the square lattice.
- **Coupling signs** — J1 antiferromagnetic, J2 antiferromagnetic standard.
- **Boundary condition / cylinder shape** — heavily affects DMRG results.
- **System size** (cluster for ED; cylinder `L_y × L_x` for DMRG).
- **Target observable**: `E/N`, structure factor, dimer correlations, spin gap.

Build the Hamiltonian per `knowledge-base/conventions.md`. Standard form:
`H = J1 Σ_<ij> S_i · S_j + J2 Σ_<<ij>> S_i · S_j` (NN and NNN).

## Workflow

1. Set up the Hamiltonian; pin sector via `S^z_total = 0` (singlet) for AFM finite-N.
2. Pick method per the table.
3. Short first run on a small cluster or narrow cylinder; confirm conservation laws and sign convention.
4. Sweep bond dim (DMRG) or extend cylinder width; track the target observable.
5. Verify (next section).
6. If user is asking about spin-liquid candidacy or phase classification, hand off via the branch table.

## Method recommendations

| Regime | Method | Card |
|---|---|---|
| Small cluster (N ≲ 32), exact comparison | ED | `knowledge-base/methods/ed.md` |
| Narrow cylinder (`L_y` ≲ 8) | DMRG | `knowledge-base/methods/dmrg.md` |
| Imaginary-time route to ground state | TEBD | `knowledge-base/methods/tebd.md` |
| Wide-cylinder / 2D thermodynamic limit | Beyond current scope. Surface uncertainty; report what cylinder DMRG + ED constrain. | — |
| Frustrated 2D variational comparisons (VMC, NQS, PEPS) | Cite results, do not run; flag as out of current scope. | — |

## Branch table

| Condition | Action |
|---|---|
| `J2/J1 ∈ [0.45, 0.55]` (intermediate regime) | Continue here for setup; the question is almost certainly about phase identification — call `spin-liquid` for the diagnostic. |
| User wants the source of frustration explained | Call `frustration`. |
| User wants critical-point characterization (deconfined criticality, Z2 transition) | Call `criticality` after running. |
| `J2/J1 → 0` | Reduces to NN Heisenberg; switch to `heisenberg` if the user is no longer in the J2-relevant regime. |

## Verification

Default checks:

- **Limit checks** via `knowledge-base/limits.md`: `J2 = 0` → NN Heisenberg (use square-lattice benchmark from `benchmark-numbers.md` if available); `J1 = 0` → decoupled sublattices (each is NN Heisenberg).
- **Symmetry**: total `S^z = 0` for AFM; lattice point group respected.
- **Convergence**: bond-dim sweep + cylinder-width comparison. For the intermediate regime, document both — the answer often depends on the geometry choice.
- **Internal consistency**: variance, sub-leading bond-dim corrections.
- **Cross-method validation** (when feasible) — re-run on a small cluster with an independent method (DMRG ↔ ED on the same cluster), and across cylinder geometries (`L_y` and wrapping). Disagreement on the intermediate regime is a known phenomenon — document, don't average it away. See AGENTS.md "Verification practice".

Optional check:

- For canonical `J2/J1` regimes (Néel at small `J2`, stripe at large `J2`), compare to ranges in `knowledge-base/benchmark-numbers.md`. **For `J2/J1 ≈ 0.5`, do not claim a benchmark match**: the field has not closed the question. Report your converged value, your sizes, and the active uncertainty.

## Frontier flag

The intermediate regime `J2/J1 ∈ [0.45, 0.55]` on the square lattice is among the canonical open problems in QMB. Competing claims (gapless U(1) spin liquid, gapped Z2, valence-bond crystal) coexist in the literature, with the answer often depending on geometry, sizes, and method. **Do not claim closure in this regime.**

When the user is in a frontier regime, invoke the `arxiv-search` skill with a tailored query (e.g., `J1-J2 square spin liquid`, `J1-J2 deconfined criticality`) to surface the current debate before interpreting your evidence. Then call `spin-liquid` for the diagnostic and `criticality` if a transition is being characterized.

## Related skills

`heisenberg` (J2 = 0 reduction), `frustration`, `spin-liquid`, `criticality`.
