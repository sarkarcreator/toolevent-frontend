import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Ticket Price Calculator',
  description: 'Estimate an event ticket price using costs, attendance and target profit.',
  alternates: { canonical: 'https://toolbox.events/tools/ticket-pricing' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
