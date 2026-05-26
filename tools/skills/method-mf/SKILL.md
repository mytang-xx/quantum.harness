---
name: method-mf
description: Use when a mean-field, Hartree-Fock, self-consistent-field, SCF, Weiss field, or fast baseline reproduction needs method-level route and tool selection.
---

# Method MF

Mean field is the fast approximate-baseline track. Use it to decide whether the target is a paper-stated mean-field reproduction, a baseline for another method, or only an initial-state generator.

## Sources

- Track README: `tracks/mf/README.md`
- Method card: `.knowledge/methods/mean-field.md`

## Route

1. Use mean field for Hartree-Fock, unrestricted Hartree-Fock, Weiss mean field, order-parameter phase diagrams, or initial states for correlated methods.
2. There is no dedicated committed software-stack skill yet. For paper reproduction, first offer official code / web search when the paper uses a named package or repository.
3. If the calculation is a small self-contained SCF baseline, implement it as an explicit local script after proposal approval and record it as `tool = custom-scf`.
4. If the problem becomes impurity DMFT, DFT, neural VMC, or circuit VQE, route to the corresponding track instead of stretching mean field.

## Handoff

Use the method card for SCF convergence, multiple initial conditions, symmetry breaking, and exact small-size comparison. If repeated mean-field work appears, create a dedicated tool skill before treating the stack as standard.
