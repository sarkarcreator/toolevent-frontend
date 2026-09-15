import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Checklist Generator',
  description: 'Create a practical event checklist to organize planning tasks, deadlines and event-day preparation.',
  alternates: { canonical: 'https://toolbox.events/tools/checklist' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
