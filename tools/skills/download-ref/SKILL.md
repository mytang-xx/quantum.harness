---
name: download-ref
description: Use when the user pastes an arXiv ID, a DOI, a paper title, a local PDF path, or a bibliography stub and wants it added to the harness's methodology references — phrases like "download this arXiv", "add a DMRG reference", "pull in DOI 10…", "render this PDF", "add a bibliography stub for".
---

# download-ref

Renders methodology PDFs into Markdown under `knowledge-base/literature/<method>/`
and indexes them. Raw PDFs and extracted figures stay local (gitignored). The
workflow MUST be run via the bundled scripts — manual editing of `INDEX.md` or
rendered Markdown is not the intended path.

<example name="activate good">
User: "Pull arXiv 1008.3477 into the DMRG references." → download-ref fires.
</example>

<example name="activate not-applicable">
User: "Cite Hewson 1993 in the run report." → download-ref does NOT fire (citation already in KB); just cite directly.
</example>

## When to activate

Trigger phrases: "download this arXiv ID", "add a DMRG reference", "pull in
DOI 10...", "render this PDF I have", "add a bibliography stub for ...".

This is the repo-local adaptation of the `zlp-harness` download workflow. The
upstream workflow assumes a `.knowledge/` root; this harness uses
`knowledge-base/` and organizes methodology references by method.

## Layout

For method slug `<method>`:

```text
knowledge-base/literature/<method>/
  INDEX.md
  <rendered-reference>.md
  .raw/      # metadata + PDFs, gitignored
  .figures/  # extracted PDF images, gitignored
```

| Path | Committed? |
|---|---|
| `INDEX.md` | YES |
| `<rendered-reference>.md` | YES |
| `.raw/` | NO (gitignored) |
| `.figures/` | NO (gitignored) |

Method slugs MUST match an existing method card slug under
`knowledge-base/methods/<method>` when one exists. Use these canonical slugs:

```text
dmrg
tebd
ed
vmc-nqs
anderson-impurity
spectral
finite-t
dmft
qmc
```

Introduce a new slug only when no existing method card matches the
methodology.

## Scripts

The helper scripts are bundled with this skill:

```sh
SCRIPTS="$(pwd)/tools/skills/download-ref/scripts"
```

They are idempotent. Re-running a manifest skips existing metadata/PDFs and
overwrites rendered markdown from raw sources.

## Workflow

Run all six steps in order for a new manifest. Steps 3–5 (fetch / render /
index) are idempotent and safe to re-run; step 2 (manifest authoring) is your
edit. Step 6 (verify) is REQUIRED before reporting.

### 1. Prepare a method folder

```sh
METHOD=dmrg
KB="$(pwd)/knowledge-base/literature/$METHOD"
mkdir -p "$KB"
```

### 2. Build a manifest

Every `arxiv` / `doi` entry is an object with at minimum an `id`. Use arXiv IDs
without `arXiv:` and without version suffixes (old-style `cond-mat/0701105` is
fine); DOIs verbatim. Stubs are for books or closed references that should be
indexed but cannot be downloaded.

Optional fields pin per-paper overrides on top of Semantic Scholar. The
renderer is mechanical — the only way to correct a wrong S2 field is to
override it here. When `venue` is overridden, the body **Citation:** line
uses it verbatim (no splicing of volume/pages).

| Field | When to set |
|---|---|
| `title` | S2 returns wrong or empty title |
| `authors` | S2 drops diacritics or carries a typo |
| `year` | S2 reports arXiv submission year, not publication year |
| `venue` | S2 stores subject category; use for verbatim citation |
| `note` | Free-form annotation surfaced in INDEX.md |

```json
{
  "arxiv": [
    {"id": "1008.3477"},
    {
      "id": "1610.03042",
      "year": 2017,
      "venue": "SciPost Physics 2, 003 (2017)"
    }
  ],
  "doi": [
    {
      "id": "10.1007/BFb0106062",
      "authors": "Alexander Weiße, Holger Fehske",
      "venue": "Lecture Notes in Physics 739, Springer (2008)"
    }
  ],
  "stub": [
    {
      "slug": "hewson-1993-kondo-problem",
      "title": "The Kondo Problem to Heavy Fermions",
      "authors": "A. C. Hewson",
      "year": "1993",
      "note": "Canonical book reference; publisher access required."
    }
  ]
}
```

### 3. Fetch metadata and PDFs

```sh
python3 "$SCRIPTS/fetch_metadata.py" \
  --kb "$KB" \
  --manifest "$MANIFEST" \
  --download-arxiv-pdfs
```

The helper writes to `$KB/.raw/`. For DOI references, it tries Semantic Scholar
metadata and uses an arXiv preprint when one is available.

### 4. Render markdown

Rendering uses `pymupdf4llm` when installed, then falls back to `markitdown` or
`pdftotext`. If `pymupdf4llm` is missing, full text can still render but figures
may be absent.

| Use case | Command |
|---|---|
| Standard render (manifest) | `python3 "$SCRIPTS/render.py" --kb "$KB" --manifest "$MANIFEST"` |
| Single PDF in hand | `python3 "$SCRIPTS/render.py" --pdf sources/paper.pdf --out sources/paper.md` |
| Long book/lecture notes | add `--text-only` |

### 5. Regenerate the method index

```sh
python3 "$SCRIPTS/index.py" \
  --kb "$KB" \
  --title "$METHOD methodology references" \
  --source-note "Methodology references for the quantum many-body physics harness. Raw PDFs and extracted figures are local-only and gitignored."
```

Keep the title/source-note stable for repeat runs in the same method folder.

### 6. Verify

```sh
git check-ignore "$KB/.raw/" "$KB/.figures/" || true
test -f "$KB/INDEX.md"
find "$KB" -maxdepth 1 -name '*.md' -print
```

<checklist name="verify-render">
- `.raw/` and `.figures/` are gitignored (verify with `git check-ignore`)
- `INDEX.md` exists at the method root
- Each manifest entry has a corresponding `.md` file at the method root
- Each entry's `INDEX.md` row marks `full_text: yes / no / stub` correctly
</checklist>

Report the rendered files, which entries have `full_text: yes`, and which are
metadata-only or stubs.

## Notes

- DO NOT commit `.raw/` or `.figures/`.
- DO NOT put multiple methods in one folder; one method folder per methodology.
- For paywalled books, create a stub entry — DO NOT fabricate a PDF.
