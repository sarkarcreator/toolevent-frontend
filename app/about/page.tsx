'use client';

import React from 'react';
import Link from 'next/link';
import { useMarket } from '@/components/layout/MarketContext';
import {
  ShieldCheck,
  Globe,
  Calculator,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const { country, currency } = useMarket();

  return (
    <div className="space-y-12 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Institutional Precision
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About Toolbox.Events
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          The premier computational operating system for corporate event directors, luxury wedding planners, and festival producers across the USA, UAE, and UK.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Our Core Philosophy</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Event production is one of the highest-pressure industries in the global economy. Organizers routinely deploy hundreds of thousands of dollars on single-day live experiences where cost overruns, missing vendor line-items, and untracked service taxes destroy profit margins.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Toolbox.Events was built to replace ad-hoc scribbles and broken spreadsheets with institutional-grade computational engines, automated localized fiscal rules (including UAE VAT and UK HMRC VAT), and multimodal AI event strategy.
        </p>
      </div>

      {/* Tri-Market Fiscal Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            USA
          </div>
          <h3 className="text-base font-bold text-slate-900">United States Market</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Calibrated with American state sales tax benchmarks, standard 18-24% hospitality gratuity rules, and corporate conference budgeting metrics.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            UAE
          </div>
          <h3 className="text-base font-bold text-slate-900">Dubai & UAE Market</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Engineered with 5% UAE Federal VAT rules, Dubai Tourism/Municipality fee standards, and luxury ballroom minimum food and beverage spends.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            UK
          </div>
          <h3 className="text-base font-bold text-slate-900">United Kingdom Market</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aligned with 20% UK VAT guidelines, London vs regional venue pricing differentials, and standard catering service charge structures.
          </p>
        </div>
      </div>

      {/* AI Strategy Standards */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Powered by Gemini 3.7 Flash
        </div>
        <h2 className="text-2xl font-bold">Mathematical Rigor Meets Generative Intelligence</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Unlike generic chatbot responses that hallucinate arbitrary figures, our AI Event Planner couples rigorous budget allocation percentages with deep experiential design, outputting actionable 12-section master blueprints complete with vendor RFPs, run of show agendas, and risk mitigations.
        </p>
        <div className="pt-2">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            Explore Free Tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
