# Milestone — Generic Reproduction Validation

> Dev-facing scaffolding for polishing the harness. Not auto-loaded into
> user-facing sessions. The harness itself (skills, KB, AGENTS.md) is for
> fresh graduates; this file is for the developers polishing it.

## Goal

Polish the harness into a generic problem-solving instrument — composed of
*primitives, not recipes* — such that three diverse user personas can each
drive their own fresh-harness session through the figures of a representative
high-impact QMB paper, without persona-specific tuning.

## Validation rubric

The milestone passes when all of the following hold:

1. **Three persona × fresh-harness sessions** each reproduce their relevant
   figures from the validation paper (together: full figure set covered).
2. Each session satisfies AGENTS.md interaction patterns: act-first on clear
   defaults; `AskUserQuestion` only at genuine forks; reports embed reasoning
   (method + why + verification); pre-action questions bounded.
3. The persona is never asked something they couldn't reasonably answer.
4. **Genericness requirement (primitives, not recipes):** every harness
   artifact added during the milestone is a *primitive* — composes naturally
   to handle problems beyond the validation paper. Recipes (workflow
   hardcoded to a specific paper, model, observable, or parameter point) are
   rejected and refactored. Examples:
   - ✓ `/finite-size-scan`, `physics/magic`, `methods/pauli-mps.md`
   - ✗ `/1d-tfim-critical-scaling`, `/reproduce-fig2`, `methods/sre-tfim.md`

## Validation problem

**Tarabunga, Tirrito, Chanda, Dalmonte — *Many-Body Magic via Pauli-Markov
Chains: From Criticality to Gauge Theories*.** PRX Quantum 4, 040317 (2023).
Methodology companion: Tarabunga, Tirrito, Bañuls, Dalmonte —
*Nonstabilizerness via Matrix Product States in the Pauli Basis*. PRL 133,
010601 (2024).

Why this paper: ground-state scope (no harness-scope expansion); heterogeneous
multi-stage pipeline (DMRG → Pauli-Markov sampling → finite-size scaling);
embarrassingly-parallel `(L, parameter)` grid for a slurm demo;
multi-universality coverage (1D Ising / Potts / Gaussian + 2D Z₂ gauge);
ITensors.jl stack matches the harness.

## Validation personas

Three personas, all in the entry-to-medium grad band, varying by *style*
not skill ceiling. Together they span the AGENTS.md "user controls" range
from full-ratification through dialogic to override-and-verify.

| Persona | Style | What stresses the harness |
|---|---|---|
| Pragmatist | "Just give me the result." Minimal back-and-forth; ratifies defaults silently. | Defaults must be sane on first try; the silent-pick path must work |
| Curious | "Walk me through and explain." Reads reports carefully; asks follow-ups; explores. | Reports must teach (embedded reasoning); option pros / cons substantive |
| Skeptical | "Are you sure? Cross-check that." Questions defaults; wants verification at every step. | Verification list runs smoothly; cross-method checks available; AGENTS.md pushback handling calibrated |

## Out of scope

- General CC harness rules (those live in `AGENTS.md`).
- Paper-specific scripts, hardcoded recipes, or author-named artifacts.
- Framework changes unrelated to the validation problem.
- Runtime evolution of the harness in response to user friction. The harness
  is fixed at runtime; only the persona learns, via judgment-transfer from
  reports.

## Other candidates considered

- Krylov / spread complexity quench (PRB 109, 014312; PRB 111, 165106) —
  dynamics; would expand harness scope.
- Deep thermalization / projected ensemble (PRX 14, 041051) — dynamics;
  would expand harness scope.

## Authoring discipline (this milestone)

- No proper names (authors, paper years) in skill or KB workflow text. Cite
  via `knowledge-base/literature/<method>/`; refer to a paper by what it
  provides (a benchmark, a method card), not by who wrote it.
- No fixed sizes, parameters, or specific models in physics-skill workflows —
  those are runtime choices the user's prompt determines.
- Method cards per algorithm, not per topic.
- Multi-stage orchestration lives in method cards, not skills. The skill
  says *what* to compute; the method card says *how*, in stages; slurm / CI
  follows the card's stage list.
- **Primitives, not recipes**: any candidate artifact must compose for
  problems beyond the validation paper, or it gets refactored / rejected.

## Open decisions

1. Persona profiles formalized via `agentic-tests:create-profile` and saved
   to `docs/agent-profiles/`?
2. Do we exercise the primitive gate mid-milestone by sanity-running each
   landed artifact on a non-magic-paper problem, or trust the gate without
   exercising it?

## Execution plan

The execution loop, slice queue, polish gates, subagent roles, and stop
conditions live in `docs/milestone-plan.md`. This file is the contract;
that file is the loop we run.

## Reflective log

Friction observations during the milestone accumulate in
`docs/milestone-log.md`. Promotion of durable lessons to `AGENTS.md`
happens at milestone close, with evidence rather than impression.
