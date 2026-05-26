---
name: netket
description: Use when choosing or running NetKet for VMC, neural quantum states, sampler or optimizer choices, JAX CPU/GPU setup, or NetKet setup failures.
---

# NetKet

Use NetKet for VMC / neural-quantum-state workflows where the task needs a variational ansatz, sampler, optimizer, and statistical validation.

## Sources

- Stack contract: `tools/skills/netket/stack.toml`
- Method card: `.knowledge/methods/variational-monte-carlo-neural-quantum-states.md`
- CPU install target: `make install netket`
- GPU install target: `make install netket-gpu`

## Workflow

1. Consult the stack contract and choose CPU, single-node GPU, or multi-node GPU before installing.
2. Smoke-test JAX devices and NetKet import in the same environment where the run will execute.
3. Pin ansatz, sampler, optimizer, learning rate, samples, steps, seeds, and validation observable before compute.
4. Treat energy variance, independent seeds, and exact/small-size comparison as required validation when feasible.

## Common Setup Notes

- GPU smoke tests belong inside a compute allocation, not on a login node.
- Multi-node GPU needs MPI/JAX distributed setup; compose with `/slurm`.
- Do not silently fall back from GPU to CPU; report the setup failure and ask.
