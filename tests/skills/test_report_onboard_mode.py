from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[2]
SKILL = ROOT / "tools" / "skills" / "report" / "SKILL.md"
BUILD = ROOT / "tools" / "skills" / "report" / "site" / "build.mjs"
TYPES = ROOT / "tools" / "skills" / "report" / "site" / "lib" / "types.ts"


class ReportOnboardModeContract(unittest.TestCase):
    def test_skill_documents_onboard_mode(self):
        text = SKILL.read_text()
        lower = text.lower()
        for phrase in [
            "onboard mode",
            "--mode onboard",
            "--mode full",
            "/reproduce-paper-onboard",
            "do not spawn an audit subagent",
            "no `flow require` preflight",
            "plan.md",
        ]:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase.lower(), lower)

    def test_skill_distinguishes_full_vs_onboard(self):
        text = SKILL.read_text()
        # The mode table must list both modes with their audit/gate requirements.
        self.assertRegex(text, r"`full`\s+\|.*\|.*required.*\|.*required")
        self.assertRegex(text, r"`onboard`\s+\|.*\|.*skipped.*\|.*skipped")

    def test_build_mjs_accepts_mode_flag(self):
        text = BUILD.read_text()
        # Argument parser must accept --mode and validate full|onboard.
        self.assertIn("--mode", text)
        self.assertRegex(text, r"mode\s*!==\s*'full'\s*&&\s*mode\s*!==\s*'onboard'")
        # loadRun must thread mode through.
        self.assertRegex(text, r"loadRun\(\{\s*runDir,\s*stage,\s*mode\s*\}\)")

    def test_build_mjs_usage_mentions_modes(self):
        # Inspect the usage() string in source rather than running node
        # (which requires `pnpm install` for the playwright/toml deps).
        text = BUILD.read_text()
        # Locate the usage() function body.
        m = re.search(r"function usage\(code\)\s*\{(.*?)\}", text, re.DOTALL)
        self.assertIsNotNone(m, "usage() function not found in build.mjs")
        body = m.group(1)
        self.assertIn("--mode", body)
        self.assertIn("full", body)
        self.assertIn("onboard", body)

    def test_meta_type_has_mode_field(self):
        text = TYPES.read_text()
        # The Meta interface must declare the mode field with both literals.
        self.assertRegex(text, r"mode:\s*'full'\s*\|\s*'onboard'")


if __name__ == "__main__":
    unittest.main()
