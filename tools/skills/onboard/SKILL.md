---
name: onboard
description: Use when the user is new to the harness, asks "where do I start", or opens with an unclear / empty problem. Routes them to the right problem skill without architecture lecture or tutorial.
---

# Onboard

First-touch intake for the harness. Get the user productive on a real problem within one exchange. No tutorial, no architecture lecture.

## When to activate

- "I'm new here" / "where do I start" / "how do I use this".
- Empty or unclear opening.
- User explicitly invokes `/onboard` or asks for orientation.

## Workflow

1. **Check the install.** Verify Julia + ITensors are present (`julia --version`, `julia --project=julia-env -e 'using ITensors'`). If missing, run `make install julia` and `make install itensors`. Don't block the conversation on these — explain in one line and keep going.

2. **Ask one question** at the research level, not the method level:
   > "What are you working on? A specific model — Heisenberg, Hubbard, J1-J2, t-V, t-J, transverse-field Ising, Anderson impurity, multi-orbital Hubbard — or a question — criticality, frustration, spin liquid, Mott transition, Kondo effect?"

3. **Route to the matched skill.** If the user names a model or physics topic that maps to a skill, hand off and exit. The matched skill takes over the conversation.

4. **If nothing fits**, be honest:
   > "Not covered in the current harness. Scope is ground-state lattice problems (see README). Tell me more about what you want — I might handle it adjacently, or we can set up a custom workflow that lives outside the existing skills."

## What this skill does NOT do

- Lecture about the harness architecture.
- Walk through a tutorial calculation.
- Demand the user read AGENTS.md or the README first.
- Force the install to complete before any conversation.

The agent's job here is to start solving a real problem as fast as possible. If a model or physics skill applies, this skill should be a single short exchange, then it exits.

## Related skills

All `tools/skills/problems/models/*` and `tools/skills/problems/physics/*` skills are the routing targets. After the handoff, the chosen skill runs the workflow; this skill does not stay involved.
