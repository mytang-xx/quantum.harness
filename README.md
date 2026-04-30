# Quantum Many-Body Physics Harness

Research assistant for quantum many-body physics.

```
> Ground state of 1D Heisenberg, N=20

E/N = -0.4341 via DMRG. Converged, cross-checked with ED ✓.
```

```
> Is kagome Heisenberg a spin liquid?

Strong candidate. No magnetic order (consensus). Gapped Z₂ vs
gapless U(1) debated. Yan-Huse-White 2011, Depenbrock 2012.
```

```
> Hubbard square lattice, U/t=8, half-filled

E/N = -0.5234 via DMRG. Double occupancy ⟨n↑n↓⟩ = 0.038.
Mott regime — charge gap open, strong AFM correlations.
```

## Setup

```bash
make setup && make domain-setup
```

Start a Claude Code session and describe your problem.

## Coverage

**Models** — Heisenberg, transverse-field Ising, J1-J2, Hubbard, t-J, t-V, Anderson impurity, multiorbital Hubbard.

**Methods** — DMRG, ED, TEBD, VMC/NQS (NetKet).

**Physics** — criticality, frustration, spin liquids, Mott transitions, Kondo effect.

Ground-state lattice problems, entry to medium level. Contested cases flagged with literature context.

## For contributors

`AGENTS.md` · `docs/`
