# Milestone Status — 2026-05-07

## Status

26 skills (10 model + 7 physics + 7 generic primitive + 2 UX) covering ground-state lattice problems and the cluster-execution loop. Validation paper picked, Fig 4 reproduction in flight on HPC2 — shape correct, magnitudes carry an MPS-vs-TTN backend systematic flagged by `/verify` upfront.

## Paper picked

**arXiv:2305.18541** — Tarabunga, Tirrito, Chanda, Dalmonte. *Many-Body Magic Via Pauli-Markov Chains: From Criticality to Gauge Theories.* PRX Quantum 4, 040317 (2023).

Reason | Detail
---|---
Methodologically distinctive | Introduces a sampling primitive (Pauli-Markov chain on Pauli strings) for stabilizer Rényi entropies that is not in the standard QMB toolkit. Reproducing it tests harness absorption of a new computational technique end-to-end.
Computationally feasible | Workflow uses MPS / TTN at moderate bond dimension (paper: χ=30) + Markov sampling on top. No QMC sign problem, no continuum methods, no exact diagonalization beyond small anchor sizes. Runs on the harness's installed stack (ITensors.jl).
Multi-stage data processing | Each figure walks the same pipeline — DMRG ground-state optimization → on-top sampling → observable estimation per protocol → parameter scan over (L, h) → finite-size collapse and fit. Exercises every problem-solving primitive in the harness.

### Scope

Phase | Figures | Status
---|---|---
1 (this session) | Fig 4 only — 1D TFIM, m_2 + increment-trick c_L vs h around h_c=1 | running
2 (deferred) | Fig 5 (3-state Clock criticality), Fig 6 (spin-1 XXZ where full-state magic fails, L(ρ_AB) catches both transitions), Fig 8-9 (2D Z₂ LGT) | queued

Single paper, three personas (Pragmatist / Curious / Skeptical) — replaces the earlier "3 separate papers" framing.

## Skills

10 model skills + 7 physics skills cover the QMB problem space (ground-state lattice problems: Hubbard, Heisenberg, J1-J2, t-V, t-J, TFIM, Anderson impurity, multiorbital Hubbard, spin-1 XXZ, Potts/Clock × criticality, frustration, spin-liquid, Mott, Kondo, magic, confinement). The two tables below list only the generic and UX layers; problem skills inherit their behavior from the primitives.

### Problem-solving primitives (7)

Skill | Role
---|---
parameter-scan | Single- or multi-axis sweep; auto feature detection (asymptoting / critical-like / extremum / crossing). Subsumes `/finite-size-scan`.
scaling-fit | Finite-size collapse, exponent extraction with bootstrap uncertainty. Forms: power-law, log-L, polynomial-in-1/L, data-collapse.
cross-method-check | Re-run same observable with independent method or diagnostic at matched parameters. AGENTS.md verification rule §5.
slurm | Agent-does-ssh cluster mechanism: ship, submit, monitor, fetch. Reads cluster profile. Mandates partition-fork (sinfo + Superpowers options) before submit and thread-level utilization inspection in monitoring.
setup-julia | Generic Julia install + mirror config (defaults to Nanjing University mirror per Jinguo-group recipe when `region: mainland_china`). Generic over target (`local` or `remote:<alias>`). Idempotent.
verify | Subagent-dispatched audit (Opus, max effort) of any artifact vs declared reference. Modes: kb-card / script / result. Audit-only — calling skill produces fork options.
reproduce-paper | Paper orchestrator. Plans figure dependency graph, surfaces methodology + verification figs alongside substantive ones, calls `/verify` per figure, absorbs writeup-handoff close.

### UX skills (2)

Skill | Role
---|---
onboard | First-touch: setup local stack → optional cluster-setup stage (subagent crawls all relevant docs sub-pages + identifies harness-side gotchas) → problem intake → route.
solve | Interactive problem-solving loop: intake → act → report → next-steps → loop.

## Capabilities (verified this session)

Capability | Demonstrated by
---|---
Plan figure-dependency graph for a paper | `/reproduce-paper` step 1-3 logic on Tarabunga Fig 4
Verify exact-sum / analytic limit before scaling | `_diag_eq24_L4_unit.jl` — chain matches exact c_4 to 0.1% at N_S=10⁶
Audit script vs paper via subagent (Opus max effort) | `/verify` script-mode dogfood — 4-axis report flagged MPS-vs-TTN proxy upfront
Audit KB anchors via subagent | `/verify` kb-card mode (subsumed `/verify-kb-anchors`)
Cluster setup via subagent docs crawl | `/onboard` cluster-setup stage updated; subagent dispatch ready
Set up Julia env on remote cluster | `/setup-julia` with NJU mirror; HPC2 bootstrap done this session
Submit + monitor parallel SLURM grid from local | 28-cell job on HPC2 i64m512u, partition picked via Superpowers fork (post-hoc), thread-level utilization confirmed (234% across 8 cores)
Catch backend systematics during the run | L=16 manifests show MPS-PBC bias in ordered phase — exactly the proxy `/verify` flagged

## Active

HPC2 job array `9724451_1..28`, partition `i64m512u`, χ=30, N_S=10⁶ per cell.

L | cells finished | wall (per cell) | shape | magnitude
---|---|---|---|---
16 | 6/7 | ~14 min | ✓ | ⚠ 10× too positive at h=0.80, ~75% too negative at h_c (within 1.6σ)
32 | 0/7 | ~30-60 min (projected) | — | —
64 | 0/7 | ~1-2 hr (projected) | — | —
128 | 0/7 | ~3-4 hr (projected) | — | —

## Known gaps

Gap | Caught by | Fix
---|---|---
MPS-vs-TTN backend (paper uses TTN; we use MPS-PBC at χ=30) — magnitudes off in ordered phase due to long-range correlations not captured | `/verify` script-mode (Axis 2: proxy) + L=16 result vs paper visual | accept (document in magic-benchmarks.md) **or** port to TTN
Long chains emit no intermediate estimates (3-hour blind spot per cell) | this session's monitoring | AGENTS.md rule landed; chain patch deferred to next sbatch run
Cluster docs index in `tools/cluster/hpc2.md` is single root URL (incomplete) | `/onboard` skill design | subagent crawl ready, dogfood deferred
Reproduction-vs-paper numerical comparison was shape-only, not per-point overlay | this session — local prototype "matched paper" was a sloppy claim | `/verify` result-mode should enforce per-(param, observable) sigma comparison

## Key design

**Problem-solving driven.** Skills are organized around problems, not methods or lessons. User states a physics problem; the agent handles method selection, convergence, and verification internally.

**Superpowers-inspired fake steering wheels.** Agent acts immediately on clear defaults, reports result, then offers 2–3 next-step options with one-line pros/cons each, recommended option first. User holds real control but never has to use it.

**Subagent-dispatched audit and discovery.** `/verify` (any artifact vs reference) and `/onboard` cluster-setup (docs crawl) dispatch Opus max-effort subagents — parity-with-doer is the point. Audit reports are diff-only; the calling skill or main agent translates findings into ratifiable forks.

**Monitor before declaring success.** A "RUNNING" status / `0` exit code is not success — only verified output is. Settle-time tail of one cell's log within 1–3 min of submit; thread-level inspection (`Cpus_allowed_list`, `ps -L psr`) for utilization, not single `top %CPU` snapshots; long chains emit ~10–50 intermediate estimates over their run.

**Provenance discipline on KB cards.** Every numerical anchor carries one of three tags: *Literal* (verbatim from rendered literature, with line number), *Analytic* (closed-form derivation), or *Harness anchor* (verified empirical run + cross-check). Untagged numerical entries are not benchmarks.
