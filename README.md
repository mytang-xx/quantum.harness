# Harnessing Quantum 2026

This repo hosts the **Harnessing Quantum 2026** (智御量子 2026) summer school and an ongoing quantum many-body research harness.

Participants: read the [submission guide](https://giggleliu.github.io/summer-school-2026/zh/guide).

## Tracks

| Abbrev | Method | Background |
|---|---|---|
| `mf` | Mean Field | [`.knowledge/methods/mean-field.md`](.knowledge/methods/mean-field.md) |
| `ed` | Exact Diagonalization | [`.knowledge/methods/ed/METHOD.md`](.knowledge/methods/ed/METHOD.md) |
| `mps` | MPS | [`.knowledge/methods/mps-based-algorithm.md`](.knowledge/methods/mps-based-algorithm.md) |
| `peps` | PEPS | [`.knowledge/methods/peps-based-algorithm.md`](.knowledge/methods/peps-based-algorithm.md) |
| `qmc` | Quantum Monte Carlo | [`.knowledge/methods/quantum-monte-carlo.md`](.knowledge/methods/quantum-monte-carlo.md) |
| `vmc` | Variational Monte Carlo / NQS | [`.knowledge/methods/variational-monte-carlo-neural-quantum-states.md`](.knowledge/methods/variational-monte-carlo-neural-quantum-states.md) |
| `qcs` | Quantum Circuit Simulation | [`.knowledge/methods/quantum-circuit-simulation.md`](.knowledge/methods/quantum-circuit-simulation.md) |

Per-track briefs live under [`tracks/<abbrev>/README.md`](tracks/).

## Harness

Outside the event, this repo is a general QMB research harness.

- Method cards under [`.knowledge/methods/`](.knowledge/methods/).
- Skills under [`tools/skills/`](tools/skills/), managed by [Ion](https://github.com/Roger-luo/Ion).
- Software stack contracts live beside stack skills as `tools/skills/<stack>/stack.toml`.
- Cluster mechanism via `/slurm`; per-cluster defaults under [`tools/cluster/`](tools/cluster/).
- Default stack: Julia (ITensors.jl, ITensorMPS.jl, KrylovKit.jl, MPSKit.jl, PEPSKit.jl, XDiag.jl) and Python (NetKet on JAX, QuSpin, TensorCircuit-NG, quimb).
- Common skills: `/solve` (single calculation), `/reproduce-paper` (paper end-to-end), `/slurm` (ship + submit on cluster).

Open an agent session in the repo and invoke `/onboard` for a first-touch setup.

## Key Skills

Skills are agent-invocable workflows under `tools/skills/`. Invoke them with `/<name>` in a Claude Code session.

### Research Workflow

| Skill | Purpose |
|---|---|
| `/solve` | Run a single QMB calculation — ground state, gap, correlations |
| `/reproduce-paper` | End-to-end reproduction of a paper's figure or main result |
| `/survey` | Survey a research topic via web search, build a focused knowledge base with BibTeX |
| `/download-ref` | Add an arXiv/DOI paper to `.knowledge/` with metadata and rendered markdown |
| `/arxiv-search` | Semantic search over arXiv preprints (physics, math, CS) |

### Computation & Analysis

| Skill | Purpose |
|---|---|
| `/parameter-scan` | Sweep one or more parameters (e.g. `J2/J1`, bond dimension, system size) |
| `/scaling-fit` | Finite-size scaling, data collapse, critical-exponent extraction |
| `/cross-method-check` | Verify a result with an independent method or diagnostic |
| `/scientific-visualization` | Publication-quality figures — journal styles, colorblind-safe palettes, multi-panel layouts |
| `/report` | Render an HTML report for a run (proposal before compute, results after) |

### Stack (Software Libraries)

| Skill | Stack | Language |
|---|---|---|
| `/itensors` | ITensors.jl / ITensorMPS.jl — DMRG, TEBD, MPS | Julia |
| `/pepskit` | PEPSKit.jl / TensorKit.jl — PEPS, CTMRG | Julia |
| `/xdiag` | XDiag.jl — exact diagonalization, Lanczos | Julia |
| `/sse` | StochasticSeriesExpansion.jl / Carlo.jl — sign-free QMC | Julia |
| `/netket` | NetKet — VMC, neural quantum states | Python (JAX) |
| `/quspin` | QuSpin — exact diagonalization | Python |
| `/tensorcircuit-ng` | TensorCircuit-NG — differentiable quantum circuits, VQE | Python (JAX) |
| `/jax` | JAX backend setup for NetKet / TensorCircuit-NG | Python |

### Method Guidance

| Skill | Purpose |
|---|---|
| `/method-ed` | Exact diagonalization route selection; invokes `/xdiag` or `/quspin` |
| `/method-mps` | DMRG / TEBD / MPS route selection; invokes `/itensors` |
| `/method-peps` | PEPS / CTMRG route selection; invokes `/pepskit` |
| `/method-qmc` | Sign-free QMC / SSE route selection; invokes `/sse` |
| `/method-vmc` | VMC / NQS route selection; invokes `/netket` and `/jax` |
| `/method-qcs` | Circuit simulation route selection; invokes `/tensorcircuit-ng` and `/jax` |
| `/method-mf` | Mean-field / SCF route selection; uses the mean-field method card |

### Infrastructure

| Skill | Purpose |
|---|---|
| `/onboard` | First-touch setup and orientation for new users |
| `/setup-julia` | Bootstrap Julia environment with project dependencies |
| `/slurm` | Ship computation to a remote Slurm cluster, monitor jobs, resume failures |
| `/ion-cli` | Skill lifecycle management (create, install, remove, search) |

### Knowledge

| Skill | Purpose |
|---|---|
| `/physics` | Physics background for QMB models and phenomena |
| `/model` | Model definitions (Hamiltonians, lattices, symmetries) |
