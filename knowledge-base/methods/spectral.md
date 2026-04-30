# Spectral Functions (Stub)

Methods for computing dynamic response functions like `S(q,ω)`. **This is a stub** — the harness does not currently drive spectral-function calculations end-to-end. It exists so that agents route here instead of silently fabricating a recipe from training.

## When this fires

A user asks for `S(q,ω)`, dynamic structure factor, spectral function, Green's function `G(ω)`, or any frequency-resolved observable. The `heisenberg` and `hubbard` branch tables route "real-time dynamics" here.

## What the agent should do

1. **State honestly:** "Spectral functions are outside the harness's current ground-state scope. I have reference pointers but no tested recipe."
2. **Offer options via `AskUserQuestion`:**
   - `"Literature pointers (Recommended)"` — "I run arxiv-search for the method + model. You get citations and a method overview. No new calculation."
   - `"Off-skill attempt"` — "I write a script using general tDMRG / Chebyshev / Lanczos knowledge. Works but is not harness-verified — treat output with extra skepticism."
   - `"Ground state first"` — "I set up the ground state (in scope), which is the prerequisite for any spectral method. You decide on spectral after."
3. **If user picks off-skill:** proceed, but prepend every code block and result with a note: "Off-skill — not harness-verified."

## Common spectral methods (reference only — not recipes)

| Method | Idea | Key reference |
|---|---|---|
| tDMRG / TDVP | Real-time evolve `S^a_j(t)|GS⟩`, Fourier transform in space+time. | White & Feiguin, PRL 93, 076401 (2004). |
| Chebyshev MPS | Expand `δ(ω-H)` in Chebyshev polynomials applied to MPS. | Holzner et al., PRB 83, 195115 (2011). |
| Correction vector | Solve `(ω+iη-H)|X⟩ = S^a|GS⟩` as a linear system in MPS. | Kühner & White, PRB 60, 335 (1999). |
| Lanczos continued fraction (ED) | Tridiagonalize H in Krylov basis of `S^a|GS⟩`; evaluate Green's function analytically. | Dagotto, RMP 66, 763 (1994). |

## Convergence considerations (general, not tested)

- tDMRG: bond dim grows linearly with time; `T_max` limited. Frequency resolution `~ 2π/T_max`.
- Chebyshev: polynomial order controls resolution; bond dim grows with order.
- Correction vector: broadening `η` controls resolution; smaller `η` = harder solve.
- Lanczos ED: exact within the ED basis; limited by system size.

## Citations for this stub

When the harness gains a full spectral skill, this stub should be replaced. Until then, the references above are starting points for an off-skill attempt.
