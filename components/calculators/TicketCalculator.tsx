'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateTicketPrice } from '@/lib/calculators';
import {
  Ticket,
  Save,
  CheckCircle2,
  Percent,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export function TicketCalculator() {
  const { country, currency, formatCurrency } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [totalEventCost, setTotalEventCost] = useState<number>(country === 'UAE' ? 50000 : 15000);
  const [expectedAttendees, setExpectedAttendees] = useState<number>(200);
  const [desiredProfit, setDesiredProfit] = useState<number>(country === 'UAE' ? 25000 : 8000);
  const [platformFeePercent, setPlatformFeePercent] = useState<number>(3.5);
  const [platformFixedFee, setPlatformFixedFee] = useState<number>(0);
  const [paymentProcessingPercent, setPaymentProcessingPercent] = useState<number>(2.9);
  const [fixedPaymentFee, setFixedPaymentFee] = useState<number>(country === 'UAE' ? 2 : 0.99);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateTicketPrice({
      totalEventCost,
      expectedAttendees,
      desiredProfit,
      platformFeePercent,
      platformFixedFee,
      paymentProcessingPercent,
      fixedPaymentFee,
    });
  }, [
    totalEventCost,
    expectedAttendees,
    desiredProfit,
    platformFeePercent,
    platformFixedFee,
    paymentProcessingPercent,
    fixedPaymentFee,
  ]);

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
          toolType: 'ticket-price',
          title: `Ticket Pricing (${formatCurrency(results.recommendedTicketPrice)})`,
          country,
          currency,
          inputs: {
            totalEventCost,
            expectedAttendees,
            desiredProfit,
            platformFeePercent,
            paymentProcessingPercent,
          },
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

  const tiersData = results.pricingTiers.map((t, idx) => ({
    name: t.tier,
    price: t.suggestedPrice,
    fill: idx === 1 ? '#D44D26' : idx === 2 ? '#121212' : '#6A6359',
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
              Dynamic Pricing Engine
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Ticketing Fee Absorption
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Ticket Price Calculator
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Compute optimal ticket pricing across Early Bird, General Admission, and VIP tiers factoring in payment gateway and merchant processing fees.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            {isSaved ? 'Saved!' : 'Save Pricing'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] border-b border-[#121212]/15 pb-2">
              Event Costs & Attendees
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Total Event Budget / Cost ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={totalEventCost || ''}
                  onChange={(e) => setTotalEventCost(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Expected Attendees
                </label>
                <input
                  type="number"
                  min="1"
                  value={expectedAttendees}
                  onChange={(e) => setExpectedAttendees(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Desired Net Profit ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={desiredProfit}
                  onChange={(e) => setDesiredProfit(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>
            </div>

            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] pt-4 border-t border-[#121212]/15 pb-2">
              Fee Structure & Gateways
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Platform Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={platformFeePercent}
                  onChange={(e) => setPlatformFeePercent(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Card Gateway Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={paymentProcessingPercent}
                  onChange={(e) => setPaymentProcessingPercent(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS & TIERS (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Pricing Hero Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#121212] text-[#F5F2ED] p-6 border-2 border-[#121212] shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Target Ticket Price
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {formatCurrency(results.desiredProfitTicketPrice)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                Standard General Admission
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/60">
                Break-Even Floor
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.breakEvenTicketPrice)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Zero profit floor price
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Gross Projection
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.projectedGrossRevenue)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Net Profit: {formatCurrency(results.projectedNetProfit)}
              </span>
            </div>
          </div>

          {/* Tiers Chart */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] mb-4">
              Recommended Multi-Tier Pricing Ladder
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tiersData}>
                  <XAxis dataKey="name" stroke="#121212" fontSize={11} />
                  <YAxis stroke="#121212" fontSize={11} />
                  <Tooltip
                    formatter={(val: any) => [formatCurrency(Number(val)), 'Ticket Price']}
                    contentStyle={{ backgroundColor: '#121212', borderRadius: '0px', color: '#F5F2ED', border: '1px solid #D44D26', fontSize: '11px' }}
                  />
                  <Bar dataKey="price" radius={[0, 0, 0, 0]}>
                    {tiersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3 Tiers Breakdown Table */}
          <div className="bg-white border-2 border-[#121212] shadow-xs overflow-hidden">
            <div className="px-6 py-3 border-b border-[#121212] bg-[#F5F2ED] text-[10px] font-black uppercase tracking-[0.2em] text-[#121212]">
              Pricing Tier Strategy Matrix
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121212] text-[#F5F2ED] font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Tier</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-right">Suggested Price</th>
                  <th className="py-2.5 px-4 text-right">Projected Inflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#121212]/15 text-[#121212] font-medium">
                {results.pricingTiers.map((tier) => (
                  <tr key={tier.tier} className="hover:bg-[#F5F2ED]/40">
                    <td className="py-3 px-4 font-bold text-[#121212]">{tier.tier}</td>
                    <td className="py-3 px-4 text-[11px] text-[#121212]/70 max-w-[200px]">{tier.description}</td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-[#D44D26] text-sm">
                      {formatCurrency(tier.suggestedPrice)}
                    </td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-[#121212]">
                      {formatCurrency(tier.projectedRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
