import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Program',
  description: 'Learn about the Toolbox.Events affiliate program, participation details and available referral opportunities.',
  alternates: { canonical: 'https://toolbox.events/affiliates' },
  robots: { index: true, follow: true },
};

export default function AffiliatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
