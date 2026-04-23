# Quantum Many-Body Physics Harness

Research harness for quantum many-body physics with tensor network methods. Covers theoretical foundations (second quantization, Green's functions, Fermi liquids) and computational approaches (MPS, PEPS, DMRG, TEBD, MERA, TN contractions).

## Quick Start

1. Install [Ion](https://github.com/Roger-luo/Ion): `curl -fsSL https://raw.githubusercontent.com/Roger-luo/Ion/main/install.sh | sh`
2. Run `make setup` (minimal bootstrap — installs Ion skills only)
3. `make install quarto` for HTML content rendering
4. Run `/onboard` to set up your learning path
5. Run `/step` to work through it

## Structure

- `raw/` — Raw materials (git-ignored, any format)
- `knowledge-base/` — Rendered markdown from raw materials, plus `_tasks.md` and `_missing.md` catalogs
- `templates/` — HTML template used by the render tool
- `tools/` — CLI scripts (including `render`), MCP configs, and local skills (`onboard`, `step`)
- `Makefile` — Setup and daily workflow targets
- `AGENTS.md` — AI instructions (canonical); `CLAUDE.md` is a one-liner pointer to it
