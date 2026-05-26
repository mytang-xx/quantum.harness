---
name: track-starter
description: Use when a student wants to start from challenge tracks, choose a track paper, compare available track tasks, or asks for the starter paper before reproducing a paper.
---

# track-starter

Read the track READMEs, summarize the available student reproduction tasks, let the student choose a track paper, then hand off to `/reproduce-paper` with a concrete paper/figure target.

## Scope

This skill owns track intake only. It does not read the paper, configure method parameters, estimate compute, write `run.json`, create reports, or run calculations. Once a target is selected, invoke `/reproduce-paper` and stop.

## Sources

Read `tracks/*/README.md` fresh. The README is the source of truth for:

- track id and title;
- reproduction target paper;
- figure or task list;
- references or software hints.

Do not invent a paper for a track whose README does not name one. If a README has only a title, mark the task as `not specified in README`.

## Flow

1. **Scan tracks.** Read all `tracks/*/README.md` files and extract a compact row per track:
   `track id | title | listed target | listed tasks`.
2. **Summarize.** Print a short table. Use plain English. For missing targets, write `No paper listed yet`.
3. **Ask one neutral choice.** Use the question tool when available; otherwise number the choices. Do not mark a recommendation. Each option should be one concrete track with its current target state.
4. **If the chosen track has no paper listed**, ask for the paper/arXiv/DOI/title to use for that track, or offer to choose a different track. Do not hand off until a concrete paper exists.
5. **If the chosen track has one paper and multiple listed figures/tasks**, ask which figure/task to reproduce. Use numbered choices and no recommendation unless the README explicitly labels one as starter.
6. **Handoff.** Invoke `/reproduce-paper` with the selected paper, figure/task, track id, and the exact README path used as source. Include a one-line summary of the track objective.

## Handoff Format

Use this shape when handing off:

```text
/reproduce-paper
Track: <track id> — <track title>
Source: tracks/<track>/README.md
Paper: <paper title, DOI/arXiv if listed>
Target: <figure/task selected>
Track objective: <one sentence from the README summary>
```

`/reproduce-paper` handles paper reading, setup card, method/tool selection, configuration, estimates, proposal, approval, execution, and report rendering.

## UX Rules

- Keep output under 10 lines before the choice.
- One question at a time.
- Number choices if the question tool is unavailable.
- No recommendation unless the README explicitly marks a starter target.
- If only one track has a concrete paper, still show all tracks; let the student choose.
- Missing track metadata is a fact to surface, not a reason to fabricate a task.
