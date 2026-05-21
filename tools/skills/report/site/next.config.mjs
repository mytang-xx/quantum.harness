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

// remark-math + rehype-katex render LaTeX to static KaTeX HTML at build time.
// No runtime JS needed — the snapshot-and-strip pass in build.mjs keeps the
// rendered math as inert <span class="katex">. KaTeX CSS is imported globally
// from app/layout.tsx so build.mjs's inlineCssUrls picks it up.
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

export default withMDX(nextConfig);
