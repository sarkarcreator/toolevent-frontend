'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarket } from '@/components/layout/MarketContext';
import {
  Calculator, TrendingUp, Ticket, Scale, Heart, Utensils, Users, UserCheck,
  CheckSquare, Award, Search, ArrowRight, Globe, Sparkles, ChevronRight,
} from 'lucide-react';

export default function ToolsCatalogPage() {
  const { country, currency } = useMarket();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const tools = [
    { id:'budget-calculator', name:'Event Budget Calculator', description:'Allocate expenses across 7 core event categories with contingency buffers and market tax automation.', category:'Financial', icon:Calculator, badge:'Core Model', tone:'blue' },
    { id:'profit-calculator', name:'Event Profit Margin Calculator', description:'Model gross and net profit margins, corporate tax liabilities, and ticket revenue thresholds.', category:'Financial', icon:TrendingUp, badge:'Financial', tone:'green' },
    { id:'ticket-pricing', name:'Ticket Pricing & Tier Optimizer', description:'Model Early Bird, General Admission, and VIP tiered bundles with booking fee absorption.', category:'Financial', icon:Ticket, badge:'Revenue', tone:'violet' },
    { id:'break-even', name:'Break-Even Attendance Calculator', description:'Calculate the exact number of paid tickets required to cover fixed venue and variable catering costs.', category:'Financial', icon:Scale, badge:'Risk Control', tone:'amber' },
    { id:'event-roi', name:'Corporate Event ROI Calculator', description:'Quantify direct revenues, sales-qualified leads (SQLs), pipeline value, and long-term brand equity.', category:'Financial', icon:Award, badge:'Enterprise', tone:'purple' },
    { id:'dubai-wedding', name:'Dubai & UAE Wedding Calculator', description:'Specialized 10-category luxury wedding estimator built for Dubai hotels, desert resorts, and 5% UAE VAT.', category:'Weddings', icon:Heart, badge:'UAE Luxury', tone:'rose' },
    { id:'wedding-budget', name:'Standard Wedding Budget Calculator', description:'Comprehensive wedding cost distribution model across venue, attire, photo/video, decor, and music.', category:'Weddings', icon:Heart, badge:'Weddings', tone:'rose' },
    { id:'catering', name:'Catering & Bar Cost Calculator', description:'Estimate per-guest meal pricing, full bar packages, vendor meals, service fees, and local catering taxes.', category:'Operations', icon:Utensils, badge:'Hospitality', tone:'amber' },
    { id:'staffing', name:'Event Staffing & Labor Roster', description:'Determine required event managers, waitstaff, bartenders, and security officers with hourly wages.', category:'Operations', icon:Users, badge:'Operations', tone:'sky' },
    { id:'guest-attendance', name:'Guest RSVP & Attendance Predictor', description:'Predict actual event attendance from invitation lists, factoring in destination logistics and ticket pricing.', category:'Logistics', icon:UserCheck, badge:'Logistics', tone:'teal' },
    { id:'checklist', name:'Master Event Checklist Generator', description:'Generate milestone operational roadmaps from 12-month prep down to minute-by-minute execution.', category:'Planning', icon:CheckSquare, badge:'Planning', tone:'slate' },
  ];
  const categories = ['All','Financial','Weddings','Operations','Logistics','Planning'];
  const filteredTools = tools.filter(tool => (categoryFilter === 'All' || tool.category === categoryFilter) && (tool.name.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="space-y-8 py-4 sm:py-8">
      <section className="relative overflow-hidden rounded-[28px] bg-[#17191f] px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#ff5a36]/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#3867ff]/15 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/65">
              <span className="rounded-full bg-white/10 px-3 py-1.5">11 free tools</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5">Built for real events</span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><Globe className="h-3.5 w-3.5" />{country} · {currency}</span>
            </div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Everything you need to plan smarter.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">Budget, price, forecast, staff and organize your event with focused tools that turn decisions into clear numbers.</p>
          </div>
          <Link href="/ai-planner" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a36] px-5 py-3.5 text-sm font-bold shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ed4b29]">
            <Sparkles className="h-4 w-4" /> Start with AI <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <section className="sticky top-[76px] z-20 rounded-2xl border border-[#e7e9ee] bg-[#f7f8fa]/95 p-3 shadow-sm backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="What do you need help with?" className="w-full rounded-xl border border-[#e7e9ee] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#ff5a36] focus:ring-4 focus:ring-[#ff5a36]/10" />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            {categories.map(cat => <button key={cat} onClick={()=>setCategoryFilter(cat)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${categoryFilter===cat ? 'bg-[#17191f] text-white' : 'text-[#667085] hover:bg-white hover:text-[#17191f]'}`}>{cat}</button>)}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool, index) => {
          const Icon = tool.icon;
          return <Link key={tool.id} href={`/tools/${tool.id}`} className={`group relative overflow-hidden rounded-[22px] border p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,24,40,.10)] ${index===0 && categoryFilter==='All' && !search ? 'border-[#ff5a36]/35 bg-gradient-to-br from-white to-[#fff3ef] sm:col-span-2 lg:col-span-2' : 'border-[#e7e9ee] bg-white'}`}>
            <div className="flex h-full min-h-[230px] flex-col justify-between gap-8">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f1f3f6] text-[#17191f] transition group-hover:bg-[#17191f] group-hover:text-white"><Icon className="h-5 w-5" /></div>
                  <span className="rounded-full bg-[#f7f8fa] px-3 py-1.5 text-[11px] font-bold text-[#667085]">{tool.badge}</span>
                </div>
                <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-[#98a2b3]"><span>{tool.category}</span><span>•</span><span>Free</span></div>
                <h2 className="mt-2 max-w-xl text-xl font-bold tracking-[-0.035em] text-[#17191f] transition group-hover:text-[#ff5a36]">{tool.name}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#667085]">{tool.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-[#e7e9ee] pt-4 text-sm font-bold text-[#17191f]"><span>Open tool</span><ChevronRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-[#ff5a36]" /></div>
            </div>
          </Link>;
        })}
      </section>

      {filteredTools.length === 0 && <div className="rounded-[22px] border border-dashed border-[#d0d5dd] bg-white px-6 py-16 text-center"><Search className="mx-auto h-7 w-7 text-[#98a2b3]" /><h2 className="mt-4 text-lg font-bold">No tools found</h2><p className="mt-1 text-sm text-[#667085]">Try another search or choose a different category.</p></div>}

      <section className="rounded-[24px] border border-[#e7e9ee] bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><div className="flex items-center gap-2 text-sm font-bold"><Sparkles className="h-4 w-4 text-[#ff5a36]" /> Not sure where to start?</div><h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Let the AI Planner build your starting point.</h2><p className="mt-2 text-sm text-[#667085]">Tell us your event type, guests and vibe. We’ll turn it into a practical planning workflow.</p></div>
          <Link href="/ai-planner" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#17191f] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2b2f38]">Open AI Planner <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
