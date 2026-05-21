import 'katex/dist/katex.min.css';
import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { meta } from '@/lib/data';

// Fumadocs's house typography: Inter for everything textual, JetBrains Mono
// for code. No serif. The visual identity is monochromatic per fumadocs-ui's
// own design tokens — accent colour only shows up via Callout type variants.
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono  = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  title: `${meta.paperId} · ${meta.runId} · /report`,
  description: meta.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-fd-background text-fd-foreground antialiased">
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
