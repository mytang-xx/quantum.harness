---
name: onboard
description: "Interview a new learner and generate a personalized learning path — the shortest sequence of tasks that takes them from where they are to their research goal. Writes .harness/paths/<learner>.md and initializes progress. After onboarding, the learner uses /step to work through the path."
---

## Before you start

Check `.harness/paths/` — if paths already exist, ask whether this is a new learner or resuming an existing one. For resuming, point them at `/step` directly.

Read `AGENTS.md`, `knowledge-base/_index.md`, and any domain-specific scenario notes in this skill (see "Common scenarios" below). These encode what the harness author knew about likely learners.

## Step 1 — Meet the learner

Warm, conversational interview. No role categories. Three things to learn, asked naturally:

1. **Background.** What's their history with this domain? Coursework? Reading? Prior research? Adjacent field? Use `AskUserQuestion` only for genuinely discrete choices; otherwise ask in natural language.
2. **Goal.** What do they want to be able to do at the end? Push until the goal is concrete and measurable — a real research capability, not a vague "understand the field."
3. **Time budget.** Rough sense — keeps the path right-sized.

Tone: treat them as a future researcher. Acknowledge their background; don't make them re-prove what they already know.

## Step 2 — Qualify the goal

Keep asking follow-ups until the goal is concrete. Good goals look like:

> "Set up and run TEBD/TDVP simulations on Rydberg chains (1D first, 2D later), compute quench-dynamics observables, end with something I can extend into my actual research."

Not:

> "Master tensor networks."

The goal must have a checkable end-state that the learner will produce.

## Step 3 — Match to common scenarios

Check whether the learner matches a known pattern. Use as hints, not categories — blend or deviate as the actual learner requires.

### Common scenarios

{{Filled in by factory-side /harness-onboard during harness creation. If empty, the skill uses first-principles reasoning.}}

<!--
Example scenarios the factory might fill in:

**Returning researcher** — has done research in the field before, returning after time away.
→ Skip pedagogical tours, start near the capstone. Focus on refreshing tooling/conventions. Path length: 2–3 tasks.

**New grad student** — coursework background, no research yet in this field.
→ Start with foundations, end on paper reproduction. Path length: 5–7 tasks. Prioritize intuition-building early.

**Cross-disciplinary** — strong in adjacent field.
→ Interview probes the boundary. Skip what overlaps with their background, focus on what's unique.

**Industry hire** — experienced coder, new to research norms.
→ Emphasize "why" and literature connections, not "how." Capstone heavy on reproducing a paper result.
-->

## Step 4 — Generate the shortest path

Given the qualified goal, work backward:

1. **Decompose the goal** into required capabilities
2. **Build a dependency graph** — what must be known/done to achieve each capability
3. **Topologically order** the dependencies
4. **Generate tasks** that cover the ordered capabilities

Task generation rules:

- **Plain-language goals.** The goal line of each task must be readable by someone who hasn't done it. Jargon belongs in the Run/Expected-output fields, not the Goal. Rule: if a newcomer reads just the goal, can they tell (a) what they'll produce, (b) what success looks like?
- **Chained artifacts.** Later tasks consume earlier tasks' outputs so the learner ends with an end-to-end fixture. Avoid isolated throwaway exercises.
- **Paper-reproduction capstone when feasible.** The final task should reproduce a headline result from a paper in `knowledge-base/` — unambiguous pass/fail, real research output. Skip only if no paper suits the learner's level.
- **Concrete verification per task.** Each task needs: exact command(s), expected output (with tolerances if numerical), explicit checkpoint the learner can answer yes/no before moving on.
- **Right-sized.** 3–7 tasks is normal. 2 is OK for narrow goals. More than 10 is bloat — split into a second path later.
- **Size to the learner.** If the canonical path for the goal is too advanced, pivot to warm-up tasks that get them to the starting level. Flag the pivot.

Each generated task is a slot in the path file with: `title`, `goal`, `prerequisites`, `run`, `expected_output`, `checkpoint`, and `kb_anchor` (which KB docs support it).

## Step 5 — Render preview

Use `tools/cli/render` to show the proposed path as an HTML page. This is the positive-feedback moment — the learner sees where they'll end up.

Page contents:
- One-paragraph framing tying the path to their stated goal
- The sequence as a visual timeline (task titles + one-line summary each)
- Estimated effort per task
- Prominent "end state" panel: "After this path, you'll be able to **{{concrete capability}}**"
- "Skipped from catalog (not on your path)" section — reassures them they're not missing anything essential for their goal

## Step 6 — Refine

Ask if they want to adjust — skip, add, reorder, explore a different direction. Two rounds of refinement is usually enough; don't over-negotiate.

## Step 7 — Save and hand off

Write:

```
.harness/paths/<learner-name>.md
```

Format:

```markdown
# Path for {{learner_name}}

**Goal:** {{qualified goal}}
**Background:** {{one-line summary}}
**Estimated effort:** {{rough}}

## Tasks

### 1. {{title}}

- **Goal:** {{plain-language}}
- **Prerequisites:** {{}}
- **Run:** {{command(s)}}
- **Expected output:** {{with tolerances}}
- **Checkpoint:** {{yes/no question}}
- **KB anchor:** {{paths to supporting docs}}

### 2. {{title}}
...

## End state

{{concrete research-ready capability}}
```

Initialize:

```
.harness/progress/<learner-name>.yml
```

```yaml
learner: {{learner_name}}
path: .harness/paths/{{learner-name}}.md
started: {{date}}
current: 1
completed: []
custom: []
```

Hand off conversationally:

> Path saved. Run `/step` when you're ready to start.

## Domain-specific anchors

{{Filled in by factory-side /harness-onboard. Things like: preferred capstone papers, key KB chapters per topic, dataset conventions, tool idioms.}}

## Principles

- One skill, one path per learner — no per-role skill files.
- Interview-driven inference — not role categories.
- Plain-language goals, chained artifacts, paper-reproduction capstone, concrete verification.
- End-state must be research-caliber. The last task should seed the learner's real research.
- Positive framing — the path is a trajectory, not a checklist.
