import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import Content from '@/content/docs/report.mdx';
import { meta } from '@/lib/data';
import { tree } from '@/lib/source';

// Single-doc DocsLayout. No themeSwitch (we strip JS at snapshot), no search
// (single page). TOC is intentionally off — Fumadocs's article max-width
// bumps from 860 → 1120px when no TOC is present, which is what figure
// comparison panels need.
export default function ReportPage() {
  return (
    <DocsLayout
      tree={tree}
      nav={{ title: <span className="font-semibold">{meta.paperId}</span> }}
      sidebar={{ collapsible: false }}
    >
      <DocsPage>
        <DocsBody>
          <Content />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}
