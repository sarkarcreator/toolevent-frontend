'use client';

import React, { useState } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { AIEventPlanResponse } from '@/lib/types';
import { generateCalculatorPDF } from '@/lib/export/pdfGenerator';
import { generateCalculatorExcel } from '@/lib/export/excelGenerator';
import {
  Sparkles,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  FileText,
  FileSpreadsheet,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Share2,
  Mail,
  MessageCircle,
  TrendingUp,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function AIEventPlanner() {
  const { country, currency, formatCurrency } = useMarket();
  const { user, openAuthModal, refreshUser } = useAuth();

  const [eventType, setEventType] = useState('Corporate Gala & Innovation Awards');
  const [city, setCity] = useState(country === 'UAE' ? 'Dubai' : country === 'UK' ? 'London' : 'New York');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [budget, setBudget] = useState<number>(country === 'UAE' ? 120000 : country === 'UK' ? 35000 : 45000);
  const [eventDate, setEventDate] = useState('In 90 Days');
  const [goals, setGoals] = useState('High executive engagement, brand leadership positioning, and media buzz');
  const [audience, setAudience] = useState('Industry executives, corporate sponsors, and key stakeholders');
  const [style, setStyle] = useState('Ultra-modern, elegant, high-impact experiential');
  const [specialRequirements, setSpecialRequirements] = useState('Live streaming, VIP lounge, kosher/halal dietary options');

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AIEventPlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/event-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          country,
          city,
          guestCount,
          budget,
          currency,
          eventDate,
          goals,
          audience,
          style,
          specialRequirements,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setPlan(data.data);
        if (refreshUser) refreshUser();
      } else {
        setError(data.error?.message || 'Failed to generate event strategy');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to communicate with AI planner');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    if (plan?.emailInvitation) {
      navigator.clipboard.writeText(
        `Subject: ${plan.emailInvitation.subject}\n\n${plan.emailInvitation.body}`
      );
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyWhatsApp = () => {
    if (plan?.whatsappInvitation) {
      navigator.clipboard.writeText(plan.whatsappInvitation);
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    if (!plan) return;
    generateCalculatorPDF({
      toolTitle: plan.title,
      country,
      currency,
      inputs: {
        eventType,
        city,
        guestCount,
        budget: formatCurrency(budget),
        eventDate,
        goals,
      },
      summaryMetrics: [
        { label: 'Total Budget Cap', value: formatCurrency(budget) },
        { label: 'Expected Guests', value: `${guestCount}` },
        { label: 'Cost / Attendee', value: formatCurrency(Math.round(budget / (guestCount || 1))) },
        { label: 'Location', value: `${city}, ${country}` },
      ],
      tableData: {
        headers: ['Budget Category', 'Amount', 'Share (%)', 'Rationale'],
        rows: plan.budgetAllocation.map((b) => [
          b.category,
          formatCurrency(b.amount),
          `${b.percentage}%`,
          b.rationale,
        ]),
      },
    });
  };

  return (
    <div className="space-y-10 py-6">
      {/* Top Hero Banner - Artistic Flair */}
      <div className="bg-[#121212] text-[#F5F2ED] p-8 sm:p-12 border-2 border-[#121212] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D44D26] text-white text-[9px] uppercase font-black tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            Gemini 3.7 Flash Engine • 12-Section Strategic Dossier
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif italic font-medium tracking-tight text-[#F5F2ED]">
            Autonomous Event Director & Strategic AI
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F2ED]/80 leading-relaxed font-medium">
            Generate an executive 12-part master event plan in seconds. Complete with mathematical budget allocations, run of show schedules, vendor RFP specs, marketing sequences, and tailored invitation copy.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-[10px] uppercase tracking-widest text-[#F5F2ED]/60 font-bold">
            <span className="flex items-center gap-1 text-[#D44D26]">
              <CheckCircle2 className="w-4 h-4" /> 15 Free Monthly Credits
            </span>
            <span>•</span>
            <span>Active Market: <strong className="text-[#F5F2ED]">{country} ({currency})</strong></span>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="bg-white p-8 sm:p-10 border-2 border-[#121212] shadow-xl space-y-6">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#121212] flex items-center gap-2 border-b border-[#121212]/15 pb-4">
          <Layers className="w-4 h-4 text-[#D44D26]" />
          1. Event Scope & Vision Parameters
        </h2>

        {error && (
          <div className="p-4 text-xs font-bold text-[#D44D26] bg-[#F5F2ED] border-2 border-[#D44D26]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              Event Concept / Type
            </label>
            <input
              type="text"
              required
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="e.g. Technology Summit, Luxury Wedding"
              className="w-full px-3.5 py-3 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              Target City / Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#121212]/50" />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Dubai, London, New York"
                className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              Target Event Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-[#121212]/50" />
              <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="e.g. October 15, In 90 Days"
                className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              Expected Guest Count
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-[#121212]/50" />
              <input
                type="number"
                min="1"
                required
                value={guestCount}
                onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 1))}
                className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              Total Budget Cap ({currency})
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#121212]/50" />
              <input
                type="number"
                min="100"
                required
                value={budget}
                onChange={(e) => setBudget(Math.max(100, Number(e.target.value) || 100))}
                className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              Key Strategic Goals
            </label>
            <input
              type="text"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Lead generation, sponsor ROI, viral social moments"
              className="w-full px-3.5 py-3 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              Theme & Aesthetic Style
            </label>
            <input
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="e.g. Minimalist luxury, futuristic cyberpunk, classic black-tie"
              className="w-full px-3.5 py-3 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-[#D44D26] hover:bg-[#121212] text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Structuring 12-Section Strategic Dossier...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Master Event Plan Now
            </>
          )}
        </button>
      </form>

      {/* Generated 12-Section Plan Display */}
      {plan && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Plan Header Bar */}
          <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
                  Strategic AI Dossier
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#D44D26] font-bold">
                  {country} Market Calibrated
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
                {plan.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3.5 text-[10px] uppercase font-black tracking-widest text-white bg-[#121212] hover:bg-[#D44D26] transition-all shadow-md"
              >
                <FileText className="w-4 h-4 text-[#D44D26]" />
                Export Full PDF
              </button>
            </div>
          </div>

          {/* Section 1 & 2: Executive Summary & Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D44D26] flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> 1. Executive Summary
              </h3>
              <p className="text-xs sm:text-sm text-[#121212]/80 leading-relaxed font-medium">
                {plan.executiveSummary}
              </p>
            </div>

            <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#D44D26]" /> 2. Event Strategy & Experience
              </h3>
              <p className="text-xs sm:text-sm text-[#121212]/80 leading-relaxed font-medium">
                {plan.eventStrategy}
              </p>
            </div>
          </div>

          {/* Section 3: Budget Allocation */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#121212]">
              3. Strategic Budget Allocation ({currency} {budget.toLocaleString()})
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={plan.budgetAllocation} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={85} innerRadius={45}>
                      {plan.budgetAllocation.map((_, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={['#121212', '#D44D26', '#8C3217', '#4A4A4A', '#C2A68C', '#2A2A2A'][idx % 6]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [formatCurrency(Number(v)), 'Allocated']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5F2ED] text-[#121212] font-black uppercase tracking-wider text-[9px]">
                    <tr>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3 text-right">Amount</th>
                      <th className="py-2.5 px-3 text-right">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#121212]/10 text-[#121212]">
                    {plan.budgetAllocation.map((b) => (
                      <tr key={b.category}>
                        <td className="py-2.5 px-3 font-semibold">{b.category}</td>
                        <td className="py-2.5 px-3 text-right font-serif font-bold">{formatCurrency(b.amount)}</td>
                        <td className="py-2.5 px-3 text-right font-black text-[#D44D26]">{b.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 4: Timeline Milestones */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#121212] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D44D26]" /> 4. Timeline Milestones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plan.timelineMilestones.map((m) => (
                <div key={m.phase} className="p-5 bg-[#F5F2ED] border border-[#121212]/20 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D44D26] block">{m.timing}</span>
                  <h4 className="text-xs font-serif font-bold text-[#121212]">{m.phase}</h4>
                  <ul className="space-y-1.5 text-xs text-[#121212]/75 font-medium">
                    {m.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#D44D26] font-bold">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Vendor Specifications */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#121212] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D44D26]" /> 5. Vendor RFP Categories & Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plan.vendorCategories.map((v) => (
                <div key={v.vendorType} className="p-5 bg-[#F5F2ED] border border-[#121212]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-serif font-bold text-[#121212]">{v.vendorType}</h4>
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#121212] text-[#F5F2ED]">
                      {v.priority}
                    </span>
                  </div>
                  <p className="text-xs text-[#121212]/75 leading-relaxed font-medium">{v.requirements}</p>
                  <p className="text-xs font-serif font-bold text-[#D44D26] pt-1">
                    Est. Budget: {v.estimatedBudget}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Minute-by-Minute Run of Show */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#121212] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D44D26]" /> 8. Event-Day Minute-by-Minute Run of Show
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F2ED] text-[#121212] font-black uppercase tracking-wider text-[9px]">
                  <tr>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Activity / Segment</th>
                    <th className="py-2.5 px-3">Lead Owner</th>
                    <th className="py-2.5 px-3">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#121212]/10 text-[#121212]">
                  {plan.eventDaySchedule.map((s, idx) => (
                    <tr key={idx} className="hover:bg-[#F5F2ED]/50">
                      <td className="py-2.5 px-3 font-serif font-bold text-[#D44D26]">{s.time}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#121212]">{s.activity}</td>
                      <td className="py-2.5 px-3 text-[#121212]/70 font-medium">{s.owner}</td>
                      <td className="py-2.5 px-3 text-[#121212]/60 font-medium">{s.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 9: Risk Checklist */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#D44D26] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D44D26]" /> 9. Risk & Contingency Matrix
            </h3>
            <div className="space-y-2">
              {plan.riskChecklist.map((r, i) => (
                <div key={i} className="p-4 bg-[#F5F2ED] border border-[#121212]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-serif font-bold text-[#121212]">{r.risk}</span>
                    <p className="text-[#121212]/75 mt-0.5 font-medium"><strong className="text-[#121212]">Mitigation:</strong> {r.mitigation}</p>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#D44D26] text-white shrink-0 self-start sm:self-center">
                    {r.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 11: Email & WhatsApp Copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#D44D26]" /> 11a. Email Invitation Copy
                </h3>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-3 py-1 text-[10px] uppercase font-black tracking-widest text-[#121212] bg-[#F5F2ED] border border-[#121212]/20 hover:bg-[#121212] hover:text-[#F5F2ED] transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-[#F5F2ED] border border-[#121212]/15 text-xs text-[#121212] whitespace-pre-wrap leading-relaxed font-mono">
                <strong>Subject: {plan.emailInvitation.subject}</strong>
                {'\n\n'}
                {plan.emailInvitation.body}
              </div>
            </div>

            <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-[#D44D26]" /> 11b. WhatsApp / SMS Invitation
                </h3>
                <button
                  onClick={handleCopyWhatsApp}
                  className="flex items-center gap-1 px-3 py-1 text-[10px] uppercase font-black tracking-widest text-[#121212] bg-[#F5F2ED] border border-[#121212]/20 hover:bg-[#121212] hover:text-[#F5F2ED] transition-colors"
                >
                  {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedWhatsApp ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-[#F5F2ED] border border-[#121212]/15 text-xs text-[#121212] whitespace-pre-wrap leading-relaxed font-mono">
                {plan.whatsappInvitation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
