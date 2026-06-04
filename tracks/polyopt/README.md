# Polynomial Optimization (moment-SOS / SOHS hierarchy)

Certified-bound track: noncommutative polynomial optimization via the structured
moment-SOHS hierarchy, solved as a semidefinite program. Unlike every other track
here, it returns a **provable lower bound** on the ground-state energy (and on Bell
/ state-polynomial objectives), not an estimate — so it is the natural rigorous
cross-check for a variational upper bound.

- **Method card:** `/method-polyopt` — cross-method routing, certification role, SDP cost heuristic.
- **Software:** `/using-nctssos` — NCTSSoS.jl + Clarabel (`make install nctssos`).
- **Modeling brain:** `/polyopt-guide` (reused upstream, from `exAClior/easy-nctssos`) — problem-type / algebra / formulation / sparsity / GNS. Ground truth on modeling.

## References

1. **NCTSSoS.jl** — the solver. J. Wang et al., [github.com/QuantumSOS/NCTSSoS.jl](https://github.com/QuantumSOS/NCTSSoS.jl). Successor to NCTSSOS.
2. **Moment-SOS / NPA hierarchy** — M. Navascués, S. Pironio, A. Acín, "A convergent hierarchy of semidefinite programs characterizing the set of quantum correlations," *New J. Phys.* **10**, 073013 (2008). [doi:10.1088/1367-2630/10/7/073013](https://doi.org/10.1088/1367-2630/10/7/073013), [arXiv:0803.4290](https://arxiv.org/abs/0803.4290).
3. **NC sparsity (TSSOS family)** — J. Wang, V. Magron, J.-B. Lasserre, "TSSOS: A Moment-SOS Hierarchy That Exploits Term Sparsity," *SIAM J. Optim.* **31**, 30 (2021). [arXiv:1912.08899](https://arxiv.org/abs/1912.08899).
