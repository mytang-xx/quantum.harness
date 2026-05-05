---
name: transverse-field-ising
description: Use when the user is working on a transverse-field Ising ground-state problem on chains, ladders, or lattices, including criticality at the field-coupling balance, gap probes, or benchmark setup.
---

# Transverse-Field Ising

Solve transverse-field Ising ground-state problems. Lattice and `Γ/J` ratio determine method choice and what physics is accessible.

## Diagnose

Infer setup from the user's prompt and propose for ratification.

**Canonical defaults:** 1D chain, ferromagnetic J=1, Γ=1 (critical point), OBC, N=20, target E/N + gap.

**Proposal pattern:** "Going with: 1D chain, J=1, Γ=1 (critical), OBC, N=20, target E/N and gap. Override any, or pick: Γ/J scan (phase diagram), 2D square lattice."

Build per `knowledge-base/conventions.md`: `H = -J Σ σ^z_i σ^z_j - Γ Σ σ^x_i`.

## Workflow

1. Set up sites (Z2 symmetry sector, parity) and Hamiltonian per conventions.
2. Pick method per the table.
3. First short run; verify the parity sector and that the calculation respects Z2 if no field-breaking term is present.
4. Sweep convergence parameter until the target observable stabilizes.
5. Verify (next section).
6. If the target is critical behavior, hand off to `criticality`.

## Method recommendations

| Regime | Method | Card |
|---|---|---|
| 1D chain (any N) | DMRG | `knowledge-base/methods/dmrg.md` |
| Tiny cluster (N ≲ 24), exact spectrum, debugging | ED | `knowledge-base/methods/ed.md` |
| Cylinder (square / triangular strips) | DMRG | `knowledge-base/methods/dmrg.md` |
| Imaginary-time approach | TEBD | `knowledge-base/methods/tebd.md` |

## Branch table

| Condition | Action |
|---|---|
| Question is about quantum critical behavior at `Γ ≈ J` (1D) or the equivalent transition | Run the calculation here, then call `criticality`. |
| Question is about magic / SRE / nonstabilizerness / Pauli weight (any dimension) | Run the wavefunction here; hand off to `physics/magic`. For 1D, the standard partition is `L(ρ_AB)` (peaks at `h_c = 1`, log-`L` growth at criticality); for 2D, the standard estimator is `m_1` (crossing at the confinement-deconfinement transition; see `confinement` row). See `knowledge-base/methods/pauli-markov.md` and `knowledge-base/magic-benchmarks.md`. |
| Question is about confinement / deconfinement (2D `Z_2` lattice gauge theory ↔ 2D Ising via Wegner duality) | Run on the dual 2D Ising here (Wegner duality preserves SREs and the magic-crossing diagnostic — see `knowledge-base/magic-conventions.md`); hand off to `physics/confinement`. |
| Long-range Ising (e.g., `1/r^α`) | Stay here; flag that bond dimension grows; document. |
| User asks about dynamics | Route to `knowledge-base/methods/spectral.md` (stub). |
| User asks about finite-T | Route to `knowledge-base/methods/finite-t.md` (stub). |

## Verification

Default checks:

- **Limit checks** via `knowledge-base/limits.md`: at `Γ = 0`, ground state is a classical Ising ferromagnet (or antiferromagnet) with energy `E/N = -J z / 2` (`z` = coordination); at `J = 0`, ground state is fully polarized along `x` with `E/N = -Γ`.
- **Symmetry**: Z2 (`σ^z → -σ^z`) should be respected; spontaneous breaking shows only with explicit symmetry-breaking field at finite size.
- **Convergence**: bond-dim sweep gives a monotonic, asymptoting energy curve.
- **Internal consistency**: energy variance small relative to E².
- **Cross-method validation** (when feasible) — re-run on a small system with an independent method (DMRG ↔ ED, DMRG ↔ TEBD imaginary-time) and confirm agreement. See AGENTS.md "Verification practice".

Optional check:

- Compare to `knowledge-base/benchmark-numbers.md` for canonical lattices when a reference exists. For 1D chain at criticality (`Γ = J`): exact `E/N = -4/π ≈ -1.2732` (free-fermion via Jordan-Wigner; convention-dependent).

## Writeup handoff

After verification, if the user wants to communicate the result, consolidate to a runnable script + short run report, then route to `scientific-writing` / `latex-paper-en` / `scientific-visualization`. See AGENTS.md "Writeup handoff".

## Related skills

`criticality` (for the QPT at `Γ = J` and its higher-D analogues).
