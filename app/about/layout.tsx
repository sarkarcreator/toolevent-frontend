import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Toolbox.Events',
  description: 'Learn how Toolbox.Events helps event organizers plan budgets, guests, catering, staffing and event workflows with practical tools and AI guidance.',
  alternates: { canonical: 'https://toolbox.events/about' },
  openGraph: {
    title: 'About Toolbox.Events',
    description: 'Learn how Toolbox.Events helps event organizers plan better events with practical calculators, templates and AI guidance.',
    url: 'https://toolbox.events/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
