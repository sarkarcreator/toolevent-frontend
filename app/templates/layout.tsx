import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Planning Templates',
  description: 'Browse practical event planning templates for budgets, checklists and event organization with Toolbox.Events.',
  alternates: { canonical: 'https://toolbox.events/templates' },
  openGraph: {
    title: 'Event Planning Templates | Toolbox.Events',
    description: 'Practical templates to help organize event budgets, tasks and planning workflows.',
    url: 'https://toolbox.events/templates',
    type: 'website',
  },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
