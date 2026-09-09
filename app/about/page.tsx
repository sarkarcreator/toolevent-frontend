'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Globe2, Layers3, Sparkles, Target, ShieldCheck } from 'lucide-react';
import { useMarket } from '@/components/layout/MarketContext';

const markets = [
  { code: 'USA', title: 'United States', copy: 'Localized event budgeting and planning workflows for conferences, celebrations and live experiences.' },
  { code: 'UAE', title: 'UAE', copy: 'Built around AED pricing and event-planning realities across Dubai and the wider UAE.' },
  { code: 'UK', title: 'United Kingdom', copy: 'Practical planning tools for UK events, with GBP-ready calculations and templates.' },
];

const principles = [
  { icon: Calculator, title: 'Decisions, not spreadsheets', copy: 'Turn costs, guests, tickets and staffing into clear next actions.' },
  { icon: Sparkles, title: 'AI when it helps', copy: 'Use the AI Planner to move from a blank page to a structured event plan.' },
  { icon: Layers3, title: 'One connected workflow', copy: 'Move naturally from planning to budget, guests, catering, staffing and checklist.' },
];

export default function AboutPage() {
  const { country, currency } = useMarket();

  return (
    <div className="space-y-20 py-6 sm:py-10">
      <section className="relative overflow-hidden rounded-[32px] bg-[#17191F] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#FF5A36]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-[#3867FF]/15 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/75">
            <Target className="h-3.5 w-3.5 text-[#FF7A5C]" /> Built for better event decisions
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Planning an event should feel exciting — not overwhelming.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Toolbox.Events brings planning tools, calculators, templates and AI guidance into one simple workspace, so you can spend less time fighting spreadsheets and more time creating the event.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/ai-planner" className="inline-flex items-center gap-2 rounded-full bg-[#FF5A36] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#ED4B29]">
              Start with AI <Sparkles className="h-4 w-4" />
            </Link>
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              Explore tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-3xl border border-[#E7E9EE] bg-white p-7 shadow-[0_10px_30px_rgba(23,25,31,0.04)]">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0EB] text-[#FF5A36]"><Icon className="h-5 w-5" /></div>
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#667085]">{copy}</p>
          </div>
        ))}
      </section>

      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <span className="text-xs font-bold text-[#FF5A36]">THE IDEA</span>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-5xl">From “Where do I start?” to “I’ve got this.”</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#667085]">
            Events have hundreds of moving pieces. Toolbox.Events is designed to make those pieces easier to understand, calculate and act on — whether you are planning a wedding, conference, party, festival or corporate experience.
          </p>
          <div className="mt-7 flex items-center gap-3 text-sm font-semibold">
            <ShieldCheck className="h-5 w-5 text-[#3867FF]" />
            Clear workflows. Practical outputs. Less friction.
          </div>
        </div>
        <div className="rounded-[28px] border border-[#E7E9EE] bg-white p-5 shadow-[0_18px_50px_rgba(23,25,31,0.06)]">
          <div className="rounded-2xl bg-[#F7F8FA] p-5">
            <div className="flex items-center justify-between border-b border-[#E7E9EE] pb-4">
              <div><p className="text-xs font-semibold text-[#667085]">Your planning workspace</p><p className="mt-1 text-lg font-bold">{country} · {currency}</p></div>
              <Globe2 className="h-5 w-5 text-[#3867FF]" />
            </div>
            <div className="space-y-3 pt-4">
              {['AI event plan', 'Budget & ticket strategy', 'Guest + catering forecast', 'Staffing & event checklist'].map((item, i) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-[#E7E9EE] bg-white p-3.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2FF] text-xs font-bold text-[#3867FF]">0{i + 1}</div>
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><span className="text-xs font-bold text-[#FF5A36]">READY FOR DIFFERENT MARKETS</span><h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">Plan where your event happens.</h2></div>
          <span className="rounded-full border border-[#E7E9EE] bg-white px-3 py-1.5 text-xs font-semibold text-[#667085]">Currently viewing {country} · {currency}</span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {markets.map((market) => (
            <div key={market.code} className="rounded-3xl border border-[#E7E9EE] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(23,25,31,0.07)]">
              <div className="flex items-center justify-between"><span className="rounded-xl bg-[#17191F] px-3 py-2 text-xs font-bold text-white">{market.code}</span><Globe2 className="h-4 w-4 text-[#98A2B3]" /></div>
              <h3 className="mt-5 text-lg font-bold">{market.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#667085]">{market.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-[#E7E9EE] bg-white px-6 py-10 text-center sm:px-10">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0EB] text-[#FF5A36]"><Sparkles className="h-5 w-5" /></div>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em]">Ready to plan smarter?</h2>
          <p className="mt-3 text-sm leading-6 text-[#667085]">Start with the AI Planner or jump directly into the free tools.</p>
          <Link href="/ai-planner" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#17191F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2B2F38]">Open AI Planner <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
