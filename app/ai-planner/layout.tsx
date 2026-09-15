import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Event Planner',
  description: 'Create a practical event plan with AI-assisted guidance for goals, guests, location, budget and event strategy.',
  alternates: { canonical: 'https://toolbox.events/ai-planner' },
  openGraph: {
    title: 'AI Event Planner | Toolbox.Events',
    description: 'Turn your event idea into a practical plan with AI-assisted event planning guidance.',
    url: 'https://toolbox.events/ai-planner',
    type: 'website',
  },
};

export default function AIPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
