# TEBD (Time-Evolving Block Decimation)

MPS-based time-evolution method. Used here in **imaginary-time** mode to project an initial MPS onto the ground state via `e^{-τ H}`. Real-time TEBD exists for dynamics; out of current scope.

## Setup

Julia + ITensors / ITensorMPS: `make install julia && make install itensors`. MPSKit.jl (also installed) has a more polished iTEBD/iDMRG interface for infinite systems.

## Notation

- Trotter step `τ` (often called `dt` in code).
- Total imaginary time `T_total`; ground-state convergence requires `T_total ≫ 1/Δ` where `Δ` is the gap.
- Bond dimension `D` (or `chi`) — same MPS bond as in DMRG.
- Truncation cutoff `eps` — SVD threshold per gate application.

## Code shape (Julia / ITensors)

```julia
using ITensors, ITensorMPS

# 1. Sites + Hamiltonian (as ops or MPO)
sites = siteinds("S=1/2", N; conserve_qns=true)

# 2. Build Trotter gates (2nd-order Trotter shown)
function trotter_gates(sites, J, τ)
    gates = ITensor[]
    for j in 1:N-1
        s1, s2 = sites[j], sites[j+1]
        hj = J * (op("Sz", s1) * op("Sz", s2)
                + 0.5 * op("S+", s1) * op("S-", s2)
                + 0.5 * op("S-", s1) * op("S+", s2))
        push!(gates, exp(-τ/2 * hj))
    end
    append!(gates, reverse(gates))   # 2nd-order: half step forward, half backward
    return gates
end

# 3. Initial state
psi = MPS(sites, n -> isodd(n) ? "Up" : "Dn")

# 4. Imaginary-time sweep
gates = trotter_gates(sites, J, τ)
T_total = 20.0
n_steps = round(Int, T_total / τ)
for step in 1:n_steps
    psi = apply(gates, psi; cutoff=1e-10, maxdim=200)
    normalize!(psi)
end

# 5. Energy
energy = inner(psi', H, psi)
```

## Knobs

| Knob | Effect | Starting point |
|---|---|---|
| `τ` (Trotter step) | Trotter error scales as `τ^2` (2nd order). Smaller is more accurate but slower. | `0.05–0.1` for entry; reduce if energy not converged. |
| `T_total` | Imaginary-time evolution length. Need `T_total ≫ 1/Δ`. | Start at 10–20 (units where largest coupling = 1); extend until energy stops dropping. |
| `maxdim` | MPS bond dimension cap. | 50–200 for 1D entry-level. |
| `cutoff` | SVD truncation per gate application. | `1e-10`. |

## Pitfalls

- **Trotter error accumulation**: a too-large `τ` produces a converged but biased energy. Always sweep `τ → 0`.
- **Stuck at local minimum**: imaginary time projects onto ground state only if there's overlap. A pathological initial state (orthogonal to ground state) won't converge. Pick a sensible initial product state.
- **Wrong sector**: with `conserve_qns=true`, the initial state pins the sector. Verify quantum numbers afterward.
- **Boundary effects (OBC)**: same as DMRG; report system-size scan or extrapolate.
- **Slow ground-state convergence near criticality**: gapless / near-gapless systems need very long `T_total` for good ground state.

## TEBD vs DMRG (when to choose)

- **DMRG** is usually faster for ground-state energies of gapped 1D / quasi-1D systems.
- **TEBD imaginary time** is competitive when the ground state has a clean physical preparation (Néel, dimer, …) and the gap is reasonable; sometimes more robust to local-minimum issues than DMRG.
- For **real-time dynamics** (which is *out of current scope*), TEBD is one of the standard tools — flag this and decline to drive a dynamics calculation in this round.

## Verification (per-method, complements skill-level verification)

- **`τ`-extrapolation**: run two `τ` values; energy difference should scale as `τ^2`.
- **`T_total` convergence**: energy decreases monotonically and asymptotes.
- **Bond-dim convergence**: same as DMRG.
- **Energy variance**: same as DMRG; small at convergence.

## Citations

- Vidal, *Phys. Rev. Lett.* **91**, 147902 (2003) — original TEBD.
- Vidal, *Phys. Rev. Lett.* **93**, 040502 (2004) — efficient simulation.
- Schollwöck, *Ann. Phys.* **326**, 96 (2011) — MPS / TEBD review.
