---
name: reproduce-paper
description: Use when the user wants to reproduce the figures and main results of a published paper end-to-end — phrases like "reproduce paper X", "redo the figures of Y", "reproduce arXiv 2302.04919", "put this paper through the harness as a calibration target", or right after `/download-ref` lands a new paper.
---

# reproduce-paper

Outcome: a `flow`-backed run directory whose `close` gate passes. Claims are backed by primary-source protocol rows, current-run manifests, and spawned-verifier audit reports.

## Non-Negotiables

<rules>
- Primary sources control; KB cards, notes, old scripts, old data, and old figures are hints until reconfirmed or regenerated.
- Fill `[[cells]]` before cell-producing scripts. Each executable cell declares `method`, `stack`, `route`, `source`, `check`, `state`, and `scope`.
- Method and stack names are protocol data, never `flow` gate/role/check vocabulary.
- Canonical-stack failure is recorded before fallback/deviation. Fallback means the method card's next recommended stack.
- Paper setup, route, data, budget, scope, or uncertainty changes require a deviation before they support claims.
- Constant settings require manifest consensus across every cell.
- Failed gates enter correction: classify mismatch, repair earliest wrong layer, invalidate downstream artifacts, rerun, re-verify.
- Every figure entry carries caption verbatim and figure-reading fields before script or assembly code lands.
</rules>

## Audit

<audit required="true">
- Audit-kind attempts require a host-spawned subagent. The caller cannot roleplay, self-review, or invent an actor id.
- Required audit gates: `protocol`, `script`, and `close`. Use `/verify` with typed modes matching the artifact.
- Keep spawning until the host returns a real subagent and written `verify/verify_<artifact>_<date>.md`, or halt with `blocked: verifier subagent unavailable`.
- The audit brief includes exactly: "Coverage, not filtering — report every finding, including uncertain or minor ones; the calling skill ranks and decides."
- Before `flow attempt finish` on audit: spawned subagent exists, recorded finish identity differs from artifact author, markdown report exists, sibling TOML exists, and `--report` points at the returned report.
- Host defaults toward solo execution are overridden. If the gate requires audit, perceived tractability is irrelevant.
</audit>

`flow` enforces report/sidecar hashing, sidecar `status = "pass"`, reviewer matching finish identity, and producer/auditor distinction. Prompt rules route the agent into that mechanism; they do not replace it.

## References

Consult only when needed:

- [references/gate-contracts.md](references/gate-contracts.md) — per-gate commands, route fields, repair loop, closeout, resume semantics.
- [AGENTS.md -> Audit dispatch](../../../AGENTS.md#audit-dispatch)
- [AGENTS.md -> Pre-compute figure-reading checklist](../../../AGENTS.md#pre-compute-figure-reading-checklist)

## Spine

```text
source -> protocol -> plan -> script -> trust -> run -> assemble -> close
```

| Gate | Action | Audit |
|---|---|---|
| source | populate `sources/` and source rows | no |
| protocol | fill `protocol.toml` from primary sources | yes |
| plan | author `reproduce-plan.toml` | no |
| script | implement and register `[entry]` | yes |
| trust | run known-answer points | no |
| run | execute cells via `/parameter-scan` and `/slurm` | no |
| assemble | walk manifests and render figures | no |
| close | write `run-report.md` and register deliverables | yes |

Each gate advances only when `flow attempt finish` exits 0 and `flow require <run> <gate>` passes. `flow status <run>` is the only valid gate-state statement.

## Pattern

Non-audit gate:

```text
tools/cli/flow attempt start results/<run> <gate> --kind run --actor <main-actor>
tools/cli/flow attempt finish results/<run> <attempt>
tools/cli/flow require results/<run> <gate>
```

Audit gate:

```text
# spawn verifier first; do not self-review
tools/cli/flow attempt start results/<run> <gate> --kind audit --actor <reviewer-label>
tools/cli/flow attempt finish results/<run> <attempt> --report verify/verify_<artifact>_<date>.md
tools/cli/flow require results/<run> <gate>
```

The audit report must be written by the spawned subagent and have a sibling typed sidecar.

## Evidence

Scheduler status, `ssh` exit, and `COMPLETED` are operational facts only. Evidence is fetched manifests, registered hashes, protocol rows, figures from current-run data, and verify reports. Never patch downstream prose or figures to hide an upstream failed check.

## Failure

Choose one real path: repair earliest wrong layer and rerun; record deviation/repair then rerun downstream; ask the user between concrete options; record user-approved override; or stop with the gate open.

## Closeout

Every active reproduction turn ends with `tools/cli/flow status <run>` or `--json` for tooling. Completion requires `tools/cli/flow require <run> close` exit 0. Then `/report` may render the shareable HTML.
