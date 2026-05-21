# /report Methodology Rendering Redesign Plan

## (a) Critique Validity

The complaint is valid. `SKILL.md` section A7, "Greek and math symbols rendered", allows Unicode for simple symbols but also requires "proper sub/superscript markup" where needed. The current `editorial.json` goes beyond what Unicode can render cleanly or accessibly. `DESIGN.md` section 3, "Typography Rules", also calls for clear hierarchy and relaxed body rhythm; the Methodology page currently puts equations inside dense prose cards and a table instead of giving them math-specific hierarchy.

Places where Unicode breaks or is already being stretched:

| Source | Actual string | Break |
|---|---|---|
| `results/quantum_scars_turner_2018/editorial.json:35` and `:39` | `H = ∑ᵢ Pᵢ₋₁ Xᵢ Pᵢ₊₁` | Summation index and grouped subscripts are visually approximated. Proper rendering needs `\sum_i P_{i-1} X_i P_{i+1}`. |
| `results/quantum_scars_turner_2018/editorial.json:35` | `P = (1 − Z)/2` | Linear slash fraction is acceptable inline prose, but as a definition next to the Hamiltonian it should be a rendered fraction, `\frac{1-Z}{2}`. |
| `results/quantum_scars_turner_2018/editorial.json:35`, `:39`, `:114` | `D = F_{L−1} + F_{L+1}` and `2^L` | Raw TeX-ish braces and ASCII caret leak because Unicode cannot express grouped symbolic subscripts/superscripts cleanly. |
| `results/quantum_scars_turner_2018/editorial.json:29`, `:49`, `:62`, `:93`, `:96`, `:119`, `:122`, `:135` | `|Z₂⟩`, `|⟨E|Z₂⟩|²`, `⟨ZᵢZᵢ₊₁⟩`, `|n⟩ ∝ (H⁺)ⁿ |Z₂⟩` | Ket and bra-ket notation is only visually approximated; screen readers see punctuation, not MathML. Nested bars in overlaps are especially ambiguous. |
| `results/quantum_scars_turner_2018/editorial.json:62`, `:66`, `:78`, `:103`, `:106` | `D₀₊ = 77 436` and `i ∈ [D₀₊/5, D₀₊/2 − 500]` | Compound subscripts and fractional bounds are cramped. The level-statistics window should be displayed as math, not prose punctuation. |
| `results/quantum_scars_turner_2018/editorial.json:53`, `:87` | `t ≈ L/(2v) ≈ 9` | Fraction-in-text loses hierarchy and is easy to misread; render as `t \approx \frac{L}{2v} \approx 9`. |
| `results/quantum_scars_turner_2018/editorial.json:49`, `:62`, `:87`, `:135` | `T ≈ 2.35`, `Ω ≈ 1.33`, `ΔE/E ≈ 1%`, `P(s)` | Unicode is adequate for individual Greek letters and relation symbols, but not for accessible equation semantics or consistent math spacing. |
| `results/quantum_scars_turner_2018/editorial.json:29` | One long `expected_output_summary` sentence containing six figure obligations and many formulas | No multi-line equation is present. That absence is the problem: the Hamiltonian, projector definition, dimension formula, and derived quantities need a visual anchor instead of being embedded in one prose run. |

There is no literal nested "subscript of a subscript" in the current data, but there are grouped symbolic subscripts such as `F_{L−1}`, indexed operators such as `Pᵢ₋₁`, and compound sector labels such as `D₀₊`. These are exactly the class of expressions Unicode handles poorly.

The current TSX also weakens clarity independently of math rendering:

- `tools/skills/report/site/components/methodology-section.tsx:75-99` renders the model as a prose card; the Hamiltonian has no centered visual anchor.
- `tools/skills/report/site/components/methodology-section.tsx:91`, `:118`, `:160`, and `:187` display internal ids or raw scopes, conflicting with `SKILL.md` A1/A3.
- `tools/skills/report/site/components/methodology-section.tsx:59-64` displays `kb_refs` file paths, conflicting with `SKILL.md` A2.
- `tools/skills/report/site/components/methodology-section.tsx:144-168` renders parameters as a table using `JSON.stringify`, which is compact for data inspection but not audience-readable.

## (b) KaTeX Integration Plan

Install dependencies from the report site directory:

```bash
cd tools/skills/report/site
pnpm add remark-math rehype-katex katex
```

Inject MDX math support in `tools/skills/report/site/next.config.mjs`:

```ts
import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true },
  reactStrictMode: true,
  typedRoutes: false,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

export default withMDX(nextConfig);
```

Import KaTeX CSS globally in `tools/skills/report/site/app/layout.tsx`; put it before `globals.css` so the harness theme can override spacing or colors:

```tsx
import 'katex/dist/katex.min.css';
import './globals.css';
```

CSS inlining: if `katex/dist/katex.min.css` is imported into the Next app, the existing build pass should pick it up. `build.mjs` replaces same-origin `<link rel="stylesheet">` elements with `<style>` tags at `tools/skills/report/site/build.mjs:369-377`, then rewrites `url(...)` references at `:352-366`. The extra required step is the global CSS import above; the MDX plugin does not automatically include the CSS.

Font inlining: KaTeX `@font-face` rules use relative `url(...)` font paths. The existing `inlineCssUrls(cssText, baseUrl)` resolves each URL against the stylesheet URL and fetches same-origin assets, so it should inline KaTeX fonts once Next has emitted those font URLs into the exported CSS. Confidence: high for same-origin `url(...)` font references, but verify with one build because Next's handling of package CSS under `output: 'export'` determines the final URL shape. The function is not a general `@import` recursion engine; avoid relying on unbundled CSS imports.

Server-render confirmation: `remark-math` plus `rehype-katex` renders MDX math to static KaTeX HTML at build time. No runtime JS is needed, and `build.mjs` stripping every `<script>` tag at `tools/skills/report/site/build.mjs:411-417` is compatible. Exception: the Methodology equations currently live in `editorial.json` strings rendered by React components, not in MDX source, so the MDX plugins will not process them.

For JSX outside MDX, prefer a server-rendered `Math` component over moving equation strings into inline `$...$` MDX. The current architecture passes typed data from `lib/data.ts` into TSX; `$...$` inside JSON will render literally unless the builder is redesigned to generate MDX source from those strings. A `Math` component is smaller, explicit, SSR-safe, and preserves structured cites.

Add `tools/skills/report/site/components/math.tsx`:

```tsx
import katex from 'katex';

export function Math({
  latex,
  display = false,
  label,
}: {
  latex: string;
  display?: boolean;
  label?: string;
}) {
  const html = katex.renderToString(latex, {
    displayMode: display,
    output: 'htmlAndMathml',
    throwOnError: false,
    strict: 'warn',
    trust: false,
  });
  const Tag = display ? 'div' : 'span';

  return (
    <Tag
      className={display ? 'math math-display' : 'math math-inline'}
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

Use it from `tools/skills/report/site/components/methodology-section.tsx`:

```tsx
import { Math } from './math';

<ModelEquationHero title={m.name} cite={m.paper.cite}>
  <Math
    display
    latex={m.equations.find(e => e.role === 'hamiltonian')?.latex ?? ''}
    label="Hamiltonian used for this model"
  />
</ModelEquationHero>
```

Add CSS in `tools/skills/report/site/app/globals.css`:

```css
.math-display {
  margin: 1rem auto;
  overflow-x: auto;
  text-align: center;
  font-size: 1.18rem;
}

.math-inline {
  white-space: nowrap;
}
```

Do not use KaTeX auto-render or any browser-side math renderer; the exported report intentionally has no client-side JavaScript.

## (c) Visual-Anchor Redesign

### Models

Current layout problem: `methodology-section.tsx:75-99` wraps each model in a Fumadocs `Card` and sends both paper/run descriptions through `PaperOursPair`. The actual model formula is buried in `editorial.json` at `methodology.models[0].paper.text` (`results/quantum_scars_turner_2018/editorial.json:34-36`) and repeated in `ours.text` at `:38-40`. There is no centered Hamiltonian hero.

Proposed component: custom `ModelEquationHero` plus compact `PaperOursCompact`.

```tsx
<section aria-labelledby="models-heading">
  <h3 id="models-heading">Models</h3>

  {models.map(model => (
    <ModelEquationHero
      key={model.id}
      title={model.name}
      subtitle={model.summary?.text}
      cite={model.summary?.cite ?? model.paper.cite}
    >
      <Math display latex={model.equations[0].latex} label={model.equations[0].aria} />
      <div className="model-fact-strip">
        {model.facts.map(f => <StatChip key={f.label} label={f.label} value={f.value} cite={f.cite} />)}
      </div>
      <PaperOursCompact paper={model.paper} ours={model.ours} />
    </ModelEquationHero>
  ))}
</section>
```

The hero should center the Hamiltonian and put definitions underneath as smaller math/fact chips. It can use the existing warm parchment/terracotta palette from `globals.css` without adding JS.

### Methods

Current layout problem: `methodology-section.tsx:102-138` renders each method as another large card. The title embeds raw ids through `<code>` at `:116-119`, and deviations are keyed by internal ids at `:109` and `:122-130`. The editorial source has the useful method identities (`Exact diagonalization`, `iTEBD`, `LAPACK`, `shift-invert Lanczos`) in prose at `editorial.json:46-69`, but there is no method badge or stack/route summary.

Proposed component: custom `MethodRouteCard` with `MethodBadge`.

```tsx
<section aria-labelledby="methods-heading">
  <h3 id="methods-heading">Methods</h3>

  {methods.map(method => (
    <MethodRouteCard key={method.id}>
      <div className="method-card-head">
        <MethodBadge label={method.badge.label} tone={method.badge.tone} />
        <h4>{method.name}</h4>
      </div>
      <div className="method-chip-row">
        {method.settings.map(s => <StatChip key={s.label} label={s.label} value={s.value} />)}
      </div>
      <PaperOursCompact paper={method.paper} ours={method.ours} />
      {method.deviation && <Callout type="warn" title="Documented exception">{method.deviation_label}</Callout>}
    </MethodRouteCard>
  ))}
</section>
```

The method badge is the visual anchor: for example, "Exact diagonalization", "Tensor network", "Monte Carlo", "Variational", or another generic method family. It should not display raw ids such as `ed_static`.

### Parameters

Current layout problem: `methodology-section.tsx:140-170` uses a table. Values are printed via `JSON.stringify` at `:159`, and raw scopes are visible at `:160`. In the Turner run, the actual parameter keys at `editorial.json:72-99` are only three rows, so a dense table adds visual weight without improving scanability.

Proposed component: custom `ParameterStatStrip`.

```tsx
<section aria-labelledby="parameters-heading">
  <h3 id="parameters-heading">Parameters</h3>

  <ParameterStatStrip>
    {params.map(param => (
      <StatChip
        key={`${param.scope}:${param.name}`}
        label={param.label}
        value={param.display}
        cite={param.why.cite}
      >
        <details>
          <summary>Why this range</summary>
          <p>{param.why.text}</p>
        </details>
      </StatChip>
    ))}
  </ParameterStatStrip>
</section>
```

The strip should turn `L = 12, 16, 20, 24, 28, 32`, `L = 24`, and the initial-state list into scannable chips. Details remain available through native `<details>`, which survives script stripping.

### Assumptions

Current layout problem: `methodology-section.tsx:173-200` renders assumptions as Fumadocs `Cards`. The full assumption sentence becomes the card title at `:183-190`, raw scope appears at `:186-188`, and the important FSA construction equation in `editorial.json:119-123` is hidden inside a paragraph.

Proposed component: custom `AssumptionDisclosureList` with chip plus details.

```tsx
<section aria-labelledby="assumptions-heading">
  <h3 id="assumptions-heading">Assumptions</h3>

  <AssumptionDisclosureList>
    {assumptions.map(assumption => (
      <details key={assumption.id} className="assumption-detail">
        <summary>
          <AssumptionChip label={assumption.label} scope={assumption.scope_label} />
        </summary>
        <p>{assumption.text}</p>
        {assumption.equation && <Math display latex={assumption.equation.latex} label={assumption.equation.aria} />}
        <p><span className="why-eyebrow">Why?</span>{assumption.why.text}<Cite cite={assumption.why.cite} /></p>
      </details>
    ))}
  </AssumptionDisclosureList>
</section>
```

This keeps assumptions compact by default, while still exposing the exact source-backed reason. The chip label should be editorial ("Zero momentum and inversion symmetry") rather than a full sentence or raw scope string.

## (d) Editorial Schema Implications

The current schema in `SKILL.md` section "Schema (editorial.json)" is generic enough in spirit, but it lacks structured math and display labels. The redesign should extend the schema, not hardcode PXP-specific fields.

Recommended generic additions:

```json
{
  "methodology": {
    "models": [
      {
        "id": "model-id",
        "name": "Audience-readable model name",
        "summary": { "text": "One sentence.", "cite": "sources/paper.md:line" },
        "equations": [
          {
            "id": "hamiltonian",
            "role": "hamiltonian | constraint | dimension | definition | observable",
            "label": "Hamiltonian",
            "latex": "H = \\sum_i P_{i-1} X_i P_{i+1}",
            "display": true,
            "aria": "Hamiltonian H equals the sum over sites of P i minus one, X i, P i plus one.",
            "cite": "sources/paper.md:line"
          }
        ],
        "facts": [
          { "label": "Boundary", "value": "Periodic", "cite": "protocol.toml:[[claims]] ..." }
        ],
        "paper": { "text": "Short paper-side sentence.", "cite": "sources/paper.md:line" },
        "ours": { "text": "Short run-side sentence.", "cite": "protocol.toml:[[claims]] ..." }
      }
    ],
    "methods": [
      {
        "id": "method-id",
        "name": "Audience-readable method name",
        "badge": { "label": "Exact diagonalization", "tone": "primary" },
        "route": "paper | canonical | fallback | deviation",
        "settings": [
          { "label": "Sector", "value": "k = 0, I = +1", "latex": "k = 0, I = +1", "cite": "protocol.toml:[[cells]] ..." }
        ],
        "paper": { "text": "Short paper-side sentence.", "cite": "sources/paper.md:line" },
        "ours": { "text": "Short run-side sentence.", "cite": "protocol.toml:[[cells]] ..." },
        "deviation": "deviation-id"
      }
    ],
    "params": [
      {
        "name": "L",
        "label": "Chain length",
        "values": [12, 16, 20, 24, 28, 32],
        "display": "12, 16, 20, 24, 28, 32",
        "unit": "sites",
        "scope": "method:method-id",
        "scope_label": "Static spectrum",
        "why": { "text": "One sentence.", "cite": "sources/paper.md:line" }
      }
    ],
    "assumptions": [
      {
        "id": "assumption-id",
        "label": "Zero momentum and inversion symmetry",
        "text": "Full source-backed assumption.",
        "scope": "method:method-id",
        "scope_label": "Static spectrum",
        "why": { "text": "One sentence.", "cite": "sources/paper.md:line" },
        "equations": ["equation-id-if-needed"]
      }
    ]
  }
}
```

Schema rules to preserve:

- Keep `id` and `scope` as machine references, but never render them directly. This follows `SKILL.md` A1, A2, A3, and A6.
- Every displayed sentence and every equation label/aria string needs a cite or a documented fallback. This follows `SKILL.md` C3 and E1-E7.
- Use `sources/paper.md` for paper-side model/method text and `protocol.toml` for run-side choices, parameters, assumptions, and deviations, as required by `SKILL.md` section E, "Sourcing".
- The polish subagent brief in `SKILL.md` requires one entry per surface. Add `equations`, `facts`, `badge`, `settings`, `display`, and `scope_label` to that brief so the renderer no longer invents labels from ids.
- Keep roles generic: `hamiltonian`, `constraint`, `dimension`, `definition`, `observable`, `sector`, `budget`, `route`. Do not add fields named after PXP, scars, Fibonacci, Rydberg, or Turner-specific figures.

This also requires coordinated type/build updates in `tools/skills/report/site/lib/types.ts` and `tools/skills/report/site/build.mjs`, because the current loader only maps `models`, `methods`, `params`, `assumptions`, `kb_refs`, and `expected_output_summary`.

## (e) Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---:|---:|---|
| PDF print renders only the currently targeted sub-page because `.page` is hidden unless `:target` matches (`globals.css:126-128`). | High | High | Add print CSS: `@media print { .page { display: block !important; break-before: page; } }`; verify Problem, Methodology, and Results all print. |
| KaTeX accessibility regression if the outer math wrapper or all KaTeX output is marked `aria-hidden`. | Medium | High | Use KaTeX `output: 'htmlAndMathml'`; allow KaTeX's visual HTML span to be hidden from assistive tech, but preserve the MathML branch and do not put `aria-hidden` on the outer component. |
| KaTeX CSS and font files push the single HTML toward the 3 MB soft cap enforced by `build.mjs:31` and warned at `:437-438`. | Medium | Medium | Measure rendered size after adding KaTeX. If too large, keep only needed KaTeX font formats, remove unused figure weight first, or replace the package CSS with a minimal local subset. |
| Playwright `networkidle` at `build.mjs:332` may not guarantee font readiness before snapshot/inlining. | Medium | Medium | Before serialization, wait for `document.fonts.ready`; after the final HTML is written, inspect that no external font URLs remain. |
| MDX math plugins do not process `editorial.json` strings rendered through TSX props. | High | High | Use the server-rendered `<Math latex="...">` component for data-driven equations, or redesign build output to materialize data as MDX. Prefer the component. |
| KaTeX CSS import is missed or font URLs remain relative. | Low-Medium | High | Import `katex/dist/katex.min.css` from `app/layout.tsx`; verify the final HTML contains inlined `@font-face` data URLs and no `fonts/KaTeX...` external references. |
| Display equations overflow mobile width, especially Hamiltonians and level-statistics windows. | Medium | Medium | Wrap display math in `.math-display { overflow-x: auto; }`; audit at 375 px per `SKILL.md` B8. |
| New visual components accidentally depend on client JS, which `build.mjs` strips at `:411-417`. | Medium | High | Use server components, CSS, and native `<details>` only. Avoid KaTeX auto-render, Fumadocs interactive popovers, or client-only tooltips. |
| Raw ids, file paths, or scopes continue leaking through title/scope rendering (`methodology-section.tsx:91`, `:118`, `:160`, `:187`; `kb_refs` at `:59-64`). | High | Medium | Add `label`, `display`, and `scope_label` fields; make the renderer display those fields only, never raw `id`, `scope`, or `kb_refs`. |
| KaTeX parse errors or unsafe macros from editorial data break the static build. | Low | Medium | Render with `throwOnError: false`, `strict: 'warn'`, and `trust: false`; have the report audit flag any rendered `.katex-error` output as a methodology defect. |
