---
name: quspin
description: Use when choosing or running QuSpin as the Python fallback for exact diagonalization, spin-chain ED examples, or QuSpin setup failures.
---

# QuSpin

Use QuSpin only as the declared Python fallback for ED workflows, especially when an existing QuSpin example matches the target model.

## Sources

- Stack contract: `tools/skills/quspin/stack.toml`
- Method card: `.knowledge/methods/ed/METHOD.md`
- Install target: `make install quspin`
- Smoke test: `.venv/bin/python -c 'import quspin; print(quspin.__version__)'`

## Workflow

1. Prefer `/xdiag` unless the protocol or method card declares QuSpin as the fallback.
2. Confirm basis, symmetries, boundary, and operator conventions before code.
3. Record whether the run is full-spectrum, sparse, or selected-state ED.
4. Do not replace QuSpin with generic NumPy/SciPy ED unless the protocol records that deviation.
