import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event ROI Calculator',
  description: 'Estimate event return on investment by comparing event costs with expected revenue or value.',
  alternates: { canonical: 'https://toolbox.events/tools/event-roi' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
