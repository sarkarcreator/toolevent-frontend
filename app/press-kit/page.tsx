import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

const siteUrl = 'https://toolbox.events';

export const metadata: Metadata = {
  title: 'Press & Media Kit | Toolbox.Events',
  description: 'Official Toolbox.Events press and media information, product description, brand facts and links for publishers, event professionals and partners.',
  alternates: { canonical: `${siteUrl}/press-kit` },
  openGraph: {
    title: 'Press & Media Kit | Toolbox.Events',
    description: 'Official product information and media resources for Toolbox.Events.',
    url: `${siteUrl}/press-kit`,
    type: 'website',
  },
};

const tools = [
  'Event budget calculator',
  'Event profit calculator',
  'Ticket pricing calculator',
  'Break-even calculator',
  'Event ROI calculator',
  'Wedding budget calculator',
  'Catering calculator',
  'Staffing calculator',
  'Guest attendance calculator',
  'Event checklist generator',
];

export default function PressKitPage() {
  return (
    <main className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[32px] bg-[#17191f] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff5a36]/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff9a84]">Official resource</p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.055em] sm:text-6xl">Toolbox.Events Press &amp; Media Kit</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            A concise source of official product information for publishers, event professionals, communities, partners and anyone researching Toolbox.Events.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-[26px] border border-[#e7e9ee] bg-white p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">About</p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">What is Toolbox.Events?</h2>
          <p className="mt-4 text-sm leading-7 text-[#667085]">
            Toolbox.Events is a free online event planning platform that helps organizers turn planning assumptions into practical numbers and decisions. It combines calculators for budgets, pricing, profitability, break-even analysis, ROI, weddings and event operations with an AI-assisted event planner.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#667085]">
            The platform is designed for people planning private events, weddings, community events, conferences, ticketed experiences and other event projects where budgeting and operational decisions matter.
          </p>
        </div>

        <div className="rounded-[26px] border border-[#e7e9ee] bg-white p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">Official details</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div><dt className="font-semibold text-[#17191f]">Website</dt><dd className="mt-1 text-[#667085]">toolbox.events</dd></div>
            <div><dt className="font-semibold text-[#17191f]">Markets</dt><dd className="mt-1 text-[#667085]">USA · UAE · UK</dd></div>
            <div><dt className="font-semibold text-[#17191f]">Contact</dt><dd className="mt-1 text-[#667085]">hello@toolbox.events</dd></div>
          </dl>
        </div>
      </section>

      <section className="rounded-[26px] border border-[#e7e9ee] bg-white p-7 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">Product scope</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Planning tools currently available</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => <div key={tool} className="rounded-2xl border border-[#e7e9ee] px-4 py-3 text-sm font-medium text-[#344054]">{tool}</div>)}
        </div>
      </section>

      <section className="rounded-[26px] border border-[#e7e9ee] bg-white p-7 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">Useful links</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Explore the official platform</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/tools" className="group rounded-2xl border border-[#e7e9ee] p-4 hover:border-[#ffb7a8] hover:bg-[#fffaf8]"><span className="flex items-center justify-between text-sm font-bold">All planning tools <ArrowRight className="h-4 w-4 group-hover:translate-x-1" /></span><span className="mt-1 block text-xs text-[#667085]">Browse the complete calculator collection.</span></Link>
          <Link href="/blog" className="group rounded-2xl border border-[#e7e9ee] p-4 hover:border-[#ffb7a8] hover:bg-[#fffaf8]"><span className="flex items-center justify-between text-sm font-bold">Planning guides <ArrowRight className="h-4 w-4 group-hover:translate-x-1" /></span><span className="mt-1 block text-xs text-[#667085]">Read practical event planning articles.</span></Link>
          <Link href="/ai-planner" className="group rounded-2xl border border-[#e7e9ee] p-4 hover:border-[#ffb7a8] hover:bg-[#fffaf8]"><span className="flex items-center justify-between text-sm font-bold"><span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#ff5a36]" />AI event planner</span><ArrowRight className="h-4 w-4 group-hover:translate-x-1" /></span><span className="mt-1 block text-xs text-[#667085]">Turn an event idea into a practical plan.</span></Link>
          <a href="mailto:hello@toolbox.events" className="group rounded-2xl border border-[#e7e9ee] p-4 hover:border-[#ffb7a8] hover:bg-[#fffaf8]"><span className="flex items-center justify-between text-sm font-bold">Media &amp; partnership contact <ExternalLink className="h-4 w-4" /></span><span className="mt-1 block text-xs text-[#667085]">Contact the team for official information.</span></a>
        </div>
      </section>
    </main>
  );
}
