import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Read the Toolbox.Events affiliate disclosure and understand how affiliate relationships are handled.',
  alternates: { canonical: 'https://toolbox.events/affiliate-disclosure' },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
