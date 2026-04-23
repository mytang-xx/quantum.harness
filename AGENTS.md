# Quantum Many-Body Physics Harness

Research harness for quantum many-body physics using tensor network methods. Covers theoretical foundations (second quantization, Green's functions, Fermi liquid theory, path integrals) and computational approaches (MPS, PEPS, DMRG, TEBD, MERA, TN contractions).

## Tools & Languages

No specific language committed yet. Candidate TN ecosystems:
- **Julia:** ITensors.jl, TensorKit.jl + MPSKit/PEPSKit/MERAKit/TNRKit
- **Python:** quimb + cotengra, TeNPy

## Knowledge Base

Rendered from raw materials in `raw/` (git-ignored).
See `knowledge-base/_index.md` for the full index.
See `knowledge-base/_tasks.md` for the catalog of standard tasks in this field.
See `knowledge-base/_missing.md` for skills/tools this project needs but that don't yet exist.

To add new raw materials: place files in `raw/` and re-run the rendering.

## Installed Skills

- **onboard** (local) — Interview a new learner and generate a personalized learning path
- **step** (local) — Advance through the path one step at a time with rendered HTML content
- **quimb-tensor-network** — quimb/QuTiP tensor network: MPS, PEPS, DMRG, TEBD
- **arxiv-search** — Semantic arXiv search via Valyu
- **jupyter-notebook** — Scaffold and edit .ipynb notebooks
- **sympy** — Symbolic math: Hamiltonians, commutation relations, algebra
- **scientific-visualization** — Publication-quality figures (matplotlib/seaborn/plotly)
- **scientific-writing** — Scientific manuscript drafting
- **latex-paper-en** — LaTeX academic paper writing
- **julia** — Julia development guidance, multiple dispatch, performance

## Tool Hierarchy

- CLI tools: `tools/cli/` — atomic shell scripts
- MCP tools: `tools/mcp/` — Claude-callable wrappers
- Skills: `tools/skills/` — conversational workflows (managed by Ion)

## Ion skill management

Ion (`Roger-luo/Ion`, installed at `~/.local/bin/ion`) is the skill manager.
Local skill sources live in `tools/skills/`; Ion installs them (symlinks)
into `.claude/skills/` per `Ion.toml`'s `[options.targets]`. `.claude/skills/`
is git-ignored — the source of truth is `tools/skills/`. Reload Claude Code
after any `ion add` / `ion remove` so the session picks up changes.

**Conventions:**
- `AGENTS.md` is canonical; `CLAUDE.md` is a one-liner (`treat @AGENTS.md the
  same as this file`) that Ion treats as a managed (gitignored) artifact.
- Local skills use `{ type = "local" }`; remote skills use registry shorthand
  like `anthropics/skills/skill-creator` (discover with `ion search`).

**Everyday commands:**

```bash
ion add                                  # Install/sync all skills from Ion.toml
ion add anthropics/skills/skill-creator  # Add one remote skill (registry shorthand)
ion add --rev <sha|tag|branch> <source>  # Pin a remote skill to a ref
ion remove <name>                        # Remove a skill
ion update                               # Bump installed skills to latest
ion search "<query>"                     # Search skills.sh registry
ion search -i                            # Interactive TUI search
```

**Authoring local skills:**

```bash
ion skill new <name>                     # Scaffold tools/skills/<name>/SKILL.md
ion skill validate tools/skills/<name>   # Lint before committing
```

**Project / meta:**

```bash
ion init                                 # Initialize a new project (creates Ion.toml)
ion agents --help                        # Manage AGENTS.md templates
ion cache gc                             # Clear the search cache
ion self --help                          # Manage the Ion install
```

## Setup & Tool Installation

- `make setup` performs the **minimum bootstrap only** — it installs Ion and adopts the declared skills. It does NOT install heavy domain tools.
- Install domain tools **on demand** with `make install <tool>`. Running `make help` lists the currently installable tools.
- Adding a new installable tool: append its name to the `INSTALLABLE` variable in the `Makefile` and add a matching `install-<tool>` recipe. Keep recipes idempotent (check before installing).
- When suggesting a command that requires a tool, first check that tool is in `INSTALLABLE` (and installed) — otherwise tell the user to run `make install <tool>` before proceeding.

## UI/UX

### Interaction

- One question at a time, conversational tone
- Use `AskUserQuestion` for discrete choices; open-ended questions in natural language
- Keep any single output under ~20 lines; paginate or ask before continuing

### Content Rendering

- Use `tools/cli/render` to show formatted content (equations, diagrams) as HTML instead of dumping raw LaTeX or long explanations in the terminal
- Prefer rendered HTML for anything involving math, diagrams, or structured explanations

### Terminal Formatting

- Prefer tables and short bullet lists over prose paragraphs
- Use blockquotes for single confirmations or summaries

## Agent guidelines

Agents working in this project should:
1. Search `knowledge-base/` before asking questions — answers may already be documented.
2. Use tools from `tools/` rather than reimplementing operations.
3. Run `make help` to discover available workflow targets.
4. Check `Ion.toml` (or `ion` CLI) for installed / available skills.
5. Treat `make setup` as **minimal bootstrap only** — install heavy domain tools on demand via `make install <tool>`. Before recommending a tool-dependent command, verify the tool is in `INSTALLABLE` (and installed); if not, instruct the user to run `make install <tool>` first.

## Daily Workflow

Run `make help` to see available Makefile targets.

## Roles

(Not yet configured — run `/harness-onboard` to define roles and onboarding skills.)
