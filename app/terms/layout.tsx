import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the Toolbox.Events terms of service governing use of the event planning tools and platform.',
  alternates: { canonical: 'https://toolbox.events/terms' },
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
