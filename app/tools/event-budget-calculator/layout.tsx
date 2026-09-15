import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Budget Calculator',
  description: 'Build an event budget by estimating major costs and planning spending for your event.',
  alternates: { canonical: 'https://toolbox.events/tools/budget-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
