---
name: multiorbital-hubbard
description: Use when the user is working on a multiorbital Hubbard or Kanamori-interaction ground-state problem — Hund physics, three-band impurity models, orbital degrees of freedom, or material-inspired correlated-electron benchmarks.
---

# Multiorbital Hubbard

Solve multiorbital Hubbard / Kanamori-interaction ground-state problems. Local Hilbert space grows as `4^M` for `M` orbitals — always cost out the local sector before recommending a method.

## Diagnose

- **Number of orbitals `M`** (and degeneracy assumptions).
- **Local Hilbert dimension** = `4^M` (no symmetry); `(M+1) choose 2` per spin sector if particle-conserving.
- **Filling** (per orbital, total).
- **Interaction convention**: density-density only, or full Kanamori (density-density + spin-flip + pair-hopping)?
- **Local one-body terms**: crystal field, level splittings, orbital basis.
- **`U`, `J_Hund`** — the Kanamori `U' = U - 2J`, `J_pair = J` relations need explicit statement.
- **Spin-orbit coupling**? (Often broken into the one-body part.)
- **Lattice or impurity context** — single impurity, embedded in DMFT, or genuine lattice problem.
- **Target observable**: orbital occupancies, total spin, local moment, Hund-metal indicators.

Build per `knowledge-base/conventions.md`. Density-density Kanamori:
`H_int = U Σ_a n_{a↑} n_{a↓} + (U - 2J) Σ_{a<b,σ} n_{aσ} n_{bσ} + (U - 3J) Σ_{a<b,σ} n_{aσ} n_{b,-σ}`.
Full Kanamori adds spin-flip `J Σ_{a≠b} c†_{a↑} c†_{b↓} c_{a↓} c_{b↑}` and pair-hopping `J Σ_{a≠b} c†_{a↑} c†_{a↓} c_{b↓} c_{b↑}`.

State explicitly which terms are kept.

## Workflow

1. Cost out the local Hilbert space; if too large, push the user toward fewer orbitals or impurity-only setups.
2. Build interaction terms; document Kanamori relations and which terms are kept.
3. Pick method per the table.
4. First short run on a single-site or impurity problem; verify orbital occupancies and rotational invariance under SO(3) when full Kanamori is used.
5. Sweep convergence parameter; track observable.
6. Verify (next section).

## Method recommendations

| Regime | Method | Card |
|---|---|---|
| Single-site / impurity, small `M`, finite bath | ED | `knowledge-base/methods/ed.md` |
| Multi-orbital impurity with longer bath chain | DMRG / MPS impurity solver | `knowledge-base/methods/dmrg.md` |
| Lattice multi-orbital | Out of current scope unless DMFT-embedded; flag explicitly. | — |
| DMFT impurity solver | Out of current scope to run; note the context. | — |

## Branch table

| Condition | Action |
|---|---|
| Single-orbital → user is actually doing `hubbard` | Switch to `hubbard`. |
| Question is about local-moment screening, Kondo, mixed valence | Call `kondo-effect`. |
| Question is about Mott / orbital-selective Mott | Call `mott-transition`. |
| Lattice context with self-consistent embedding | Surface DMFT framework as out of current scope. |

## Verification

Default checks:

- **Limit checks** via `knowledge-base/limits.md`: `J_Hund = 0` reduces to multi-band Hubbard with only `U` and `U' = U`; full SO(3) rotational invariance only when full Kanamori is used; atomic limit at large `U/W` gives Hund's-rule multiplet (max total spin / orbital angular momentum).
- **Symmetry**: orbital occupancies; total particle count; `S^z` and total `S²` when SU(2) is preserved; rotational invariance check at the local level.
- **Hilbert space sanity**: confirm the basis size matches the analytic `4^M`-style count.
- **Convergence**: bond-dim sweep; bath-size sweep for impurity problems.
- **Cross-method validation** (when feasible) — for multi-orbital impurity problems, re-solve at smaller orbital count or with density-density-only interactions as a sanity check; ED ↔ MPS cross-check on small bath. See AGENTS.md "Verification practice".

Optional check:

- For three-orbital Kanamori at canonical fillings, compare to `knowledge-base/2302.04919-variational-benchmarks.md` and other published benchmarks where `U`, `J_Hund` match.

## Related skills

`hubbard` (single-orbital reduction), `anderson-impurity` (impurity-flavored), `mott-transition`, `kondo-effect`.
