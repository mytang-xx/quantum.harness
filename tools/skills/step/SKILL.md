---
name: step
description: "Advance through the learner's path one step at a time. Renders task content as HTML (equations, diagrams), guides the work, verifies outputs, and celebrates completion. Supports subcommands: check, explain, back, skip."
---

## Before you act

Read:
- `.harness/paths/<active-learner>.md` — the path this learner is on
- `.harness/progress/<active-learner>.yml` — where they are
- `AGENTS.md` — domain conventions

If no active learner is set, either infer from a single-learner harness (one path file) or ask which learner. Record the active learner so subsequent `/step` calls don't re-ask.

## Subcommands

### `/step` (no argument)

Advance or continue. If the current task is in-progress, render its content; if the current task is completed, advance to the next.

1. Load the current task from the path file
2. Render the task as HTML via `tools/cli/render` — concept, equations, diagrams, the goal, the command to run, the expected output, the checkpoint
3. Open it in the browser
4. In the terminal, a short prompt: "Opened {{task.title}}. Run the command shown, then `/step check` when you're ready to verify."
5. Update progress: mark as `in_progress`

### `/step check`

Verify the learner's output for the current task.

1. Look for their output where the task expects it (file path from the task's `expected_output`)
2. Compare against the reference (numerical tolerance, pattern match, or qualitative inspection per task type)
3. Render a **reward page** via `tools/cli/render`:
   - Header: "You did it" or equivalent domain-appropriate celebration
   - Their actual output shown prominently
   - Side-by-side comparison with expected
   - One-line commentary tying the result to theory (e.g., "E₀ = -8.8629, exact Bethe ansatz = -8.8627. Error 2e-4, consistent with χ=64.")
   - Progress bar across the whole path
   - Natural next-step suggestion
4. If verification fails: render a page with what went wrong, relevant KB links, and hints — not a full spoiler. Keep the learner in the driver's seat.
5. On success: update progress (mark completed, record artifact paths), advance `current` to next task.

### `/step explain`

The learner is stuck and wants a deeper explanation of the current task's concept.

1. Read the task's KB anchors
2. Synthesize a focused explanation — not a lecture, just what's relevant to where they're stuck
3. Render as HTML via `tools/cli/render` — equations, diagrams, examples
4. Ask if this helped or if they want a different angle

### `/step back`

Go to the previous task. Update `current` in progress. Useful for revisiting a concept.

### `/step skip`

Skip the current task — the learner doesn't want to do it right now. Mark as `skipped` in progress; advance to next. Warn if the skipped task is a prerequisite for later tasks.

### `/step custom <description>`

The learner wants to work on something not in the path. Generate a one-off task inline:

1. Qualify what they want to do (one or two questions)
2. Identify relevant KB anchors
3. Render the custom task (same format as path tasks)
4. Record under `progress.custom[]` — does not advance the path's `current`
5. On completion, ask if they want to promote this to the catalog or the path

## Verification approaches

Pick based on the task type:

- **Numerical:** compare output file to reference with tolerance. Render the comparison visibly.
- **Symbolic:** canonicalize both sides (sorted terms, normalized coefficients), compare.
- **Plot:** verify the plot file was produced; ask the learner to confirm key features visually.
- **Qualitative / conceptual:** inspect the output and give focused feedback — no pass/fail, just discussion.

## Tone

- **Celebrate real wins.** "You built working DMRG, matching Bethe ansatz to 4 digits" — specific, tied to what they did.
- **Don't spoon-feed.** When they're stuck, ask what they've tried, point to KB, render the concept — don't write the code for them.
- **Acknowledge custom exploration.** If they deviate, treat it as curiosity, not disobedience.
- **Never patronize.** The learner is a future researcher. Talk to them like one.

## Rendering

Any explanation or reward involving math, diagrams, or structured content goes through `tools/cli/render`. Keep terminal output short — confirmations, prompts, status. The browser is where the substantive content lives.

## Task rendering template (what the render receives)

```markdown
# {{task.title}}

{{concept explanation — expanded from task.goal and KB anchors}}

$$ {{equations if relevant}} $$

{{diagrams as inline SVG or TikZ blocks}}

## Your goal

{{task.goal}}

## Run

```{{language}}
{{task.run}}
```

## Expected output

{{task.expected_output with tolerance}}

## Checkpoint

{{task.checkpoint}} — run `/step check` when ready.
```

## Reward-page template (on success)

```markdown
# {{celebration header}}

## What you built

{{their output shown prominently}}

## Compared to reference

| Your value | Expected | Error |
|---|---|---|
| ... | ... | ... |

**{{one-line commentary tying the result to theory}}**

## Progress

{{progress bar}} — {{N}} of {{total}} tasks complete

## Next

{{suggestion for the next task, or "you've reached research-ready — {{concrete capability}}"}}
```

## Principles

- One invocation = one increment of progress.
- Rendering is the UX — don't dump walls of terminal text for substantive content.
- The reward page is the positive-feedback moment. Make it feel like a real win.
- Custom work is first-class. Don't force the learner onto the rails.
- The final task's reward is the hand-off to real research: "you're ready — your capstone is the starting point of your real work."
