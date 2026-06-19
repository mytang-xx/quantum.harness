---
name: onboard
description: Use when the user is new to the harness, asks "where do I start" / "how do I use this" / "I'm new here", opens with an empty or unclear prompt, explicitly invokes `/onboard`, or starts a first session with no configured harness environment.
---

# Onboard

First-touch intake. Set up the core harness tools and domain environment, optionally configure the user's compute cluster, then get the user onto a real problem fast.

## Audience definition (binding)

<audience name="binding">
The user is on first touch — they may not know the harness vocabulary (skill, profile), have no `julia-env/`, and have ≤2 minutes of patience before the conversation feels bureaucratic. Every question MUST read as a single warm sentence, not a checklist.
</audience>

## When to activate

- "I'm new here" / "where do I start" / "how do I use this".
- Empty or unclear opening.
- User explicitly invokes `/onboard`.
- First session detected (no `julia-env/` directory).

## Workflow

### 1. Setup — do it, don't ask

<checklist name="setup">

- Install domain stacks on demand via `make install <tool>`, after confirming `<tool>` appears in the Makefile's `INSTALLABLE` list.
- Read the per-stack contract at `skills/<stack>/stack.toml` for install commands, smoke tests, and upstream docs.

</checklist>

Run `make skills` only when skill sync is actually needed.

Install only the stack the user's first selected workflow needs. Do not pre-install other method stacks. Each additional stack is installed on demand when that method is first invoked. `/report` needs nothing installed — it renders to HTML with the Python standard library.

Report one line:
- All good: "Domain stack ready."
- Something installed: "Installed [what]. Ready."
- Install failed: say what failed, offer to debug. Don't proceed until the stack works.

### 1a. PDF-to-Markdown support — optional, only when relevant

Skip this stage unless the user's opening prompt already mentions papers,
arXiv/DOI/PDF ingestion, methodology references, or figure reproduction. If
that only becomes clear after step 3a, ask this gate there before routing.

First check whether `.venv/bin/python -c 'import pymupdf4llm'` succeeds. If it
does, continue without asking. Otherwise ask one warm gate via
`AskUserQuestion`:

> *"This looks like a paper/reference workflow. Do you want me to install PDF-to-Markdown rendering tools in `.venv`? They give agents cleaner paper text and extracted figures; skipping is OK, but reference ingestion will fall back to plainer text extraction."*

Options:
- `"Install PDF rendering tools (Recommended for paper workflows)"` — "Runs `make install pdf-render`; uses `uv` if present, otherwise Python's built-in venv."
- `"Skip for now"` — "No install; paper ingestion still works with fallback text extraction, but figure/text quality may be weaker."

If the user chooses install, confirm `pdf-render` appears in the Makefile's
`INSTALLABLE` list, then run `make install pdf-render`. This is a support tool:
if installation fails, say what failed and offer to debug, but do not block a
non-paper compute workflow.

### 2. Cluster setup — warm gate, always asked

<checklist name="cluster-setup">

Skip this stage if `skills/using-slurm/profiles/active.toml` already exists (user has a profile from a prior session — idempotent).

Otherwise, ask one warm gate via `AskUserQuestion`. Most paper-grade calculations end up on a remote cluster eventually, and even a quick setup now persists the profile so future sessions ship/submit/monitor/fetch automatically without re-asking:

<example name="warm-gate good">
*"Will you want to run on a remote cluster at some point (SLURM, PBS, plain ssh)? If yes, I'll capture the config now so future sessions don't have to re-ask. If local-only is genuinely all you need, that's fine too — pick that and we'll move on."*
</example>

<example name="warm-gate bad">
Cluster?
</example>

<example name="warm-gate cold">
Do you want to configure a cluster? Yes/No.
</example>

Options:
- "Yes, capture cluster config now (Recommended — persists for every future session)"
- `"Local-only for now"` — "No cluster config saved. Future remote runs will re-ask before they can ship."

If the user picks "local-only", continue to step 3. If "yes", hand off to `/setup-cluster`:

</checklist>

#### 2a. Delegate to `/setup-cluster`

Profile creation lives in one place: the `/setup-cluster` skill. Dispatch it now
— it builds the unified TOML profile (from the cluster's docs URL via a thorough
subagent crawl, or a ≤4-question walk-through), probes live resources, seeds the
student safety `[limits]`, and writes `skills/using-slurm/profiles/<name>.toml`
plus the `active.toml` symlink. Stay warm: frame the why, offer the escape hatch,
let `/setup-cluster` own the questions.

Do NOT bootstrap Julia or instantiate environments here — that's `/setup-julia`'s
job, dispatched on demand by `/using-slurm` when the first cluster Julia run
happens.

### 3. Problem intake — skippable

Setup and cluster profile are now persisted. Some users want to dive into a problem immediately; some just wanted the harness initialized and will return later. Ask once via `AskUserQuestion`:

> *"Setup is done. Want to start on a problem now, or save what we have and exit?"*

Options:
- "Start a problem now (Recommended if you have one in mind)" — proceed to step 3a
- "Save setup and exit" — skip to exit

#### 3a. Describe the problem

> *"What problem are you trying to solve?"*

That's it. Don't list models. Don't explain the architecture.

If the answer reveals a paper/reference workflow and step 1a was not already
handled, run the step 1a PDF-to-Markdown support gate before routing.

### 4. Route

<checklist name="route">

If the user picked "Save setup and exit" in step 3, exit with one line: *"Harness ready. `/model` or `/physics` will route you when you bring a problem."*

Otherwise, infer the model or physics topic from the step 3a answer. Hand off to `/model` (if a specific Hamiltonian) or `/physics` (if a cross-model phenomenon question); the dispatcher reads the matching card. This skill exits.

If the user's prompt is ambiguous between two or three specific routes, surface candidates via the user-facing fork pattern → [AGENTS.md → Output norms](../../AGENTS.md#ui-ux) (AskUserQuestion; 2–3 options; recommended first; Done always real). Each option is one candidate model card OR one candidate physics card. Do not enumerate the full model or physics card lists.

If nothing fits: *"That's outside current scope (ground-state lattice problems). Want me to try an off-skill approach, or help you reframe?"*

</checklist>

## What this skill does NOT do

- Lecture about the harness.
- Walk through a tutorial.
- Ask the user to read docs.
- Show a menu of 13 skills.
- Hardcode package-level install instructions (the stack contracts in `skills/<stack>/stack.toml` name install commands, smoke tests, and upstream docs; the Makefile and setup scripts execute them). For paper rendering support, call `make install pdf-render`; do not inline pip commands in the conversation.
- Bootstrap Julia on the cluster (that's `/setup-julia`, dispatched by `/using-slurm` on first cluster Julia run).
- Pile questions on the user — every gate is one question with a clear *why* and an escape hatch.

## UX rule (applies to every gate in this skill)

**Every** user-facing question in this skill — including the warm gate in 2, the path-to-profile gate in 2a, **each** of the 4 walk-through questions in 2c, and the problem-or-exit gate in 3 — follows the pattern: *frame the why → state the consequence → offer the escape hatch → ask*. No question stands alone without context. Telegraphic prompts ("Cluster?", "URL?") are rude even when short. Warm-clear-concise.

One short setup → one optional cluster gate → one problem question → route. Then exit.
