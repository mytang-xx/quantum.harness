---
name: xdiag
description: Use when choosing or running XDiag.jl for exact diagonalization, symmetry-resolved sectors, Lanczos/Krylov calculations, or XDiag setup failures.
---

# XDiag

Use XDiag as the harness's canonical exact-diagonalization stack when the target can be expressed through its Hilbert-space blocks and operators.

## Sources

- Stack contract: `tools/skills/xdiag/stack.toml`
- Method card: `.knowledge/methods/ed/METHOD.md`
- Install target: `make install xdiag`
- Smoke test: `julia --project=julia-env -e 'using XDiag'`

## Workflow

1. Consult the stack contract before offering setup choices.
2. Confirm the exact model, basis, boundary, and all symmetry sectors before code.
3. Choose dense diagonalization only when the selected block fits with eigensolver workspace; otherwise use sparse / Lanczos and state what is no longer full-spectrum.
4. Record thread count, block dimension, diagonalization mode, tolerance, and residual checks in the run plan.

## Use Another Route When

- The paper needs a custom constrained basis that XDiag cannot express cleanly.
- The official paper code exists and is runnable.
- QuSpin is explicitly declared as the fallback by the protocol or method card.
