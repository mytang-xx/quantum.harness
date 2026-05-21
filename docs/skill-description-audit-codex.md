# Skill description audit — Codex (independent reviewer)

## Standards applied

- Description must be third-person and describe only when to use the skill, not what the skill does.
- Description must start with `Use when...` and focus on triggering conditions, symptoms, and situations.
- Description must never summarize the skill's process or workflow.
- Description must use concrete triggers: user phrasing, error messages, symptom strings, and synonyms.
- Description must be technology-agnostic unless the skill itself is technology-specific.
- Dispatcher must be able to make a fast routing decision from the description alone, without reading `SKILL.md`.

## Routing-decision test

- `cross-method-check`: A dispatcher seeing only the description would correctly route "I need to check my DMRG result with TEBD at the same parameters." Failure mode: the description also teaches a mini-procedure and cites AGENTS.md rule §5, which is not a trigger.
- `download-ref`: A dispatcher would correctly route "Pull arXiv 1008.3477 into the DMRG references." Failure mode: the storage/output sentence is workflow/output detail, not routing detail.
- `memorize`: A dispatcher would probably route "/memorize the caption misread and cluster queue issue from this session," but the current description does not start with `Use when` and mixes trigger, process, target files, and motivational prose.
- `model`: A dispatcher would correctly route "Solve the Hubbard model at U/t = 8 on a square lattice." Failure mode: the description embeds execution instructions (`read`, `grep`, `verdict`) that belong in the body, not routing frontmatter.
- `onboard`: A dispatcher would correctly route "I'm new here, where do I start?" Failure mode: the second sentence summarizes setup/routing workflow.
- `parameter-scan`: A dispatcher would correctly route "Run a bond dimension sweep from chi=50 to chi=400." Failure mode: the description includes implementation/composition notes rather than only trigger language.
- `physics`: A dispatcher would correctly route "Is this a spin liquid?" Failure mode: "rather than naming a specific model" can create a false negative for mixed prompts like "Is the J1-J2 model a spin liquid?", and the description embeds card-read/tacit-grep workflow.
- `report`: A dispatcher would correctly route "Make the plan doc so I can ratify before compute." Failure mode: it starts with `Use after`, not `Use when`, and describes rendering stages rather than only user/runtime triggers.
- `reproduce-paper`: A dispatcher would correctly route "Can you reproduce Fig. 3 from arXiv:2302.04919?" Failure mode: the second sentence summarizes the orchestration workflow.
- `scaling-fit`: A dispatcher would correctly route "Fit a finite-size scaling collapse and extract the exponent from this L-dependent table." Failure mode: the "Generic over..." sentence is not a trigger.
- `setup-julia`: A dispatcher would correctly route "The cluster says `julia: command not found`." Failure mode: composition notes with `/slurm` and `make install julia` are not routing triggers.
- `slurm`: A dispatcher would correctly route "Submit this parameter grid as a Slurm array job and fetch the results." Failure mode: the description is partly a workflow summary (`ship`, `submit`, `monitor`, `fetch`) rather than symptom-first trigger language.
- `solve`: A dispatcher would correctly route "Find the ground state energy of the Heisenberg chain at N=20." Failure mode: the workflow loop summary can be followed as a procedure and the phrase "concrete quantum many-body problem" is broad enough to overlap with `/reproduce-paper`.
- `verify`: A dispatcher would correctly route "Audit this protocol.toml against the paper." Failure mode: it starts with `Use after`, not `Use when`, and "important artifact" is broad enough to over-trigger on ordinary code review unless the artifact examples are retained.

## Findings table

| Skill | Verdict (pass/warn/fail) | Routing-test result | Primary issue |
|---|---|---|---|
| cross-method-check | warn | Correct route; minor procedure bleed | Workflow/composition phrases after an otherwise good trigger |
| download-ref | warn | Correct route | Output/storage summary in frontmatter |
| memorize | fail | Probably routes explicit `/memorize`; weak otherwise | Does not start with `Use when`; workflow and motivational prose |
| model | fail | Routes supported model names well | Starts with `MUST invoke`; embeds body instructions |
| onboard | warn | Correct route | Setup/routing workflow summary |
| parameter-scan | warn | Correct route | Generic/composition notes are not triggers |
| physics | fail | Routes pure phenomenon prompts; mixed model+phenomenon risk | Starts with `MUST invoke`; embeds body instructions; false-negative wording |
| report | fail | Routes stated report prompts | Starts with `Use after`; rendering-stage summary |
| reproduce-paper | warn | Correct route | Orchestration workflow summary |
| scaling-fit | warn | Correct route | Non-trigger genericity sentence |
| setup-julia | warn | Correct route | Composition notes and setup action phrasing |
| slurm | warn | Correct route | Mechanism workflow summary |
| solve | warn | Correct route for single problems; overlaps paper reproduction | Interactive loop summary |
| verify | fail | Correct route for audit artifacts | Starts with `Use after`; broad "important artifact" trigger |

## Per-skill detail

### cross-method-check

- **Current description.**

> Use when the user wants to confirm a result by re-running with an independent method (or independent diagnostic) at matched parameters and comparing. Generic over the methods and the observable. Implements AGENTS.md verification rule §5.

- **Routing test.** Prompt: "I need to check my DMRG result with TEBD at the same parameters." The dispatcher would correctly route to `cross-method-check`.
- **Verdict.** warn.
- **Violations.** `by re-running with an independent method (or independent diagnostic) at matched parameters and comparing` violates rules 1 and 3 by describing workflow shape. `Generic over the methods and the observable` violates rule 1 because it is scope metadata, not a trigger. `Implements AGENTS.md verification rule §5` violates rules 1 and 6 because an internal rule reference does not help route from user prose.
- **Proposed rewrite.** Use when the user asks to verify, cross-check, sanity-check, or independently confirm a result with another method or diagnostic, especially prompts like "check my DMRG with ED/TEBD", "does a different method agree?", "is this result biased?", or "can we confirm this observable another way?".

### download-ref

- **Current description.**

> Use when adding arXiv IDs, DOIs, or bibliography stubs to this quantum many-body harness. Stores rendered markdown under knowledge-base/literature/<method>/ and keeps raw PDFs, metadata, and extracted figures gitignored inside each method folder.

- **Routing test.** Prompt: "Pull arXiv 1008.3477 into the DMRG references." The dispatcher would correctly route to `download-ref`.
- **Verdict.** warn.
- **Violations.** `Stores rendered markdown under knowledge-base/literature/<method>/ and keeps raw PDFs, metadata, and extracted figures gitignored inside each method folder` violates rules 1 and 3 because it summarizes output/storage behavior rather than when to invoke the skill.
- **Proposed rewrite.** Use when the user asks to download, add, render, index, or stub a reference for the harness by arXiv ID, DOI, local PDF, book citation, bibliography stub, or phrases like "pull this paper into the DMRG references".

### memorize

- **Current description.**

> User-invoked at session end. Walk back through the session, distill the lessons that actually surfaced (user pushback, wasted compute, stack failures, caption misreads), and write them as TACITS.toml entries or AGENTS.md invariants so the harness remembers next time. The discipline that turns one wasted hour into a paragraph that saves the next hundred sessions.

- **Routing test.** Prompt: "/memorize the failed cluster launch and caption-misread lesson from this session." The dispatcher would likely route correctly because `/memorize` is explicit, but the description alone is weak for non-command phrasing.
- **Verdict.** fail.
- **Violations.** `User-invoked at session end` violates rule 2 because it does not start with `Use when`. `Walk back through the session, distill the lessons... and write them as TACITS.toml entries or AGENTS.md invariants` violates rules 1 and 3 by summarizing workflow and outputs. `The discipline that turns one wasted hour into a paragraph that saves the next hundred sessions` violates rules 1 and 6 because it is motivational prose, not a routing trigger.
- **Proposed rewrite.** Use when the user explicitly invokes `/memorize` or asks at session end to capture lessons from user pushback, wasted compute, stack failures, caption misreads, queue issues, repeated retries, or "we should remember this next time".

### model

- **Current description.**

> MUST invoke when user wants to solve, investigate, or reproduce any
> harness-tracked quantum lattice model. Supported (match user prose to one):
> - transverse-field-ising (TFIM): quantum-critical Ising chain / 2D Wilson-Fisher
> - heisenberg: SU(2) magnet, AFM or FM by sign of J
> - j1-j2: frustrated Heisenberg, J2/J1≈0.5 spin-liquid candidate
> - t-v: spinless fermions + NN repulsion (CDW vs Luttinger)
> - hubbard: t-U electrons; Mott transition, cuprate parent
> - t-j: strong-coupling Hubbard with no-double-occupancy
> - anderson-impurity (SIAM): impurity-in-bath, Kondo
> - multiorbital-hubbard: multi-band + Hund's J
> - spin-1-xxz: Haldane phase, AKLT
> - potts-clock: q-state, first-order / continuous / BKT by q
> For EVERY matched model, read knowledge-base/models/<name>/MODEL.md AND
> grep ^signal in knowledge-base/models/<name>/TACITS.toml before issuing
> any verdict. Do this for each model you touch, not just the first one
> matched in the session.

- **Routing test.** Prompt: "Solve the Hubbard model at U/t=8 and half filling." The dispatcher would correctly route to `model`.
- **Verdict.** fail.
- **Violations.** `MUST invoke when` violates rule 2 because the description must start with `Use when`. `For EVERY matched model, read knowledge-base/models/<name>/MODEL.md AND grep ^signal...` violates rules 1 and 3 by embedding execution workflow in the description. `before issuing any verdict` also violates rule 1 because it is behavioral instruction, not a trigger.
- **Proposed rewrite.** Use when the user asks to solve, investigate, benchmark, or reproduce a harness-tracked quantum lattice model, including TFIM/transverse-field Ising, Heisenberg, J1-J2, spinless t-V, Hubbard, t-J, Anderson impurity/SIAM/Kondo impurity, multiorbital Hubbard, spin-1 XXZ/Haldane/AKLT, or Potts/clock models.

### onboard

- **Current description.**

> Use when the user is new to the harness, asks "where do I start", or opens with an unclear / empty problem. Sets up domain software, optionally configures the user's compute cluster, and routes to `/model` or `/physics`.

- **Routing test.** Prompt: "I'm new here; where do I start?" The dispatcher would correctly route to `onboard`.
- **Verdict.** warn.
- **Violations.** `Sets up domain software, optionally configures the user's compute cluster, and routes to /model or /physics` violates rules 1 and 3 because it summarizes workflow and routing actions rather than trigger conditions.
- **Proposed rewrite.** Use when the user is new to the harness, asks "where do I start", "how do I use this", invokes `/onboard`, opens with an unclear or empty problem, or appears to be in a first session without a configured harness environment.

### parameter-scan

- **Current description.**

> Use when the user wants to sweep one or more declared axes for a produced quantity. Generic over axes, payload schema, quantity, and implementation. For cluster execution composes with `/slurm`.

- **Routing test.** Prompt: "Run a bond dimension sweep from chi=50 to chi=400." The dispatcher would correctly route to `parameter-scan`.
- **Verdict.** warn.
- **Violations.** `Generic over axes, payload schema, quantity, and implementation` violates rule 1 because it is scope metadata, not a user-facing trigger. `For cluster execution composes with /slurm` violates rules 1 and 3 because it is composition workflow.
- **Proposed rewrite.** Use when the user asks to sweep, scan, vary, grid, or plot dependence on one or more parameters for an already-defined quantity, including prompts like "bond-dimension sweep", "scan U/t", "vary L and J2/J1", "two-axis grid", or "how does this observable depend on X?".

### physics

- **Current description.**

> MUST invoke when user asks a cross-model physics question (mechanism,
> phase identification, diagnostic) rather than naming a specific model.
> Supported topics:
> - criticality: second-order transitions, exponents, finite-size scaling
> - frustration: geometric or exchange-induced frustration
> - spin-liquid: fractionalized phases, topological order, RVB
> - mott-transition: interaction-driven metal-insulator
> - kondo-effect: local-moment screening
> - magic: non-stabilizerness, SRE, long-range magic
> - confinement: gauge-theory confinement diagnostics
> For EVERY matched topic, read knowledge-base/physics/<topic>/PHYSICS.md
> AND grep ^signal in knowledge-base/physics/<topic>/TACITS.toml before
> issuing any verdict on phase, mechanism, or diagnostic. Each verdict
> requires its own card-read + tacit-grep, not a single per-session pass.

- **Routing test.** Prompt: "Is this a spin liquid?" The dispatcher would correctly route to `physics`. Prompt: "Is the J1-J2 model near J2/J1=0.5 a spin liquid?" risks a false negative because the description says "rather than naming a specific model" even though the body says diagnostic questions should fire.
- **Verdict.** fail.
- **Violations.** `MUST invoke when` violates rule 2 because the description must start with `Use when`. `rather than naming a specific model` violates rule 6 by weakening routing for mixed model+physics prompts. `For EVERY matched topic, read knowledge-base/physics/<topic>/PHYSICS.md AND grep ^signal...` violates rules 1 and 3 by embedding workflow.
- **Proposed rewrite.** Use when the user asks a phase, mechanism, or diagnostic question across or within models, including criticality/exponents/finite-size scaling, frustration, spin liquid, Mott transition, Kondo screening, magic/non-stabilizerness/SRE, long-range magic, confinement, or prompts like "what phase is this?", "is this a spin liquid?", or "which diagnostic should I trust?".

### report

- **Current description.**

> Use after a /reproduce-paper run's `close` gate passes to render the shareable HTML deliverable. Also used at the `plan` gate to render a draft (Problem + Methodology) for the user to ratify before heavy compute. Triggers on "render report", "publish reproduction", "share results", "make the plan doc", "ratify before run".

- **Routing test.** Prompt: "Make the plan doc so I can ratify before run." The dispatcher would correctly route to `report`.
- **Verdict.** fail.
- **Violations.** `Use after` violates rule 2 because the description must start with `Use when`. `render the shareable HTML deliverable` and `render a draft (Problem + Methodology)` violate rules 1 and 3 by summarizing outputs/stages. The trigger phrase list is useful, but it is appended after workflow-stage language.
- **Proposed rewrite.** Use when a reproduction is ready for plan ratification or post-close sharing, or when the user says "render report", "publish reproduction", "share results", "make the plan doc", "ratify before run", or "make the HTML report".

### reproduce-paper

- **Current description.**

> Use when the user wants to reproduce the figures and main results of a published paper end-to-end. Plans the multi-figure sequence, composes the harness primitives, and closes with a declared entry plus run report. Generic over papers.

- **Routing test.** Prompt: "Can you help me reproduce Fig. 3 from arXiv:2302.04919?" The dispatcher would correctly route to `reproduce-paper`.
- **Verdict.** warn.
- **Violations.** `Plans the multi-figure sequence, composes the harness primitives, and closes with a declared entry plus run report` violates rules 1 and 3 by summarizing workflow. `Generic over papers` violates rule 1 because it is scope metadata, not a trigger.
- **Proposed rewrite.** Use when the user asks to reproduce, redo, replicate, validate, or follow a published paper end-to-end, especially figures or main results from an arXiv ID, DOI, PDF, paper title, supplement, or official-code reproduction request.

### scaling-fit

- **Current description.**

> Use when the user has a size-indexed (and optionally parameter-indexed) data set and wants to fit a finite-size scaling form — power law, log, polynomial, or universal data-collapse — and extract exponents with uncertainty. Generic over the observable and the form.

- **Routing test.** Prompt: "Fit a finite-size scaling collapse and extract nu from this L-dependent table." The dispatcher would correctly route to `scaling-fit`.
- **Verdict.** warn.
- **Violations.** `Generic over the observable and the form` violates rule 1 because it is scope metadata rather than a trigger. The first sentence is mostly compliant because it describes the user's requested situation, not the internal workflow.
- **Proposed rewrite.** Use when the user has L-indexed or size-indexed data and asks for finite-size scaling, thermodynamic extrapolation, power-law/log/polynomial fits, data collapse, critical exponent extraction, bootstrap uncertainty, or prompts like "fit versus L", "extract nu", or "collapse these curves".

### setup-julia

- **Current description.**

> Use when a workflow needs Julia installed and configured — fresh laptop, fresh cluster account, package-mirror change, or Julia-version bump. Generic over target (local laptop or remote cluster via ssh) and over region (mirror auto-defaulted from cluster profile's `region` field). Pairs with `/slurm` (cluster Julia setup) and with `make install julia` (local).

- **Routing test.** Prompt: "The cluster says `julia: command not found` and the Julia env is not instantiated." The dispatcher would correctly route to `setup-julia`.
- **Verdict.** warn.
- **Violations.** `Generic over target...` violates rule 1 because it is implementation scope metadata. `Pairs with /slurm... and with make install julia` violates rules 1 and 3 because it is composition workflow. `workflow needs Julia installed and configured` is acceptable only because this skill is Julia-specific; the concrete trigger list carries the routing value.
- **Proposed rewrite.** Use when Julia is missing, wrong-version, uninstantiated, or mirror-misconfigured on a local laptop or remote cluster, including symptoms like `julia: command not found`, missing `julia-env`, package downloads timing out, fresh cluster account, fresh laptop, or Julia version bump.

### slurm

- **Current description.**

> Use when the agent needs to ship code, submit a Slurm job (single or array), monitor it, and fetch results — all from the local laptop via Bash + ssh + rsync. Generic over what is submitted; reads cluster specifics from `tools/cluster/<active>.md`. Pure mechanism — for parameter sweeps compose with `/parameter-scan`.

- **Routing test.** Prompt: "Submit this grid as a Slurm array job, monitor it, and fetch the results." The dispatcher would correctly route to `slurm`.
- **Verdict.** warn.
- **Violations.** `ship code, submit a Slurm job (single or array), monitor it, and fetch results` violates rule 3 by summarizing the mechanism workflow, although those verbs also map to user triggers. `all from the local laptop via Bash + ssh + rsync`, `reads cluster specifics...`, and `for parameter sweeps compose with /parameter-scan` violate rules 1 and 3 because they are implementation/composition detail.
- **Proposed rewrite.** Use when a computation needs remote Slurm cluster resources, an sbatch single job or array, job status monitoring, log tailing, cancellation, result fetch, or resume of failed/missing cluster cells, including prompts like "submit to Slurm", "run this on the cluster", "check the queue", or "resubmit failed cells".

### solve

- **Current description.**

> Use when the user brings a concrete quantum many-body problem to solve. Drives the interactive problem-solving loop: intake → act → report → next-steps → loop until done.

- **Routing test.** Prompt: "Find the ground-state energy of the Heisenberg chain at N=20." The dispatcher would correctly route to `solve`.
- **Verdict.** warn.
- **Violations.** `Drives the interactive problem-solving loop: intake → act → report → next-steps → loop until done` violates rules 1 and 3 by summarizing workflow. `concrete quantum many-body problem` is a useful high-level trigger but too broad under rule 4; it can overlap with paper reproduction or standalone verification prompts.
- **Proposed rewrite.** Use when the user brings a concrete quantum many-body research problem, names a model, parameter point, observable, phase question, or ground-state calculation, or starts a new in-scope problem mid-session with prompts like "solve Heisenberg N=20", "compute the gap", "is this phase ordered?", or "Hubbard at U/t=8".

### verify

- **Current description.**

> Use after writing or modifying an important artifact (protocol TOML, run plan, reproduction script, computed result, final run report, KB card) or when a reproduction gate fails and needs independent mismatch triage.

- **Routing test.** Prompt: "Audit this protocol.toml against the paper before we run compute." The dispatcher would correctly route to `verify`.
- **Verdict.** fail.
- **Violations.** `Use after` violates rule 2 because the description must start with `Use when`. `important artifact` is abstract under rule 4 unless anchored by the examples. The rest of the sentence is trigger-oriented and does not summarize the workflow.
- **Proposed rewrite.** Use when an important artifact needs independent audit or a failed reproduction gate needs mismatch triage, including protocol TOML, run plan, run spec, reproduction script, computed result, figure, final run report, KB card, reproduction entry, or prompts like "verify this", "audit this", "review this gate", or "why did the gate fail?".

## Disagreements with the first audit

Compared against `docs/skill-description-audit-claude.md`, I agree on 6 of 14 verdicts and differ on 8. The differences are mostly severity calls, not evidence disputes.

| Skill | First audit | Codex | Reason for disagreement |
|---|---:|---:|---|
| download-ref | fail | warn | I agree the storage sentence violates rules 1 and 3, but the first clause starts with `Use when` and routes arXiv/DOI/stub prompts correctly; I treat the defect as a removable tail, not a routing failure. |
| model | warn | fail | The first audit emphasized the useful keyword block. I mark fail because the rubric explicitly requires `Use when...`; this starts `MUST invoke when` and embeds `read ... grep ^signal ... before issuing any verdict` workflow. |
| physics | warn | fail | Same opening-form/workflow issue as `model`, plus a routing false-negative risk from `rather than naming a specific model` for prompts like "Is the J1-J2 model a spin liquid?". |
| report | warn | fail | The first audit treated `Use after...` as acceptable trigger form. The supplied rubric says the description "Must start with `Use when...`", so I mark this fail despite good trigger phrases. |
| reproduce-paper | fail | warn | I agree the second sentence is a three-phase workflow summary. I mark warn because the first sentence is a precise `Use when` trigger and the dispatcher would route paper-reproduction prompts correctly from the description alone. |
| slurm | fail | warn | I agree the mechanism summary is severe. I mark warn because Slurm/sbatch/cluster triggers remain concrete and technology-specific by necessity; the current description routes typical prompts correctly. |
| solve | fail | warn | I agree the arrow-list loop is the canonical workflow-summary anti-pattern. I mark warn rather than fail because the first sentence still routes ordinary single-problem QMB prompts correctly; the residual risk is overlap with `/reproduce-paper`. |
| verify | pass | fail | The first audit accepted `Use after...`; I do not under this rubric. `Use after writing or modifying...` is otherwise trigger-oriented, but it fails the exact required opening form. |

The first audit and this review agree on `cross-method-check`, `memorize`, `onboard`, `parameter-scan`, `scaling-fit`, and `setup-julia`.

## Cross-cutting observations

- Systematic over-summarisation: most descriptions have a good first trigger clause, then append workflow, outputs, composition, or implementation details.
- Several descriptions put body-level invariants in frontmatter. `model` and `physics` are the clearest examples with mandatory card reads and tacit greps.
- Trigger concreteness is uneven. Dispatcher skills list concrete names well; generic primitives often say "generic over..." instead of listing user phrases like "sweep", "scan", "audit", "fit versus L", or actual error strings.
- Exact opening-form drift is common. `memorize`, `model`, `physics`, `report`, and `verify` all fail the required `Use when...` start.
- Technology-specific skills are justified when the technology is the skill: `setup-julia` and `slurm` should keep Julia/Slurm terms, but still phrase them as user/runtime triggers rather than mechanism summaries.
- The safest rewrite pattern is one sentence: `Use when` + concrete user phrases/symptoms + scope nouns. Omit what file gets written, what subskill is composed, and what steps happen after invocation.
