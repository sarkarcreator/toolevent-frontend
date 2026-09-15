import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Toolbox.Events',
  description: 'Contact Toolbox.Events for product support, event planning questions, templates, partnerships and custom planning solutions.',
  alternates: { canonical: 'https://toolbox.events/contact' },
  openGraph: {
    title: 'Contact Toolbox.Events',
    description: 'Get in touch with the Toolbox.Events team for support, partnerships and event planning questions.',
    url: 'https://toolbox.events/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
