import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dubai Event Budget Calculator',
  description: 'Plan a Dubai event budget with a UAE-focused calculator for estimating event costs and spending.',
  alternates: { canonical: 'https://toolbox.events/tools/budget-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
