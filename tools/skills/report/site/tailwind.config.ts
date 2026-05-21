import type { Config } from 'tailwindcss';
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  presets: [createPreset()],
  theme: {
    extend: {
      colors: {
        // Editorial accent — kept from the legacy template so the report
        // recognizably belongs to this harness even after the docs-shell
        // restyling.
        terracotta: { DEFAULT: '#c96442', soft: 'rgba(201,100,66,0.08)' },
        olive: '#5e5d59',
      },
      fontFamily: {
        serif: ['Source Serif 4', 'Tiempos Headline', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      },
    },
  },
};

export default config;
