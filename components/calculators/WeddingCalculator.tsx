'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateWeddingBudget } from '@/lib/calculators';
import { generateCalculatorPDF } from '@/lib/export/pdfGenerator';
import {
  Heart,
  Save,
  CheckCircle2,
  FileText,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function WeddingCalculator({ initialCountry }: { initialCountry?: 'USA' | 'UAE' | 'UK' }) {
  const { country: marketCountry, currency, formatCurrency } = useMarket();
  const { user, openAuthModal } = useAuth();

  const activeCountry = initialCountry || marketCountry;

  const [totalBudget, setTotalBudget] = useState<number>(
    activeCountry === 'UAE' ? 180000 : activeCountry === 'UK' ? 32000 : 45000
  );
  const [guestCount, setGuestCount] = useState<number>(activeCountry === 'UAE' ? 250 : 120);
  const [tier, setTier] = useState<'STANDARD' | 'PREMIUM' | 'LUXURY'>(
    activeCountry === 'UAE' ? 'LUXURY' : 'PREMIUM'
  );

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateWeddingBudget({
      country: activeCountry,
      currency,
      totalBudget,
      guestCount,
      tier,
    });
  }, [activeCountry, currency, totalBudget, guestCount, tier]);

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
          toolType: 'wedding-budget',
          title: `Wedding Budget (${formatCurrency(totalBudget)} - ${guestCount} Guests)`,
          country: activeCountry,
          currency,
          inputs: { totalBudget, guestCount, tier },
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

  const handleDownloadPDF = () => {
    generateCalculatorPDF({
      toolTitle: `${activeCountry} Wedding Budget Plan`,
      country: activeCountry,
      currency,
      inputs: {
        guestCount,
        tier,
        market: activeCountry,
        totalBudget: formatCurrency(totalBudget),
      },
      summaryMetrics: [
        { label: 'Total Wedding Budget', value: formatCurrency(totalBudget) },
        { label: 'Cost Per Guest', value: formatCurrency(results.costPerGuest) },
        { label: 'Contingency Reserve', value: formatCurrency(results.contingencyAmount) },
        { label: 'Venue & Catering (45%)', value: formatCurrency(results.venueCateringAmount) },
      ],
      tableData: {
        headers: ['Wedding Category', 'Allocated Budget', 'Share (%)', 'Est. / Guest'],
        rows: results.categories.map((c) => [
          c.category,
          formatCurrency(c.amount),
          `${c.percentage}%`,
          formatCurrency(c.costPerGuest),
        ]),
      },
    });
  };

  const artisticColors = ['#121212', '#D44D26', '#8C8275', '#3E3832', '#B85D38', '#635B50', '#A3998C', '#24201D', '#D97A53', '#4A423A'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED] flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#D44D26] fill-[#D44D26]" /> {activeCountry} Wedding Edition
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Standard 45/12/10 Allocation Model
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            {activeCountry === 'UAE' ? 'Dubai & UAE Wedding Budget Calculator' : 'Wedding Budget Calculator'}
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Calculate your ideal budget breakdown across 10 core wedding categories, per-guest catering costs, and emergency buffers.
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
            {isSaved ? 'Saved!' : 'Save Plan'}
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-3 text-[10px] uppercase font-black tracking-widest text-[#121212] bg-[#F5F2ED] hover:bg-white border-2 border-[#121212] transition-all shadow-md"
          >
            <FileText className="w-4 h-4 text-[#D44D26]" />
            PDF Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] border-b border-[#121212]/15 pb-2">
              Wedding Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Total Target Wedding Budget ({currency})
                </label>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={totalBudget || ''}
                  onChange={(e) => setTotalBudget(Math.max(1000, Number(e.target.value) || 1000))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Expected Guest Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Wedding Style & Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['STANDARD', 'PREMIUM', 'LUXURY'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`py-2 text-[10px] uppercase font-black tracking-widest border transition-all ${
                        tier === t
                          ? 'bg-[#121212] text-[#F5F2ED] border-[#121212]'
                          : 'bg-[#F5F2ED] text-[#121212] border-[#121212]/20 hover:border-[#121212]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#121212] text-[#F5F2ED] p-6 border-2 border-[#121212] shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Total Budget
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {formatCurrency(totalBudget)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                {tier} Tier Package
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/60">
                Cost Per Guest
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.costPerGuest)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Across {guestCount} loved ones
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Venue & Catering (45%)
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.venueCateringAmount)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Food & Beverage Foundation
              </span>
            </div>
          </div>

          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] mb-4 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-[#D44D26]" />
              10-Category Wedding Allocation Breakdown
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={results.categories} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={85} innerRadius={45}>
                    {results.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={artisticColors[index % artisticColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: any) => [formatCurrency(Number(v)), 'Allocated']}
                    contentStyle={{ backgroundColor: '#121212', borderRadius: '0px', color: '#F5F2ED', border: '1px solid #D44D26', fontSize: '11px' }}
                  />
                  <Legend formatter={(v) => <span className="text-[11px] font-medium text-[#121212]">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
