import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how Toolbox.Events uses cookies and related technologies across the website.',
  alternates: { canonical: 'https://toolbox.events/cookie-policy' },
  robots: { index: true, follow: true },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
