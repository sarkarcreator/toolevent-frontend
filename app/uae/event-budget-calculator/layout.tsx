import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UAE Event Budget Calculator',
  description: 'Estimate an event budget using a UAE-focused event cost calculator.',
  alternates: { canonical: 'https://toolbox.events/tools/budget-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
