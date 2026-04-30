---
name: transverse-field-ising
description: Use when the user is working on a transverse-field Ising ground-state problem on chains, ladders, or lattices, including criticality at the field-coupling balance, gap probes, or benchmark setup.
---

# Transverse-Field Ising

Solve transverse-field Ising ground-state problems. Lattice and `Γ/J` ratio determine method choice and what physics is accessible.

## Diagnose

- **Lattice / dimension** (chain, ladder, square, triangular).
- **Couplings**: `J` (Ising), `Γ` (transverse field). Sign of `J`: ferromagnetic vs antiferromagnetic.
- **Boundary condition** (OBC default).
- **System size** (or cylinder shape for 2D).
- **Target observable**: ground-state energy, magnetization `⟨σ^z⟩`, gap, two-point correlations.
- **Accuracy goal** and compute budget.

Build the Hamiltonian per `knowledge-base/conventions.md`. Standard form:
`H = -J Σ_<ij> σ^z_i σ^z_j - Γ Σ_i σ^x_i` (ferromagnetic by sign convention).

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
| Long-range Ising (e.g., `1/r^α`) | Stay here; flag that bond dimension grows; document. |
| User asks about real-time dynamics or finite-T | Out of current scope; offer to set up the ground-state computation that's needed first. |

## Verification

Default checks:

- **Limit checks** via `knowledge-base/limits.md`: at `Γ = 0`, ground state is a classical Ising ferromagnet (or antiferromagnet) with energy `E/N = -J z / 2` (`z` = coordination); at `J = 0`, ground state is fully polarized along `x` with `E/N = -Γ`.
- **Symmetry**: Z2 (`σ^z → -σ^z`) should be respected; spontaneous breaking shows only with explicit symmetry-breaking field at finite size.
- **Convergence**: bond-dim sweep gives a monotonic, asymptoting energy curve.
- **Internal consistency**: energy variance small relative to E².

Optional check:

- Compare to `knowledge-base/benchmark-numbers.md` for canonical lattices when a reference exists. For 1D chain at criticality (`Γ = J`): exact `E/N = -4/π ≈ -1.2732` (free-fermion via Jordan-Wigner; convention-dependent).

## Related skills

`criticality` (for the QPT at `Γ = J` and its higher-D analogues).
