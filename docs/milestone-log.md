# Milestone Reflective Log

> Running log of harness-design observations during the current milestone.
> See `docs/MILESTONE.md` for milestone scope.

This milestone is a microscope on the harness. As we land artifacts and hit
friction during authoring, we log observations about the *harness*, not the
artifact. Promotion of durable lessons to `AGENTS.md` happens at milestone
close — we wait until we have evidence rather than impression.

## Seed questions

(Examples — extend as new categories surface.)

- Which patterns in the existing taxonomy held up under the new problem
  class? Which were strained?
- Did the six-step verification list cover the new diagnostic, or does
  the list itself need extension?
- Did the method-card-per-algorithm rule fit cleanly, or did the topic
  pull two cards together (signalling missing granularity)?
- Did `models/` ⊥ `physics/` survive, or did the diagnostic lean on a
  runtime choice not present in either?
- What recurring pattern across the three candidate papers suggests an
  abstraction we don't yet have a name for?

## Observations

_(none yet)_

## Phase 1 — Demand Map (2026-05-05)

> Source: rendered validation paper `knowledge-base/literature/magic/2305.18541_…md` (14 figures verified against `FIG.\s\d+` markers in the source) and methodology companion `2401.16498_…md`. Cross-checked against `tools/skills/`, `knowledge-base/methods/`, `knowledge-base/literature/`. All "primitives" below pass the genericness gate: each composes for problems beyond the validation paper. Artifacts that started as paper-specific recipes have been decomposed into generic primitives + a runtime composition rule.

### A. Per-figure demands

For each figure: model / observable / x-axis / sizes; the claim it supports; the harness primitives needed for a graduate persona (asking a research-level question, not a fig-reproduction task) to make the harness produce it.

**FIG. 1 — Stabilizer entropies for single qubit and single qutrit.**
Panels (a) qubit family `|ψ(θ)⟩ = (|0⟩ + e^{iθ}|1⟩)/√2`, x-axis `θ/π ∈ [0,1]`; (b) qutrit family `|ϕ(θ)⟩`, x-axis `θ/π ∈ [0,2]`. Both panels: SRE densities `m_1`, `m_2`. Single-site analytic warmup; system size = 1.
Claim: SRE is basis-dependent and non-trivial even for a single qudit; identifies the canonical T-state.
Primitives: `physics/magic` (stabilizer Rényi entropy definition + faithfulness + qudit generalization, exposed analytically); `magic-conventions.md` (Pauli/clock-shift conventions, T-state, qudit generalization).

**FIG. 2 — Schematics of partitions.**
Panels (a) full partition; (b) two widely-separated subsystems for `L(ρ_AB)`; (c) subleading increment trick `c_N = 2 M_n(N/2) − M_n(N)`.
Claim: defines the three partition primitives (full, bipartite-disjoint, halving-increment) used throughout.
Primitives: `physics/magic` (the three partition modes + their estimator forms); `methods/pauli-markov.md` (estimator + increment trick); illustrative figure rendered via `scientific-visualization`.

**FIG. 3 — Efficient Monte Carlo sampling using Tree Tensor Network.**
Panels (a)–(d): TTN-binary-tree representation, link-operator coarse-graining, root-tensor contraction, `O(log N)` link update on Pauli flip.
Claim: TTN sampling has `O(χ^4 log N)` per-update cost, beating MPS perfect-sampling at large `N`.
Primitives: `methods/pauli-markov.md` (Markov-chain Metropolis on Pauli strings; method-agnostic); `methods/ttn.md` (tree tensor network ground-state + link-op update; the algorithm card per the method-card-per-algorithm rule); illustrative figure via `scientific-visualization`. The TTN/MPS choice is a runtime branch in the magic skill, not a separate skill.

**FIG. 4 — Efficient estimation of Rényi-2 SRE density in 1D Ising chain.**
Model: 1D quantum Ising `H = −Σ σ^x_i σ^x_j − h Σ σ^z_i`. (a) `c_L = 2 M_2(L/2) − M_2(L)` vs `h ∈ [0.8, 1.2]` for several `L`; (b) `m_2` from increment method vs `h`; inset: error vs `L` log-scale at `h=1`. Sizes `L = 16…128`; `χ = 30`; `N_S = 10^6`.
Claim: The increment trick gives errors that scale slower than `log L`, far better than direct `M_2` estimators.
Primitives: model skill `transverse-field-ising` (✓); `physics/magic` (skill that owns `M_n`, increment trick, partition choice); `methods/pauli-markov.md` (Markov-chain estimator + increment trick); `/finite-size-scan` (sweeps `L` for any observable); `/parameter-scan` (sweeps `h` at each `L`); `/verify-convergence` (bond-dim sweep at the critical point); `magic-benchmarks.md` (1D Ising `m_n(h)` reference numbers, with citation, for the verification step).

**FIG. 5 — Magic density in 1D quantum three-state Clock (Potts) model.**
Model: 1D 3-state Clock / Potts (`d=3`). (a) `m_1` vs `h ∈ [0.7, 1.3]` for several `L`; (b) finite-size collapse `(m_1 − m_{1,m}) L^{γ/ν}` vs `(h − h_c) L^{1/ν}` → extracted `ν ≈ 0.844, γ ≈ 0.66`. Sizes up to `L=128`; `χ ≤ 36`; `N_S = 10^6`.
Claim: full-state magic exposes Potts criticality; extracted `ν` matches `ν_Potts = 5/6`.
Primitives: ✗ model skill `potts-clock` (qudit `d=3` ferromagnet/paramagnet QPT — adds a generic model family beyond the existing TFIM); `physics/magic`; `physics/criticality` (✓); `methods/pauli-markov.md`; `methods/ttn.md`; `/finite-size-scan`; `/scaling-fit` (data-collapse + exponent extraction; generic over any observable); `magic-benchmarks.md` (Potts `ν = 5/6` reference; reuses existing `benchmark-numbers.md` pattern).

**FIG. 6 — Magic density and long-range magic in spin-1 XXZ chain.**
Model: spin-1 XXZ at `Δ=1` with single-ion `D Σ (S^z_i)²`, `S^z_total = 0`. (a) `m_1` vs `D ∈ [−0.5, 2.0]` over Néel / Haldane / large-D phases; (b) `L(ρ_AB)` vs `D` for `A = {1,…,L/4}, B = {L/2+1,…,3L/4}` on a periodic ring. Sizes `L = 8…128`; `χ ≤ 60`; `N_S = 10^6`. Reference transitions: `D ≈ −0.3` (Néel/Haldane Ising), `D ≈ 0.97` (Haldane/large-D Gaussian).
Claim: full-state magic identifies the Haldane phase but misses the transitions; long-range magic detects both.
Primitives: ✗ model skill `spin-1-xxz` (also covers Heisenberg `Δ=1` with single-ion `D` — generic spin-1 chain family); `physics/magic` (long-range partition mode + Rényi-2 mutual-information byproduct); `methods/pauli-markov.md`; `methods/ttn.md`; `/parameter-scan` (over `D`); `/finite-size-scan`; `magic-benchmarks.md` (Haldane-phase magic plateau, transition values from DMRG references).

**FIG. 7 — Long-range magic in 1D quantum Ising chain.**
Same Ising as FIG. 4. `L(ρ_AB)` vs `h ∈ [0, 2]`, sizes `L = 8…128`; inset: `L(ρ_AB)` at `h_c = 1` log-scale → logarithmic growth in `L`. `χ ≤ 30`, `N_S = 10^6`.
Claim: long-range magic peaks at criticality and grows logarithmically in `L` at `h_c = 1` (parallels Calabrese-Cardy mutual-information form).
Primitives: model skill `transverse-field-ising` (✓); `physics/magic`; `physics/criticality` (✓ — log-`L` growth is a CFT diagnostic); `methods/pauli-markov.md`; `methods/ttn.md`; `/parameter-scan`; `/finite-size-scan`; `/scaling-fit` (log-`L` form is a `/scaling-fit` instance); `magic-benchmarks.md` (Ising long-range magic at criticality reference).

**FIG. 8 — Magic densities in 2D Z₂ gauge theory (≡ 2D Ising via Wegner duality).**
Model: 2D `Z_2` gauge `H = −h Σ_∈⊥ τ^x − Σ_□ τ^z…τ^z` on `L×L` torus (charge-free sector). Equivalently 2D Ising `H = −Σ σ^x σ^x − h Σ σ^z` on dual square. (a) `m_1`, (b) `m_2` vs `h ∈ [2, 4]`, sizes `L = 4…10`; `χ ≤ 60`, `N_S = 10^6`. Critical `h_c ≃ 3.04`.
Claim: 2D magic exhibits *crossing* at the confinement-deconfinement transition (qualitatively unlike the 1D peak).
Primitives: ✗ model skill `z2-lattice-gauge` (or extend `transverse-field-ising` to 2D — design choice; recommended path: extend TFIM with a 2D `lattice` runtime arg, since the duality preserves SREs and the 2D Ising route is what is actually computed); `physics/magic`; `physics/confinement` (cross-model organizing question — confinement-deconfinement diagnostics; generic across gauge/Ising/extended-Hubbard); `methods/pauli-markov.md`; `methods/ttn.md` (PBC torus geometry, not just MPS-friendly chains); `/finite-size-scan` (2D `L×L`); `/parameter-scan`; `magic-conventions.md` (Wegner-duality-preservation note for SREs); `magic-benchmarks.md` (3D Ising universality reference: `h_c ≃ 3.04`, `ν ≃ 0.63`).

**FIG. 9 — Finite-size critical scaling of SRE density in 2D Z₂ gauge theory.**
(a) `m_1` zoom near `h_c`, sizes `L = 4…8`, `χ = 30`; (b) data collapse `(m_1 − m_{1,cr}) L^{γ/ν}` vs `(h − h_c) L^{1/ν}` → `ν = 0.64 ± 0.05` (consistent with 3D Ising `ν_{3D} ≃ 0.63`). `N_S = 10^7`.
Claim: 2D magic gives universal scaling collapse and a correct `ν` extraction even at modest `χ` — magic is less affected by truncation than the Binder cumulant (cf. FIG. 14).
Primitives: `physics/criticality` (✓); `/scaling-fit` (universal collapse, exponent extraction, error bars); `/finite-size-scan`; `/parameter-scan`; `magic-benchmarks.md` (3D Ising `ν`).

**FIG. 10 — Simulated experiment to measure SREs.**
Model: 1D Ising `L = 8`. `m_1, m_2` vs `h ∈ [0.4, 1.6]` from a *finite-shot* sampling: `N_M = 500` measurements per Pauli, `N_S = 10^4` Pauli strings drawn by Markov chain.
Claim: the Markov-chain protocol works as an experimental procedure with no two-copy / Bell-basis requirement.
Primitives: `physics/magic` (the experimental-protocol mode is a runtime branch on the same skill — same observable, finite-shot estimator); `methods/pauli-markov.md` (must include the experimental-protocol variant: `N_M` finite-shot per Pauli expectation; `N_S` sample chain). No new skill — this is a noise model on the existing estimator.

**FIG. 11 — Errors in SRE density for simulated experiments.**
1D Ising at `h_c = 1`, `L = 16`. `δm_n = |m_n^{Sim.Exp.} − m_n^{exact}|` for `n=1,2`. (a) vs `N_M ∈ [10², 10⁶]` at fixed `N_S = 10^4`; (b) vs `N_S ∈ [2.5, 20]·10³` at fixed `N_M = {10³, 10⁵}`.
Claim: bias from finite `N_M` dominates at small `N_M`; growing `N_S` alone does not erase it.
Primitives: `methods/pauli-markov.md` (variance/bias analysis; finite-`N_M` bias term); `/parameter-scan` (over `N_M`, `N_S`); `/verify-convergence` (composes with `N_M, N_S` as the convergence parameters — same primitive, different knob).

**FIG. 12 — Autocorrelation time and statistical errors (Appendix A).**
Model: 2D Ising at `h = 3`, sizes `N = L×L, L = 4…10`. (a) integrated autocorrelation time `τ_I` vs `N`: linear for `m_1`, saturating for `m_2`; (b) `σ` vs `N`: exponential for `m_2`, power-law `~N^{−1/2}` for `m_1`.
Claim: `M_1` is efficient (linear-`N` variance bound); `M_n>1` requires exponential samples in `N` for typical (volume-law) magic — matches the variance derivation in §III.
Primitives: `methods/pauli-markov.md` (autocorrelation diagnostics + variance bounds belong on the algorithm card, not the physics skill); `/verify-convergence` (autocorrelation as a convergence check); `/finite-size-scan` (over `L`).

**FIG. 13 — Convergence of SRE with respect to bond dimension (Appendix B).**
Model: 2D Ising `h = 3`, `L = 10`. `m_1, m_2` vs `χ ∈ [10, 60]`.
Claim: SREs converge to a constant within statistical error as `χ` grows.
Primitives: `/verify-convergence` (bond-dimension sweep — directly the existing AGENTS.md verification step §3, just instantiated for the magic observable); `methods/ttn.md`; `methods/dmrg.md` (✓, for cross-method MPS check) — *all generic*.

**FIG. 14 — Binder cumulant across the critical point in 2D Ising (Appendix D).**
Model: 2D Ising at `χ = 30`, `L = 4…8`. Binder cumulant `U = 1 − ⟨s_x^4⟩ / (3 ⟨s_x²⟩²)` vs `h ∈ [2.8, 3.2]`. Crossings drift with `L` — *fail* to identify `h_c` cleanly at `χ = 30`.
Claim: the Binder cumulant fails as a critical detector at the bond dimension where magic succeeds (FIG. 9), establishing magic's robustness advantage.
Primitives: model skill `transverse-field-ising` (✓, 2D extension); `physics/criticality` (✓ — Binder cumulant is a standard `criticality` diagnostic); `/parameter-scan`; `/finite-size-scan`; `/cross-method-check` (the comparison "magic vs Binder at fixed `χ`" is a cross-diagnostic check on the same data — generic primitive).

### B. Per-main-result demands

**MR-1. Markov-chain Pauli sampling estimates SREs efficiently for `M_1` (variance polynomial in `N`); for `M_n>1` it is feasible up to volume sizes the direct method cannot reach.**
Primitives: `methods/pauli-markov.md` (algorithm card incl. variance analysis + estimator forms); `physics/magic` (skill that calls it); `/verify-convergence` (autocorrelation + variance as convergence diagnostics).

**MR-2. Long-range magic `L(ρ_AB)` is a UV-finite, mutual-information-like diagnostic of CFT criticality — it peaks/extremizes at the critical point in 1D Ising, Potts, and spin-1 XXZ (where full-state magic fails).**
Primitives: `physics/magic` (owns the three partition modes); `physics/criticality` (✓); model skills `transverse-field-ising` (✓), `potts-clock` (✗), `spin-1-xxz` (✗); `methods/pauli-markov.md`; `/parameter-scan`; `/finite-size-scan`.

**MR-3. In 2D `Z_2` gauge theory (≡ 2D Ising), magic density `m_1` exhibits a Binder-cumulant-like crossing at the confinement-deconfinement transition, with finite-size scaling collapse yielding `ν` consistent with 3D Ising universality at modest `χ`.**
Primitives: model skill `transverse-field-ising` (✓ — extended to 2D `L×L` torus runtime arg); `physics/magic`; `physics/confinement` (✗ — new cross-model physics skill: confinement-deconfinement diagnostics, applicable to gauge / Ising / Higgs / `t-J` etc.); `physics/criticality` (✓); `/scaling-fit`; `magic-conventions.md` (Wegner duality preserves SRE).

**MR-4. The Markov-chain protocol carries over to experimental measurements: finite `N_M` (shots/Pauli) introduces bias, finite `N_S` (Pauli-string samples) introduces variance; both budgets must be balanced.**
Primitives: `methods/pauli-markov.md` (experimental-protocol variant on the same algorithm card); `/verify-convergence` (over `N_M, N_S`).

**MR-5. TTN sampling with `O(χ^4 log N)` per-update cost outperforms MPS perfect-sampling for large `N`; furthermore, magic estimators stay accurate even when `χ` is too small for standard observables (e.g., Binder cumulant) to converge — a method-on-problem robustness claim.**
Primitives: `methods/ttn.md` (✗ new algorithm card); `methods/dmrg.md` (✓, MPS comparison baseline); `/cross-method-check` (TTN vs MPS, magic vs Binder); `/verify-convergence` (`χ`-sweep).

**MR-6. The increment-trick `c_N = 2 M_n(N/2) − M_n(N)` decomposes into `O(log N)` steps and gives sub-`log L` error scaling for SRE densities — applicable in 1D directly, generalizable to higher D via Kitaev-Preskill / Levin-Wen-style linear combinations.**
Primitives: `methods/pauli-markov.md` (the increment construction lives on the algorithm card per `multi-stage orchestration in method cards` rule); `/run-stage` (executes one stage of the multi-stage increment computation); `/run-report` (assembles the staged result with verification status). Skill (`physics/magic`) only declares *what* to compute; staging lives in the card.

### C. Aggregate primitive demand (deduped)

| Primitive | Type | Demanded by | Status | Notes |
|---|---|---|---|---|
| `transverse-field-ising` | model skill | FIG. 4, 7, 8, 9, 10, 11, 13, 14; MR-2, MR-3 | ✓ | Already exists. Needs runtime support for 2D `L×L` torus geometry — that is a runtime arg per AGENTS.md, not a new skill. |
| `physics/criticality` | physics skill | FIG. 5, 7, 9, 14; MR-2, MR-3 | ✓ | Already covers data-collapse, exponent extraction, finite-size scaling. Composes cleanly. |
| `physics/magic` | physics skill | every figure; MR-1, MR-2, MR-3, MR-4, MR-5, MR-6 | ✗ | New. Owns: SRE definitions (`M_1`, `M_n>1`, `M̃_2`); partition modes (full / disjoint-bipartite / increment); long-range magic `L(ρ_AB)`; Bell magic / nullity (companion paper); experimental-protocol mode. Topic-typed, instance-generic — applies to any model. |
| `physics/confinement` | physics skill | FIG. 8, 9; MR-3 | ✗ | New cross-model organizing question: confinement-deconfinement diagnostics (Wilson-loop area→perimeter law, magic crossing, Binder-cumulant alternatives). Generic over gauge / Ising / Higgs / `t-J`. |
| `potts-clock` | model skill | FIG. 5; MR-2 | ✗ | New model skill: `d`-state Clock / Potts ferromagnet/paramagnet QPT. Generic qudit family; not Potts-paper-specific. |
| `spin-1-xxz` | model skill | FIG. 6; MR-2 | ✗ | New model skill: spin-1 XXZ with single-ion anisotropy `D`; covers Néel/Haldane/large-D phase diagram. Reuses `heisenberg` skill's diagnose pattern. (Alternative: extend `heisenberg` to spin-1; design choice for Phase 2.) |
| `methods/pauli-markov.md` | KB card (method) | FIG. 2, 3, 4, 7, 10, 11, 12; MR-1, MR-4, MR-6 | ✗ | New algorithm card: Metropolis on Pauli strings; estimator forms for `M_n` and `L(ρ_AB)`; variance / autocorrelation analysis; increment trick (multi-stage orchestration); experimental-protocol variant. Method-card-per-algorithm. |
| `methods/ttn.md` | KB card (method) | FIG. 3, 8, 13; MR-3, MR-5 | ✗ | New algorithm card: tree-tensor-network ground-state + link-operator update; binary-tree structure for 1D ring and 2D torus; PBC support; `O(χ^4 log N)` cost. Distinct algorithm from MPS/DMRG. |
| `methods/dmrg.md` | KB card (method) | FIG. 13; MR-5 | ✓ | Already exists. Used as the MPS-baseline cross-method check. |
| `magic-conventions.md` | KB card (conventions) | FIG. 1, 8; MR-3 | ✗ | New: Pauli/clock-shift conventions, qudit Pauli, T-state, Wegner-duality SRE preservation, partition-mode notation. Cited by `physics/magic` and `methods/pauli-markov.md`. |
| `magic-benchmarks.md` | KB card (benchmarks) | FIG. 4, 5, 6, 7, 8, 9 | ✗ | New benchmark file (mirrors existing `benchmark-numbers.md` pattern): 1D Ising `m_n(h_c)` reference, Potts `ν = 5/6`, 3D Ising `ν ≃ 0.63`, spin-1 XXZ `D ≃ 0.97` Gaussian transition, 2D Ising `h_c ≃ 3.04`. Citation-tagged. |
| `/finite-size-scan` | problem-solving primitive | FIG. 4, 5, 6, 7, 8, 9, 12, 13, 14; MR-2, MR-3 | ✗ | Generic: sweep `L` over any scalar observable provided by a model skill; auto-emits `(L, observable)` table + plot. Composes with any `physics/*` and `models/*`. |
| `/parameter-scan` | problem-solving primitive | FIG. 4, 5, 6, 7, 8, 10, 11, 14; MR-2, MR-3, MR-4 | ✗ | Generic: sweep one Hamiltonian parameter or one estimator parameter (`h`, `D`, `Δ`, `N_M`, `N_S`); pairs with `/finite-size-scan` for 2D grids. |
| `/scaling-fit` | problem-solving primitive | FIG. 5, 7, 9; MR-2, MR-3 | ✗ | Generic finite-size collapse + exponent extraction with error bars: input `(L, h, observable)` table, output `(h_c, ν, γ)` and a collapse plot. Used for any critical scaling — not magic-specific. |
| `/verify-convergence` | problem-solving primitive | FIG. 4, 11, 12, 13; MR-1, MR-4, MR-5 | ⊙ | AGENTS.md §3 names the pattern; not yet a named primitive skill. Generic over the convergence parameter (`χ`, `N_S`, `N_M`, `bath-size`, `Trotter step`). Phase 2 promotes from informal pattern to skill. |
| `/cross-method-check` | problem-solving primitive | FIG. 13, 14; MR-3, MR-5 | ✗ | Re-runs the same observable with an independent algorithm (TTN vs MPS, DMRG vs ED, magic vs Binder) at matched parameters; auto-tags agreement / disagreement. AGENTS.md §5 names the pattern. Generic. |
| `/run-stage` | problem-solving primitive | FIG. 4, 8, 9; MR-6 | ✗ | Executes one stage of a multi-stage method-card pipeline (e.g., one increment-trick level, one TTN-then-sample stage). Generic over staged algorithms. Also natural for slurm-grid demo (each grid cell is a stage). |
| `/run-report` | problem-solving primitive | every figure (assembly); all MRs | ✗ | Assembles consolidated runnable script + run report (setup, settings, result, verification status, residual uncertainty) per AGENTS.md "Writeup handoff". Generic; one per session, not per figure. |
| `/slurm-grid` | problem-solving primitive | FIG. 4, 5, 6, 7, 8, 9 (`(L, parameter)` grid) | ✗ | Optional Phase-2 add: launches an embarrassingly-parallel `(L, parameter)` grid via slurm; pairs with `/run-stage` for per-cell stages. Listed in milestone-plan inventory. Generic over any 2D parameter sweep. |
| `arxiv-search` | external skill | frontier flag in `physics/magic`, `physics/confinement` | ✓ | Already exists. Used per AGENTS.md to anchor frontier interpretation in current literature. |
| `scientific-visualization` | external skill | FIG. 1, 2, 3 schematics; convergence + collapse plots | ✓ | Already exists. The auto-generated convergence plot per AGENTS.md output norm goes through this. |
| `download-ref` | external skill | KB ingest of any further reference | ✓ | Already exists; used to land the validation paper itself. |

### Notes on genericness refactoring

Three places in the per-figure list looked initially like recipes; each was decomposed into primitives + a runtime composition rule, on the *primitives, not recipes* gate:

1. **2D Z₂ gauge theory (FIG. 8, 9, 14)** — first sketch was a `z2-lattice-gauge` skill. Refactored: since the paper computes via the dual 2D Ising and the duality preserves SREs, the actual calculation is 2D TFIM on a torus. The model side is `transverse-field-ising` with a 2D-lattice runtime arg. The new physics skill is `physics/confinement`, which is a *cross-model* organizing question (gauge ⇄ Ising ⇄ extended-Hubbard) — a primitive in the AGENTS.md "physics skills hold cross-model organizing questions" sense.
2. **Increment trick (FIG. 4, MR-6)** — first sketch was a `/increment-magic` skill. Refactored: per AGENTS.md "multi-stage orchestration lives in method cards, not skills", the increment trick belongs on `methods/pauli-markov.md`, and its stages run via the generic `/run-stage` primitive. The skill (`physics/magic`) only says *what* to compute.
3. **Finite-shot experimental protocol (FIG. 10, 11, MR-4)** — first sketch was a separate `physics/experimental-magic` skill. Refactored: it is the same observable with a noise model on the estimator. Lives on `methods/pauli-markov.md` as a runtime variant; `physics/magic` exposes it via a runtime branch in its diagnose step. No new skill.

`spin-1-xxz` is listed as ✗ but Phase 2 may decide to extend the existing `heisenberg` skill with a `spin = 1` runtime arg + single-ion-anisotropy hook rather than spin off a new skill — that is the cleaner refactor against AGENTS.md "Dimension, lattice, filling, doping, boundary condition, disorder strength, and coupling regime are runtime choices unless they define a truly distinct canonical problem". Defer that decision to Phase 2.

`potts-clock` stays ✗ as a distinct skill: `d=3` qudit Hilbert space is a *different* canonical problem family from any spin-1/2 Ising/Heisenberg variant, not a runtime choice.

The two ⊙ entries (`/verify-convergence` is the only one in the table; `transverse-field-ising` 2D extension is an in-place enhancement rather than ⊙ in the AGENTS.md sense) are pre-existing harness ideas without a named primitive yet — Phase 2 promotes them to skills.

## Phase 2 — Polisher Output (2026-05-05)

> 15 generic primitives authored, branch tables updated on 2 existing model skills, Ion.toml + AGENTS.md "Knowledge Base" / "Installed Skills" sections refreshed. Both genericness gates (user-style + primitive) applied at draft time. No proper-name workflow text in the new artifacts; benchmark numbers cited as ranges via `knowledge-base/literature/magic/`.

### Skills (4)

- `tools/skills/problems/physics/magic/SKILL.md` — physics-skill shape (Diagnose / Evidence / Cross-checks / Interpretation rules / Frontier flag / Estimator choice / Model hooks). Topic-typed, instance-generic; covers SRE definitions, partition modes (full / disjoint-bipartite / increment), long-range magic, deterministic-Pauli-MPS-lift route, experimental-protocol mode. **Gates**: User-style ✓ (act-first defaults, AskUserQuestion at the partition / estimator fork only); Primitive ✓ (any model with a Pauli structure).
- `tools/skills/problems/physics/confinement/SKILL.md` — physics-skill shape. Cross-model organizing question for confinement-deconfinement diagnostics; calls into `physics/magic` for magic-crossing diagnostic and into model skills via duality (e.g., 2D `Z_2` ↔ 2D Ising). **Gates**: User-style ✓; Primitive ✓ (gauge / Ising-via-duality / extended-Hubbard-style).
- `tools/skills/problems/models/potts-clock/SKILL.md` — model-skill shape (Diagnose / Workflow / Method recommendations / Branch table / Verification). Generic over `q`; the 1D `q = 3` case sits at `c = 4/5` parafermion CFT with `ν_Potts = 5/6` (limit anchor). Magic branch-table row included. **Gates**: User-style ✓; Primitive ✓ (any q-state qudit FM/PM transition family).
- `tools/skills/problems/models/spin-1-xxz/SKILL.md` — model-skill shape. Spin-1 XXZ chain with optional single-ion anisotropy; covers Néel / Haldane SPT / large-`D` phases and Ising / Gaussian transitions between them. **Decision recorded**: kept as a separate skill (not a `spin = 1` runtime arg on `heisenberg`) because the spin-1 Hilbert space + SPT physics define a distinct canonical problem family per AGENTS.md "Dimension, lattice, …". The Phase-1 demand-map raised the alternative; Phase 2 ratifies the separate-skill choice. **Gates**: User-style ✓; Primitive ✓ (covers integer-spin chain physics generically, not paper-specifically).

### Method cards (2)

- `knowledge-base/methods/pauli-markov.md` — algorithm card. Markov-chain Metropolis on Pauli strings; estimator forms for `M_n` / `M_1` / `M̃_2` / `L(ρ_AB)`; subleading and increment construction (declared as Stages 0–3 with input/output artifacts); deterministic Pauli-basis-MPS lift folded in as a runtime variant per the project decision; experimental-protocol variant included. **Gates**: User-style ✓; Primitive ✓ (one algorithm class per the method-card-per-algorithm rule).
- `knowledge-base/methods/ttn.md` — tree-tensor-network ground-state + link-operator coarse-graining for `O(χ⁴ log N)` Pauli-flip updates; binary tree on 1D ring or 2D torus; PBC native. Stages declared (ground-state search → canonical prep → Pauli-flip support). **Gates**: User-style ✓; Primitive ✓ (one algorithm; supports any topology that fits a binary tree).

### KB cards (2)

- `knowledge-base/magic-conventions.md` — qudit / clock-shift Pauli definitions, `M_n` / `M̃_2` / `L(ρ_AB)`, three partition modes, T-state for qubit and qutrit, Wegner-duality SRE preservation note (cited from `models/transverse-field-ising` 2D row and `physics/confinement`), `M_α` strict-monotone caveat for `α < 2` with frontier flag. Author-named technique attributions softened to physics-phenomenon nomenclature (e.g., "topological-entanglement-entropy family" instead of "Kitaev-Preskill / Levin-Wen-style"). **Gates**: User-style ✓; Primitive ✓ (definitions only; no workflow content).
- `knowledge-base/magic-benchmarks.md` — 1D Ising, 1D 3-state Clock / Potts (`ν_Potts = 5/6` analytic anchor), spin-1 XXZ (`D ≈ −0.3`, `D ≈ 0.97` reference transitions), 2D Ising via Wegner duality (`h_c ≃ 3.04`, `ν_{3D} ≃ 0.63` range), single-qudit limit. All values cited as ranges via `knowledge-base/literature/magic/` per AGENTS.md verification rule §6 — no author/year attribution in the table cells. **Gates**: User-style ✓; Primitive ✓.

### Problem-solving primitives (7)

Top-level placement (matching `tools/skills/download-ref/` precedent for utility-style skills).

- `tools/skills/finite-size-scan/SKILL.md` — sweep `L` over any observable; auto convergence label (asymptoting / critical-like / drifting). **Gates**: User-style ✓ (Pragmatist / Curious / Skeptical all invoke equivalently — same data, different follow-up); Primitive ✓.
- `tools/skills/parameter-scan/SKILL.md` — sweep any scalar axis (Hamiltonian coupling or estimator knob); feature detection (monotone / extremum / crossing / discontinuity). **Gates**: User-style ✓; Primitive ✓.
- `tools/skills/scaling-fit/SKILL.md` — fit power-law / log-`L` / polynomial / data-collapse forms; bootstrap uncertainty; quality-of-fit reporting. Universality-class interpretation delegated to the calling physics skill. **Gates**: User-style ✓; Primitive ✓.
- `tools/skills/cross-method-check/SKILL.md` — AGENTS.md verification rule §5 promoted to a named primitive. Default secondary-method routing table (DMRG ↔ ED, TTN ↔ MPS-perfect-sampling, magic-vs-Binder, …); disagreement surfaced rather than averaged. **Gates**: User-style ✓; Primitive ✓.
- `tools/skills/run-stage/SKILL.md` — executor for method-card-declared stages; emits a manifest schema (`stage_id`, `inputs`, `outputs`, `runtime_seconds`, `script_hash`, `diagnostics`, `status`). Resume-friendly. **Gates**: User-style ✓; Primitive ✓ (any staged calculation in any method card).
- `tools/skills/run-report/SKILL.md` — assembles consolidated runnable script + structured run report from manifests. Section template aligned with AGENTS.md "Writeup handoff". **Gates**: User-style ✓; Primitive ✓.
- `tools/skills/slurm-grid/SKILL.md` — embarrassingly-parallel grid orchestrator with per-cell `/run-stage` invocation and resume-on-partial-completion. **Existing-skill survey**: registry searches (`ion search slurm`, `ion search grid`, `ion search submitit`) returned several general-purpose Slurm skills (e.g., `michaelrizvi/claude-config/skills/slurm`, `uchicago-dsi/ai-sci-skills/skills/slurm`, `kdkyum/slurm-skills/slurm-info-summary`, `heshamfs/materials-simulation-skills/slurm-job-script-generator`) and one DOE-style sweep (`heshamfs/materials-simulation-skills/parameter-optimization`); none combine grid orchestration with method-card-stage execution and resume semantics. Authored fresh; the skill explicitly composes with whichever sbatch generator the user has installed rather than reinventing it. **Gates**: User-style ✓; Primitive ✓.

### Branch-table updates (mandatory)

- `tools/skills/problems/models/transverse-field-ising/SKILL.md` — added rows for `magic` (any-D, citing partitions, increment trick, methodology references) and `confinement` (2D variant via Wegner duality, citing `magic-conventions.md` for SRE preservation).
- `tools/skills/problems/models/heisenberg/SKILL.md` — added row for `magic` on the spin-1/2 XXZ chain (default partition `L(ρ_AB)`, U(1) symmetry preserved by two-site Pauli updates) and a row routing `S=1` users to `spin-1-xxz`.
- `tools/skills/problems/models/spin-1-xxz/SKILL.md` (newly authored) — magic row included in the dedicated branch-table-magic section.
- `tools/skills/problems/models/potts-clock/SKILL.md` (newly authored) — magic row included in the dedicated branch-table-magic section; two-site Pauli-flip updates required for `Z_q` symmetry.

### Refactors and design decisions during authoring

1. **`physics/magic` does not own the increment trick** — moved to `methods/pauli-markov.md` as Stage 2 of the orchestrated pipeline, per AGENTS.md "multi-stage orchestration in method cards." The skill says *what* to compute; the method card says *how*, in stages; the generic `/run-stage` and `/slurm-grid` execute them.
2. **Deterministic Pauli-basis MPS lift folded into `methods/pauli-markov.md`** — kept as a runtime variant rather than a separate `methods/pauli-mps.md` card, per the project decision recorded in the milestone-plan; the variant shares the convention card and benchmark targets with the Markov-chain path. Two paths to the same observables = good cross-method-check substrate.
3. **`spin-1-xxz` kept as a separate skill** (not a runtime arg on `heisenberg`) — Phase 2 ratifies the project decision recorded in the milestone-plan; reasoning logged in the skill's intro and in this entry above.
4. **Author-named technique attributions softened** — replaced "Kitaev-Preskill / Levin-Wen-style" with "topological-entanglement-entropy family" and "Wolff-style cluster updates" with plain "cluster updates" in workflow text. Physics-phenomenon nomenclature (Bethe ansatz, Néel, Haldane, Wegner duality, Mott) preserved per the existing-skill precedent (these are standard terms-of-art, not paper attributions).
5. **AGENTS.md "Knowledge Base" + "Installed Skills" sections updated** — registers the new KB cards (`magic-conventions.md`, `magic-benchmarks.md`), the new method cards (`pauli-markov.md`, `ttn.md`), the two new model skills, the two new physics skills, and the seven problem-solving primitives. **Open: this is technically a runtime change to the harness's user-facing AGENTS.md**, but it lands in the same Phase-2 milestone window — surface for ratification before Phase-3 persona validation.
6. **Ion.toml updated** — registers all 11 new skills (4 problem skills + 7 problem-solving primitives) for `ion add`; method cards and KB cards do not need Ion registration.

### Cross-reference self-review

- All `knowledge-base/methods/<name>.md` references in the new skills resolve (verified by `Grep`).
- All `knowledge-base/magic-{conventions,benchmarks}.md` references resolve.
- All `tools/skills/problems/{models,physics}/<name>` references resolve.
- All seven problem-solving primitives have a top-level `tools/skills/<name>/SKILL.md`.
- Frontmatter `name:` fields match folder names for every new skill.
- Each method card declares stages explicitly with input/output artifacts (`pauli-markov.md` Stages 0–3; `ttn.md` Stages 0–2).
- KB cards cite literature by *what it provides* (a benchmark, a method) rather than by author/year in workflow-relevant text.

### Items to flag for the human partner before Phase 3

- **AGENTS.md change**: Knowledge Base list and Installed Skills list now mention the new artifacts. This is a runtime-visible change to the harness's entry document. The text remains stable in shape — it is an additive change, not a behavioral change — but the user-facing surface area grew by 11 skills + 4 KB cards. Ratification before Phase 3.
- **`spin-1-xxz`-vs-`heisenberg` split**: Phase 2 ratified the separate-skill choice. If Phase-3 persona testing reveals the split surface to be confusing (e.g., users default-routing spin-1 questions through `heisenberg` and getting wrong canonical defaults), revisit.
- **`physics/confinement` vs. an embedded confinement-aware row in model skills**: Phase 1 demand-map flagged the `physics/confinement` choice as the cross-model abstraction; Phase 2 implemented it. If persona testing finds the user always wants confinement-as-magic-crossing without a separate physics skill (i.e., the `magic` skill already covers it), surface for consolidation.
- **`run-report` template field expectations**: the template has a *Verification* block with six rows (limit / symmetry / convergence / internal consistency / cross-method / benchmark). Model skills currently only run a subset — the template's empty-row policy ("fields they cannot fill stay empty rather than being fabricated") is the right discipline but may surface as awkward in Phase-3 reports. Watch and refactor if needed.
- **Slurm-grid relies on user's cluster profile**: the skill is framed to compose with whichever sbatch generator the user has installed. If Phase-3 testing happens in an environment without one, the minimal-sbatch fallback path will get stress-tested. Consider an explicit installable cluster-discovery step in the harness Makefile if this turns out to be a friction point.
