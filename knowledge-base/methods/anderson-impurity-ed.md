# Anderson Impurity ED

Exact diagonalization for single-orbital Anderson impurity models with a finite discretized bath. Covers bath discretization, fermion basis construction, and the standard observable set.

## Setup

Same as `ed.md`: `make install julia && make install itensors` (KrylovKit included).

## Bath discretization (flat band)

For a flat metallic band of half-width `D` and hybridization width `Γ`:

- Hybridization function: `Δ(ω) = Γ` for `|ω| < D`, 0 otherwise.
- Relation: `Γ = π ρ V²` where `ρ = 1/(2D)` is the density of states.
- Discretize into `L_bath` levels with energies `ε_k` and couplings `V_k`.

**Logarithmic discretization** (NRG-style, better for Kondo):
`ε_k ~ ±D Λ^{-k}`, `V_k` from integral of `Δ(ω)` over each bin. `Λ = 2–3` typical.

**Linear discretization** (simpler, adequate for ED benchmarks):
`ε_k = D × (2k - L_bath - 1) / L_bath` for `k = 1..L_bath`, uniform `V_k = √(Γ D / (π L_bath))`.

For entry-level work, use linear discretization with `L_bath = 6`.

## Hilbert space

Total sites = 1 (impurity) + `L_bath`. Each site has 4 states (empty, ↑, ↓, ↑↓).
Full dimension: `4^{1+L_bath}`. With `(N↑, N↓)` conservation: much smaller blocks.

For `L_bath = 6`, half-filling `(N↑=N↓=3.5 → round to 4)`, the target sector is ~O(10⁴). Trivially fast.

## Code shape (Julia / KrylovKit)

```julia
using KrylovKit, SparseArrays

# 1. Enumerate basis states in the (N↑, N↓) sector.
#    Represent each state as a pair of bitstrings (up-occupation, dn-occupation)
#    for (1+L_bath) sites. Site 1 = impurity.

# 2. Build sparse H by acting term-by-term:
#    H_loc  = ε_d (n_d↑ + n_d↓) + U n_d↑ n_d↓
#    H_bath = Σ_k ε_k (n_k↑ + n_k↓)
#    H_hyb  = Σ_k V_k (d†_σ c_kσ + h.c.)   ← Jordan-Wigner signs here

# 3. Jordan-Wigner sign rule:
#    c†_j |...⟩ picks up (-1)^{number of occupied sites at positions < j}
#    in the canonical ordering (all ↑ sites first, then all ↓ sites,
#    or interleaved — pick one convention and be consistent).

# 4. Solve
energies, vectors, info = eigsolve(H, 4, :SR; tol=1e-12)
```

## Standard observables

| Observable | Formula | What it tells you |
|---|---|---|
| Impurity occupancy `⟨n_d⟩` | `⟨n_d↑⟩ + ⟨n_d↓⟩` | Should be 1 at symmetric point (`ε_d = -U/2`). |
| Double occupancy | `⟨n_d↑ n_d↓⟩` | Small in local-moment regime (large `U/Γ`). |
| Local moment | `⟨(n_d↑ - n_d↓)²⟩ = ⟨n_d⟩ - 2⟨n_d↑ n_d↓⟩` | Near 1 → local moment formed. |
| Impurity-bath spin correlation | `⟨S_d · S_bath⟩ = ⟨S_d · Σ_k S_k⟩` | Negative → Kondo singlet forming. |
| Singlet-triplet gap | `E(S=1) - E(S=0)` | Finite-size proxy for T_K. |

## T_K extraction

At T=0 ED with a finite bath, T_K cannot be extracted precisely. Two routes:

1. **Haldane formula** (analytic, primary): `T_K ~ 0.41 √(UΓ/2) exp(-πU/8Γ)` for symmetric Anderson. See `knowledge-base/limits.md`.
2. **Singlet-triplet gap** (finite-size proxy): compare across `L_bath = 4, 6, 8`. Trend should be consistent with Haldane.

For precise T_K, NRG is needed — out of current scope. State this explicitly to the user.

## Pitfalls

- **Jordan-Wigner signs**: the #1 source of bugs. Test on `U = 0` (resonant level model, exactly solvable) before any production run.
- **Bath discretization quality**: `L_bath = 6` linear discretization is coarse. T_K from singlet-triplet gap may not match Haldane at large `U/Γ` because the level spacing exceeds T_K.
- **Wrong sector**: half-filling sector for symmetric Anderson is `N_total = 1 + L_bath` electrons (N↑ = N↓ = (1+L_bath)/2). Check.

## Verification

- `U = 0`: compare to analytic resonant-level result. `⟨n_d⟩ = 1` at symmetric point.
- `V = 0`: impurity decoupled; `⟨n_d⟩` and `E` match atomic limit.
- Particle-hole symmetry at `ε_d = -U/2`: `⟨n_d⟩ = 1` exactly.
- `L_bath` convergence: observables should trend with bath size.

## Citations

- Anderson, *Phys. Rev.* **124**, 41 (1961) — original Anderson model.
- Haldane, *Phys. Rev. Lett.* **40**, 416 (1978) — Kondo scale formula.
- Wilson, *Rev. Mod. Phys.* **47**, 773 (1975) — NRG (conceptual reference for what ED approximates).
