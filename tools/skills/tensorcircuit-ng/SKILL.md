---
name: tensorcircuit-ng
description: Use when choosing or running TensorCircuit-NG for quantum-circuit simulation, differentiable circuits, VQE, JAX backend setup, or TensorCircuit-NG setup failures.
---

# TensorCircuit-NG

Use TensorCircuit-NG for JAX-backed circuit simulation, differentiable circuit workflows, and quantum-circuit-simulation track reproductions.

## Sources

- Stack contract: `tools/skills/tensorcircuit-ng/stack.toml`
- JAX prerequisite: `tools/skills/jax/stack.toml`
- Method card: `.knowledge/methods/quantum-circuit-simulation.md`
- Install target: `make install tensorcircuit-ng`

## Workflow

1. Install and smoke-test JAX first; TensorCircuit-NG depends on the selected JAX backend.
2. Choose CPU or GPU based on the actual run size and cluster availability, then smoke-test in that environment.
3. Pin backend, dtype/precision, circuit depth, batch size, random seeds, and observable before compute.
4. For differentiable runs, record optimizer, gradient path, and JIT/compilation expectations.

## Common Setup Notes

- Long first-run latency can be JAX compilation, not stalled physics.
- GPU availability must be checked with `jax.devices()` inside the runtime allocation.
- Do not substitute another circuit package without recording it as a protocol deviation.
