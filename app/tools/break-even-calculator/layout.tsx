import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Break-Even Calculator',
  description: 'Calculate the break-even point for an event based on fixed costs, variable costs and expected attendance.',
  alternates: { canonical: 'https://toolbox.events/tools/break-even' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
