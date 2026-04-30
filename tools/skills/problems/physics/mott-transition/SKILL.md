---
name: mott-transition
description: Use when the user is asking about Mott localization, metal-insulator transitions, Hubbard interaction strength, double occupancy, local moments, or correlated-electron regimes.
---

# Mott Transition

Diagnose interaction-driven localization vs metallic behavior on a concrete model. Distinguish Mott physics from band-insulator and Anderson-localization explanations.

## Diagnose

- **Hypothesis** — Mott insulator at the user's parameters? Mott metal-insulator crossover? Bandwidth-controlled transition?
- **Model and lattice** — Hubbard, multi-orbital Hubbard, t-J on the boundary?
- **Filling** — half-filled (canonical Mott setting) or doped?
- **`U/t` (or `U/W`) value**.
- **Available data** — what observables already computed?
- **Ground-state vs finite-T context** — finite-T crossover and ground-state Mott phase boundary differ.

## Evidence to gather

- **Charge gap** — finite at half-filling for `U > U_c` (lattice-dependent; 0 for 1D, finite for 2D square at any `U > 0` in some senses). Computed via `E(N+1) + E(N-1) - 2 E(N)`.
- **Double occupancy** `⟨n_↑ n_↓⟩` — large at small `U/t`, drops toward zero at large `U/t`.
- **Local moment** `⟨(n_↑ - n_↓)²⟩` — saturates near 1 at large `U/t` (one electron per site, fully spin-active).
- **Spin-spin correlations** — Heisenberg-like at large `U/t` half-filled; metallic / weak at small `U/t`.
- **Density of states at Fermi level** (when accessible) — finite for metal, gap for insulator. Often inferred from spectral function rather than computed directly in DMRG.
- **Conductivity proxy** — Drude weight (long-wavelength `f`-sum rule). Vanishing Drude → insulator.

For *how* to compute each, see the model skill (`hubbard`, `multiorbital-hubbard`, `t-j`) and method card.

## Cross-checks

| Competing explanation | Test that rules it out |
|---|---|
| Band insulator | Gap exists in non-interacting limit (`U = 0`); Mott gap appears only above `U_c`. Check `U = 0` band structure. |
| Anderson localization | No quenched disorder in the model; rule out trivially if the Hamiltonian is translation-invariant. |
| Finite-size gap | Charge gap should remain finite as `L → ∞`; band-structure gap closes as `1/L`. |
| Crossover, not a transition | At `T = 0` ground-state Mott vs metal is sharp; at finite `T` it's typically a crossover (DMFT picture). State which regime the user is in. |

## Interpretation rules

- "Double occupancy decreases with `U/t`" alone does *not* prove a Mott transition. It's smooth in 1D Hubbard at any `U > 0`.
- A clean Mott identification requires: finite charge gap *and* large local moment *and* spin correlations consistent with the effective Heisenberg picture at large `U/t`.
- For half-filled bipartite lattices, large-`U` reduces to Heisenberg AFM with `J = 4t²/U` (`knowledge-base/limits.md`). The Mott phase carries spin order in this regime; lack of spin order at large `U` indicates frustration, not absence of Mott behavior.
- For multi-orbital problems: orbital-selective Mott (some bands localized, others itinerant) is a distinct regime; flag it explicitly when relevant.

## Frontier flag

The 2D doped Hubbard phase diagram (and the question "is there a Mott transition at finite hole density?") is contested. Do not claim a clean Mott identification in the doped 2D regime without being explicit about the literature uncertainty.

Before interpreting evidence in a frontier regime, invoke the `arxiv-search` skill with a tailored query (e.g., `2D Hubbard doped Mott transition`, `multi-orbital orbital-selective Mott`) to surface recent results. Do not commit to an identification without seeing what the literature is actually claiming.

## Model hooks

`hubbard` (canonical), `multiorbital-hubbard` (Hund-metal vs Mott), `t-j` (large-`U` Mott side), `anderson-impurity` (single-site Mott physics in DMFT context).
