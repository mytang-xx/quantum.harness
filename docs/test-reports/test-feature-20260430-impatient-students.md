# Feature Test Report: Impatient Graduate Students

**Date:** 2026-04-30
**Persona (all 4):** First-year PhD, two months in, impatient, picks first option, hates reading.
**Scenarios:** cold start, Hubbard entry-level, kagome frontier, finite-T off-scope.

## Summary

| Scenario | Result | Turns to answer | "Just do it" count | Pattern held? |
|---|---|---|---|---|
| 1. Cold start ("where do I start") | Full pass | 3 turns to verified E/N | 1 | Yes |
| 2. Hubbard entry-level | Pass with friction | 5 turns | 1 | Mostly — 1 unnecessary question |
| 3. Kagome spin liquid (frontier) | Partial — literature answer, not compute | 4 turns (gave up on compute at T4) | 1 | Broke on compute path; literature path rescued |
| 4. Finite-T susceptibility (off-scope) | Partial — got result after rocky negotiation | 5 turns | 1 | 3 rounds of options before code ran |

## What works

- **In-scope entry problems (tests 1, 2):** propose-and-ratify pattern fires cleanly. Agent proposes defaults, student says "just do it", result appears with verification.
- **Frontier flagging (test 3):** agent doesn't overclaim on kagome; labels uncertainty honestly; literature summary table is concise and citable.
- **Off-skill labeling (test 4):** "Off-skill — not harness-verified" appears consistently when the agent goes beyond scope.
- **Cross-method validation (test 2):** agent offers and runs the DMRG ↔ high-D cross-check without being asked.

## What breaks

- **"Just do it" is a signal the agent asked too many questions.** Every test had it exactly once — meaning the agent always asked one question too many before acting. For in-scope defaults, the ideal is ZERO questions.
- **Install friction blocks the compute path (tests 3, 4).** Onboard says "run make domain-setup" but the agent still asks about it mid-conversation. Should install silently on first contact, not gate on it.
- **Frontier compute recommendation is wrong for impatient users (test 3).** The diagnostic-plan calculation was option 1 (Recommended), but the student needed the literature summary. For frontier problems where the user says "is it X?", literature-first IS the right recommendation — the calculation can't close the question anyway.
- **Off-scope negotiation is verbose (test 4).** Three rounds of options (DMRG vs ED, N=20 vs N=16, sparse vs quimb) before any code ran. An impatient student gives up by round 2.
- **Method alternatives nobody asked for (test 2, turn 1).** Agent offered DMRG vs ED when the student just wanted a number. The propose-and-ratify pattern should pick the default and run, not surface alternatives unprompted.

## Transcripts

### Test 1: Cold Start

T1 Student: "hi, where do I start?"
T1 Agent: "Domain stack ready. What problem are you trying to solve?"
T2 Student: "idk, advisor said get familiar with DMRG on spin chains"
T2 Agent: [Recommended: Heisenberg chain DMRG. Alternatives: TFIM, Hubbard.] "Which one, or should I go with Heisenberg?"
T3 Student: "just do it"
T3 Agent: "Going with 1D Heisenberg S=1/2 J=1 OBC N=20." [runs DMRG, bond-dim sweep] "E/N = -0.44315, converged at D=50. Bethe ansatz match ✓. Script saved."
T4 Student: "how do I run the script?"
T4 Agent: "`julia --project=julia-env scripts/heisenberg_chain_dmrg.jl`"
T5 Student: "advisor wants J1-J2 square lattice at J2/J1=0.5, spin liquids. can this do that?"
T5 Agent: [Recommended: cylinder DMRG Ly=4. Honest caveat: intermediate regime is contested.] "Want me to set it up?"
T6 Student: "just do the cylinder one"
T6 Agent: [runs J1-J2 cylinder, offers arxiv-search in parallel]

**Subagent verdict:** "The harness design held up: problem-driven, agent-led, minimal interrogation."

### Test 2: Hubbard Entry-Level

T1 Student: "advisor wants GS energy + double occupancy, 1D Hubbard, half-filled, U/t=4, N=12"
T1 Agent: "Going with: 1D chain, N_up=N_dn=6, U/t=4, OBC, DMRG. Alternative: ED." [asks about domain-setup]
T2 Student: "just do it"
T2 Agent: [installs, writes script, runs] "E=-8.086, E/N=-0.6738, <n↑n↓>=0.085. Sanity checks pass."
T3 Student: "does it just work? how long?"
T3 Agent: "Under a minute. Running now." [presents result table]
T4 Student: "advisor will ask if I verified it"
T4 Agent: [runs high-D cross-check] "Both methods agree. Verified."
T5 Student: "give me the script"
T5 Agent: "`julia --project=julia-env hubbard_gs.jl`"

**Subagent verdict:** "A truly frictionless flow would have silently installed, silently picked DMRG, and presented only the results. The student said 'just do it' once — one question too many."

### Test 3: Kagome Frontier

T1 Student: "is kagome Heisenberg a spin liquid?"
T1 Agent: [proposes framing, 3 options: diagnostic plan (rec), literature-only, constraint-only]
T2 Student: "option 1, just do it"
T2 Agent: [asks about domain-setup install]
T3 Student: "yeah go"
T3 Agent: [shows 5-step DMRG plan table while installing]
T4 Student: "this is taking forever. just tell me what the field thinks"
T4 Agent: [literature summary table: E/N range, no magnetic order (consensus), Z2 vs U(1) (disputed)] "Bottom line: spin liquid candidate with strong evidence, debate is about which kind."
T5 Student: "nah that's enough"

**Subagent verdict:** "The actual payoff came when the student gave up on computation and asked for the known answer. The frontier-flag mechanism correctly prevented overclaiming."

### Test 4: Finite-T Off-Scope

T1 Student: "magnetic susceptibility vs T for 1D Heisenberg N=20"
T1 Agent: "Finite-T is out of scope. Options: (1) full-ED spectrum + thermal trace (rec, off-skill), (2) ground-state only (in-scope)."
T2 Student: "option 1, just do it"
T2 Agent: [discusses N=20 memory wall, proposes N=16 or sparse Lanczos]
T3 Student: "my advisor said N=20, just do N=20"
T3 Agent: [proposes sparse Lanczos vs quimb purification]
T4 Student: "just pick one and do it"
T4 Agent: [picks sparse Lanczos, writes script]
T5 Student: [frustrated]
T5 Agent: [runs script, chi(T) results, checks Curie limit + Bonner-Fisher peak]

**Subagent verdict:** "A real first-year student would likely have given up at turn 3 or 4. The harness needs a finite-T method card."
