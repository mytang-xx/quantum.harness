// Tiny inline cite pill — a mono badge linking to source. Used in every
// audience-readable string per checklist C3. Browser-native title tooltip
// (no JS) shows the full path on hover.
export function Cite({ cite }: { cite?: string | null }) {
  if (!cite) return null;
  const short = cite.split('/').pop() ?? cite;
  return (
    <a className="cite" href={`#cite-${cite.replace(/[^\w-]/g, '_')}`} title={cite}>
      {short}
    </a>
  );
}
