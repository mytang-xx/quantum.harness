import katex from 'katex';

// SSR-only math rendering. Called at build time inside server components;
// emits the KaTeX-rendered HTML directly so the snapshot-and-strip pass in
// build.mjs preserves it as inert markup. `output: 'htmlAndMathml'` keeps
// MathML for screen readers alongside the visual HTML branch.
//
// Editorial JSON carries `tex` (authoritative LaTeX) and optional
// `unicode_fallback`; we never throw — KaTeX renders an inline error span
// instead, which CSS styles in terracotta so it's spot-able in audit.

export function Math({
  tex,
  display = false,
  label,
  fallback,
}: {
  tex: string;
  display?: boolean;
  label?: string;
  fallback?: string;
}) {
  if (!tex) {
    return display
      ? <div className="math-display">{fallback ?? ''}</div>
      : <span className="math-inline">{fallback ?? ''}</span>;
  }
  const html = katex.renderToString(tex, {
    displayMode: display,
    output: 'htmlAndMathml',
    throwOnError: false,
    strict: 'warn',
    trust: false,
  });
  if (display) {
    return (
      <div
        className="math-display"
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <span
      className="math-inline"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
