---
name: t-j
description: Use when the user is working on a t-J ground-state problem — projected spinful fermions with no double occupancy, doped Mott systems, cuprate-inspired models, or strong-coupling Hubbard reductions.
---

# t-J

Solve t-J ground-state problems. The no-double-occupancy projection makes the local Hilbert space three-dimensional (empty / up / down) and changes both diagnostics and method choice relative to Hubbard.

## Diagnose

- **Lattice and dimension** (square default for 2D doped problems).
- **Hole / electron count** (or filling `n = N_e / N`).
- **`J/t` ratio** — independent parameter at the t-J level, derived as `4t²/U` only when reducing from Hubbard.
- **Boundary condition / cylinder shape**.
- **Added terms**: three-site terms (sometimes included in faithful Hubbard reductions), bond-dependent J.
- **Goal**: direct t-J physics, or comparison against Hubbard at large `U`?

Build per `knowledge-base/conventions.md`:
`H = -t Σ_<ij>,σ P (c†_iσ c_jσ + h.c.) P + J Σ_<ij> (S_i · S_j - n_i n_j / 4)` (with no-double-occupancy projector `P`).

## Workflow

1. Set up sites with `("Electron"; conserve_qns=true)` in ITensors (or equivalent), pinned to the target `(N↑, N↓)`. Verify that double occupancy is excluded by the construction.
2. Pick method per the table.
3. First short run; verify projection, particle counts, fermionic signs.
4. Sweep convergence parameter; track observable.
5. Verify (next section).
6. If the user is comparing to Hubbard or asking about Mott / large-U emergence, hand off.

## Method recommendations

| Regime | Method | Card |
|---|---|---|
| Small cluster, exact reference | Projected ED | `knowledge-base/methods/ed.md` |
| 1D chain, narrow cylinder | DMRG | `knowledge-base/methods/dmrg.md` |
| Imaginary-time route | TEBD | `knowledge-base/methods/tebd.md` |
| 2D doped variational comparisons (VMC, NQS) | Cite literature; do not run as default — out of current scope. | — |

## Branch table

| Condition | Action |
|---|---|
| User wants the connection to large-U Hubbard and Mott physics | Call `mott-transition`. |
| Frustrated lattice (triangular t-J, etc.) | Call `frustration`. |
| Questions about pairing / superconductivity / stripes in 2D doped t-J | Surface as out of current scope (variational territory); offer a 1D / narrow-cylinder DMRG analog. |
| At zero doping, the model reduces to Heisenberg | Switch to `heisenberg`. |

## Verification

Default checks:

- **Projection enforcement**: every site has occupancy ∈ {0, ↑, ↓}; double occupancy literally absent in the basis.
- **Limit checks** via `knowledge-base/limits.md`: at zero doping → Heisenberg; at infinite-`J` limit → spin-isolated singlet pairs; at `t/J → ∞` and small doping → kinetic-dominated regime.
- **Symmetry**: particle counts; `S^z` (and SU(2) when isotropic); lattice symmetries.
- **Convergence**: bond-dim sweep; cylinder-width comparison for 2D.
- **Hubbard cross-check**: when `J = 4t²/U` is being claimed, run the corresponding Hubbard at large `U` and compare ground-state energies up to the expected `O((t/U)^4)` correction.
- **Cross-method validation** (when feasible) — re-run on a small projected cluster with an independent method (projected ED ↔ DMRG). See AGENTS.md "Verification practice".

Optional check:

- Use known integrable points (1D supersymmetric t-J at `J = 2t`) as a benchmark.

## Writeup handoff

After verification, if the user wants to communicate the result, consolidate to a runnable script + short run report, then route to `scientific-writing` / `latex-paper-en` / `scientific-visualization`. See AGENTS.md "Writeup handoff".

## Related skills

`hubbard`, `mott-transition`, `heisenberg` (zero-doping), `frustration`.
