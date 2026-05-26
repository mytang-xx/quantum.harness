---
name: pepskit
description: Use when choosing or running PEPSKit.jl or TensorKit.jl for PEPS, CTMRG, 2D classical/quantum tensor-network calculations, or PEPSKit setup failures.
---

# PEPSKit

Use PEPSKit with TensorKit for PEPS / CTMRG calculations where convergence knobs and tensor symmetries matter.

## Sources

- Stack contract: `tools/skills/pepskit/stack.toml`
- Method card: `.knowledge/methods/peps-based-algorithm.md`
- Install target: `make install pepskit`
- Smoke test: `julia --project=julia-env -e 'using TensorKit, PEPSKit, QuadGK'`

## Workflow

1. Consult the stack contract before setup; fresh Julia precompilation can dominate first-run time.
2. Pin lattice, unit cell, boundary/thermodynamic convention, bond dimension, environment dimension, truncation, and convergence tolerance.
3. Record CTMRG iteration count, convergence residual, observable stability, and symmetry assumptions.
4. For paper reproductions, distinguish CTMRG environment convergence from variational optimization convergence.

## Common Setup Notes

- Use cluster compute when environment dimensions or parameter scans exceed local memory/time.
- A converged energy alone is not enough; check the target observable and environment residual.
- Do not hide changes to bond dimension or environment dimension; they alter the scientific claim.
