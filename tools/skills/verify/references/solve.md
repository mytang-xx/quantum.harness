# solve

Audit a `/solve` result or interpretation.

| Axis | Pass condition |
|---|---|
| setup | Method/model cards and stack match the problem; environment state is recorded. |
| limits | At least one relevant exact/trivial/known-limit check is run or justified unavailable. |
| symmetry | Conserved quantities and sector choices match the model/card. |
| convergence | Size, bond dimension, sample, or solver tolerance evidence supports the claimed precision. |
| claim | User-facing result is no stronger than the evidence. |

For frontier interpretation-only answers, replace numeric convergence with literature-source coverage and claim boundedness.
