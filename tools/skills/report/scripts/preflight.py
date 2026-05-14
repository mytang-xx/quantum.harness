#!/usr/bin/env python3
"""Pre-flight verifier for the /report skill — mechanical evidence consistency checks.

Usage:
  preflight.py <run-dir>

Exit codes:
  0  all checks pass
  1  one or more checks failed (issues printed to stdout as JSON)

Stdlib only (tomllib, json, hashlib, pathlib, re, sys, argparse).
"""
import argparse
import hashlib
import json
import re
import sys
import tomllib
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[4]


def fail(reason: str, **detail) -> dict:
    return {"status": "fail", "reason": reason, **detail}


def ok(check: str) -> dict:
    return {"status": "pass", "check": check}


def protocol_hash(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()[:12]


def check_protocol(run: Path) -> tuple[list[dict], dict | None]:
    p = run / "protocol.toml"
    if not p.exists():
        return [fail("protocol.toml missing", path=str(p))], None
    try:
        data = tomllib.loads(p.read_text())
    except tomllib.TOMLDecodeError as e:
        return [fail("protocol.toml does not parse", error=str(e))], None
    out = [ok("protocol.toml parses")]
    for section in ("artifact", "sources", "claims", "figures"):
        if section not in data:
            out.append(fail(f"protocol.toml missing required section [[{section}]]"))
        else:
            out.append(ok(f"protocol.toml has [[{section}]]"))
    return out, data


def check_run_report(run: Path) -> list[dict]:
    out = []
    p = run / "run-report.md"
    if not p.exists():
        return [fail("run-report.md missing", path=str(p))]
    text = p.read_text()
    for heading in ("Setup", "Settings", "Result", "Verification status",
                    "Evidence map", "Protocol status"):
        if not re.search(rf"^#+\s+{re.escape(heading)}", text, re.MULTILINE):
            out.append(fail(f"run-report.md missing required heading: {heading}"))
        else:
            out.append(ok(f"run-report.md has heading: {heading}"))
    return out


def check_claims_in_evidence_map(run: Path, claim_ids: list[str]) -> list[dict]:
    p = run / "run-report.md"
    if not p.exists() or not claim_ids:
        return []
    text = p.read_text()
    em = re.search(r"##\s*Evidence map(.*?)(?=^#|\Z)", text, re.MULTILINE | re.DOTALL)
    em_text = em.group(1) if em else ""
    out = []
    for cid in claim_ids:
        if cid in em_text:
            out.append(ok(f"claim {cid} appears in Evidence map"))
        else:
            out.append(fail(f"claim {cid} not found in Evidence map", claim=cid))
    return out


def check_cell_manifests(run: Path, expected_hash: str) -> list[dict]:
    out = []
    cells_dir = run / "cells"
    if not cells_dir.exists():
        return [fail("cells/ directory missing")]
    manifests = sorted(cells_dir.glob("**/manifest.json")) + sorted(cells_dir.glob("manifest_*.json"))
    if not manifests:
        return [fail("no cell manifests found under cells/")]
    n_current_run = 0
    n_hash_match = 0
    for m in manifests:
        try:
            d = json.loads(m.read_text())
        except json.JSONDecodeError:
            out.append(fail(f"cell manifest does not parse: {m.name}"))
            continue
        if d.get("evidence_class") == "current_run":
            n_current_run += 1
        if d.get("protocol_hash") == expected_hash:
            n_hash_match += 1
    out.append(ok(f"found {len(manifests)} cell manifests"))
    if n_current_run < len(manifests):
        out.append(fail(
            "some cell manifests lack evidence_class=current_run",
            count_with_class=n_current_run, total=len(manifests),
        ))
    if n_hash_match < len(manifests):
        out.append(fail(
            "some cell manifests have protocol_hash mismatch",
            count_matching=n_hash_match, total=len(manifests),
            expected_hash=expected_hash,
        ))
    return out


def resolve_path(path_str: str, run: Path) -> Path:
    p = Path(path_str)
    if p.is_absolute():
        return p
    candidate = REPO_ROOT / p
    if candidate.exists():
        return candidate
    return run / p


def check_figures(run: Path, figures: list[dict]) -> list[dict]:
    if not figures:
        return [fail("no [[figures]] entries declared in protocol.toml")]
    out = []
    for fig in figures:
        fid = fig.get("id", "<unknown>")
        for key in ("paper_path", "ours_path"):
            v = fig.get(key)
            if not v:
                out.append(fail(f"figure {fid}: {key} is empty"))
                continue
            path = resolve_path(v, run)
            if not path.exists():
                out.append(fail(f"figure {fid}: {key} does not resolve", path=str(path)))
            else:
                out.append(ok(f"figure {fid}: {key} resolves"))
        data_path = fig.get("data_path")
        if data_path:
            path = resolve_path(data_path, run)
            if not path.exists():
                out.append(fail(f"figure {fid}: data_path declared but missing", path=str(path)))
                continue
            try:
                d = json.loads(path.read_text())
            except json.JSONDecodeError as e:
                out.append(fail(f"figure {fid}: data_path does not parse", error=str(e)))
                continue
            missing = [k for k in ("label", "axes", "data") if k not in d]
            if missing:
                out.append(fail(f"figure {fid}: data_path JSON missing required keys", missing=missing))
            else:
                out.append(ok(f"figure {fid}: data_path schema valid"))
    return out


def check_freshness(run: Path) -> list[dict]:
    """No verify report should be older than the protocol it audits."""
    p = run / "protocol.toml"
    if not p.exists():
        return []
    proto_mtime = p.stat().st_mtime
    out = []
    verify_dir = run / "verify"
    if verify_dir.exists():
        for v in sorted(verify_dir.glob("verify_*.md")):
            if v.stat().st_mtime < proto_mtime:
                out.append(fail(
                    f"verify report stale: {v.name} predates protocol.toml",
                    verify=str(v),
                    protocol_mtime=proto_mtime,
                    verify_mtime=v.stat().st_mtime,
                ))
            else:
                out.append(ok(f"verify report fresh: {v.name}"))
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description="Report skill pre-flight verifier")
    parser.add_argument("run_dir", help="Path to the reproduction run directory")
    args = parser.parse_args()
    run = Path(args.run_dir).resolve()
    if not run.is_dir():
        print(json.dumps({"status": "fail", "reason": "run-dir is not a directory", "path": str(run)}))
        return 1

    results: list[dict] = []
    proto_results, data = check_protocol(run)
    results.extend(proto_results)
    if data is not None:
        claim_ids = [c.get("id") for c in data.get("claims", []) if c.get("id")]
        figures = data.get("figures", [])
        proto_hash = protocol_hash(run / "protocol.toml")
        results.extend(check_run_report(run))
        results.extend(check_claims_in_evidence_map(run, claim_ids))
        results.extend(check_cell_manifests(run, proto_hash))
        results.extend(check_figures(run, figures))
    results.extend(check_freshness(run))

    failures = [r for r in results if r.get("status") == "fail"]
    passes = [r for r in results if r.get("status") == "pass"]
    summary = {"total": len(results), "passed": len(passes), "failed": len(failures)}
    print(json.dumps({"summary": summary, "failures": failures, "passes": passes}, indent=2))
    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
