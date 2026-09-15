import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dubai Wedding Budget Calculator',
  description: 'Estimate a Dubai wedding budget with a UAE-focused calculator for wedding planning costs.',
  alternates: { canonical: 'https://toolbox.events/tools/dubai-wedding' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
