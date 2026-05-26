---
name: jax
description: Use when choosing or setting up JAX as a CPU/GPU backend for NetKet, TensorCircuit-NG, differentiable simulation, or JAX device/setup failures.
---

# JAX

Use JAX as the backend layer for Python simulation stacks such as NetKet and TensorCircuit-NG.

## Sources

- Stack contract: `tools/skills/jax/stack.toml`
- CPU install target: `make install jax EXTRA=cpu`
- Smoke test: `.venv/bin/python -c 'import jax; print(jax.devices())'`

## Workflow

1. Consult `stack.toml` and choose CPU or GPU before installing downstream packages.
2. For GPU, smoke-test inside the same compute allocation that will run the job.
3. Record JAX devices, platform, Python environment, and CUDA extra/module path.
4. Do not silently fall back to CPU when a GPU run was selected.
