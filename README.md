# Quantum Many-Body Physics Harness

Ask a quantum many-body question, get an answer.

```
> Ground state of 1D Heisenberg, N=20

E/N = -0.4341 via DMRG (D=200, converged). Cross-checked with ED ✓.
Script: scripts/heisenberg_chain.jl
```

```
> Is kagome Heisenberg a spin liquid?

Kagome S=1/2 AFM: no magnetic order (consensus). Gapped Z₂ vs gapless U(1) is
actively debated. Key refs: Yan-Huse-White 2011, Depenbrock 2012.
Options: [Run cylinder DMRG] [Pull recent arXiv papers] [Done]
```

## Setup

```bash
make setup && make domain-setup
```

Then describe your problem in a Claude Code session.

## What it covers

**Models** — Heisenberg, transverse-field Ising, J1-J2, Hubbard, t-J, t-V, Anderson impurity, multiorbital Hubbard.

**Methods** — DMRG, ED, TEBD, VMC/NQS (NetKet). Literature pointers for spectral functions and finite-T.

**Physics** — criticality, frustration, spin liquids, Mott transitions, Kondo effect.

Contested cases are flagged honestly. Dynamics and finite-T are future directions.

## Details

See `AGENTS.md` for the design contract, `docs/` for specs and test reports.
