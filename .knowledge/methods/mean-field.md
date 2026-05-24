# Mean Field

Self-consistent mean-field methods for quantum lattice models. Approximate the many-body problem by replacing interactions with effective single-particle fields determined self-consistently. Serves as a fast baseline and starting point for more accurate methods.

## Scope

Use this card for:

- Hartree-Fock and unrestricted Hartree-Fock for lattice fermion models (Hubbard, t-J).
- Mean-field decoupling of spin models (Weiss mean-field theory).
- Self-consistent field iterations to convergence.
- Phase diagrams and order parameters at the mean-field level.
- Generating initial states or reference configurations for correlated methods (DMRG, VMC, QMC).

Do not use this card for:

- Dynamical mean-field theory (DMFT) — that requires an impurity solver and is a separate method family.
- Density functional theory (DFT) — different formalism and software stack.

## Notation

- `⟨n_i⟩`, `⟨S^z_i⟩`: local expectation values (order parameters) determined self-consistently.
- SCF iteration: one cycle of solving the effective single-particle problem and updating the mean fields.
- Convergence criterion: change in total energy or order parameters between successive iterations.

## Pitfalls

- **Symmetry breaking**: mean-field solutions can spontaneously break symmetries that the exact ground state respects. Compare energies of different symmetry-broken solutions.
- **Overestimation of order**: mean-field typically overestimates ordering tendencies (higher critical temperatures, larger order parameters). Treat as an upper bound on ordering.
- **Missing correlations**: by construction, mean-field misses quantum fluctuations. In 1D, mean-field can predict false phase transitions that do not exist (Mermin-Wagner).
- **Multiple solutions**: SCF can converge to different solutions depending on the initial guess. Scan initial conditions.

## Verification

- **SCF convergence**: energy and order parameters should be stable across final iterations.
- **Comparison to exact results**: for small systems, compare mean-field energy to exact diagonalization. The mean-field energy should be an upper bound.
- **Known limits**: check against analytically solvable limits (e.g., non-interacting, fully polarized).

## Citations

- Ashcroft & Mermin, *Solid State Physics* (1976) — Hartree-Fock for lattice models.
- Auerbach, *Interacting Electrons and Quantum Magnetism* (1994) — mean-field for spin systems.
