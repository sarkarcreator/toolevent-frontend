'use client';

import Link from 'next/link';
import { useMarket } from '@/components/layout/MarketContext';
import { useAuth } from '@/components/layout/AuthContext';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Sparkles,
  Ticket,
  Users,
  Utensils,
  WalletCards,
} from 'lucide-react';

const tools = [
  { title: 'Event Budget', description: 'Build a realistic event budget in minutes.', href: '/tools/budget-calculator', icon: CircleDollarSign, tone: 'orange' },
  { title: 'Ticket Pricing', description: 'Find the right ticket price and margin.', href: '/tools/ticket-pricing', icon: Ticket, tone: 'blue' },
  { title: 'Guest Forecast', description: 'Estimate attendance and plan capacity.', href: '/tools/guest-attendance', icon: Users, tone: 'purple' },
  { title: 'Catering & Bar', description: 'Estimate food, drinks and service costs.', href: '/tools/catering', icon: Utensils, tone: 'green' },
  { title: 'Staffing', description: 'Plan roles, headcount and labor costs.', href: '/tools/staffing', icon: ClipboardCheck, tone: 'amber' },
  { title: 'Checklist', description: 'Turn your event into a clear action plan.', href: '/tools/checklist', icon: CheckCircle2, tone: 'pink' },
];

export default function HomePage() {
  const { country, currency } = useMarket();
  const { user, openAuthModal } = useAuth();

  return (
    <div className="space-y-20 pb-16 sm:space-y-28">
      <section className="relative overflow-hidden rounded-[32px] bg-[#17191f] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#ff5a36]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#3867ff]/20 blur-3xl" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-[#ff8b72]" />
              Your event planning command center
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.055em] sm:text-6xl lg:text-7xl">
              Plan the event.<br />
              <span className="text-[#ff7658]">We handle the complexity.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
              Free calculators, AI planning and practical templates to help you budget, price, staff and run better events — without spreadsheet chaos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/ai-planner" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a36] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#ff5a36]/20 transition hover:-translate-y-0.5 hover:bg-[#ff6847]">
                <Sparkles className="h-4 w-4" /> Start with AI <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tools" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/12">
                Explore all tools <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
              <span>✓ Free to use</span><span>✓ No spreadsheet setup</span><span>✓ {country} · {currency}</span>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-4 text-[#17191f] shadow-2xl shadow-black/25 sm:p-5">
            <div className="rounded-[22px] bg-[#f7f8fa] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#667085]">QUICK PLAN</p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight">Summer launch event</h2>
                </div>
                <div className="rounded-2xl bg-[#fff0eb] p-3 text-[#ff5a36]"><WalletCards className="h-5 w-5" /></div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ['Budget', '£12,500', '72%'],
                  ['Guests', '180', '60%'],
                  ['Catering', '£4,200', '34%'],
                ].map(([label, value, width]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm"><span className="font-semibold">{label}</span><span className="font-bold">{value}</span></div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eceef2]"><div className="h-full rounded-full bg-[#ff5a36]" style={{ width }} /></div>
                  </div>
                ))}
              </div>
              <Link href="/ai-planner" className="mt-4 flex items-center justify-between rounded-2xl bg-[#17191f] px-4 py-3 text-sm font-bold text-white">
                Continue planning <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-[#ff5a36]">THE TOOLKIT</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-.04em] sm:text-4xl">Everything you need to plan smarter</h2>
            <p className="mt-3 max-w-2xl text-[#667085]">Start with one problem. Get a clear answer. Move on to the next.</p>
          </div>
          <Link href="/tools" className="inline-flex items-center gap-1 text-sm font-bold text-[#17191f] hover:text-[#ff5a36]">View all tools <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.title} href={tool.href} className="group rounded-[24px] border border-[#e7e9ee] bg-white p-6 shadow-[0_8px_30px_rgba(23,25,31,.04)] transition duration-200 hover:-translate-y-1 hover:border-[#d9dce4] hover:shadow-[0_18px_45px_rgba(23,25,31,.08)]">
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl bg-[#f3f4f7] p-3 text-[#17191f] transition group-hover:bg-[#fff0eb] group-hover:text-[#ff5a36]"><Icon className="h-5 w-5" /></div>
                  <ArrowRight className="h-5 w-5 text-[#98a2b3] transition group-hover:translate-x-1 group-hover:text-[#ff5a36]" />
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#667085]">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-[28px] bg-[#eef2ff] p-7 sm:p-9">
          <div className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#3867ff]">AI PLANNER</div>
          <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-[-.045em] sm:text-4xl">Tell us what you&apos;re planning. Get the roadmap.</h2>
          <p className="mt-4 max-w-xl leading-7 text-[#52607a]">Describe your event, audience and goals. Turn the idea into a practical plan with tasks, budget thinking and next steps.</p>
          <Link href="/ai-planner" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#17191f] px-5 py-3 text-sm font-bold text-white">Open AI Planner <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="rounded-[28px] border border-[#e7e9ee] bg-white p-7 sm:p-9">
          <div className="flex items-center gap-3"><div className="rounded-2xl bg-[#fff0eb] p-3 text-[#ff5a36]"><Calculator className="h-5 w-5" /></div><div><p className="text-sm font-bold">Built for real decisions</p><p className="text-xs text-[#667085]">Not just pretty dashboards</p></div></div>
          <div className="mt-7 space-y-4">
            {['Budget before you commit', 'Price with confidence', 'Know your staffing needs', 'Keep every task visible'].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold"><CheckCircle2 className="h-5 w-5 text-[#18a66a]" />{item}</div>)}
          </div>
          {!user && <button onClick={() => openAuthModal('register')} className="mt-7 w-full rounded-full border border-[#e7e9ee] px-5 py-3 text-sm font-bold transition hover:border-[#17191f]">Create a free account</button>}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-7 text-center shadow-[0_8px_35px_rgba(23,25,31,.05)] sm:p-10">
        <p className="text-sm font-bold text-[#667085]">ONE SIMPLE WORKFLOW</p>
        <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-sm font-semibold text-[#17191f] sm:gap-3">
          {['AI Planner', 'Budget', 'Guests', 'Catering', 'Staffing', 'Checklist'].map((step, index) => <div key={step} className="flex items-center gap-2"><span className="rounded-full bg-[#f3f4f7] px-4 py-2.5">{step}</span>{index < 5 && <ArrowRight className="hidden h-4 w-4 text-[#98a2b3] sm:block" />}</div>)}
        </div>
      </section>
    </div>
  );
}
