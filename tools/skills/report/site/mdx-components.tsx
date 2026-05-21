import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { ProblemSection } from '@/components/problem-section';
import { MethodologySection } from '@/components/methodology-section';
import { ResultsSection } from '@/components/results-section';

// MDX-scope components. We compose with Fumadocs's actual primitives
// (Callout, Card, Steps) rather than reimplementing them; the section
// wrappers below are thin layouts over those primitives + native <details>.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Callout,
    Card,
    Cards,
    Steps,
    Step,
    ProblemSection,
    MethodologySection,
    ResultsSection,
  };
}
