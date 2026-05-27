---
name: track-starter
description: Use when a student wants to start from challenge tracks, choose a track paper, compare available track tasks, or asks for the starter paper before reproducing a paper.
---

# track-starter

Read the track READMEs, summarize the available student reproduction tasks, let the student choose a track, then hand off to `/reproduce-paper` targeting **all** figures/tasks listed for that track.

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
3. **Ask one question.** Always exactly one question, never two. Build the options as **one option per track** (not per figure). Selecting a track means reproducing **all** figures/tasks listed in its README:
   - For each track that has a paper, create one option: e.g. `ed — Exact Diagonalization` with a description listing the paper and all figures.
   - Group tracks with no paper listed into a single catch-all option: `Other track (no paper listed yet)` with a description listing their names.
   - If total options exceed 4, collapse paperless tracks into one catch-all option.
   - Do not mark a recommendation unless the README explicitly labels a starter.
4. **If the student picks the catch-all option**, ask which paperless track they want, then ask for the paper/arXiv/DOI/title. Do not hand off until a concrete paper exists.
5. **Handoff.** Invoke `/reproduce-paper` with the selected paper, **all** figures/tasks from the README, the track id, and the exact README path used as source. Include a one-line summary of the track objective.

## Handoff Format

Use this shape when handing off:

```text
/reproduce-paper
Track: <track id> — <track title>
Source: tracks/<track>/README.md
Paper: <paper title, DOI/arXiv if listed>
Target: all figures — <list all figures/tasks from README>
Track objective: <one sentence from the README summary>
```

`/reproduce-paper` handles paper reading, setup card, method/tool selection, configuration, estimates, proposal, approval, execution, and report rendering.

## UX Rules

- Keep output under 10 lines before the choice.
- **Exactly one question per interaction.** One option per track — never per figure. Selecting a track reproduces all its listed figures.
- Number choices if the question tool is unavailable.
- No recommendation unless the README explicitly marks a starter target.
- If only one track has a concrete paper, still show all tracks (paperless ones in a catch-all option); let the student choose.
- Missing track metadata is a fact to surface, not a reason to fabricate a task.
