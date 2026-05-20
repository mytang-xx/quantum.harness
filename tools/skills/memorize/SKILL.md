---
name: memorize
description: User-invoked at session end. Walk back through the session, distill the lessons that actually surfaced (user pushback, wasted compute, stack failures, caption misreads), and write them as TACITS.toml entries or AGENTS.md invariants so the harness remembers next time. The discipline that turns one wasted hour into a paragraph that saves the next hundred sessions.
---

# memorize

After a session that surfaced real problems — user "no, that's wrong" moments, wasted compute, stack failures, caption misreads, queue mishaps, retries that should have been one shot — look back, extract the signal, and write it into the right scope so future sessions don't re-walk the same path.

This is the discipline that converts session-level pain into harness-level rules and tacit knowledge.

## When to activate

- The user explicitly invokes `/memorize` at session end.
- Triggers worth memorizing: any user "no, that's wrong" / "you missed X" moment; any computational waste discovered after-the-fact; any failure mode that took more than ~30 min to diagnose; any commit-then-revert cycle; any time the agent had to be told a harness rule that wasn't already in `AGENTS.md` or a TACITS file.

This skill is NEVER agent-invoked. The user decides when a session's lessons are worth codifying. The agent may *gently mention* that `/memorize` exists at the end of a high-friction session, but never starts the workflow autonomously.

## Non-negotiables

- **One lesson, one entry.** Bundling unrelated lessons into one entry hides them from greppers and breaks the signal-first lookup discipline.
- **Specific vs generic — pick the right scope.** Method/stack-specific facts → `knowledge-base/methods/<method>/TACITS.toml`. Model-specific → `knowledge-base/models/<model>/TACITS.toml`. Project-wide invariants → `AGENTS.md`. Skill behavior → that skill's `SKILL.md`. Don't dump everything into one big global file.
- **Every TACITS entry has `signal`, `understanding`, `action`, `tags`, `seen_at`.** Signal is what an agent or user sees FIRST (error message, symptom, surface keyword). Agents grep `^signal` to scan the index without reading the rest. `seen_at` is mandatory provenance.
- **Never invent lessons.** Every entry must trace to a specific moment in the session: cite the user message, the failing artifact, or the commit/PR that fixed it. Speculative "we MIGHT see this if…" lessons are anti-knowledge.
- **The user ratifies BEFORE write.** Show diffs / drafts in a single review pass; no silent appends.
- **Grep before write.** If the lesson already exists, append `seen_at` to that entry instead of creating a duplicate.

## Inputs

- The current session — transcript, file changes, commits since session start, artifacts under `results/<run>/` if a reproduction was active.
- Optional: explicit moments the user wants to capture (`/memorize "the figure caption thing"`).

## Workflow

1. **Survey the session.** Walk back through the user's messages and the agent's actions. Flag every moment of friction:
   - User said "wrong", "you missed", "I don't think that's right", "are you sure", "should have", etc.
   - Agent had to retry a compute task (any cell ran more than once for the same scope).
   - A stack or tool failed in a way the agent had not anticipated (segfault, OOM, queue wait, timeout, silent wrong result).
   - A user instruction was given that should have been in `AGENTS.md` already.
   - Settle-time discipline was violated (declared success when not actually successful).
   - The agent over-promised then walked back ("oh wait, that's wrong").

2. **Cluster by root cause.** Group friction moments by what they were ACTUALLY about — not what they looked like. A "wrong y-axis label" and a "wrong state selection" both root-cause to "did not read the caption before coding"; that's one lesson, not two. Forty friction moments often distill to three lessons.

3. **Classify scope** for each cluster:
   - **Method/stack-specific** (e.g., dsyevd at large N, scipy_openblas32 ILP issues, ITensors bond-dim convergence quirk) → `knowledge-base/methods/<method>/TACITS.toml` as a new `[[tacit]]`. Promote `methods/<method>.md` → `methods/<method>/METHOD.md` folder if not already.
   - **Model-specific** (e.g., PXP 0+ basis combinatorics, J1-J2 critical-point convergence) → `knowledge-base/models/<model>/TACITS.toml`. Create the namespace when first needed.
   - **Project-wide invariant** (e.g., "read figure captions verbatim before coding", "audit declared stack vs actual imports") → `AGENTS.md` as a new bullet in the appropriate section. Phrase as a rule, not a story.
   - **Skill behavior** (e.g., "/slurm must check PD→R transition") → that skill's `SKILL.md`. Add as a step or an explicit constraint.

4. **Draft.** For each lesson, write the entry/edit. Keep it tight:
   - **TACITS entry**: `signal` one line (the keyword/error/symptom an agent will grep for); `understanding` 2–4 lines (root cause, named upstream component if known); `action` 2–4 lines (the concrete fix, not advice); `tags` 3–7 short tokens; `seen_at = ["<run-dir-or-session-anchor>"]`.
   - **AGENTS.md bullet**: one paragraph, imperative form. Cite the witnessing session. Place in the section whose theme matches.
   - **SKILL.md edit**: one paragraph or one new workflow step. Cite. Cross-reference the relevant TACITS if any.

5. **Show the user.** Display all drafts side-by-side with the friction moments that justify them. The user can: accept, reject, edit, split, or merge. Use the host platform's option API for the accept/edit fork.

6. **Apply.** Once ratified, write to the files. Single commit with title `memorize: <one-line summary>`. Body lists each lesson with its scope (TACITS / AGENTS.md / SKILL.md) and a one-line cite.

7. **Cross-link.** If a TACITS entry was added with `seen_at = ["results/<run>"]`, append a footer to `results/<run>/run-report.md` noting the lessons memorized from this run. Future readers of the run report find the lessons it produced.

## Output

- File edits / new entries in the right scopes.
- One commit, conventional title: `memorize: <topic>`. Co-authored-by trailer as usual.
- A 5–10 line summary back to the user: "Memorized N lessons across M files: …". List each lesson's signal + scope, nothing else.

## Composition

- Often invoked after `/reproduce-paper` close — especially when the close revealed waste.
- Composes with `/verify` only obliquely: a tacit that says "audit must check X" gets cross-referenced from `/verify`'s `SKILL.md` (add to the relevant mode's audit axes).
- Never invoked from inside another skill — this is a session-level retrospective, not a sub-step.

## Anti-patterns (auto-reject)

- **Memorizing speculative lessons** ("we MIGHT see this issue if…") — only record what actually surfaced.
- **Bundling unrelated lessons** into one big entry — they become ungreppable.
- **Writing a TACITS entry with no `seen_at`** — without provenance the lesson is hearsay.
- **Editing `AGENTS.md` without showing the diff to the user first** — even tiny rule additions are user-ratified.
- **Memorizing the same lesson twice** — grep first; append `seen_at` to the existing entry instead.
- **Skipping the cluster step** — forty friction moments distilled to forty entries buries the signal.
- **Memorizing every minor agent error** — only lessons that would have prevented real waste belong in the file.

## Example output

Invoked after the Turner 2018 ED reproduction session, which surfaced five distinct friction clusters: (a) stack drift (raw scipy declared as quspin), (b) Fig 3c caption-misread (wrong y-axis label + wrong state pick), (c) ED-at-large-D segfault chain (four stacked failure modes), (d) local-vs-remote awareness gap (ran L=30 locally that belonged on the cluster), (e) cluster PD→R settle-time gap (treated `sbatch` success as compute success).

Output:

- `knowledge-base/methods/ed/TACITS.toml` — 7 `[[tacit]]` entries for the segfault chain + stack drift + abandon-Python heuristic.
- `AGENTS.md` — 3 new invariant bullets (feature-gap-is-not-route-authority, audit-stack-at-protocol-time, pre-compute-figure-reading-checklist) + new "Compute resources" section.
- `tools/skills/slurm/SKILL.md` — layered settle-time discipline (PD→R + startup + long-run) in workflow Step 6.
- `tools/skills/verify/SKILL.md` — figure-reading checklist + stack-claim-match as `script` and `result` audit axes.

One commit: `memorize: stack drift, figure-reading, ED segfault chain, cluster settle-time from Turner 2018 reproduction`.

That is the volume and shape of a typical heavy-session `/memorize`. Most sessions produce 0–2 lessons; high-friction reproductions produce 3–6.
