---
name: verify-kb-anchors
description: Use when verifying that numerical claims in a knowledge-base card are grep-supported by their cited literature. Dispatches a subagent that audits each row of the card and reports unsupported claims. Compose with `/reproduce-paper` before any computation against KB benchmarks; also useful as a pre-commit gate after editing a KB card.
---

# verify-kb-anchors

Audit a KB card's numerical anchors against the rendered literature it cites. Reports rows whose claimed numbers / phrases are not literally present in the source. Generic — works for any KB card and any literature folder.

## When to activate

- A user invokes `/reproduce-paper` and the harness is about to compare its results against KB benchmarks. Run this first so any benchmark mismatch surfaces *before* compute is spent.
- A skill author has just edited a KB card and wants pre-commit verification.
- A reviewer wants to audit a card for hallucinations.

## Inputs

- *KB card path* — e.g., `knowledge-base/magic-benchmarks.md`.
- *Literature folder(s)* — e.g., `knowledge-base/literature/magic/`. May be inferred from the card's citations.
- *Optional run-tag whitelist* — names of repo runs whose harness anchors are accepted without re-running compute.

## Provenance discipline (per AGENTS.md)

Every numerical anchor on a KB card must carry one of three tags:

- *Literal* — verbatim passage from a rendered literature file, with line number.
- *Analytic* — closed-form value (e.g., stabilizer-state limit, free-particle exponent).
- *Harness anchor* — empirical value from a tagged run in this repo with a cross-check method (e.g., DMRG-vs-ED at small `L`).

The verifier audits each tag against its declared source. Untagged numerical entries fail the audit on principle.

## Workflow

1. **Parse the KB card.** Identify rows with numerical anchors or quoted passages. Read the section structure.
2. **Locate citations per row.** A literal-tagged row should cite `<file>` with a line number or section. An analytic-tagged row should derive from a stated definition or limit. A harness-anchor row should name a run + cross-check.
3. **For each *Literal* anchor**: open the cited file and grep for either (a) the verbatim quoted passage, or (b) the numerical value (allow modest format variation: `0.844` vs `0.84` vs `0.8(4)`). On match, mark ✓; on no match, mark ✗ unsupported. On near-match (number close but not literal), mark ⚠ ambiguous and report both candidate matches.
4. **For each *Analytic* anchor**: confirm the row states the derivation source (a definition / limit / closed-form). No grep needed; mark ✓ if the source is stated, ⚠ if the source is unstated.
5. **For each *Harness anchor***: confirm the row names a run and a cross-check; mark ✓ if both are present and the run path resolves under `results/<run>/`, ⚠ if either is missing.
6. **Untagged numerical row**: mark ✗ unsupported (the row doesn't satisfy the discipline; either tag it or remove it).
7. **Report.** Build a per-row report and write it to a temporary report file (or stdout). Do not modify the KB card.

## Output

A structured report (markdown). Suggested format:

```markdown
# /verify-kb-anchors report — <kb-card> — <date>

| Row | Tag | Status | Notes |
|---|---|---|---|
| `m_2(h_c) ≈ 0.07–0.11` | Literal | ✗ unsupported | Numbers not in `2305.18541_…md`; grep for `0.07`, `0.11` returned 0 hits. |
| `ν ≈ 0.844` | Literal | ✓ verified | Literal match at `2305.18541_…md` line 1098. |
| `m_2(h=1, L=8) = 0.2132` | Harness anchor | ✓ verified | Run `tfim_m2_finite_size`; `M_2(L=8) = 1.7055` ED-vs-MPS-vs-Markov agreement to 1e-8. |

## Action items
- Remove or re-ground 1 row (`m_2(h_c) ≈ 0.07–0.11`).
- Optional: add line-number references to 2 rows tagged Literal but missing line numbers.
```

The verifier does NOT modify the KB. It only reports. Cleanup is a separate task — Polisher subagent or human editor — that the user dispatches based on the report.

## Discipline (hard rules)

- Read-only on KB and literature.
- Be conservative on "ambiguous": prefer ✗ unsupported over rationalized near-matches.
- For *Analytic* and *Harness anchor* tags, the tag itself is sufficient provenance; do not double-grep these against the literature.
- Generic over KB card and literature folder; no card-specific or paper-specific logic.
- Output goes to a report file, never edits in place.

## Composition

- Called by `/reproduce-paper` before compute, so benchmarks are validated upfront.
- Called by skill / KB authors as a pre-commit gate.
- The audit report is then handed to a Polisher (for cleanup) or to the human (for ratification). The verifier never decides what to do — it only surfaces what's wrong.

## Anti-patterns (auto-reject)

- Modifying the KB card from inside this skill.
- Tolerating untagged numerical entries by inventing a tag.
- Grep-matching a substring of a number out-of-context (e.g., the literal text `1.04` in the file is a reference number, not a benchmark value).
- Forwarding "everything verified" without surfacing the per-row table.
