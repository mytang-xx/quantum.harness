---
name: run-stage
description: Use when a method card declares a multi-stage pipeline and the agent needs to execute one stage with explicit inputs, outputs, retries, and a manifest. Generic over the stage list; the method card declares the stages.
---

# run-stage

Execute one stage of a multi-stage pipeline declared in a method card. Manage inputs / outputs as files, support retries, emit a manifest for downstream stages. Generic over what the stage actually computes — the method card declares stages, this primitive runs them.

Per AGENTS.md "multi-stage orchestration lives in method cards, not skills", the pipeline definition belongs to the method card (e.g., `knowledge-base/methods/pauli-markov.md` declares Stage 0 / 1 / 2 / 3 with their input and output artifacts). This skill is the executor that walks across the declared stages.

## When to activate

- A method card's workflow declares explicit stages and the calling skill needs to walk through them.
- A long-running calculation needs checkpoint/resume granularity.
- An `(L, parameter)` grid needs per-cell stage execution (paired with `/slurm-grid`).
- After interruption (network, scheduler, OOM), to resume from the last successful stage.

## Inputs

- *Method card path* and *stage identifier* (e.g., `knowledge-base/methods/pauli-markov.md` Stage 1).
- *Stage inputs* — files / parameters the method card declares as the stage's input.
- *Run directory* — `results/<run>/` (or a subdirectory thereof).
- *Retry policy* — default 1 retry on transient failure (filesystem, scheduler), 0 retries on logic failure. The calling skill or user overrides.

## Workflow

1. Parse the method card's stage declaration: input artifacts, output artifacts, executor (`julia`, `python`, …), runtime knobs.
2. Verify all input artifacts exist; if missing, surface a precise message naming the missing file and the prior stage that produces it.
3. Verify the output artifact does *not* already exist (or the calling skill explicitly requested overwrite). Resume-friendly: if the output exists and is well-formed, return it without re-running.
4. Execute the stage. Stream stdout / stderr to `results/<run>/<stage>.log`. The launched script must flush stdout after each progress line (per AGENTS.md "Output norms" — block-buffered stdout hides progress when redirected to a file or slurm log). For programs whose source you do not control, wrap with `stdbuf -oL` / `unbuffer` / `srun --unbuffered`.
5. On success: write `results/<run>/<stage>.manifest.json` recording the inputs, outputs, runtime, hash of the script, and any method-card-declared diagnostics (e.g., `τ_int`, energy variance, residual). The manifest is the input to the next stage and to `/run-report`.
6. On failure: classify (transient / logic / OOM / convergence-out-of-budget), retry per policy, surface honestly if not recoverable.

## Manifest schema

```
{
  "stage_id": "<method-card>:<stage_name>",
  "started_at": "<iso>",
  "completed_at": "<iso>",
  "inputs": [<list of input artifact paths>],
  "outputs": [<list of output artifact paths>],
  "runtime_seconds": <float>,
  "script_hash": "<sha>",
  "diagnostics": {<method-card-declared kvs>},
  "status": "success" | "failed" | "skipped"
}
```

The manifest is the *single source of truth* for what was run. `/run-report` consumes manifests across stages to assemble the writeup.

## Output

- Stage's declared output artifacts (e.g., `state.h5`, `chain.h5`).
- `results/<run>/<stage>.manifest.json` — the manifest above.
- `results/<run>/<stage>.log` — full stdout/stderr.

## Composition

- Pairs with `/slurm-grid` (each grid cell is a stage execution).
- Multiple `/run-stage` calls walk the method card's stage list in order; the calling skill orchestrates.
- After all stages complete, `/run-report` consumes the manifests and produces the consolidated writeup.

## Notes

- This skill does *not* know what the stage computes. The method card declares it; this skill runs it.
- The manifest schema is intentionally minimal: stage id, inputs/outputs, status, plus method-card-declared diagnostics. Do not pollute with skill-specific keys.
- For methods that do not declare stages (single-shot calculations), this primitive is unnecessary — the model skill's standard runner is sufficient.
- The skill operates against absolute paths only. Relative paths in method cards are resolved against the run directory.
