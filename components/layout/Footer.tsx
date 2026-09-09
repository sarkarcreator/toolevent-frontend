'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMarket } from './MarketContext';
import { SUPPORTED_MARKETS } from '@/lib/market';
import { SupportedCountry } from '@/lib/types';
import { Globe2, ArrowUpRight, Sparkles, BookOpen, Mail } from 'lucide-react';

export function Footer() {
  const { country, setCountry } = useMarket();

  const financialTools = [
    ['Event Budget Calculator', '/tools/event-budget-calculator'],
    ['Event Profit Calculator', '/tools/event-profit-calculator'],
    ['Ticket Price Calculator', '/tools/ticket-price-calculator'],
    ['Break-Even Calculator', '/tools/break-even-calculator'],
    ['Event ROI Calculator', '/tools/event-roi-calculator'],
  ];

  const planningTools = [
    ['Wedding Budget Calculator', '/tools/wedding-budget-calculator'],
    ['Catering Cost Calculator', '/tools/catering-calculator'],
    ['Event Staffing Calculator', '/tools/event-staffing-calculator'],
    ['Guest RSVP Calculator', '/tools/guest-calculator'],
    ['Event Checklist Generator', '/tools/event-checklist-generator'],
  ];

  const regionalLinks = [
    ['Dubai Wedding Budget', '/uae/dubai-wedding-budget-calculator'],
    ['Dubai Event Budget', '/uae/dubai-event-budget-calculator'],
    ['UK Wedding Budget', '/uk/wedding-budget-calculator'],
    ['USA Wedding Budget', '/us/wedding-budget-calculator'],
    ['UAE Event Budget', '/uae/event-budget-calculator'],
  ];

  const linkClass = 'text-sm text-white/55 transition-colors hover:text-white';

  return (
    <footer className="mt-20 overflow-hidden bg-[#15171b] text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative border-b border-white/10 py-14 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-[#ff5a36]/10 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
            <div className="max-w-md">
              <Link href="/" className="group inline-flex items-center gap-3">
                <Image src="/logo.png" alt="Toolbox.Events" width={52} height={52} className="h-12 w-12 rounded-2xl object-cover shadow-lg shadow-[#ff5a36]/10 transition-transform group-hover:scale-105" />
                <span className="text-xl font-bold tracking-[-0.04em]">Toolbox<span className="text-[#ff7353]">.Events</span></span>
              </Link>
              <p className="mt-6 text-base leading-7 text-white/60">A practical event operating system for planning smarter, budgeting clearly, and making confident decisions.</p>
              <Link href="/ai-planner" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#15171b] transition-transform hover:-translate-y-0.5"><Sparkles className="h-4 w-4" />Start with AI<ArrowUpRight className="h-4 w-4" /></Link>
              <a href="mailto:care@toolbox.events" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/65 hover:text-white"><Mail className="h-4 w-4" />care@toolbox.events</a>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/50"><Globe2 className="h-4 w-4" />Your planning market</div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(SUPPORTED_MARKETS) as SupportedCountry[]).map((key) => {
                    const market = SUPPORTED_MARKETS[key];
                    const active = country === key;
                    return <button key={key} onClick={() => setCountry(key)} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${active ? 'border-[#ff5a36] bg-[#ff5a36] text-white' : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white'}`}>{market.flag} {key}</button>;
                  })}
                </div>
              </div>
            </div>

            <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-white/35">Financial tools</h3><ul className="space-y-3">{financialTools.map(([name, href]) => <li key={href}><Link href={href} className={linkClass}>{name}</Link></li>)}</ul></div>
            <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-white/35">Planning tools</h3><ul className="space-y-3">{planningTools.map(([name, href]) => <li key={href}><Link href={href} className={linkClass}>{name}</Link></li>)}</ul></div>
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-white/35">Explore</h3>
              <ul className="space-y-3">
                {regionalLinks.map(([name, href]) => <li key={href}><Link href={href} className={linkClass}>{name}</Link></li>)}
                <li><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><BookOpen className="h-4 w-4" />Event planning blog</Link></li>
                <li><Link href="/templates" className="text-sm font-semibold text-[#ff7353] hover:text-[#ff8b70]">Template Store →</Link></li>
                <li><Link href="/contact" className={linkClass}>Contact us</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 py-6"><div className="grid gap-3 text-xs leading-5 text-white/35 md:grid-cols-2 md:gap-8"><p><span className="font-semibold text-white/60">Estimates:</span> Calculator results are planning estimates. Vendor quotes, seasonality, taxes, and contract scope can change actual costs.</p><p><span className="font-semibold text-white/60">Transparency:</span> We may earn affiliate commissions from selected vendors at no additional cost to you.</p></div></div>
        <div className="flex flex-col gap-5 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Toolbox.Events. All rights reserved.</p><nav className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><Link href="/cookie-policy" className="hover:text-white">Cookies</Link><Link href="/affiliate-disclosure" className="hover:text-white">Disclosure</Link></nav></div>
      </div>
    </footer>
  );
}
