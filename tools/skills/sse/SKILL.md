---
name: sse
description: Use when choosing or running StochasticSeriesExpansion.jl or Carlo.jl for sign-free QMC/SSE workflows, MPI setup, or SSE setup failures.
---

# SSE

Use StochasticSeriesExpansion.jl with Carlo.jl for sign-problem-free stochastic-series-expansion QMC workflows.

## Sources

- Stack contract: `tools/skills/sse/stack.toml`
- Method card: `.knowledge/methods/quantum-monte-carlo.md`
- Install target: `make install sse`
- Smoke test: `julia --project=julia-env -e 'using Carlo, StochasticSeriesExpansion'`

## Workflow

1. Confirm the model is sign-problem-free for the chosen lattice, coupling signs, and basis.
2. Consult `stack.toml` for CPU vs MPI smoke tests and compose with `/slurm` for scheduled runs.
3. Pin thermalization, samples, chains, bins, update type, estimator, seed policy, and target uncertainty.
4. Report autocorrelation/binning diagnostics with the measured observable.
