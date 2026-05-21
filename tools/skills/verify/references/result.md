# result

Audit numerical and figure results against declared references.

| Axis | Pass condition |
|---|---|
| Numeric | Each numerical claim matches paper/reference error bars, or mismatch is explicitly scoped. |
| Figure | Apply AGENTS.md figure-reading checklist against assembled image, caption, protocol, and script. |
| Manifest | Result artifact is current-run evidence and manifest route fields match the protocol cell. |
| Hash | Artifact hash matches current registration. |

Severity tags: `match`, `near`, `disagree`, `caption-misread`, `axis-mismatch`, `state-mismatch`, `window-mismatch`, `stale-artifact`, `provenance-gap`.
