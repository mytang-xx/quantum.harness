# Skill description audit — Claude general-purpose reviewer

Audit of the 14 harness skill `description` frontmatter fields against the
writing-skills CSO rules and the Opus 4.7 / GPT 5.5 prompting frame. The
`description` is the only string the dispatcher reads when deciding whether
to invoke the skill; a workflow-summary shortcut here causes Claude to
follow the description in place of the body, which is exactly the failure
mode writing-skills documents.

## Standards applied

- **R1 Third-person, when-only.** Describes ONLY when to use the skill, not what it does.
- **R2 "Use when…" form.** Triggering-conditions framing, not "this skill…" or "does X".
- **R3 No workflow summary.** The description must NEVER summarize the skill's process or workflow. Empirical: a workflow summary causes Claude to follow the description and skip the body.
- **R4 Concrete triggers.** Specific symptoms, situations, error messages, user-typed phrases.
- **R5 Keyword coverage.** Synonyms, error messages, symptom phrases the user would actually type.
- **R6 Technology-agnostic unless the skill is technology-specific.** No incidental implementation leakage.
- **R7 No editorial / marketing prose.** No aspirational sentences, no flair, no "the discipline that…" framing.
- **R8 No identifier or path leakage to the dispatcher.** Composition pointers (`/slurm`, file paths) are acceptable only when they are part of the activation signal; otherwise they belong in the body.

## Findings (one row per skill)

| Skill | Verdict | Primary issue |
|---|---|---|
| cross-method-check | warn | Trailing scope / composition meta ("Generic over…", "Implements AGENTS.md…"); mild workflow tail ("and comparing"). |
| download-ref | fail | Second sentence is a verbatim workflow summary ("Stores rendered markdown…", "keeps raw PDFs… gitignored"). |
| memorize | fail | Two-sentence workflow summary ("Walk back…, distill…, write them…") plus marketing prose ("The discipline that turns one wasted hour…"). Does not start with "Use when". |
| model | warn | Useful keyword block for trigger matching, but the closing paragraph ("For EVERY matched model, read… AND grep ^signal… before issuing any verdict") is workflow instruction embedded in the description. |
| onboard | warn | First sentence triggers are good; second sentence ("Sets up domain software, optionally configures the user's compute cluster, and routes to `/model` or `/physics`") is a three-phase workflow summary. |
| parameter-scan | warn | Trailing scope / composition meta ("Generic over axes, payload schema…", "For cluster execution composes with `/slurm`"). |
| physics | warn | Same shape as `/model`: keyword block fine, closing "For EVERY matched topic, read… AND grep ^signal… Each verdict requires its own card-read + tacit-grep" is workflow instruction. |
| report | warn | "Use after…" trigger form is good; tail clauses describe outputs / phases ("render the shareable HTML deliverable", "render a draft (Problem + Methodology) for the user to ratify before heavy compute"). Trigger-phrase list at end is appropriate. |
| reproduce-paper | fail | Sentence two is a three-phase workflow summary: "Plans the multi-figure sequence, composes the harness primitives, and closes with a declared entry plus run report." Exactly the pattern writing-skills forbids. |
| scaling-fit | warn | Trigger is OK but stretches into output description ("extract exponents with uncertainty") and trailing "Generic over the observable and the form" scope meta. |
| setup-julia | warn | First sentence triggers are excellent; trailing two sentences are scope / composition meta ("Generic over target…", "Pairs with `/slurm`…"). |
| slurm | fail | Sentence one is a four-verb workflow summary ("ship code, submit…, monitor it, and fetch results — all from the local laptop via Bash + ssh + rsync"). Trailing scope / composition meta also present. |
| solve | fail | Sentence two is a verbatim phase list: "Drives the interactive problem-solving loop: intake → act → report → next-steps → loop until done." This is the canonical workflow-summary anti-pattern. |
| verify | pass | Pure triggering-conditions form. Lists concrete artifact types and the second activation surface (failed gate triage). No workflow summary, no marketing prose. |

## Per-skill detail

### cross-method-check

- **Current description.**
  > "Use when the user wants to confirm a result by re-running with an independent method (or independent diagnostic) at matched parameters and comparing. Generic over the methods and the observable. Implements AGENTS.md verification rule §5."
- **Verdict.** warn.
- **Violations.**
  - **R3 (No workflow summary), mild.** "by re-running with an independent method (or independent diagnostic) at matched parameters **and comparing**" — "and comparing" leaks the workflow's final phase. The trigger is "user wants to confirm a result with an independent method"; what the skill does with it (comparing tags, budgets) is body content.
  - **R7 (No editorial / cross-reference prose).** "Generic over the methods and the observable. Implements AGENTS.md verification rule §5." — neither sentence describes a trigger the dispatcher can match on; both are scope / authorial notes that belong in the body's audience section.
- **Proposed rewrite.**
  > "Use when the user wants to confirm a single-method result with an independent method or an independent diagnostic at the same parameter point. Activates on phrases like 'cross-check this', 'verify with another method', 'is this an artifact of DMRG / VMC / QMC', and on results sitting near a phase boundary or in a frontier regime."

### download-ref

- **Current description.**
  > "Use when adding arXiv IDs, DOIs, or bibliography stubs to this quantum many-body harness. Stores rendered markdown under knowledge-base/literature/<method>/ and keeps raw PDFs, metadata, and extracted figures gitignored inside each method folder."
- **Verdict.** fail.
- **Violations.**
  - **R3 (No workflow summary).** "**Stores rendered markdown under knowledge-base/literature/<method>/ and keeps raw PDFs, metadata, and extracted figures gitignored inside each method folder.**" — verbatim what-the-skill-does prose, two storage actions and one git-policy fact. Confirmed against the body (Workflow steps 3-5: fetch metadata, render markdown, regenerate index; Layout table).
  - **R8 (Path leakage).** `knowledge-base/literature/<method>/` is an internal layout detail of no value to a dispatcher.
- **Proposed rewrite.**
  > "Use when the user pastes an arXiv ID, a DOI, or a citation stub and wants it added to the harness's methodology references. Activates on phrases like 'download this arXiv', 'add a DMRG reference', 'pull in DOI 10…', 'render this PDF', 'add a bibliography stub for'."

### memorize

- **Current description.**
  > "User-invoked at session end. Walk back through the session, distill the lessons that actually surfaced (user pushback, wasted compute, stack failures, caption misreads), and write them as TACITS.toml entries or AGENTS.md invariants so the harness remembers next time. The discipline that turns one wasted hour into a paragraph that saves the next hundred sessions."
- **Verdict.** fail.
- **Violations.**
  - **R2 (Use-when form).** Description does not start with "Use when". Opens with "User-invoked at session end" — a state assertion, not a trigger.
  - **R3 (No workflow summary).** "**Walk back through the session, distill the lessons that actually surfaced … and write them as TACITS.toml entries or AGENTS.md invariants**" — verbatim three-phase workflow (survey → cluster → draft/write) confirmed against the Workflow section (steps 1, 2, 4-6).
  - **R7 (Editorial / marketing prose).** "**The discipline that turns one wasted hour into a paragraph that saves the next hundred sessions.**" — aspirational sentence with no triggering content.
  - **R1 (Third-person, when-only).** The imperative second-person verbs ("Walk back", "distill", "write them") address the agent rather than describe when to fire.
- **Proposed rewrite.**
  > "Use when the user explicitly invokes `/memorize` at session end, especially after a session with user pushback ('no, that's wrong'), wasted compute, stack failures, caption misreads, or any friction moment the user wants captured. Never agent-invoked."

### model

- **Current description.**
  > "MUST invoke when user wants to solve, investigate, or reproduce any harness-tracked quantum lattice model. Supported (match user prose to one): - transverse-field-ising (TFIM): quantum-critical Ising chain / 2D Wilson-Fisher / - heisenberg: SU(2) magnet, AFM or FM by sign of J / - j1-j2: frustrated Heisenberg, J2/J1≈0.5 spin-liquid candidate / - t-v: spinless fermions + NN repulsion (CDW vs Luttinger) / - hubbard: t-U electrons; Mott transition, cuprate parent / - t-j: strong-coupling Hubbard with no-double-occupancy / - anderson-impurity (SIAM): impurity-in-bath, Kondo / - multiorbital-hubbard: multi-band + Hund's J / - spin-1-xxz: Haldane phase, AKLT / - potts-clock: q-state, first-order / continuous / BKT by q. For EVERY matched model, read knowledge-base/models/<name>/MODEL.md AND grep ^signal in knowledge-base/models/<name>/TACITS.toml before issuing any verdict. Do this for each model you touch, not just the first one matched in the session."
- **Verdict.** warn.
- **Violations.**
  - **R3 (No workflow summary).** "**For EVERY matched model, read knowledge-base/models/<name>/MODEL.md AND grep ^signal in knowledge-base/models/<name>/TACITS.toml before issuing any verdict. Do this for each model you touch, not just the first one matched in the session.**" — three sentences of workflow instruction (read card, grep tacits, repeat per model). Confirmed against the body's Workflow steps 2-3. The instruction is real and important but belongs in `SKILL.md` body, not in the dispatcher string.
  - **R8 (Path leakage).** `knowledge-base/models/<name>/MODEL.md` and `knowledge-base/models/<name>/TACITS.toml` are body-level facts.
  - The keyword block (`transverse-field-ising`, `heisenberg`, …) is justified under R5 (keyword coverage); it is the legitimate trigger signal.
- **Proposed rewrite.**
  > "MUST invoke when the user names or describes a harness-tracked quantum lattice model. Match user prose to one of: transverse-field-ising (TFIM, quantum-critical Ising chain / 2D Wilson-Fisher); heisenberg (SU(2) magnet, AFM or FM by sign of J); j1-j2 (frustrated Heisenberg, J2/J1 ≈ 0.5 spin-liquid candidate); t-v (spinless fermions + NN repulsion, CDW vs Luttinger); hubbard (t-U electrons, Mott transition, cuprate parent); t-j (strong-coupling Hubbard with no-double-occupancy); anderson-impurity (SIAM, impurity-in-bath, Kondo); multiorbital-hubbard (multi-band + Hund's J); spin-1-xxz (Haldane phase, AKLT); potts-clock (q-state, first-order / continuous / BKT by q). Fires for each named model the user touches in a session, not just the first match."

### onboard

- **Current description.**
  > "Use when the user is new to the harness, asks 'where do I start', or opens with an unclear / empty problem. Sets up domain software, optionally configures the user's compute cluster, and routes to `/model` or `/physics`."
- **Verdict.** warn.
- **Violations.**
  - **R3 (No workflow summary).** "**Sets up domain software, optionally configures the user's compute cluster, and routes to `/model` or `/physics`.**" — three-phase workflow summary (setup → cluster → route), confirmed against body steps 1, 2, 4.
- **Proposed rewrite.**
  > "Use when the user is new to the harness, asks 'where do I start' / 'how do I use this' / 'I'm new here', opens with an empty or unclear prompt, or explicitly invokes `/onboard`. Also fires on first session when no `julia-env/` directory exists."

### parameter-scan

- **Current description.**
  > "Use when the user wants to sweep one or more declared axes for a produced quantity. Generic over axes, payload schema, quantity, and implementation. For cluster execution composes with `/slurm`."
- **Verdict.** warn.
- **Violations.**
  - **R7 (No editorial prose / scope meta).** "**Generic over axes, payload schema, quantity, and implementation.**" — internal scope / contract statement of no value to the dispatcher.
  - **R7 / R3 (Composition leak / mild workflow).** "**For cluster execution composes with `/slurm`.**" — composition pointer; belongs in the body's Composition section, not in the trigger string.
- **Proposed rewrite.**
  > "Use when the user wants to vary one or more parameters and see how a quantity responds — phrases like 'how does X depend on Y', 'sweep U/t from 0 to 10', 'scan J2/J1 across the transition', 'finite-size series at L = 12, 16, 20, 24', a single-axis scan, or a multi-axis grid. Also activates as the natural follow-up after any single-point calculation."

### physics

- **Current description.**
  > "MUST invoke when user asks a cross-model physics question (mechanism, phase identification, diagnostic) rather than naming a specific model. Supported topics: - criticality: second-order transitions, exponents, finite-size scaling / - frustration: geometric or exchange-induced frustration / - spin-liquid: fractionalized phases, topological order, RVB / - mott-transition: interaction-driven metal-insulator / - kondo-effect: local-moment screening / - magic: non-stabilizerness, SRE, long-range magic / - confinement: gauge-theory confinement diagnostics. For EVERY matched topic, read knowledge-base/physics/<topic>/PHYSICS.md AND grep ^signal in knowledge-base/physics/<topic>/TACITS.toml before issuing any verdict on phase, mechanism, or diagnostic. Each verdict requires its own card-read + tacit-grep, not a single per-session pass."
- **Verdict.** warn.
- **Violations.**
  - **R3 (No workflow summary).** "**For EVERY matched topic, read knowledge-base/physics/<topic>/PHYSICS.md AND grep ^signal in knowledge-base/physics/<topic>/TACITS.toml before issuing any verdict on phase, mechanism, or diagnostic. Each verdict requires its own card-read + tacit-grep, not a single per-session pass.**" — same pattern as `/model`: workflow imperatives (read card, grep tacits, repeat per verdict). Confirmed against body Workflow steps 2-3.
  - **R8 (Path leakage).** `knowledge-base/physics/<topic>/PHYSICS.md` and `TACITS.toml` are body-level facts.
  - Topic keyword block is legitimate trigger signal (R5).
- **Proposed rewrite.**
  > "MUST invoke when the user asks a cross-model physics question (mechanism, phase identification, diagnostic) rather than naming a specific Hamiltonian. Triggering topics include: criticality (second-order transitions, exponents, finite-size scaling); frustration (geometric or exchange-induced); spin-liquid ('is this a spin liquid', fractionalization, topological order, RVB); mott-transition (interaction-driven metal-insulator); kondo-effect (local-moment screening); magic / non-stabilizerness (SRE, long-range magic); confinement (gauge-theory diagnostics). Fires once per topic the user names, not once per session."

### report

- **Current description.**
  > "Use after a /reproduce-paper run's `close` gate passes to render the shareable HTML deliverable. Also used at the `plan` gate to render a draft (Problem + Methodology) for the user to ratify before heavy compute. Triggers on 'render report', 'publish reproduction', 'share results', 'make the plan doc', 'ratify before run'."
- **Verdict.** warn.
- **Violations.**
  - **R3 (Mild workflow / output summary).** "**to render the shareable HTML deliverable**" and "**to render a draft (Problem + Methodology) for the user to ratify before heavy compute**" — these are outputs / phase descriptions woven into the trigger clauses. The reader does not need to know what the rendered HTML contains to decide whether to fire; "use after `close` passes" / "use at `plan` gate to ratify the plan" is enough.
  - The closing trigger-phrase list ("render report", "publish reproduction", "share results", "make the plan doc", "ratify before run") is excellent under R4 / R5; keep it.
- **Proposed rewrite.**
  > "Use at the `plan` gate of a `/reproduce-paper` run when the user needs to ratify the plan before heavy compute, OR after the `close` gate when the user wants the shareable deliverable. Triggers on 'render report', 'publish reproduction', 'share results', 'make the plan doc', 'ratify before run'."

### reproduce-paper

- **Current description.**
  > "Use when the user wants to reproduce the figures and main results of a published paper end-to-end. Plans the multi-figure sequence, composes the harness primitives, and closes with a declared entry plus run report. Generic over papers."
- **Verdict.** fail.
- **Violations.**
  - **R3 (No workflow summary).** "**Plans the multi-figure sequence, composes the harness primitives, and closes with a declared entry plus run report.**" — a three-phase workflow recap (plan → run → close) directly mirroring the body's Spine and State machine sections. This is the writing-skills canonical anti-pattern.
  - **R7 (Editorial / scope meta).** "**Generic over papers.**" — scope statement; not a trigger.
- **Proposed rewrite.**
  > "Use when the user wants to reproduce the figures and main results of a published paper end-to-end — phrases like 'reproduce paper X', 'redo the figures of Y', 'reproduce arXiv 2302.04919', 'put this paper through the harness as a calibration target'. Also fires when a `/solve` session is moving through several figures of the same paper and the user wants the full set, or right after `/download-ref` lands a new paper."

### scaling-fit

- **Current description.**
  > "Use when the user has a size-indexed (and optionally parameter-indexed) data set and wants to fit a finite-size scaling form — power law, log, polynomial, or universal data-collapse — and extract exponents with uncertainty. Generic over the observable and the form."
- **Verdict.** warn.
- **Violations.**
  - **R3 (Mild workflow / output summary).** "**and extract exponents with uncertainty**" — output summary. Trigger is "user wants to fit a finite-size scaling form"; what comes out of the fit is body content. Borderline: this phrasing can also be read as user intent ("user wants exponents with uncertainty"), but the conjunction "and" attaches it to the skill's actions, not to the user's want.
  - **R7 (Scope meta).** "**Generic over the observable and the form.**" — scope statement.
  - **R5 (Keyword coverage).** Could enumerate more of the common user phrases (data collapse, FSS, critical exponent, extrapolation to thermodynamic limit).
- **Proposed rewrite.**
  > "Use when the user has a size-indexed (and optionally parameter-indexed) data set and wants finite-size scaling — phrases like 'fit a power law', 'data collapse', 'extract the critical exponent', 'finite-size extrapolation', 'extrapolate to the thermodynamic limit', 'fit log L', or 'polynomial fit in 1/L'. Activates when `/parameter-scan` flags a power-law / extremum / crossing shape and the calling skill needs exponents."

### setup-julia

- **Current description.**
  > "Use when a workflow needs Julia installed and configured — fresh laptop, fresh cluster account, package-mirror change, or Julia-version bump. Generic over target (local laptop or remote cluster via ssh) and over region (mirror auto-defaulted from cluster profile's `region` field). Pairs with `/slurm` (cluster Julia setup) and with `make install julia` (local)."
- **Verdict.** warn.
- **Violations.**
  - **R7 (Scope meta).** "**Generic over target (local laptop or remote cluster via ssh) and over region (mirror auto-defaulted from cluster profile's `region` field).**" — internal scope / parameter contract; the dispatcher does not need it to decide whether to fire.
  - **R7 / R3 (Composition leak).** "**Pairs with `/slurm` (cluster Julia setup) and with `make install julia` (local).**" — composition pointer; belongs in body Composition section.
- **Proposed rewrite.**
  > "Use when a workflow needs Julia installed and configured — fresh laptop, fresh cluster account, `julia` not found on PATH, package-mirror change (e.g., user moves region), or a Julia-version bump (`--version 1.11.x`). Also fires when `/slurm`'s pre-submit check finds an un-instantiated `julia-env/Manifest.toml` on the remote cluster."

### slurm

- **Current description.**
  > "Use when the agent needs to ship code, submit a Slurm job (single or array), monitor it, and fetch results — all from the local laptop via Bash + ssh + rsync. Generic over what is submitted; reads cluster specifics from `tools/cluster/<active>.md`. Pure mechanism — for parameter sweeps compose with `/parameter-scan`."
- **Verdict.** fail.
- **Violations.**
  - **R3 (No workflow summary).** "**ship code, submit a Slurm job (single or array), monitor it, and fetch results**" — a four-verb phase list that mirrors Workflow steps 4-7 (Ship, Submit, Monitor, Fetch). This is exactly the workflow-summary anti-pattern.
  - **R6 (Implementation leakage).** "**all from the local laptop via Bash + ssh + rsync**" — implementation mechanism; the dispatcher doesn't need it.
  - **R7 (Scope / composition meta).** "**Generic over what is submitted; reads cluster specifics from `tools/cluster/<active>.md`. Pure mechanism — for parameter sweeps compose with `/parameter-scan`.**" — three sentences of scope / composition prose.
  - **R8 (Path leakage).** `tools/cluster/<active>.md` is a body detail.
- **Proposed rewrite.**
  > "Use when a computation needs to run on a remote Slurm cluster (CPU- or GPU-heavy beyond laptop budget), when a multi-cell array job is ready to submit, when a submitted job needs status / monitoring / cancel / log-tail, or when only a few cells failed and the user wants to resume on a partial run. Activates on phrases like 'send this to the cluster', 'sbatch this', 'submit on HPC2', 'check job status', 'resume the failed cells'."

### solve

- **Current description.**
  > "Use when the user brings a concrete quantum many-body problem to solve. Drives the interactive problem-solving loop: intake → act → report → next-steps → loop until done."
- **Verdict.** fail.
- **Violations.**
  - **R3 (No workflow summary).** "**Drives the interactive problem-solving loop: intake → act → report → next-steps → loop until done.**" — a verbatim five-phase pipeline. Confirmed against the body's Loop section (steps 1-7). Worst kind of workflow summary: phase names listed with an arrow diagram, so the dispatcher can shortcut directly to "intake → act → report" and skip the binding Principles + branch-rules in the body.
- **Proposed rewrite.**
  > "Use when the user brings a concrete quantum many-body problem to solve — phrases like 'ground state of Heisenberg N = 20', 'is kagome a spin liquid', 'Hubbard at U/t = 8', 'compute the gap for TFIM at h = 1', 'what does VMC give for J1-J2 at 0.5'. Also fires when `/onboard` routes here or when the user pivots to a new problem mid-session."

### verify

- **Current description.**
  > "Use after writing or modifying an important artifact (protocol TOML, run plan, reproduction script, computed result, final run report, KB card) or when a reproduction gate fails and needs independent mismatch triage."
- **Verdict.** pass.
- **Violations.** none. Description is purely triggering: two surface conditions (artifact edit, failed gate) and a concrete enumeration of which artifact types qualify, which doubles as keyword coverage. No workflow summary, no editorial prose, no scope meta.
- **Proposed rewrite.** (no change)

## Cross-cutting observations

1. **Workflow-summary anti-pattern is the most common failure.** Seven of fourteen descriptions (memorize, model, onboard, parameter-scan, physics, reproduce-paper, scaling-fit, slurm, solve, plus a softer instance in download-ref) contain a phase list or three-verb action summary. The pattern is especially severe in `/solve` (intake → act → report → next-steps → loop) and `/slurm` (ship → submit → monitor → fetch), where the description literally lists every workflow step in order. These are the highest-leverage rewrites in the audit.

2. **Trailing "Generic over …" / "Pairs with …" meta is the second most common.** cross-method-check, parameter-scan, scaling-fit, setup-julia, and reproduce-paper all close with one or two sentences that describe the skill's scope contract or composition surface. None of these sentences help a dispatcher decide whether to fire; they belong in the body's Audience / Composition sections.

3. **Identifier and path leakage.** `knowledge-base/models/<name>/MODEL.md`, `knowledge-base/literature/<method>/`, `tools/cluster/<active>.md`, and similar repo-internal paths appear inside descriptions for model, physics, download-ref, and slurm. The dispatcher cannot match on these, and the strings burn tokens that could carry user-typed keywords instead.

4. **`/model` and `/physics` are well-instrumented but workflow-leaked.** Their long keyword blocks (10 models / 7 topics, each with short discriminators) are exactly what R5 (keyword coverage) asks for — these are the strongest triggers in the audit. The descriptions fail only on the trailing "For EVERY matched model, read… AND grep ^signal…" sentences, which are workflow instructions for the agent. Removing those tails would convert both from `warn` to `pass`.

5. **The two skills that pass cleanest are dispatcher-aware.** `/verify` (pass) and `/report` (warn, very close to pass) both lead with concrete surface conditions ("after writing or modifying an artifact", "after `/reproduce-paper`'s `close` gate passes") and follow with a user-phrase enumeration ("render report", "publish reproduction"). This is the shape every harness skill description should converge toward.

6. **`/memorize` is the only description that opens without "Use when".** It opens "User-invoked at session end." This is technically a triggering condition, but the writing-skills R2 form is the documented convention and converts more reliably under the dispatcher's matcher.

7. **Editorial / marketing prose appears in one place** — the closing sentence of `/memorize`: "The discipline that turns one wasted hour into a paragraph that saves the next hundred sessions." This is the only outright aspirational line in the 14 descriptions; once removed, `/memorize`'s remaining issues are mechanical (workflow summary, no "Use when").

8. **Keyword density is uneven.** `/verify` and `/onboard` enumerate user-typed phrases. `/report` enumerates trigger phrases at the end. `/solve`, `/slurm`, `/parameter-scan`, `/reproduce-paper`, `/scaling-fit`, `/setup-julia`, `/cross-method-check`, `/download-ref` could each carry richer phrase enumerations — they currently rely on a single abstract sentence to cover everything a user might type, where 2-3 concrete phrases would catch more activations cheaply.
