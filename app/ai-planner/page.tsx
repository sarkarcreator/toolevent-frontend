'use client';

import React from 'react';
import { AIEventPlanner } from '@/components/ai/AIEventPlanner';
import { Sparkles, ShieldCheck, WandSparkles } from 'lucide-react';

export default function AIPlannerPage() {
  return (
    <div className="ai-planner-shell py-2 sm:py-4">
      <section className="mb-7 overflow-hidden rounded-[28px] border border-[#e7e9ee] bg-white shadow-[0_18px_60px_rgba(23,25,31,0.06)]">
        <div className="grid lg:grid-cols-[1.25fr_.75fr]">
          <div className="relative overflow-hidden bg-[#17191f] px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#ff5a36]/20 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#3867ff]/15 blur-3xl" />
            <div className="relative max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-[#ff8b72]" />
                AI Event Director
              </div>
              <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Turn an event idea into a complete plan.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Tell the planner what you are organising. It turns your goals, guests, location and budget into a practical event strategy you can review, export and share.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 bg-[#f7f8fa] p-5 sm:p-7">
            <div className="rounded-2xl border border-[#e7e9ee] bg-white p-4">
              <WandSparkles className="h-5 w-5 text-[#ff5a36]" />
              <p className="mt-3 text-sm font-semibold">Start with your vision</p>
              <p className="mt-1 text-xs leading-5 text-[#667085]">Describe the event in plain language. No planning jargon required.</p>
            </div>
            <div className="rounded-2xl border border-[#e7e9ee] bg-white p-4">
              <ShieldCheck className="h-5 w-5 text-[#3867ff]" />
              <p className="mt-3 text-sm font-semibold">Keep the numbers grounded</p>
              <p className="mt-1 text-xs leading-5 text-[#667085]">Your market, currency, guest count and budget stay visible throughout the plan.</p>
            </div>
          </div>
        </div>
      </section>

      <AIEventPlanner />
    </div>
  );
}
