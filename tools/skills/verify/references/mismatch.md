# mismatch

Audit a failed gate. Inputs: failing check, expected vs observed, protocol, source passages, scripts, manifests, and prior repair attempts.

| Axis | Pass condition |
|---|---|
| Mismatch | Concrete expected-vs-observed disagreement is cited. |
| Class | Classify as `source_misread`, `unsupported_assumption`, `convention_mismatch`, `plan_gap`, `script_bug`, `stack_or_remote_failure`, `stale_or_provenance_gap`, `insufficient_convergence`, `statistical_noise`, `paper_ambiguity`, or `out_of_scope`. |
| Layer | Name earliest wrong layer: source/protocol, trusted reference, plan/run spec, script/aggregator, stack, raw cells, figure/report, or paper scope. |
| Invalidate | Name downstream gates that can no longer support claims. |
| Repair | Next accepted artifact records repair with invalidated gates and rerun state. |

Severity tags: `classified`, `under-evidenced`, `source-layer`, `plan-layer`, `script-layer`, `compute-layer`, `assembly-layer`, `report-layer`, `scope-layer`.
