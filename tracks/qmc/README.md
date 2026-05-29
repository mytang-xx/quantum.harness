# Quantum Monte Carlo

## Reproduction target

Nguyen, Shi, Xu, Zhang, "CPMC-Lab: A Matlab package for Constrained Path Monte Carlo calculations," *Computer Physics Communications* **185**, 3344 (2014), [doi:10.1016/j.cpc.2014.08.003](https://doi.org/10.1016/j.cpc.2014.08.003), [arXiv:1407.7967](https://arxiv.org/abs/1407.7967).

The official MATLAB constrained-path QMC (CPMC) package for the single-band repulsive Hubbard model; the paper documents the CPQMC algorithm in detail. Reproduce:

1. **Fig. 1** — the sign problem: free-projection energy fluctuations grow with imaginary time while the constrained-path energy stays stable and converges (4×4, U/t = 4).
2. **Fig. 4** — CPMC total / kinetic / potential energy vs interaction strength U for a 16-site ring (5↑, 7↓), benchmarked against exact diagonalization.
3. **Fig. 5** — ground-state energy per site vs inverse lattice size for the half-filled 1D Hubbard model (U/t = 4), PBC vs twist-averaged, extrapolated to the thermodynamic limit.

(Figs. 6–7 — spin and charge gaps vs inverse size — extend the same finite-size-scaling computation.)

## References

1. **Zhang (2019)** — survey / main reference: AFQMC formalism (ground-state projection and finite-T grand-canonical), the sign/phase problem, the constrained-path and phaseless approximations.
   S. Zhang, "Auxiliary-Field Quantum Monte Carlo at Zero- and Finite-Temperature," in *Many-Body Methods for Real Materials*, eds. E. Pavarini, E. Koch, S. Zhang, Modeling and Simulation Vol. 9 (Forschungszentrum Jülich, 2019), ISBN 978-3-95806-400-3. [manuscript](https://www.cond-mat.de/events/correl19/manuscripts/zhang.pdf).
2. **CPMC-Lab** — the reproduction target above; detailed CPMC algorithm + MATLAB implementation.
   H. Nguyen, H. Shi, J. Xu, S. Zhang, *Computer Physics Communications* **185**, 3344 (2014). [doi:10.1016/j.cpc.2014.08.003](https://doi.org/10.1016/j.cpc.2014.08.003), [arXiv:1407.7967](https://arxiv.org/abs/1407.7967).
3. **Sandvik (2010)** — stochastic series expansion (SSE) methodology for sign-free spin/boson lattices.
   A. W. Sandvik, "Computational Studies of Quantum Spin Systems," *AIP Conf. Proc.* **1297**, 135 (2010). [doi:10.1063/1.3518900](https://doi.org/10.1063/1.3518900), [arXiv:1101.3281](https://arxiv.org/abs/1101.3281).
4. **Becca & Sorella (2017)** — textbook on QMC for correlated systems.
   F. Becca and S. Sorella, *Quantum Monte Carlo Approaches for Correlated Systems* (Cambridge University Press, 2017). [doi:10.1017/9781316417041](https://doi.org/10.1017/9781316417041).
