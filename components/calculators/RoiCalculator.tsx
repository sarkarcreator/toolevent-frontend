'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateEventROI } from '@/lib/calculators';
import {
  TrendingUp,
  Save,
  CheckCircle2,
  PieChart as PieChartIcon,
  Percent,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function RoiCalculator() {
  const { country, currency, formatCurrency, formatPercent } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [totalCost, setTotalCost] = useState<number>(country === 'UAE' ? 80000 : 25000);
  const [directRevenue, setDirectRevenue] = useState<number>(country === 'UAE' ? 60000 : 18000);
  const [leadsGenerated, setLeadsGenerated] = useState<number>(120);
  const [leadConversionRate, setLeadConversionRate] = useState<number>(15);
  const [averageCustomerValue, setAverageCustomerValue] = useState<number>(country === 'UAE' ? 4000 : 1200);
  const [brandValueEstimated, setBrandValueEstimated] = useState<number>(country === 'UAE' ? 20000 : 5000);
  const [partnershipValue, setPartnershipValue] = useState<number>(country === 'UAE' ? 15000 : 4000);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateEventROI({
      country,
      currency,
      totalCost,
      directRevenue,
      leadsGenerated,
      leadConversionRate,
      averageCustomerValue,
      brandValueEstimated,
      partnershipValue,
    });
  }, [
    country,
    currency,
    totalCost,
    directRevenue,
    leadsGenerated,
    leadConversionRate,
    averageCustomerValue,
    brandValueEstimated,
    partnershipValue,
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
          toolType: 'event-roi',
          title: `ROI Model (${formatPercent(results.totalROI)})`,
          country,
          currency,
          inputs: {
            totalCost,
            directRevenue,
            leadsGenerated,
            leadConversionRate,
            averageCustomerValue,
            brandValueEstimated,
            partnershipValue,
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

  const valueData = [
    { name: 'Direct Revenue', value: directRevenue, color: '#121212' },
    { name: 'Pipeline Value', value: results.pipelineValue, color: '#D44D26' },
    { name: 'Brand Equity', value: brandValueEstimated, color: '#6A6359' },
    { name: 'Partnership Value', value: partnershipValue, color: '#B54728' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
              Executive Valuation
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Holistic Business Impact
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Event ROI Calculator
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Quantify multi-dimensional returns including direct revenue, sales pipeline value, and long-term brand equity.
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
          {isSaved ? 'Saved!' : 'Save ROI Model'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] border-b border-[#121212]/15 pb-2">
              Event Investment & Leads
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Total Event Investment / Cost ({currency})
                </label>
                <input
                  type="number"
                  min="1"
                  value={totalCost || ''}
                  onChange={(e) => setTotalCost(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Direct Inflow (Tickets, Sponsors) ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={directRevenue || ''}
                  onChange={(e) => setDirectRevenue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Leads Captured
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={leadsGenerated}
                    onChange={(e) => setLeadsGenerated(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    value={leadConversionRate}
                    onChange={(e) => setLeadConversionRate(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Avg. Deal Value / LTV ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={averageCustomerValue || ''}
                  onChange={(e) => setAverageCustomerValue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Brand Equity Value ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={brandValueEstimated || ''}
                    onChange={(e) => setBrandValueEstimated(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Partnership Value ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={partnershipValue || ''}
                    onChange={(e) => setPartnershipValue(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className={`p-6 border-2 border-[#121212] shadow-sm ${results.totalROI >= 0 ? 'bg-[#121212] text-[#F5F2ED]' : 'bg-[#D44D26] text-white'}`}>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Total Blended ROI
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {formatPercent(results.totalROI)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                Direct ROI: {formatPercent(results.directROI)}
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/60">
                Cost Per Lead (CPL)
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.costPerLead)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                {leadsGenerated} qualified leads
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Total Value Created
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.totalValueGenerated)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Multiple: {results.roiMultiple}x
              </span>
            </div>
          </div>

          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] mb-4">
              Value Generation Distribution
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={valueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                    {valueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => [formatCurrency(Number(v)), 'Value']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
