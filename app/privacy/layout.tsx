import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Toolbox.Events privacy policy and learn how information is handled when you use the platform.',
  alternates: { canonical: 'https://toolbox.events/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
