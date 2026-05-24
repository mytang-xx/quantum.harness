from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[2]
SKILL = ROOT / "tools" / "skills" / "reproduce-paper-onboard" / "SKILL.md"
ION = ROOT / "Ion.toml"


class ReproducePaperOnboardContract(unittest.TestCase):
    def test_skill_is_registered(self):
        self.assertTrue(SKILL.exists(), "reproduce-paper-onboard/SKILL.md is missing")
        ion = ION.read_text()
        self.assertIn('reproduce-paper-onboard = { type = "local" }', ion)

    def test_beginner_interaction_contract_is_explicit(self):
        text = SKILL.read_text()
        lower = text.lower()

        required_phrases = [
            "name: reproduce-paper-onboard",
            "beginner",
            "walk me through",
            "time estimate",
            "size ladder",
            "smoke",
            "paper-like",
            "confirm",
            "before compute",
            "do not spawn",
            "subagent",
            "protocol.toml",
            "paper-to-code contract",
            "tacit",
            "manifest",
            "run-report.md",
            # New brainstorm-first contract:
            "brainstorm",
            "plan.md",
            "askuserquestion",
            "approve the plan",
            "repair",
            "deviation",
            "next step",
        ]
        for phrase in required_phrases:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, lower)

    def test_preserves_reproduction_outputs(self):
        text = SKILL.read_text()
        for artifact in [
            "results/<run>/protocol.toml",
            "cells/<cell_id>/manifest.json",
            "figs/<figure_id>.png",
            "run-report.md",
        ]:
            with self.subTest(artifact=artifact):
                self.assertIn(artifact, text)

    def test_four_phase_pipeline_headers_present(self):
        text = SKILL.read_text()
        # The refactored skill is organized as Brainstorm -> Plan -> Execute -> Report.
        # Headers may be numbered ("## 1. Brainstorm") or bare ("## Brainstorm").
        header_re = re.compile(r"^##\s+(?:\d+\.\s+)?(\w+)", re.MULTILINE)
        headers = {m.group(1).lower() for m in header_re.finditer(text)}
        for required in ("brainstorm", "plan", "execute", "report"):
            with self.subTest(required=required):
                self.assertIn(required, headers)

    def test_no_audit_subagent_in_beginner_flow(self):
        text = SKILL.read_text()
        lower = text.lower()
        # The beginner flow must keep the explicit no-spawn rule.
        self.assertIn("do not spawn", lower)
        # And it must explicitly forbid mandated audit-kind gate attempts.
        self.assertTrue(
            "do not require audit" in lower
            or "do not require audit-kind" in lower,
            "Skill must explicitly forbid required audit-kind gate attempts",
        )


if __name__ == "__main__":
    unittest.main()
