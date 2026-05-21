# kb

Audit a KB card's anchors against literature. Apply AGENTS.md provenance discipline.

| Axis | Pass condition |
|---|---|
| Literal | Cited literature file contains the verbatim phrase; report line number. |
| Analytic | Row states a derivation from a definition or limit. |
| Harness anchor | Row names a `results/` path and a cross-check method. |
| Untagged | Any anchor missing Literal, Analytic, or Harness anchor is `fail`. |

Severity tags: `supported`, `unsupported`, `untagged`, `near-match`.
