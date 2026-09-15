import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Staffing Calculator',
  description: 'Estimate event staffing needs and staffing costs based on attendance and event requirements.',
  alternates: { canonical: 'https://toolbox.events/tools/staffing' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
