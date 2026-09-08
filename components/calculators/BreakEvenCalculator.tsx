'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateBreakEven } from '@/lib/calculators';
import {
  Save,
  CheckCircle2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';

export function BreakEvenCalculator() {
  const { country, currency, formatCurrency, formatPercent } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [totalFixedCosts, setTotalFixedCosts] = useState<number>(country === 'UAE' ? 60000 : 18000);
  const [variableCostPerAttendee, setVariableCostPerAttendee] = useState<number>(country === 'UAE' ? 100 : 30);
  const [ticketPrice, setTicketPrice] = useState<number>(country === 'UAE' ? 350 : 120);
  const [capacity, setCapacity] = useState<number>(300);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateBreakEven({
      fixedCosts: totalFixedCosts,
      variableCostPerAttendee,
      ticketPrice,
      capacity,
    });
  }, [totalFixedCosts, variableCostPerAttendee, ticketPrice, capacity]);

  const handleSave = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    setSaveLoading(true);
    try {
      await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: 'break-even',
          title: `Break-Even at ${results.breakEvenAttendees} Guests`,
          country,
          currency,
          inputs: { totalFixedCosts, variableCostPerAttendee, ticketPrice, capacity },
          results,
        }),
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch {
      // ignore
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
              Capacity & Risk Analysis
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Contribution Margin Modeling
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Event Break-Even Calculator
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Determine the exact number of tickets and revenue required to cover all fixed and variable overheads.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saveLoading}
          className={`flex items-center gap-2 px-5 py-3 text-[10px] uppercase font-black tracking-widest border-2 transition-all shrink-0 shadow-md ${
            isSaved
              ? 'bg-[#D44D26] text-white border-[#D44D26]'
              : 'bg-[#121212] text-white border-[#121212] hover:bg-[#D44D26]'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4 text-[#D44D26]" />}
          {isSaved ? 'Saved!' : 'Save Analysis'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] border-b border-[#121212]/15 pb-2">
              Parameters & Pricing
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Fixed Costs ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={totalFixedCosts || ''}
                  onChange={(e) => setTotalFixedCosts(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Variable Cost / Attendee ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={variableCostPerAttendee || ''}
                  onChange={(e) => setVariableCostPerAttendee(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Ticket Sale Price ({currency})
                </label>
                <input
                  type="number"
                  min="1"
                  value={ticketPrice || ''}
                  onChange={(e) => setTicketPrice(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Venue Maximum Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) => setCapacity(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS & BREAK-EVEN CHART (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#121212] text-[#F5F2ED] p-6 border-2 border-[#121212] shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Break-Even Tickets
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {results.breakEvenAttendees} <span className="text-xs uppercase font-bold text-[#F5F2ED]/60">tickets</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                {formatPercent(results.capacityPercentageNeeded)} of max capacity
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/60">
                Break-Even Revenue
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.breakEvenRevenue)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Zero loss milestone
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Profit at Sellout
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.profitAtSellout)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                100% capacity ({capacity} pax)
              </span>
            </div>
          </div>

          {/* Break Even Chart */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] mb-4">
              Revenue Curve vs Total Costs Crossover
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.chartData}>
                  <XAxis dataKey="attendees" stroke="#121212" fontSize={11} />
                  <YAxis
                    stroke="#121212"
                    fontSize={11}
                    tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                  />
                  <Tooltip
                    formatter={(val: any) => [formatCurrency(Number(val)), '']}
                    contentStyle={{ backgroundColor: '#121212', borderRadius: '0px', color: '#F5F2ED', border: '1px solid #D44D26', fontSize: '11px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#D44D26" strokeWidth={2.5} name="Total Revenue" />
                  <Line type="monotone" dataKey="totalCost" stroke="#121212" strokeWidth={2.5} name="Total Cost" />
                  <ReferenceLine x={results.breakEvenAttendees} stroke="#D44D26" strokeDasharray="3 3" label={{ value: 'Break-Even', fill: '#D44D26', fontSize: 11 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
