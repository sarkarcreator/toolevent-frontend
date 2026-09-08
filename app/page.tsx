'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarket } from '@/components/layout/MarketContext';
import { useAuth } from '@/components/layout/AuthContext';
import {
  Calculator,
  Sparkles,
  TrendingUp,
  Ticket,
  Scale,
  Heart,
  Utensils,
  Users,
  UserCheck,
  CheckSquare,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Globe,
  Award,
  ChevronDown,
  Building,
  CheckCircle2,
  Play,
} from 'lucide-react';

export default function HomePage() {
  const { country, setCountry, currency, formatCurrency } = useMarket();
  const { openAuthModal } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tools = [
    {
      id: 'budget-calculator',
      name: 'Event Budget Calculator',
      description: 'Allocate expenses across 7 core event categories with contingency buffers and market tax automation.',
      icon: Calculator,
      badge: 'Core Model',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      href: '/tools/budget-calculator',
    },
    {
      id: 'profit-calculator',
      name: 'Event Profit Margin Calculator',
      description: 'Model gross and net profit margins, corporate tax liabilities, and ticket revenue thresholds.',
      icon: TrendingUp,
      badge: 'Financial',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      href: '/tools/profit-calculator',
    },
    {
      id: 'ticket-pricing',
      name: 'Ticket Pricing & Tier Optimizer',
      description: 'Model Early Bird, General Admission, and VIP tiered bundles with booking fee absorption.',
      icon: Ticket,
      badge: 'Revenue',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      href: '/tools/ticket-pricing',
    },
    {
      id: 'break-even',
      name: 'Break-Even Attendance Calculator',
      description: 'Calculate the exact number of paid tickets required to cover fixed venue and variable catering costs.',
      icon: Scale,
      badge: 'Risk Control',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      href: '/tools/break-even',
    },
    {
      id: 'event-roi',
      name: 'Corporate Event ROI Calculator',
      description: 'Quantify direct revenues, sales-qualified leads (SQLs), pipeline value, and long-term brand equity.',
      icon: Award,
      badge: 'Enterprise',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      href: '/tools/event-roi',
    },
    {
      id: 'dubai-wedding',
      name: 'Dubai & UAE Wedding Calculator',
      description: 'Specialized 10-category luxury wedding estimator built for Dubai hotels, desert resorts, and 5% UAE VAT.',
      icon: Heart,
      badge: 'UAE Luxury',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      href: '/tools/dubai-wedding',
    },
    {
      id: 'catering',
      name: 'Catering & Bar Cost Calculator',
      description: 'Estimate per-guest meal pricing, full bar packages, vendor meals, service fees, and local catering taxes.',
      icon: Utensils,
      badge: 'Hospitality',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      href: '/tools/catering',
    },
    {
      id: 'staffing',
      name: 'Event Staffing & Labor Roster',
      description: 'Determine required event managers, waitstaff, bartenders, and security officers with hourly wages.',
      icon: Users,
      badge: 'Operations',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      href: '/tools/staffing',
    },
    {
      id: 'guest-attendance',
      name: 'Guest RSVP & Attendance Predictor',
      description: 'Predict actual event attendance from invitation lists, factoring in destination logistics and ticket pricing.',
      icon: UserCheck,
      badge: 'Logistics',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      href: '/tools/guest-attendance',
    },
    {
      id: 'checklist',
      name: 'Master Event Checklist Generator',
      description: 'Generate milestone operational roadmaps from 12-month prep down to minute-by-minute execution.',
      icon: CheckSquare,
      badge: 'Planning',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      href: '/tools/checklist',
    },
  ];

  const faqs = [
    {
      q: 'Are the financial calculations tailored to specific countries?',
      a: 'Yes. Toolbox.Events provides native fiscal intelligence for the USA, UAE (Dubai/Abu Dhabi with 5% VAT and 7% municipality fees), and the UK (with 20% VAT and standard HMRC guidelines).',
    },
    {
      q: 'How does the AI Event Planner work?',
      a: 'Powered by Gemini 3.7 Flash, our strategic AI planner generates a comprehensive 12-section master dossier covering conceptual positioning, budget breakdowns, run of show schedules, vendor RFP specs, and marketing copy.',
    },
    {
      q: 'Can I export my calculations to PDF and Excel?',
      a: 'Every single calculator on Toolbox.Events allows instant, print-ready PDF summary exports and downloadable data models without any paywalls.',
    },
    {
      q: 'What is included in the Master Excel Templates?',
      a: 'Our commercial template suites contain multi-tab financial models, automated formulas, charts, cash flow registers, and vendor RFP matrices designed for corporate event directors.',
    },
  ];

  return (
    <div className="space-y-20 py-6">
      {/* HERO SECTION - Artistic Flair */}
      <section className="relative overflow-hidden bg-[#121212] text-[#F5F2ED] p-8 sm:p-14 md:p-16 border-2 border-[#121212] shadow-2xl">
        {/* Background Subtle Editorial Watermark */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 serif italic text-[240px] text-white/5 select-none pointer-events-none hidden lg:block leading-none">
          01
        </div>

        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-3 border border-white/20 px-3.5 py-1.5 bg-white/5 backdrop-blur-xs">
            <span className="w-2 h-2 bg-[#D44D26]" />
            <span className="text-[9px] uppercase font-black tracking-[0.3em] text-[#F5F2ED]">
              Master Financial Models & Gemini AI Dossiers
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase font-black tracking-[0.4em] text-[#D44D26]">
              Volume 01: Event Financial Strategy
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic font-medium leading-[0.95] tracking-tight text-[#F5F2ED]">
              Precision <br />
              <span className="outline-text-light not-italic font-bold">In Production.</span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#F5F2ED]/80 max-w-2xl leading-relaxed font-medium">
            An archive of 10 fiscal calculators, regional tax calibrations for USA, UAE & UK, and an autonomous AI event strategist. Built for summits, galas, and luxury weddings.
          </p>

          {/* Market Selector Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F5F2ED]/60">
              Active Region:
            </span>
            {(['USA', 'UAE', 'UK'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setCountry(m)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                  country === m
                    ? 'bg-[#D44D26] text-white border-[#D44D26] shadow-md'
                    : 'bg-white/5 text-[#F5F2ED]/80 border-white/20 hover:border-white/50 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {m === 'USA' ? 'United States ($ USD)' : m === 'UAE' ? 'Dubai & UAE (AED)' : 'United Kingdom (£ GBP)'}
              </button>
            ))}
          </div>

          {/* Action CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/tools"
              className="px-8 py-4 bg-[#D44D26] hover:bg-white hover:text-[#121212] text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 shadow-lg"
            >
              <Calculator className="w-4 h-4" /> Explore 10 Calculators
            </Link>
            <Link
              href="/ai-planner"
              className="px-8 py-4 bg-white/10 hover:bg-white hover:text-[#121212] text-white font-black text-[11px] uppercase tracking-[0.2em] border border-white/30 transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-[#D44D26]" /> Launch AI Event Planner
            </Link>
          </div>
        </div>

        {/* Floating Trust Metrics - Editorial Box */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 text-[#F5F2ED]">
          <div>
            <span className="text-3xl font-serif italic font-bold text-[#D44D26] block">10,000+</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#F5F2ED]/60 mt-1 block">Calculations Run</span>
          </div>
          <div>
            <span className="text-3xl font-serif italic font-bold text-white block">3 Hubs</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#F5F2ED]/60 mt-1 block">USA • UAE • UK</span>
          </div>
          <div>
            <span className="text-3xl font-serif italic font-bold text-white block">100%</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#F5F2ED]/60 mt-1 block">Free PDF Exports</span>
          </div>
          <div>
            <span className="text-3xl font-serif italic font-bold text-[#D44D26] block">Gemini</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#F5F2ED]/60 mt-1 block">3.7 Flash Engine</span>
          </div>
        </div>
      </section>

      {/* 10 CORE CALCULATORS GRID - Artistic Flair */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#121212] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
                Suite Archive
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#121212]/60 font-bold">Calibrated for {country}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121212] tracking-tight">
              Event Financial & Operational Models
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-[10px] uppercase font-black tracking-[0.2em] text-[#121212] hover:text-[#D44D26] flex items-center gap-1 shrink-0 pb-1 border-b border-[#121212]"
          >
            View All 10 Tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group bg-white p-7 border-2 border-[#121212] shadow-xs hover:border-[#D44D26] hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] group-hover:bg-[#121212] group-hover:text-[#F5F2ED] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.25em] bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] group-hover:bg-[#D44D26] group-hover:text-white group-hover:border-[#D44D26] transition-colors">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#121212] group-hover:text-[#D44D26] transition-colors leading-snug">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-[#121212]/75 leading-relaxed line-clamp-3 font-medium">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#121212]/15 flex items-center justify-between text-[10px] uppercase font-black tracking-[0.2em] text-[#121212] group-hover:text-[#D44D26]">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SPOTLIGHT: DUBAI & UAE REGIONAL HUB */}
      <section className="bg-white p-8 sm:p-12 border-2 border-[#121212] shadow-xl space-y-6 relative">
        <div className="absolute top-0 right-0 w-32 h-3 bg-[#D44D26]" />
        
        <div className="max-w-3xl space-y-3">
          <span className="px-3 py-1 text-[9px] uppercase font-black tracking-[0.25em] bg-[#D44D26] text-white inline-block">
            Regional Specialization • UAE & Middle East
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121212] tracking-tight">
            Dubai Luxury Event & Wedding Financial Suite
          </h2>
          <p className="text-sm text-[#121212]/80 leading-relaxed font-medium">
            Planning high-capacity galas, 5-star hotel ballrooms, or desert destination weddings in Dubai and Abu Dhabi? Our models natively integrate 5% UAE Federal VAT, standard luxury hotel minimum spends, and hospitality service charges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 bg-[#F5F2ED] border border-[#121212]/20">
            <span className="text-xs font-bold font-serif text-[#121212] block mb-1.5">Dubai 5-Star Hotel Baselines</span>
            <p className="text-xs text-[#121212]/70 leading-relaxed">Pre-calibrated minimum food & beverage spend tiers for Palm Jumeirah, Downtown, and DIFC venues.</p>
          </div>
          <div className="p-5 bg-[#F5F2ED] border border-[#121212]/20">
            <span className="text-xs font-bold font-serif text-[#121212] block mb-1.5">UAE VAT (5%) Automation</span>
            <p className="text-xs text-[#121212]/70 leading-relaxed">Automatic compliance calculations across audiovisual staging, floristry, and catering invoices.</p>
          </div>
          <div className="p-5 bg-[#F5F2ED] border border-[#121212]/20">
            <span className="text-xs font-bold font-serif text-[#121212] block mb-1.5">VIP & Royal Protocols</span>
            <p className="text-xs text-[#121212]/70 leading-relaxed">Specialized staffing models for high-security concierges, separate majlis areas, and protocol directors.</p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/tools/dubai-wedding"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#121212] hover:bg-[#D44D26] text-[#F5F2ED] hover:text-white text-[10px] uppercase font-black tracking-[0.2em] transition-all"
          >
            Launch Dubai Wedding Calculator <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* AI PLANNER CALLOUT */}
      <section className="bg-[#121212] text-[#F5F2ED] p-8 sm:p-14 border-2 border-[#121212] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D44D26] text-white text-[9px] uppercase font-black tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" /> Strategic AI Director
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold tracking-tight text-[#F5F2ED]">
            Need a Complete Event Master Dossier in 10 Seconds?
          </h2>
          <p className="text-sm text-[#F5F2ED]/80 leading-relaxed font-medium">
            Provide your event date, city, budget, and guest count. Our Gemini 3.7 Flash engine generates an executive 12-section blueprint with minute-by-minute run of show, vendor RFP requirements, risk mitigations, and custom invitations.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest text-[#F5F2ED]/60 font-bold">
            <span className="flex items-center gap-1 text-[#D44D26]">
              <CheckCircle2 className="w-4 h-4" /> 15 Free Monthly Credits
            </span>
            <span>•</span>
            <span>Instant PDF Export</span>
            <span>•</span>
            <span>No Credit Card Required</span>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href="/ai-planner"
            className="px-8 py-4 bg-[#D44D26] hover:bg-white hover:text-[#121212] text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-2.5 shadow-lg"
          >
            <Sparkles className="w-4 h-4" /> Generate Event Plan Now
          </Link>
        </div>
      </section>

      {/* TEMPLATE STORE TEASER */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#121212] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
                Digital Store
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#121212]/60 font-bold">Enterprise Excel .xlsx Downloads</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#121212] tracking-tight">
              Master Event Spreadsheets & Toolkits
            </h2>
          </div>
          <Link
            href="/templates"
            className="text-[10px] uppercase font-black tracking-[0.2em] text-[#121212] hover:text-[#D44D26] flex items-center gap-1 shrink-0 pb-1 border-b border-[#121212]"
          >
            Visit Template Store <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <FileSpreadsheet className="w-8 h-8 text-[#121212]" />
              <h3 className="text-base font-serif font-bold text-[#121212]">Event Budget & Master Financial Suite</h3>
              <p className="text-xs text-[#121212]/75 leading-relaxed font-medium">
                Automated multi-sheet budget ledger with cash flow forecasting, variance tracking, and department breakdowns.
              </p>
            </div>
            <div className="pt-4 border-t border-[#121212]/15 flex items-center justify-between">
              <span className="text-xl font-serif font-bold text-[#121212]">{formatCurrency(49)}</span>
              <Link href="/templates" className="text-[10px] uppercase font-black tracking-widest text-[#D44D26] hover:underline">
                Get Template →
              </Link>
            </div>
          </div>

          <div className="bg-white p-7 border-2 border-[#D44D26] shadow-lg space-y-4 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-[0.25em] bg-[#D44D26] text-white">
              Best Seller
            </div>
            <div className="space-y-3">
              <FileSpreadsheet className="w-8 h-8 text-[#D44D26]" />
              <h3 className="text-base font-serif font-bold text-[#121212]">Corporate Conference & Summit Toolkit</h3>
              <p className="text-xs text-[#121212]/75 leading-relaxed font-medium">
                Complete speaker management matrix, sponsor ROI models, AV production cues, and run of show spreadsheets.
              </p>
            </div>
            <div className="pt-4 border-t border-[#121212]/15 flex items-center justify-between">
              <span className="text-xl font-serif font-bold text-[#121212]">{formatCurrency(79)}</span>
              <Link href="/templates" className="text-[10px] uppercase font-black tracking-widest text-[#D44D26] hover:underline">
                Get Template →
              </Link>
            </div>
          </div>

          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <FileSpreadsheet className="w-8 h-8 text-[#121212]" />
              <h3 className="text-base font-serif font-bold text-[#121212]">Luxury Wedding Planning Dossier</h3>
              <p className="text-xs text-[#121212]/75 leading-relaxed font-medium">
                Detailed vendor comparison matrix, guest seating table allocations, rehearsal schedules, and budget tracking.
              </p>
            </div>
            <div className="pt-4 border-t border-[#121212]/15 flex items-center justify-between">
              <span className="text-xl font-serif font-bold text-[#121212]">{formatCurrency(39)}</span>
              <Link href="/templates" className="text-[10px] uppercase font-black tracking-widest text-[#D44D26] hover:underline">
                Get Template →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="bg-white p-8 sm:p-12 border-2 border-[#121212] shadow-md space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-[9px] uppercase font-black tracking-[0.3em] text-[#D44D26] block">
            Knowledge Base
          </span>
          <h2 className="text-3xl font-serif font-black text-[#121212]">Frequently Asked Questions</h2>
          <p className="text-xs text-[#121212]/60 font-medium">Everything you need to know about our calculators and AI models</p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#121212]/20 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left text-xs sm:text-sm font-serif font-bold text-[#121212] bg-[#F5F2ED]/60 hover:bg-[#F5F2ED] flex items-center justify-between transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#D44D26] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="p-4 bg-white text-xs text-[#121212]/80 leading-relaxed border-t border-[#121212]/10 font-medium">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
