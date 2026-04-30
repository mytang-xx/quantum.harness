---
name: criticality
description: Use when the user is asking about quantum critical points, scaling, finite-size collapse, critical exponents, gaps, universality, conformal data, or critical behavior across quantum many-body models.
---

# Criticality

Diagnose quantum critical behavior on a concrete model. Produce evidence and a scaling argument, not a course on phase transitions.

## Diagnose

- **Hypothesis** — is the user claiming a continuous QPT, a first-order transition, a deconfined critical point, or asking to *find* one?
- **Model and control parameter** — which knob is being tuned? (e.g., `Γ/J` for TFIM, `J2/J1` for J1-J2, `U/t` for Hubbard.)
- **Candidate phases on either side**.
- **Available data** — what observables are already computed? At what sizes?
- **Sizes / cylinder widths accessible**.
- **What would close the question** — exponent estimate? phase-boundary location? universality identification?

## Evidence to gather

- **Order parameter** — vanishes continuously at the critical point if continuous QPT; jumps discontinuously if first-order.
- **Gap behavior** — closes as a power law with system size at criticality (`Δ ~ L^{-z}`); stays open in gapped phases.
- **Susceptibility** — diverges at criticality with universal exponent.
- **Correlation length** — diverges at criticality. Use `ξ ~ L` finite-size scaling form.
- **Entanglement entropy** — at 1D criticality, `S_A ~ (c/6) log L` (open) or `(c/3) log L` (periodic) where `c` is the central charge.
- **Finite-size scaling collapse** — order parameter, susceptibility, correlation length collapsed onto a universal scaling function.

For *how* to compute each, see the model skill (`heisenberg`, `transverse-field-ising`, `j1-j2`, `hubbard`) and the relevant method card.

## Cross-checks

| Competing explanation | Test that rules it out |
|---|---|
| First-order transition | Order parameter discontinuous at the candidate point; coexisting phases. |
| Crossover (no real transition) | No size-divergent susceptibility / correlation length. |
| Finite-size artifact | Multiple sizes show consistent scaling; the apparent transition does not drift with `L`. |
| Wrong universality class | Independently estimate two exponents; if they fail the universal scaling relations, reconsider. |
| Gapless phase (not a critical point) | Compare with limit/known-gapless regions in `knowledge-base/limits.md`. |

## Interpretation rules

- A *single* observable showing critical-looking behavior is suggestive, not conclusive. Demand at least two consistent indicators (e.g., gap closing AND scaling collapse).
- Quote uncertainties on exponent estimates from finite-size extrapolation; do not claim three significant figures from `L = 6, 8, 10`.
- For known-universality classes (1D Ising at `Γ = J` is `c = 1/2`, free-Majorana / Ising CFT), check consistency with the established conformal data, not just any fit.
- For contested cases (J1-J2 around `J2/J1 ≈ 0.5`, deconfined criticality candidates), report your evidence's position within the literature debate. Do not claim closure where the field has none.

## Frontier flag

Genuine open questions in QBM criticality — deconfined criticality on the SU(2) checkerboard, the J1-J2 intermediate region, multi-orbital Mott QCPs — should be presented as constraint-only diagnostics rather than identification claims.

## Model hooks

`transverse-field-ising` (canonical Z2 QCP at `Γ = J`), `heisenberg` (gapless 1D, BKT), `j1-j2` (intermediate-regime debate), `hubbard` (Mott QCP), `t-j` (doping-driven transitions).
