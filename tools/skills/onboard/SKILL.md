---
name: onboard
description: Use when the user is new to the harness, asks "where do I start", or opens with an unclear / empty problem. Sets up software and routes to the right problem skill.
---

# Onboard

First-touch intake. Set up the environment, then get the user onto a real problem fast.

## When to activate

- "I'm new here" / "where do I start" / "how do I use this".
- Empty or unclear opening.
- User explicitly invokes `/onboard`.
- First session detected (no `julia-env/` directory).

## Workflow

### 1. Setup — do it, don't ask

Run these checks silently. Fix what's missing. Report a one-line summary.

```bash
# Julia
command -v julia || make install julia

# ITensors stack
[ -d julia-env ] && julia --project=julia-env -e 'using ITensors' 2>/dev/null || make install itensors

# Verify
julia --project=julia-env -e 'using ITensors; println("ITensors $(pkgversion(ITensors)) ready")'
```

If everything is installed, say: "Julia + ITensors ready." (one line)
If something was missing and installed, say: "Installed Julia + ITensors. Ready." (one line)
If install fails, say what failed and offer to debug — don't proceed to problem intake until the stack works.

### 2. Problem intake — one question

> "What problem are you trying to solve?"

That's it. Don't list models. Don't explain the architecture.

### 3. Route

Infer the model or physics topic from the answer. Hand off to the matched skill. This skill exits.

If ambiguous, use `AskUserQuestion` with 2–3 candidate skills — short labels, one-line tradeoff each, recommended first. Don't list all 13.

If nothing fits: "That's outside current scope (ground-state lattice problems). Want me to try an off-skill approach, or help you reframe?"

## What this skill does NOT do

- Lecture about the harness.
- Walk through a tutorial.
- Ask the user to read docs.
- Show a menu of 13 skills.

One exchange to setup + route, then exit.
