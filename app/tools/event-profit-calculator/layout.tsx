import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Profit Calculator',
  description: 'Estimate event revenue, costs and profit to understand the financial outcome of an event.',
  alternates: { canonical: 'https://toolbox.events/tools/profit-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
