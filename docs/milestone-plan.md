# Milestone Execution Plan

> Dev-facing execution document. Contract: `docs/MILESTONE.md`.
> Reflective log: `docs/milestone-log.md`.

## Goal

> **Graduate persona + fresh agent harness reproduces all figures and main
> results of the validation paper, demonstrating the power of the harness.**

Three persona styles — Pragmatist, Curious, Skeptical — each drive their own
fresh-harness session. Together they cover the full paper. Genericness is
enforced by the primitives-not-recipes gate on every artifact landed during
the milestone.

## Three phases (Phase 2 ⇄ Phase 3 may iterate)

### Phase 1 — Demand mapping (mostly one-shot)

Read the rendered papers in `knowledge-base/literature/magic/`; enumerate
every primitive the harness must provide so a persona can reach all figs
and main results in one session. Tag each: ✓ exists / ⊙ partial / ✗ new.

Output: a primitive-demand list keyed to each figure and main result, in
`milestone-log.md`.

### Phase 2 — Primitive build

For each ✗ / ⊙ entry, author it as a generic primitive. Two gates apply on
every landing — **both must pass**:

| Gate | Question | On failure |
|---|---|---|
| User-style | Would all 3 personas invoke this artifact equivalently to reach the figure? | Refactor for style-genericness or reject |
| Primitive | Would this artifact compose to handle a non-magic-paper problem? | Refactor into a primitive (decompose, generalize) or reject |

### Phase 3 — Persona validation (the demo)

Three persona × fresh-harness sessions reproduce all figs + main results.

- Pass → milestone done; demo recorded.
- Fail → back to Phase 2 with the specific gap logged to
  `milestone-log.md`.

## Invariants

- Every artifact is a primitive, not a recipe.
- AGENTS.md authoring discipline holds (no proper names, no fixed sizes
  in workflows, method cards per algorithm, multi-stage orchestration in
  method cards).
- Reflective log only appended; promotion to AGENTS.md only at milestone
  close, with evidence.

## Reflection schema (per `milestone-log.md` entry)

- **Source:** which figure / main result (or which validation session).
- **Gap:** what the persona couldn't do with the current harness.
- **Candidate primitive:** the artifact this gap suggests.
- **Gate decision:** pass / fail / refactor for each of the two gates.
- **Action:** land now / queue / reject.

## Subagent roles (assigned per task; each reads the plan first)

| Role | Skill | Why separate |
|---|---|---|
| Demand mapper | (synthesis from rendered papers) | Phase 1 — enumerate required primitives |
| Polisher | `superpowers:brainstorming` + `superpowers:writing-plans` | Phase 2 — author generic artifacts via faithful 2–3-options thinking |
| Persona simulator | profile loaded from `docs/agent-profiles/` | Phase 3 — drive fresh-harness sessions independently |
| Verifier | `superpowers:verification-before-completion` | Independent evidence on every landing |
| Debugger | `superpowers:systematic-debugging` | Dispatched on convergence / divergence failure |

## State checkpoint

| Done | Pending |
|---|---|
| Validation paper + methodology companion ingested under `knowledge-base/literature/magic/` (via existing `download-ref`) | **Phase 1**: demand-mapping pass on the rendered papers |
| MILESTONE.md, milestone-plan.md, milestone-log.md scaffolds in place | **Phase 2**: build the ✗ primitives |
| AGENTS.md edits (audience, ratify-via-recommendation, AskUserQuestion at genuine forks, runtime stability) | **Phase 3**: persona × fresh-harness validation |
| Existing primitives surveyed (download-ref, model/physics skills, runtime tools) | Persona profiles via `agentic-tests:create-profile` under `docs/agent-profiles/` |

## Termination criterion

`agentic-tests:test-feature` passes for all 3 personas, each driving a
fresh-harness session through the full set of figures and main results,
both gates satisfied for every artifact landed during the milestone.

## Initial primitive-candidate inventory

Status legend: ✓ exists, ⊙ partial (referenced informally; not a named
primitive), ✗ new. Phase 1 will refine; phase 2 will land the gaps.

*Already-existing primitives (use, don't re-author):*
- ✓ `download-ref` — paper ingestion to `knowledge-base/literature/<method>/`.
- ✓ `arxiv-search`, `jupyter-notebook`, `sympy`, `scientific-visualization`,
  `scientific-writing`, `latex-paper-en`, `julia`.
- ✓ Model skills (`transverse-field-ising`, `heisenberg`, …) and physics
  skills (`criticality`, `frustration`, `spin-liquid`, `mott-transition`,
  `kondo-effect`).

*Problem-solving primitives (no physics content):*
- ✗ `/finite-size-scan`, `/parameter-scan`, `/scaling-fit`,
  `/cross-method-check`, `/slurm-grid`, `/run-stage`, `/run-report`.
- ⊙ `/verify-convergence` — AGENTS.md "Verification practice" §3 names
  the pattern; not yet a primitive skill.

*Physics primitives (topic-typed, instance-generic):*
- ✗ `physics/magic` skill (any magic question on any model).
- ✗ `methods/pauli-mps.md`, `methods/pauli-markov.md`.
- ✗ `magic-conventions.md`, `magic-benchmarks.md`.

*Anti-patterns (auto-reject):*
- Workflows tied to one instance (paper / model / specific parameter /
  single observable).
- Method cards that bundle two algorithms.
- Skills that name authors or papers in their workflow text.

## Next action

**Phase 1 — Demand mapping.** Dispatch a subagent (Demand mapper) to read
both rendered papers in `knowledge-base/literature/magic/` and produce a
primitive-demand list keyed to each figure and main result, appended to
`milestone-log.md`. Phase 2 starts from that list.
