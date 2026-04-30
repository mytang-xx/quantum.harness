# Harness Content Fill — Design

Date: 2026-04-30
Branch: codex/wheel

## Goal

The harness has 13 problem skills (8 models, 5 physics) and a near-empty `knowledge-base/`. Skills tell the agent *what to consider* but not enough to carry a concrete **ground-state lattice problem at entry/medium level** from intake to a verified result. KB has no data to back verification, conventions, or method-level reference. Two-part fill to make the harness usable: tighten skills into procedural workflows, populate KB with the data and method-level reference they cite.

## Principle

- **Skill** = reusable *problem-level* workflow, decision rules, verification pattern. Parameterized. No hardcoded numbers, no code skeletons, no canonical recipes.
- **KB** = (a) data — reference numbers, citations, conventions, limits, symmetry tables; (b) *method-level* reference — notation, code shape, knobs, pitfalls per method. KB holds everything reusable that isn't a problem skill.
- A skill cites KB for any value, convention, or method-specific shape. Updating KB never breaks a skill.

## Scope of change

### A. Tighten the existing skills — two shapes, both problem/research driven

#### A1. Model skills (`models/*`) — drive calculations

For `transverse-field-ising`, `heisenberg`, `j1-j2`, `t-v`, `hubbard`, `t-j`, `anderson-impurity`, `multiorbital-hubbard`:

- **Diagnose** — questions to fix the problem (lattice, filling, observable, accuracy goal).
- **Workflow** — generic phases: setup → first run → convergence sweep → verification → branch.
- **Method recommendations** — regime → method. No code, no hardcoded knobs. Cites the KB method card.
- **Branch table** — condition → next skill / next method.
- **Verification** — default is limits + internal consistency (convergence, symmetry, finite-size trend) via `knowledge-base/limits.md` and `knowledge-base/symmetry-cheatsheet.md`. Cites `knowledge-base/benchmark-numbers.md#<key>` only when a published reference value exists.

#### A2. Physics skills (`physics/*`) — diagnostic, evidence-driven

For `criticality`, `frustration`, `spin-liquid`, `mott-transition`, `kondo-effect`:

- **Diagnose** — which hypothesis is being evaluated, on which model/regime, with what observables already in hand.
- **Evidence to gather** — observables and indicators relevant to the hypothesis (structure factor, gap behavior, entanglement signatures, …). Cites KB method cards for how to compute each.
- **Cross-checks** — competing explanations to rule out before claiming the hypothesis is supported.
- **Interpretation rules** — what the evidence supports, and what residual uncertainty remains.
- **Model hooks** — pointers back to relevant model skills.

Both shapes are problem/research-driven. No curriculum framing, no learning paths.

### B. Populate `knowledge-base/`

Default library stack: **Julia + ITensors.jl ecosystem** (ITensors.jl, MPSKit.jl, KrylovKit.jl, related packages). Python (quimb) remains available where Julia coverage is thin, but is secondary. Each method card pairs with a Makefile install target so software setup is reproducible.

| File | Holds |
|---|---|
| `conventions.md` | Sign and normalization defaults; common alternatives noted. |
| `benchmark-numbers.md` | Reference E/N, gaps, order parameters, with citations. Tightly-constrained values single-valued; debated values given as a range with notes. |
| `limits.md` | Exact reductions and mappings: U=0 → free fermions, U→∞ + finite holes → t-J, XXZ Δ=1 = Heisenberg, half-filled bipartite Hubbard at U≫t, large-S → semiclassical, J₂=0 → Heisenberg, etc. |
| `symmetry-cheatsheet.md` | Conserved quantities and lattice generators per common lattice (chain, square, triangular, kagome, pyrochlore). |
| `methods/{ed,dmrg,tebd,...}.md` | Notation, canonical code shape (Julia/ITensors), knobs, pitfalls, citations. Each card pairs with a `make install-<env>` target. |
| `2302.04919-variational-benchmarks.md` | Existing paper notes — stays. |

Initial method cards: `ed`, `dmrg`, `tebd` (Julia/ITensors-runnable, ground-state-lattice scope). Others (VMC, AFQMC, DMFT, NRG) added when a skill begins citing them and an install target lands.

Makefile gains install targets for the Julia stack (e.g., `install-julia-base`, `install-itensors-stack`). Specific target naming decided in the implementation plan.

## Behavior under the new structure

User brings a concrete **ground-state lattice** problem at entry/medium level. The matching model skill activates on metadata, diagnoses, recommends a method, fetches code shape from the relevant KB method card, runs in the Julia stack, verifies primarily against limits + internal consistency, optionally against a published benchmark when one exists.

If the user is asking a research-level question ("is this a spin liquid?"), a physics skill activates and drives evidence-gathering and cross-checking rather than a single calculation.

Decisions are surfaced only when there's a real branch (method choice when methods disagree, interpretation when evidence is contested).

## Out of scope

- **Worked-example archive.** Tutorial-shaped, redundant with `benchmark-numbers.md`.
- **Skill template / authoring spec.** Process artifact.
- **Cold-start triage skill.** Skills already activate on metadata.
- **Coverage beyond ground-state lattice problems.** Real-time dynamics (S(q,ω), tDMRG), finite-T (susceptibility, METTS), open systems, topological orders beyond spin liquids — added as new skills when real problems demand them.
- **Python/quimb-first method cards.** Julia/ITensors is the default; Python remains a fallback, not the primary code shape in method cards.
