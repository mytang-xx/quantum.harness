import { Card } from 'fumadocs-ui/components/card';
import { BookOpen, HelpCircle, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ProblemBlock } from '@/lib/types';
import { Cite } from './cite';

const KIND_META: Record<string, { label: string; icon: ReactNode }> = {
  background:     { label: 'Background',     icon: <BookOpen /> },
  open_question:  { label: 'Open question',  icon: <HelpCircle /> },
  why_it_matters: { label: 'Why it matters', icon: <Sparkles /> },
};

// Problem sub-page. Each block (background / open_question / why_it_matters)
// renders as a Fumadocs Card with icon + label + verbatim text + cite pill.
// Visibility is controlled by CSS :target — when /#problem is the hash, this
// section is the visible page.
export function ProblemSection({ blocks }: { blocks: ProblemBlock[] }) {
  return (
    <section id="problem" className="page">
      <header>
        <h2>Problem</h2>
        <span className="subtitle">what the paper asked</span>
      </header>
      {blocks.length === 0 ? (
        <p className="text-fd-muted-foreground italic">
          No problem statement on file. The editorial layer should extract one from the paper.
        </p>
      ) : (
        <div className="not-prose space-y-5">
          {blocks.map((b, i) => {
            const meta = KIND_META[b.kind] ?? { label: b.kind.replace(/_/g, ' '), icon: <BookOpen /> };
            return (
              <Card
                key={i}
                className="report-card"
                icon={meta.icon}
                title={meta.label}
              >
                <p className="report-card-body">
                  {b.text}
                  <Cite cite={b.cite} />
                </p>
                {b.scope && (
                  <p className="report-card-scope">{b.scope}</p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
