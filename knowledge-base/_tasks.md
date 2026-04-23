# Standard Tasks for Quantum Many-Body Physics

These are canonical procedures in QMB/tensor network research, identified from the knowledge base and domain research. They serve as candidates for onboarding minimum working examples.

## 1. Exact diagonalization

**Description:** Diagonalize a small spin chain Hamiltonian to get exact ground state and spectrum as a benchmark for tensor network methods.

**Prerequisites:** Linear algebra, second quantization, sparse matrix methods

**Representative input:** Heisenberg XXX chain, L=12–16 sites, S=1/2

**Expected output:** Ground state energy, low-lying spectrum, ground state wavefunction

**Source:** KB: `coleman-2015-intro-many-body-physics.md` (Ch 1–3), `ran-2020-tensor-network-contractions.md` (Ch 1)

## 2. MPS canonical forms

**Description:** Construct a matrix product state and convert between left-canonical, right-canonical, and mixed-canonical forms; verify orthogonality conditions.

**Prerequisites:** Tensor algebra, singular value decomposition

**Representative input:** Random MPS with bond dimension chi=16, L=10 sites

**Expected output:** Left/right/mixed canonical forms; verified orthogonality center; truncation error from SVD

**Source:** KB: `cirac-2021-mps-peps-concepts.md` (Sec II.B), `ran-2020-tensor-network-contractions.md` (Ch 3)

## 3. DMRG ground state

**Description:** Find the ground state of a 1D Heisenberg chain using the density matrix renormalization group (variational MPS optimization).

**Prerequisites:** MPS basics, Hamiltonian as MPO, iterative eigensolvers

**Representative input:** Heisenberg XXX chain, L=100, bond dimension chi=64–256

**Expected output:** Ground state energy matching Bethe ansatz to 4+ digits; converged entanglement spectrum

**Source:** KB: `banuls-2023-tn-algorithms-route-map.md` (Sec II.C.1), `ran-2020-tensor-network-contractions.md` (Ch 4–5)

## 4. TEBD time evolution

**Description:** Simulate quench dynamics of a 1D system using Suzuki-Trotter decomposition and MPS updates (time-evolving block decimation).

**Prerequisites:** MPS, Trotter decomposition, time-dependent observables

**Representative input:** Heisenberg chain, sudden quench from Neel state, chi=128, t_max=20

**Expected output:** Time-dependent magnetization profiles, entanglement growth, light-cone spreading

**Source:** KB: `banuls-2023-tn-algorithms-route-map.md` (Sec II.C.2), `ran-2020-tensor-network-contractions.md` (Ch 5)

## 5. Entanglement entropy

**Description:** Compute von Neumann and Renyi entanglement entropy from an MPS bipartition; verify area-law scaling in ground states.

**Prerequisites:** MPS canonical form, SVD spectrum, information theory

**Representative input:** DMRG ground state of XXX chain, bipartition at center

**Expected output:** S_vN and S_2 values; scaling with subsystem size confirming area law (1D: logarithmic for critical, constant for gapped)

**Source:** KB: `cirac-2021-mps-peps-concepts.md` (Sec II.A — area laws)

## 6. MPO construction

**Description:** Build matrix product operators for local Hamiltonians and observables; apply MPO to MPS.

**Prerequisites:** Tensor indexing, operator algebra, finite-state automaton construction

**Representative input:** Heisenberg model with next-nearest-neighbor coupling as MPO

**Expected output:** Correct MPO bond dimension; verified expectation values against exact diagonalization

**Source:** KB: `cirac-2021-mps-peps-concepts.md` (Sec II.B.2)

## 7. Transfer matrix spectrum

**Description:** Extract correlation length and dominant correlations from the MPS transfer matrix eigenvalue spectrum.

**Prerequisites:** MPS, eigenvalue decomposition, correlation functions

**Representative input:** Infinite MPS ground state of gapped 1D model

**Expected output:** Correlation length xi from second eigenvalue; identification of dominant correlation channel

**Source:** KB: `cirac-2021-mps-peps-concepts.md` (Sec II.B.3)

## 8. TN contraction

**Description:** Contract a 2D tensor network using approximate methods (boundary MPS, corner transfer matrix renormalization group).

**Prerequisites:** TN basics, contraction complexity, boundary methods

**Representative input:** 2D classical Ising partition function on L x L lattice

**Expected output:** Free energy per site matching exact Onsager solution; convergence with boundary bond dimension

**Source:** KB: `ran-2020-tensor-network-contractions.md` (Ch 6–9)

## 9. PEPS variational

**Description:** Construct a projected entangled pair state for a 2D lattice model and optimize it variationally.

**Prerequisites:** MPS mastery, 2D lattice geometry, CTMRG for environment

**Representative input:** 2D Heisenberg model on 4x4 lattice, PEPS bond dimension D=4

**Expected output:** Ground state energy estimate; comparison with QMC benchmarks

**Source:** KB: `cirac-2021-mps-peps-concepts.md` (Sec IV), `banuls-2023-tn-algorithms-route-map.md` (Sec III.A)

## 10. Green's function

**Description:** Compute single-particle Green's function for an interacting system; extract spectral function.

**Prerequisites:** Second quantization, Feynman diagrams, Fourier transforms

**Representative input:** Hubbard model at half-filling, U/t=4

**Expected output:** Spectral function A(k,w) showing Hubbard bands; Mott gap

**Source:** KB: `coleman-2015-intro-many-body-physics.md` (Ch 7–8)

## 11. Mean-field theory

**Description:** Perform Hartree-Fock mean-field calculation for an interacting electron model; identify self-consistent solutions.

**Prerequisites:** Second quantization, self-consistency equations, band theory

**Representative input:** Hubbard model on square lattice, varying U/t

**Expected output:** Self-consistent magnetization; phase boundary between paramagnetic and antiferromagnetic phases

**Source:** KB: `coleman-2015-intro-many-body-physics.md` (Ch 6)

## 12. Symmetry-preserving TN

**Description:** Implement U(1) or SU(2) symmetric tensors to exploit conservation laws in tensor network algorithms, reducing computational cost.

**Prerequisites:** Group theory, representation theory, TN basics

**Representative input:** Heisenberg model with U(1) (Sz conservation) symmetric MPS

**Expected output:** Block-diagonal tensors; speedup vs. non-symmetric DMRG; verified quantum numbers

**Source:** KB: `cirac-2021-mps-peps-concepts.md` (Sec III), `banuls-2023-tn-algorithms-route-map.md` (Sec III.B)
