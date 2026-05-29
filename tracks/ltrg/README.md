# LTRG (Linearized Tensor Renormalization Group)

## Reproduction target

Li, Ran, Gong, Zhao, Xi, Ye, Su, "Linearized Tensor Renormalization Group Algorithm for the Calculation of Thermodynamic Properties of Quantum Lattice Models," *Physical Review Letters* **106**, 127202 (2011), [doi:10.1103/PhysRevLett.106.127202](https://doi.org/10.1103/PhysRevLett.106.127202), [arXiv:1011.0155](https://arxiv.org/abs/1011.0155).

The paper that introduces the LTRG algorithm. It maps a `d`-dimensional quantum lattice model to a `(d+1)`-dimensional classical tensor network by Trotter-Suzuki decomposition, then decimates it iTEBD-style with SVD truncation to bond dimension `Dc` — a sign-problem-free route to finite-temperature thermodynamics (free energy, internal energy, specific heat, susceptibility) in 1D and 2D. The method is benchmarked on the exactly-solvable 1D quantum XY chain (precision comparable to TMRG) and the 2D Heisenberg antiferromagnet on a honeycomb lattice (demonstrating scalability). Which results to reproduce is decided interactively when the track is started.

## References

1. **LTRG** — the reproduction target above; the original algorithm and its XY-chain / honeycomb benchmarks.
   W. Li, S.-J. Ran, S.-S. Gong, Y. Zhao, B. Xi, F. Ye, G. Su, *Physical Review Letters* **106**, 127202 (2011). [doi:10.1103/PhysRevLett.106.127202](https://doi.org/10.1103/PhysRevLett.106.127202), [arXiv:1011.0155](https://arxiv.org/abs/1011.0155).
