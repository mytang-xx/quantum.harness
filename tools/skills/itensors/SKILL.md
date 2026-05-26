---
name: itensors
description: Use when choosing or running ITensors.jl or ITensorMPS.jl for DMRG, TEBD, MPS calculations, tensor-network checks, or ITensors setup failures.
---

# ITensors

Use ITensors / ITensorMPS for the harness's canonical 1D and quasi-1D tensor-network workflows.

## Sources

- Stack contract: `tools/skills/itensors/stack.toml`
- Method card: `.knowledge/methods/mps-based-algorithm.md`
- Install target: `make install itensors`
- Smoke test: `julia --project=julia-env -e 'using ITensors, ITensorMPS, KrylovKit, MPSKit'`

## Workflow

1. Consult `stack.toml` before setup and run `/setup-julia` first when Julia is not usable.
2. Pin lattice, boundary, conserved quantum numbers, bond dimension, sweeps, cutoff, initialization, and convergence observable.
3. Record energy, variance or residual proxy, discarded weight, and bond-dimension convergence.
4. Use cluster execution when bond dimension, cylinder width, or scans exceed the local threshold.
