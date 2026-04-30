---
name: t-v
description: Use when the user is working on a spinless-fermion t-V ground-state problem, including hopping plus nearest-neighbor density-density repulsion, charge ordering, and CDW transitions.
---

# t-V

Solve spinless-fermion t-V ground-state problems. Density-density repulsion `V` competes with kinetic delocalization, driving charge order at strong coupling.

Distinguish from `t-J`: t-V has no spin index; t-J has projected spinful fermions with no double occupancy.

## Diagnose

- **Lattice and dimension** (chain default).
- **Particle number / filling** (e.g., `N_f = N/2` for half-filling).
- **`V/t` ratio** — drives metallic vs CDW phases.
- **Boundary condition** (OBC default for DMRG; PBC for ED).
- **Hopping sign** convention.
- **Target observable**: `E/N`, charge structure factor `N(q)`, density-density correlations, CDW order parameter, charge gap.

Build the Hamiltonian per `knowledge-base/conventions.md`. Standard form:
`H = -t Σ_<ij> (c†_i c_j + h.c.) + V Σ_<ij> n_i n_j` (spinless fermions).

## Workflow

1. Set up sites with fixed-`N_f` sector; fermion ordering convention explicit.
2. Pick method per the table.
3. First run; confirm particle number conserved, fermionic signs handled.
4. Sweep convergence parameter; track target observable.
5. Verify (next section).
6. If competing-order or critical-point physics emerges, hand off.

## Method recommendations

| Regime | Method | Card |
|---|---|---|
| Small chain or 2D cluster (N ≲ 24) | ED (fixed-`N_f` sector) | `knowledge-base/methods/ed.md` |
| 1D chain (any N), ladder | DMRG | `knowledge-base/methods/dmrg.md` |
| Imaginary-time approach | TEBD | `knowledge-base/methods/tebd.md` |
| Sign-problem-free 2D bipartite cases | QMC may be applicable; check sign condition before recommending. | — |

## Branch table

| Condition | Action |
|---|---|
| Lattice has frustration (triangular t-V, etc.) | Call `frustration` for regime classification. |
| User asks about the metal-CDW transition explicitly | Run the calculation here, then call `criticality`. |
| User wants spinful-fermion physics or doped Mott | Switch to `hubbard` or `t-j`. |

## Verification

Default checks:

- **Limit checks** via `knowledge-base/limits.md`: `V = 0` → free fermions (exact tight-binding band); large `V` at half-filling → CDW with `E/N = -V z / 4` (for chain) or analogous lattice Madelung; particle-hole symmetry on bipartite lattices at half-filling.
- **Symmetry**: particle number conservation; lattice translation; sublattice exchange (bipartite).
- **Convergence**: bond-dim or basis-size sweep monotonic and asymptoting.
- **Internal consistency**: variance, density profile near edges (Friedel oscillations expected for OBC).
- **Cross-method validation** (when feasible) — re-run a small fixed-`N_f` cluster with an independent method (DMRG ↔ ED), and check sign-problem-free QMC agreement when applicable. See AGENTS.md "Verification practice".

Optional check:

- Compare to `knowledge-base/benchmark-numbers.md` for the V=0 free-fermion limit and known integrable points.

## Related skills

`frustration`, `criticality`, `hubbard` (spinful analog).
