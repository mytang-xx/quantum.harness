---
name: anderson-impurity
description: Use when the user is working on an Anderson impurity ground-state problem — a local interacting impurity coupled to a non-interacting bath, with finite-bath benchmarks, hybridization functions, or Kondo / local-moment physics.
---

# Anderson Impurity

Solve Anderson impurity ground-state problems. The Hamiltonian decomposes into a local interacting piece, a bath, and a hybridization. Bath discretization quality is the dominant practical concern.

## Diagnose

- **Impurity orbitals / spins** — single-orbital symmetric? multi-orbital (handoff to `multiorbital-hubbard`)?
- **Local interaction** — `U`, level energy `ε_d`. Symmetric Anderson uses `ε_d = -U/2`.
- **Bath** — finite or continuous? If continuous, what's the hybridization function `Δ(ω)`?
- **Bath size** if finite (`L_bath`).
- **Filling / chemical potential**.
- **Symmetries** (particle-hole, spin SU(2)).
- **Target observable**: impurity occupancy `⟨n_d⟩`, double occupancy, local moment `⟨(n_↑ - n_↓)²⟩`, impurity spin susceptibility, Kondo-scale estimate.

Build per `knowledge-base/conventions.md`. Standard form:
`H = ε_d Σ_σ n_dσ + U n_d↑ n_d↓ + Σ_kσ ε_k c†_kσ c_kσ + Σ_kσ V_k (d†_σ c_kσ + h.c.)`.

## Workflow

1. Choose bath representation: star geometry (direct from `Δ(ω)`) or chain geometry (after Lanczos-style mapping). Document.
2. Set up sites; pin `(N↑, N↓)` sector.
3. Pick method per the table.
4. First short run; verify particle / spin numbers, impurity occupancy at trivial limits.
5. Vary bath size (or chain length, bond dim) until target observable converges.
6. Verify (next section).

## Method recommendations

| Regime | Method | Card |
|---|---|---|
| Finite bath, small system (`L_bath` ≲ 8) | ED | `knowledge-base/methods/ed.md` |
| Bath as a chain, longer chains | DMRG / MPS impurity solver | `knowledge-base/methods/dmrg.md` |
| Continuous bath, low-energy Kondo scaling | NRG-style reasoning (out of current scope to run; note conceptually). | — |
| DMFT lattice self-consistency | Out of current scope; flag and discuss the embedding context. | — |

## Branch table

| Condition | Action |
|---|---|
| Question is about Kondo screening, local moment formation, screening scales | Call `kondo-effect`. |
| Multi-orbital, Hund's coupling, Kanamori interactions | Switch to `multiorbital-hubbard`. |
| Impurity arises from a lattice DMFT loop | Out of current scope; surface and discuss. |

## Verification

Default checks:

- **Limit checks** via `knowledge-base/limits.md`: `V = 0` → impurity decouples (trivial atomic limit); `U = 0` → resonant level model (exactly solvable); symmetric Anderson at `ε_d = -U/2` → particle-hole symmetric, `⟨n_d⟩ = 1`.
- **Symmetry**: total particle count, `S^z`, particle-hole at the symmetric point.
- **Bath-size convergence**: report the trend of the observable as `L_bath` (or chain length) grows.
- **Internal consistency**: variance; impurity occupancy; local moment.

Optional check:

- Symmetric Anderson Kondo scale via Haldane formula in `knowledge-base/limits.md` (`T_K`); compare against a finite-bath estimate where possible. Treat as order-of-magnitude consistency, not a benchmark match.

## Related skills

`kondo-effect`, `multiorbital-hubbard`, `mott-transition` (lattice context).
