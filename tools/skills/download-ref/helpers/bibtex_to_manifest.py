#!/usr/bin/env python3
"""Build a per-method manifest JSON from `ref.bib`.

ref.bib is the source of truth for methodology references. This helper
extracts the subset tagged with `keywords = {<method>, ...}` and emits
the manifest schema that `fetch_metadata.py` / `render.py` consume:

    {
      "arxiv": [{"id": "1008.3477", "year": 2010, "venue": "..."}, ...],
      "doi":   [{"id": "10.x/y",    "authors": "..."}, ...],
      "stub":  [{"slug": "...", "title": "...", "authors": "...", "year": "..."}]
    }

The arxiv/doi entries carry only override fields that were explicitly set
in the bib entry (so Semantic Scholar fills in the rest); the stub entries
are fully self-describing.

Usage:
    python3 bibtex_to_manifest.py /abs/path/to/ref.bib --method dmrg > manifest.json
    python3 bibtex_to_manifest.py /abs/path/to/ref.bib              > manifest.json  # all
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ENTRY_RE = re.compile(r"@(\w+)\s*\{\s*([^,\s]+)\s*,(.*?)\n\}\s*", re.DOTALL)
FIELD_RE = re.compile(r"^\s*(\w+)\s*=\s*(\{(?:[^{}]|\{[^{}]*\})*\}|\"[^\"]*\")\s*,?\s*$",
                      re.MULTILINE)
ARXIV_RE = re.compile(r"^\s*\d{4}\.\d{4,5}(v\d+)?\s*$|^\s*[a-z\-]+/\d{7}(v\d+)?\s*$")


def strip_value(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("{") and raw.endswith("}"):
        raw = raw[1:-1]
    elif raw.startswith('"') and raw.endswith('"'):
        raw = raw[1:-1]
    return raw.replace("\\{", "{").replace("\\}", "}").strip()


def parse_bib(text: str) -> list[tuple[str, str, dict[str, str]]]:
    """Return [(entry_type, cite_key, fields_dict), ...]."""
    out: list[tuple[str, str, dict[str, str]]] = []
    for m in ENTRY_RE.finditer(text):
        etype, key, body = m.group(1).lower(), m.group(2), m.group(3)
        fields: dict[str, str] = {}
        for fm in FIELD_RE.finditer(body):
            fields[fm.group(1).lower()] = strip_value(fm.group(2))
        out.append((etype, key, fields))
    return out


def parse_keywords(raw: str) -> list[str]:
    if not raw:
        return []
    return [w.strip() for w in re.split(r"[,;]", raw) if w.strip()]


def extract_arxiv_id(fields: dict[str, str]) -> str | None:
    eprint = fields.get("eprint")
    if not eprint:
        return None
    archive = (fields.get("archiveprefix") or fields.get("eprinttype") or "").lower()
    if archive and "arxiv" not in archive:
        return None
    eprint = eprint.strip()
    if not ARXIV_RE.match(eprint):
        return None
    return re.sub(r"v\d+$", "", eprint)


def extract_doi(fields: dict[str, str]) -> str | None:
    doi = fields.get("doi")
    if not doi:
        return None
    doi = doi.strip()
    doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi, flags=re.IGNORECASE)
    return doi if doi.startswith("10.") else None


def override_fields(fields: dict[str, str]) -> dict[str, str | int]:
    """Pull author/year/venue/note from a bib entry to use as S2 overrides."""
    out: dict[str, str | int] = {}
    if "author" in fields:
        # BibTeX joins with ' and '; render.py expects comma-separated for display.
        authors = [a.strip() for a in re.split(r"\s+and\s+", fields["author"]) if a.strip()]
        if authors:
            out["authors"] = ", ".join(authors)
    if "year" in fields and fields["year"]:
        try:
            out["year"] = int(fields["year"])
        except ValueError:
            out["year"] = fields["year"]
    venue = fields.get("journal") or fields.get("booktitle") or fields.get("howpublished")
    if venue:
        out["venue"] = venue
    if "title" in fields:
        out["title"] = fields["title"]
    if "note" in fields:
        out["note"] = fields["note"]
    return out


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("bib", type=Path, help="Path to ref.bib")
    p.add_argument("--method", default=None,
                   help="Filter entries whose keywords contain this method slug. "
                        "Omit to include all entries.")
    args = p.parse_args(argv)

    if not args.bib.exists():
        print(f"missing: {args.bib}", file=sys.stderr)
        return 1

    arxiv: list[dict] = []
    doi: list[dict] = []
    stub: list[dict] = []
    n_total = 0
    n_kept = 0

    for etype, key, fields in parse_bib(args.bib.read_text()):
        n_total += 1
        if args.method:
            kws = parse_keywords(fields.get("keywords", ""))
            if args.method not in kws:
                continue
        n_kept += 1

        overrides = override_fields(fields)
        arxiv_id = extract_arxiv_id(fields)
        doi_id = extract_doi(fields)

        if arxiv_id:
            entry: dict = {"id": arxiv_id}
            # Drop title — render.py prefers S2 unless explicitly overridden.
            for k in ("year", "venue", "authors", "note"):
                if k in overrides:
                    entry[k] = overrides[k]
            arxiv.append(entry)
        elif doi_id:
            entry = {"id": doi_id}
            for k in ("year", "venue", "authors", "note"):
                if k in overrides:
                    entry[k] = overrides[k]
            doi.append(entry)
        else:
            # @book / @misc with no DOI/arXiv → stub.
            stub.append({
                "slug": key,
                "title": overrides.get("title", ""),
                "authors": overrides.get("authors", ""),
                "year": str(overrides.get("year", "")),
                "note": overrides.get("note", ""),
            })

    out = {"arxiv": arxiv, "doi": doi}
    if stub:
        out["stub"] = stub

    json.dump(out, sys.stdout, indent=2, ensure_ascii=False)
    sys.stdout.write("\n")
    scope = f"method='{args.method}'" if args.method else "all entries"
    print(f"{n_kept}/{n_total} entries kept ({scope}): "
          f"{len(arxiv)} arxiv, {len(doi)} doi, {len(stub)} stub",
          file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
