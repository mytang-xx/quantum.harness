# Quantum Many-Body Physics Harness

Research harness for quantum many-body physics using tensor network methods. Covers theoretical foundations (second quantization, Green's functions, Fermi liquid theory, path integrals) and computational approaches (MPS, PEPS, DMRG, TEBD, MERA, TN contractions).

## Core Harness Philosophy

This repo is a harness for problem-solving agents, not a teaching system.

The previous tutorial, roadmap, and negative-feedback design is intentionally discarded. Do not preserve old routines, knowledge-base workflows, or skill structures for compatibility if they make the user work like a highly motivated student. Users come to agents to solve problems. Any learning should happen as a side effect of watching good judgment, not as the main product.

Agents should behave like capable juniors solving concrete quantum many-body problems under light human steering. The user should not need to know the roadmap, choose every subroutine, or stay motivated through repeated correction. The harness should diagnose the situation, recommend a path, carry out the work, check results, and surface only the decisions that genuinely matter.

### Strategic Steering Principle

Use the Superpowers brainstorming pattern as the strategic model: when a task has meaningful branches, understand the context, then present 2-3 real options with concise tradeoffs. Lead with the recommended option and explain why.

This is a strategic design pattern, not user-facing language. Do not mention "fake steering wheel", psychological steering, or autonomous-driving metaphors to users. Locally, the interaction should simply look like competent technical judgment.

Every option offered must be real and executable. The first option may be recommended, but the other options must not be fake, punitive, or low-effort. If the user chooses a non-recommended path, follow it faithfully unless there is a concrete technical blocker. If blocked, explain the blocker and offer the closest viable alternatives.

The goal is agent-led, user-ratified work: the agent drives the workflow; the user controls goal, assumptions, depth, method preference, risk tolerance, and final interpretation.

## Problem-Driven Skill Design

Skills must be organized around problems, not lessons, methods, tools, metrics, or roadmaps.

Use this canonical split:

```text
tools/skills/problems/
  models/
  physics/
```

`models/` contains canonical Hamiltonian or Hilbert-space problem families.
`physics/` contains cross-model organizing questions: phases, mechanisms, dynamics, solvability, and diagnostics.

Ion may expose direct `tools/skills/<name>` symlink aliases for installation. Edit the nested `tools/skills/problems/...` source directories, not the aliases.

Methods such as DMRG, DMFT, QMC, VMC, fuzzy sphere, and V-score belong inside problem workflows, not in problem names. Do not create a separate visible method-skill taxonomy by default. If a problem skill mentions a method, it should include enough method, software, setup, output, and validation guidance for an agent with no chat history to act sensibly.

Dimension, lattice, filling, doping, boundary condition, disorder strength, and coupling regime are runtime choices unless they define a truly distinct canonical problem.

## Knowledge Base Role

`knowledge-base/` carries data and method-level reference. It is not a curriculum, reading path, or task catalog.

Current cards:

- `conventions.md` — sign / normalization defaults; Hamiltonian forms.
- `limits.md` — exact reductions and known limits (U=0, U→∞ → t-J, XXZ Δ=1, …).
- `benchmark-numbers.md` — reference E/N, gaps, order parameters with citations.
- `symmetry-cheatsheet.md` — conserved quantities, lattice point groups.
- `methods/{ed,dmrg,tebd}.md` — per-method notation, canonical Julia code shape, knobs, pitfalls.
- `2302.04919-variational-benchmarks.md` — V-score paper notes.

Skills cite these cards; they never hardcode the data. New cards land when a real skill begins citing them.

## Skill shapes

Two shapes, both problem/research-driven:

- **Model skills** (`tools/skills/problems/models/*`) drive calculations: `Diagnose → Workflow → Method recommendations → Branch table → Verification`.
- **Physics skills** (`tools/skills/problems/physics/*`) evaluate evidence: `Diagnose → Evidence to gather → Cross-checks → Interpretation rules → Model hooks`.

Skills cite KB for any number, convention, or method-specific code shape. Skills hold workflow only — no hardcoded numbers, no embedded code skeletons, no canonical recipes.

## Tools & Languages

Default stack: **Julia + ITensors.jl** (ITensors.jl, ITensorMPS.jl, MPSKit.jl, KrylovKit.jl). Install via `make install julia && make install itensors`. Method cards in `knowledge-base/methods/` use this stack for canonical code shapes.

Python (`quimb` + `cotengra`) remains available as a fallback for tensor-network sketches via `make install quimb`. Skills can route to either when both work; method cards are Julia-flavored.

## Installed Skills

Local problem skills:
- **models:** transverse-field-ising, heisenberg, j1-j2, t-v, hubbard, t-j, anderson-impurity, multiorbital-hubbard
- **physics:** criticality, frustration, spin-liquid, mott-transition, kondo-effect

External/support skills:
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
1. Treat the core harness philosophy and problem-driven skill design above as the controlling design contract.
2. Use tools from `tools/` rather than reimplementing operations.
3. Run `make help` to discover available workflow targets.
4. Check `Ion.toml` (or `ion` CLI) for installed / available skills.
5. Treat `make setup` as **minimal bootstrap only** — install heavy domain tools on demand via `make install <tool>`. Before recommending a tool-dependent command, verify the tool is in `INSTALLABLE` (and installed); if not, instruct the user to run `make install <tool>` first.

## Daily Workflow

Run `make help` to see available Makefile targets.
