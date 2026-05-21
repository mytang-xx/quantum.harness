# close

Audit the final run report, declared entry, protocol, verify reports, and manifest set.

| Axis | Pass condition |
|---|---|
| Claims | Every report claim maps to a protocol claim, result artifact, and verify report. |
| Provenance | Manifests carry hashes, claim ids, deviation ids, method, stack, route, check, state, and scope. |
| Gates | Every flow gate passed, or partial/override state is explicit. |
| Deviations | Paper differences appear in report and link to protocol deviations. |
| Repairs | Each repair lists invalidated gates; those gates have fresh passing attempts after repair. |
| Reproduce | Declared entry and run command work from a fresh checkout. |
| HTML | If `report_*.html` is in scope, every editorial sentence traces to `sourced_by`; rendered HTML follows `docs/DESIGN.md`; mobile 375x667 has no overflow and tap targets are at least 44x44px. |

Severity tags: `supported`, `unsupported-claim`, `hint-leak`, `stale-artifact`, `provenance-gap`, `open-gate`, `hidden-deviation`, `open-repair`, `repro-gap`, `editorial-leak`, `design-drift`.
