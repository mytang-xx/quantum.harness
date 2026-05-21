# plan

Compare `reproduce-plan.toml` and `run_spec.json` against the protocol and methodology source.

| Axis | Pass condition |
|---|---|
| Coverage | Every non-assumption claim has an executable cell route, artifact target, and check. |
| Graph | Figure dependencies and shared artifacts match the protocol. |
| Provenance | Cells carry source ids, claim ids, deviation ids, method, stack, route, check, state, scope, and settings. |
| Reference | Trusted-reference cells exercise the real run code path at easier scale. |
| Hints | Old data, old figures, and old plans never serve as evidence. |

Severity tags: `covered`, `missing-route`, `plan-gap`, `stale-dependency`, `provenance-gap`, `weak-reference`, `hint-leak`.
