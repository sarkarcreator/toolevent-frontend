import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US Wedding Budget Calculator',
  description: 'Estimate wedding costs with a US-focused wedding budget calculator.',
  alternates: { canonical: 'https://toolbox.events/tools/wedding-budget' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
