---
name: magic
description: Use when the user is asking about many-body magic, nonstabilizerness, stabilizer Rényi entropies, Pauli weight distribution, long-range magic, or any "how non-Clifford is this state?" question across spin / fermion / gauge models.
---

# Magic

Diagnose nonstabilizerness on a concrete model. Compute the relevant magic measure, place it in context (peak / crossing / plateau / extremum), and identify what physical structure it is detecting (criticality, topological phase, confinement transition, or a basis-dependent baseline).

## Diagnose

Infer the diagnostic framing from the user's prompt and propose it for ratification.

**Canonical framing:** "You're asking about magic in [model on lattice] across [parameter range]. I'll treat this as: pick the partition mode (full / disjoint-bipartite / increment), pick `n` (default `n=1` for a strict monotone in any regime; `n=2` for experimental relevance), run Pauli-Markov sampling, then place the result against the limit checks. The model skill driving the wavefunction is [model skill]."

If the user already has data, adjust: "You have [observable at sizes / parameter values]. I'll evaluate it against the magic checklist and recommend the next computation."

Do not ask 5 questions. Propose the framing; let the user correct if wrong.

**Default partition mode:** *full state* `M_n` for a generic "is this state magic?" question; *disjoint bipartite* `L(ρ_AB)` whenever criticality is the question (long-range magic is UV-finite and works across 1D Ising, Potts, and spin-1 XXZ where full-state magic fails); *halving increment* whenever volume-law `M_n>1` makes the direct estimator exponentially expensive.

## Evidence to gather

For each item, the relevant model skill drives the wavefunction calculation; this skill specifies *what to compute* and *what to look for*. Definitions live in `knowledge-base/magic-conventions.md`.

- **`m_n` density across the parameter axis** — peak, plateau, crossing, or featureless. Match against the expected critical / topological structure of the model.
- **Long-range magic `L(ρ_AB)`** — extremum (peak or minimum) at criticality; decays away from criticality. Use disjoint subsystems with separation greater than the correlation length away from the critical regime.
- **Increment / subleading term `c_N`** — `c_N = 2 M_n(N/2) − M_n(N)` in 1D, with higher-D analogues. Cancels volume-law to expose `O(log N)` or `O(1)` substructure with polynomial sample cost.
- **Single-site / single-qudit baseline** — analytic magic of a product state of single qudits in the same basis; the difference is the genuinely many-body magic content.

How to compute each: see the relevant model skill and the algorithm card `knowledge-base/methods/pauli-markov.md` (with `knowledge-base/methods/ttn.md` as the wavefunction backbone for large `N` or 2D PBC).

## Cross-checks

| Competing explanation | Test that rules it out |
|---|---|
| Magic is artifact of basis choice (single-qudit baseline) | Compare to the analytic single-qudit magic of the same family; subtract or document. |
| Magic peak is finite-size only | Run at multiple `L`; a critical peak narrows but persists; an artifact disappears with `L`. |
| `L(ρ_AB)` value is a sampling fluctuation | Verify with reblocked errors and a second chain (different seed); confirm `τ_int` is not blowing up at the parameter point. |
| Wegner-duality-equivalent target was confused with the original | If the model is `Z_2` lattice gauge in 2D, the actual computation runs on the dual 2D Ising (SREs preserved) — confirm the dual is built correctly. |
| Volume-law `M_n>1` swamping a sub-leading scaling signature | Switch to the increment estimator (1D) or the higher-D subsystem-difference linear combination (topological-entanglement-entropy family). |

## Interpretation rules

- A non-zero magic density in a generic many-body state is *not* a phase indicator on its own — most ground states are non-stabilizer. The diagnostic content is the *parameter dependence* (peak / crossing / extremum / plateau) and the *partition dependence* (full vs disjoint).
- For 1D systems where full-state `m_n` features no critical signature (notable case: spin-1 XXZ across the Haldane transitions), the answer is to switch to `L(ρ_AB)`, not to declare "no critical magic." Long-range magic is the UV-finite diagnostic.
- For 2D confinement-deconfinement transitions, magic exhibits a *crossing* (Binder-cumulant-like), not a peak; the deconfined and confined phases are both volume-law in magic. Hand off to `confinement` for the broader cross-check toolkit.
- `M_α` is a strict monotone only for `α ≥ 2`. When using `M_α` with `α < 2` (including `M_1`) to draw a monotonicity-style conclusion, flag this — `M_1` is still the standard density-level diagnostic and remains useful.
- Negative extrema of `L(ρ_AB)` are physical: SRE is not subadditive. Do not flip signs to make `L ≥ 0`.
- The deterministic Pauli-basis MPS lift (`methods/pauli-markov.md` runtime variant) gives access to additional monotones (Bell magic, stabilizer nullity). Route there when those are the question and the wavefunction is MPS.

## Frontier flag

Magic in many-body systems is an active research area. The connection between magic and physical phenomena is poorly mapped outside criticality and the 2D `Z_2` confinement-deconfinement case. When the user is asking about a regime not yet in the established list (`knowledge-base/magic-benchmarks.md`):

1. Run the diagnostic plan above and report constraints honestly.
2. Invoke `arxiv-search` with a tailored query (e.g., `<model> magic`, `<lattice> stabilizer Rényi`) to surface the current state of the literature.
3. Cite the literature *range* of plausible interpretations alongside the harness result. Do not claim closure where the field has none.

`M_α` monotonicity for `α < 2` is itself contested in the literature; surface the caveat when relevant.

## Estimator choice

Default routing (skill picks; user ratifies):

| Question | Default estimator | Default partition |
|---|---|---|
| Is the magic density large/small/peaked? | `M_1` (Markov-chain, `Π = Ξ_P`) | Full state |
| Where is the critical point? (1D) | `L(ρ_AB)` | Disjoint bipartite (default `A = {1..L/4}`, `B = {L/2+1..3L/4}` on a ring; lattice analogues otherwise) |
| Recover `M_2` cheaply against volume-law | Increment-trick on `M_2` | Halving increment + recursion |
| Where is the confinement-deconfinement transition? (2D) | `m_1` | Full state (cross with `physics/confinement`) |
| Bell magic / stabilizer nullity / stabilizer-group identification | Deterministic Pauli-basis MPS lift (variant on `methods/pauli-markov.md`) | Full state |
| Experimental shot-budget question | Markov chain in finite-shot mode | Full state; sweep `(N_M, N_S)` jointly |

## Model hooks

`transverse-field-ising` (1D and 2D-via-Wegner-duality), `heisenberg` (1D XXZ as a special case; spin-1/2), `spin-1-xxz` (Néel / Haldane / large-`D`), `potts-clock` (qudit `d`-state), and any other model skill with a magic branch-table row.

## Related skills

- `criticality` — when magic is being used as a critical diagnostic; magic peaks/extrema land in the same finite-size-scaling toolkit.
- `confinement` — when magic is being used to detect a confinement-deconfinement transition; the magic-crossing is one diagnostic in a broader cross-check.
- `arxiv-search` — for frontier-regime literature framing.
