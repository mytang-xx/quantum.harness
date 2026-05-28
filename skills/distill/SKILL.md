---
name: distill
description: Use when distilling a method contributor's published work into the concrete tricks they use — for expert-interview prep or method-skill enrichment. Triggers include "distill <researcher>", "what tricks does <expert> use for <method>", "prep to interview <contributor>", "extract <expert>'s method craft".
---

# distill

Distill how a contributor *uses a method*, mined from their papers, into a curated list of concrete **tricks** — grouped by concern and rendered as one webpage, for preparing an expert interview. (The paper-based sibling of sci-brain's `soul-extraction`, which mines conversations, not papers.)

## Scope

This skill owns intake → corpus → trick extraction → one HTML dossier. It does not run calculations or reproduce figures. Ingest composes with `/download-ref`; rendering composes with `/report`; it does not duplicate either.

## What a "trick" is

A repeatable technical move the contributor uses to make the method work better / cheaper / more trustworthy — not a result or a topic. Keep a trick only if it passes **all four** tests:

- **decision-changing** — changes whether the result is right or feasible;
- **non-obvious / method-specific** — a competent practitioner would *not* do it by default, and it is **specific to this method's own challenges**, not shared across the broader domain. (Bond-dimension convergence is common to every tensor-network method → trivial; the temperature vs imaginary-time-step trade-off is specific to finite-temperature evolution → keep. Also cut "benchmark against the exact solution" and similar table-stakes.)
- **transferable** — a reader could apply it to their own calculation;
- **attributable** — pinned to a specific location (figure / equation / section).

No frequency gate: a trick used in a single paper still counts if it passes the four tests.

## The lens (how to hunt tricks)

Sweep each paper through these concerns; only populated ones reach the output.

- **Scope / tooling / cost** — what the method does · typical cases (concrete problems + sizes reached) · best-fit scenario · boundary (what it can't do) · software & tools · implementation difficulty (lines of code + hardest parts) · compute-cost estimate (CPU core-hours) · improvement directions.
- **Method-usage** — setup & parameters · success / validation · failure modes · taking the limit · systematic bias.
- **Scientific** — problem framing & mappings · observable design · model / regime choice.

**Method-focused, not problem-focused.** Every concern is about *this method* (and the contributor's own codes), never a menu of alternative methods for the same problem — e.g. *software & tools* lists what implements this method, not what else could solve the problem. The method's own lineage (its successors / developed family) is in scope; genuinely *other* methods get at most a line or two for contrast, never a focus. *Improvement directions* is surveyed but **left blank in the default report** (answered on request).

## Flow

1. **Intake (ask first).** Ask for the **expert name**, the **method / variant**, and optionally a **publication source** (Scholar / arXiv / ORCID link or a paper list). If the name is ambiguous (several researchers share it), the method scope is unclear, or the source is missing, clarify in brainstorming style — one question at a time, never guess. Also fix the **output path** (method-group dir + variant abbreviation); when these are ambiguous — e.g. the variant's literature slug differs from its method-skill group, as LTRG (slug `ltrg`, group `/method-peps`) — present 2–3 path options and confirm, never guess.
2. **Resolve corpus.** Find the expert's *method-relevant* papers (from the given source, else web-search the name + method). Rank by relevance + impact; keep a working set (~15–25).
3. **Confirm papers before downloading.** Print a table — `Paper | Authors | Method usage | Year` — with the **chosen expert's name bolded** in each author list (this also disambiguates identity). Ask the user to confirm or trim the set. Download nothing until confirmed.
4. **Download** the confirmed set via `/download-ref` into `.knowledge/literature/<method>/`.
5. **Sweep & extract.** Read each paper through the lens; pull the technical *moves* (the "how", not the results), each with its evidence location. Method-level concerns — typical cases, software & tools, implementation difficulty — may need a brief survey beyond the corpus (web, parallel subagents); mark anything the sources don't state as an interview target rather than inventing it.
6. **Select by importance.** Apply the four tests; drop the trivial.
7. **Confirm tricks.** Present the survivors one at a time with their evidence; user keeps / cuts / edits.
8. **Render the dossier** via `/report`, sections in this order: **Scope, tooling & cost** → **Method-usage tricks** → **Scientific tricks** → **Improvement directions** (left blank). Open the HTML.

## Output shape

One webpage at `docs/<method-group>/<method-abbrev>-<expert>-distillation.html` (e.g. `docs/peps/ltrg-weili-distillation.html`). The group dir matches the existing `docs/<method>/` convention (those dirs already hold `interview.html` / `review.html`); the filename prefixes the specific method variant and the expert, both fixed at intake. Four sections (the last left blank), scientific-report register — declarative and impersonal, abbreviations spelled out, no colloquialisms.

**Scope, tooling & cost** — one table (only rows with real content; method-level rows may be surveyed beyond the corpus):

| Item | Content | Evidence |
|---|---|---|
| What it does | … | … |
| Typical cases | concrete problems + sizes / temperatures reached | … |
| Best-fit | … | … |
| Boundary | … | … |
| Software & tools | what implements *this* method + its own key parameters | … |
| Implementation | lines of code + hardest parts | … |
| Compute cost (core-hours) | … | … |

**Method-usage tricks** and **Scientific tricks** — one table each:

| Trick | What it is | Why it matters | Evidence |
|---|---|---|---|

**Improvement directions** — a final section left **blank** by default (a dashed placeholder; answered on request).

Evidence is the location in the paper (figure / equation / section). Mark the scannable keypoints with `==…==` (renders as a yellow highlight) and bold each trick name, so a human can skim the page. Keep `$…$` math **outside** `==…==` and `**…**` spans — a highlight or bold span cannot contain math and will silently fail to render.

Build the sections as `/report` `table` blocks, then render and place the page:

1. write `report.json` into a working dir `docs/<method-group>/<method-abbrev>-<expert>/`;
2. `python3 skills/report/render_report.py docs/<method-group>/<method-abbrev>-<expert>` — emits `report.html` in that dir;
3. move it up to the flat page: `docs/<method-group>/<method-abbrev>-<expert>-distillation.html`;
4. open it (`open` on macOS, `xdg-open` on Linux).

The working dir keeps `report.json` as the source, so the page re-renders after edits.

## UX rules

- **One decision at a time**, brainstorming style: 2–3 real options per question, recommend only with a stated reason; use the question tool when available, else number choices.
- **Key points only — never a wall of text.** Every message is a few sentences or one compact table.
- **Confirm, don't guess.** Ambiguous expert identity, method scope, or paper set → ask. Always confirm the paper table before any download.
- **Scientific-report register, no jargon.** Declarative and impersonal — no colloquialisms (e.g. "the answer for free", "which knob to turn"). Keep proper scientific terms but gloss every symbol and abbreviation on first use — assume nothing (if you define $D_c$, define $D$ too).
- **Stay honest.** Each trick cites a real location; if a paper doesn't state something (e.g. core-hours), say so and mark it an interview target rather than inventing it.
