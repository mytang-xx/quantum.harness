# Missing Pieces for Quantum Many-Body Physics

Skills and tools this research needs, for which no suitable open-source option was found. These are candidates for local skills (in `tools/skills/`), CLI scripts (`tools/cli/`), or MCP servers (`tools/mcp/`).

## Missing skills

| Wanted skill | What it should do | Why it's needed | Nearest existing alternative |
|--------------|-------------------|-----------------|------------------------------|
| TN diagram editor | Draw and manipulate tensor network diagrams (MPS, PEPS, MPO, MERA) as graphical objects; export to TikZ/SVG | TN diagrams are the primary visual language of the field | `scientific-visualization` (generic plots, not TN diagrams) |
| ITensors/TensorKit skill | API reference and code generation for ITensors.jl or TensorKit.jl | These are the two most important Julia TN libraries; no Ion skill exists | `julia` skill (generic Julia, not TN-specific) |
| Hamiltonian builder | Construct many-body Hamiltonians from symbolic specs (Heisenberg, Hubbard, t-J, etc.) in library-specific formats | Core QMB workflow: specifying models before running DMRG/TEBD | `sympy` (generic symbolic math) |
| TN contraction optimizer | Analyze contraction order of a tensor network, estimate cost, suggest optimal paths | Contraction order is the main computational bottleneck | `cotengra` (library, not skill) |
| Entanglement/observables analyzer | Compute and visualize entanglement entropy, correlation functions, order parameters from MPS/PEPS data | Standard post-processing after every TN simulation | `scientific-visualization` (no domain knowledge of entanglement) |
| QMB benchmark suite | Run standard benchmark problems across TN libraries and compare results | Validating implementations and comparing library performance | None |

## Missing tools

| Wanted tool | What it should do | Why it's needed | Nearest existing alternative |
|-------------|-------------------|-----------------|------------------------------|
| TN diagram editor (standalone) | WYSIWYG editor for arbitrary TN topologies with export to TikZ/SVG/PDF | No single tool covers interactive editing + publication export for general TN | mptikz (1D only), DisCoPy (programmatic, not WYSIWYG) |
| TN benchmark/regression framework | Track bond dimension scaling, entanglement convergence, wall-clock time across runs | Systematic benchmarking of numerical convergence | Generic CI/testing tools |
| HPC parameter sweep manager | Submit DMRG jobs across bond dimensions/system sizes, collect results | Common workflow: scan chi, L, model parameters on cluster | SLURM skill (single job, not sweep) |
