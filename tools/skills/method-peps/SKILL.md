---
name: method-peps
description: Use when a PEPS, iPEPS, CTMRG, 2D tensor-network, environment dimension, or classical partition-function reproduction needs method-level route and tool selection.
---

# Method PEPS

PEPS is the 2D tensor-network track. Use it to decide whether the target is an environment contraction, classical partition-function reproduction, or PEPS optimization, then invoke the PEPS tool skill.

## Sources

- Track README: `tracks/peps/README.md`
- Method card: `.knowledge/methods/peps-based-algorithm.md`
- Tool skill: `/pepskit`

## Route

1. Use CTMRG/environment contraction when the figure depends on free energy, magnetization, transfer matrices, correlation length, or PEPS expectation values.
2. Distinguish fixed-tensor contraction from variational PEPS optimization before selecting parameters.
3. Recommend `/pepskit` for PEPSKit.jl / TensorKit.jl setup, CTMRG settings, and timing.
4. If the paper target is a package tutorial or official code, offer official code / web search before reimplementing formulas.

## Tool Handoff

Invoke `/pepskit` after the route is chosen. `/pepskit` owns environment dimension, PEPS bond dimension, CTMRG tolerance, max iterations, tensor normalization, convergence checks, and time estimate.
