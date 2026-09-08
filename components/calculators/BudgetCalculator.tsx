'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateEventBudget } from '@/lib/calculators';
import { generateCalculatorPDF } from '@/lib/export/pdfGenerator';
import { generateCalculatorExcel } from '@/lib/export/excelGenerator';
import {
  FileSpreadsheet,
  FileText,
  Save,
  Share2,
  RotateCcw,
  PieChart as PieChartIcon,
  CheckCircle2,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

export function BudgetCalculator({ initialCountry }: { initialCountry?: 'USA' | 'UAE' | 'UK' }) {
  const { country: marketCountry, currency, formatCurrency } = useMarket();
  const { user, openAuthModal } = useAuth();

  const activeCountry = initialCountry || marketCountry;

  // Form State with sensible defaults
  const [eventType, setEventType] = useState('Corporate Conference & Dinner');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [contingencyPercent, setContingencyPercent] = useState<number>(10);

  const [venue, setVenue] = useState<number>(activeCountry === 'UAE' ? 35000 : activeCountry === 'UK' ? 6500 : 8500);
  const [catering, setCatering] = useState<number>(activeCountry === 'UAE' ? 30000 : activeCountry === 'UK' ? 5500 : 7500);
  const [decoration, setDecoration] = useState<number>(activeCountry === 'UAE' ? 12000 : activeCountry === 'UK' ? 2000 : 2500);
  const [photography, setPhotography] = useState<number>(activeCountry === 'UAE' ? 6000 : activeCountry === 'UK' ? 1500 : 2000);
  const [videography, setVideography] = useState<number>(activeCountry === 'UAE' ? 5000 : activeCountry === 'UK' ? 1200 : 1500);
  const [entertainment, setEntertainment] = useState<number>(activeCountry === 'UAE' ? 8000 : activeCountry === 'UK' ? 2000 : 3000);
  const [marketing, setMarketing] = useState<number>(activeCountry === 'UAE' ? 5000 : activeCountry === 'UK' ? 1500 : 2000);
  const [staff, setStaff] = useState<number>(activeCountry === 'UAE' ? 4000 : activeCountry === 'UK' ? 1200 : 1800);
  const [transportation, setTransportation] = useState<number>(activeCountry === 'UAE' ? 3000 : activeCountry === 'UK' ? 800 : 1000);
  const [equipment, setEquipment] = useState<number>(activeCountry === 'UAE' ? 6000 : activeCountry === 'UK' ? 1500 : 2200);
  const [security, setSecurity] = useState<number>(activeCountry === 'UAE' ? 2000 : activeCountry === 'UK' ? 600 : 800);
  const [invitations, setInvitations] = useState<number>(activeCountry === 'UAE' ? 1500 : activeCountry === 'UK' ? 400 : 500);
  const [accommodation, setAccommodation] = useState<number>(0);
  const [miscellaneous, setMiscellaneous] = useState<number>(activeCountry === 'UAE' ? 2500 : activeCountry === 'UK' ? 600 : 800);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pure Calculation Run
  const results = useMemo(() => {
    return calculateEventBudget({
      country: activeCountry,
      currency,
      eventType,
      guestCount,
      venue,
      catering,
      decoration,
      photography,
      videography,
      entertainment,
      marketing,
      staff,
      transportation,
      equipment,
      security,
      invitations,
      accommodation,
      miscellaneous,
      contingencyPercent,
    });
  }, [
    activeCountry,
    currency,
    eventType,
    guestCount,
    venue,
    catering,
    decoration,
    photography,
    videography,
    entertainment,
    marketing,
    staff,
    transportation,
    equipment,
    security,
    invitations,
    accommodation,
    miscellaneous,
    contingencyPercent,
  ]);

  const handleReset = () => {
    setVenue(0);
    setCatering(0);
    setDecoration(0);
    setPhotography(0);
    setVideography(0);
    setEntertainment(0);
    setMarketing(0);
    setStaff(0);
    setTransportation(0);
    setEquipment(0);
    setSecurity(0);
    setInvitations(0);
    setAccommodation(0);
    setMiscellaneous(0);
    setContingencyPercent(10);
    setIsSaved(false);
  };

  const handleSaveCalculation = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    setSaveLoading(true);
    try {
      const res = await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: 'event-budget',
          title: `${eventType} (${activeCountry})`,
          country: activeCountry,
          currency,
          inputs: {
            eventType,
            guestCount,
            venue,
            catering,
            decoration,
            photography,
            videography,
            entertainment,
            marketing,
            staff,
            transportation,
            equipment,
            security,
            invitations,
            accommodation,
            miscellaneous,
            contingencyPercent,
          },
          results,
        }),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 4000);
      }
    } catch {
      // ignore
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    generateCalculatorPDF({
      toolTitle: 'Event Budget Planning Report',
      country: activeCountry,
      currency,
      inputs: {
        eventType,
        guestCount,
        contingencyPercent: `${contingencyPercent}%`,
        venue: formatCurrency(venue),
        catering: formatCurrency(catering),
        decoration: formatCurrency(decoration),
        photography: formatCurrency(photography),
        videography: formatCurrency(videography),
        entertainment: formatCurrency(entertainment),
        marketing: formatCurrency(marketing),
        staff: formatCurrency(staff),
        equipment: formatCurrency(equipment),
      },
      summaryMetrics: [
        { label: 'Total Budget', value: formatCurrency(results.totalBudget) },
        { label: 'Cost Per Guest', value: formatCurrency(results.costPerGuest) },
        { label: 'Contingency Reserve', value: formatCurrency(results.contingencyAmount) },
        { label: 'Top Category', value: results.topExpenseCategory },
      ],
      tableData: {
        headers: ['Category', 'Allocated Amount', 'Share (%)', 'Cost / Guest'],
        rows: results.categories.map((c) => [
          c.category,
          formatCurrency(c.amount),
          `${c.percentage}%`,
          formatCurrency(c.costPerGuest),
        ]),
      },
    });
  };

  const handleDownloadExcel = () => {
    generateCalculatorExcel({
      toolTitle: 'Event Budget Model',
      country: activeCountry,
      currency,
      inputs: {
        EventType: eventType,
        GuestCount: guestCount,
        ContingencyRate: `${contingencyPercent}%`,
        Venue: venue,
        Catering: catering,
        Decoration: decoration,
        Photography: photography,
        Videography: videography,
        Entertainment: entertainment,
        Marketing: marketing,
        Staff: staff,
        Transportation: transportation,
        Equipment: equipment,
        Security: security,
        Invitations: invitations,
        Accommodation: accommodation,
        Miscellaneous: miscellaneous,
      },
      summaryMetrics: [
        { label: 'Total Base Expenses', value: formatCurrency(results.totalBaseExpenses) },
        { label: 'Contingency Amount', value: formatCurrency(results.contingencyAmount) },
        { label: 'Total Planned Budget', value: formatCurrency(results.totalBudget) },
        { label: 'Cost Per Guest', value: formatCurrency(results.costPerGuest) },
        { label: 'Recommended Range Min', value: formatCurrency(results.recommendedBudgetMin) },
        { label: 'Recommended Range Max', value: formatCurrency(results.recommendedBudgetMax) },
      ],
      breakdownRows: results.categories.map((c) => ({
        category: c.category,
        amount: c.amount,
        percentage: c.percentage,
        notes: `Estimated at ${formatCurrency(c.costPerGuest)} per guest`,
      })),
    });
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const artisticColors = ['#121212', '#D44D26', '#8C8275', '#3E3832', '#B85D38', '#635B50', '#A3998C', '#24201D', '#D97A53', '#4A423A'];

  return (
    <div className="space-y-8">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
                {activeCountry} Edition ({currency})
              </span>
              <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
                Financial Architecture Model
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
              Event Budget Calculator
            </h1>
            <p className="text-xs text-[#121212]/70 font-medium">
              Accurately estimate total venue, catering, AV, staff, and contingency expenses with automatic per-guest breakdowns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveCalculation}
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
              className="flex items-center gap-2 px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[#121212] bg-[#F5F2ED] hover:bg-white border-2 border-[#121212] transition-all shadow-md"
            >
              <FileText className="w-4 h-4 text-[#D44D26]" />
              PDF Report
            </button>

            <button
              onClick={handleDownloadExcel}
              className="flex items-center gap-2 px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[#121212] bg-[#F5F2ED] hover:bg-white border-2 border-[#121212] transition-all shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#121212]" />
              Excel (.xlsx)
            </button>

            <button
              onClick={handleShare}
              className="p-3 text-[#121212] bg-[#F5F2ED] hover:bg-white border-2 border-[#121212] transition-all shadow-md"
              title="Share calculator link"
            >
              <Share2 className="w-4 h-4 text-[#121212]" />
            </button>
          </div>
        </div>

        {copied && (
          <div className="mt-3 p-2 bg-[#121212] text-[#F5F2ED] text-[10px] uppercase font-bold tracking-widest text-center border-l-4 border-[#D44D26]">
            Link copied to clipboard
          </div>
        )}
      </div>

      {/* Main Grid: Inputs (Left) & Results/Charts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS COLUMN (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#121212]/15 pb-3">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212]">
                1. Event Parameters
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#121212]/60 hover:text-[#D44D26] transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Event Name / Type
                </label>
                <input
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Guest Count
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
                    Contingency (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={contingencyPercent}
                    onChange={(e) => setContingencyPercent(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] pt-3 border-t border-[#121212]/15">
              2. Expense Categories ({currency})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Venue Rental', val: venue, setter: setVenue },
                { label: 'Catering & Food', val: catering, setter: setCatering },
                { label: 'Decor & Florals', val: decoration, setter: setDecoration },
                { label: 'Photography', val: photography, setter: setPhotography },
                { label: 'Videography', val: videography, setter: setVideography },
                { label: 'Entertainment / DJ', val: entertainment, setter: setEntertainment },
                { label: 'Marketing & PR', val: marketing, setter: setMarketing },
                { label: 'Staff & Security', val: staff, setter: setStaff },
                { label: 'AV & Equipment', val: equipment, setter: setEquipment },
                { label: 'Transportation', val: transportation, setter: setTransportation },
                { label: 'Invitations & Print', val: invitations, setter: setInvitations },
                { label: 'Miscellaneous', val: miscellaneous, setter: setMiscellaneous },
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-[10px] font-bold text-[#121212]/80 mb-1 truncate">
                    {item.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-[10px] text-[#121212]/40 font-mono">
                      {currency === 'AED' ? 'AED' : currency === 'GBP' ? '£' : '$'}
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={item.val || ''}
                      placeholder="0"
                      onChange={(e) => item.setter(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full pl-9 pr-2.5 py-1.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS & CHARTS COLUMN (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#121212] text-[#F5F2ED] p-6 border-2 border-[#121212] shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Total Budget
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {formatCurrency(results.totalBudget)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                Includes {contingencyPercent}% contingency
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
                Across {guestCount} guests
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Contingency Reserve
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.contingencyAmount)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Safety fund for overages
              </span>
            </div>
          </div>

          {/* Charts Section */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-[#D44D26]" />
                Budget Allocation Breakdown
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#121212]/60">
                Top Spend: <strong className="text-[#D44D26]">{results.topExpenseCategory}</strong>
              </span>
            </div>

            {results.totalBudget > 0 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results.categories}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={45}
                      paddingAngle={2}
                    >
                      {results.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={artisticColors[index % artisticColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [formatCurrency(Number(val)), 'Amount']}
                      contentStyle={{
                        backgroundColor: '#121212',
                        borderRadius: '0px',
                        color: '#F5F2ED',
                        fontSize: '11px',
                        border: '1px solid #D44D26',
                      }}
                    />
                    <Legend
                      formatter={(val) => <span className="text-[11px] font-medium text-[#121212]">{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-[#121212]/40 text-xs font-serif italic">
                Enter expense amounts to generate interactive visualization
              </div>
            )}
          </div>

          {/* Line Items Table */}
          <div className="bg-white border-2 border-[#121212] shadow-xs overflow-hidden">
            <div className="px-6 py-3 border-b border-[#121212] bg-[#F5F2ED] flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#121212]">
                Detailed Category Spend
              </h3>
              <span className="text-[10px] font-bold text-[#121212]/70">
                Recommended Buffer: {formatCurrency(results.recommendedBudgetMin)} – {formatCurrency(results.recommendedBudgetMax)}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121212] text-[#F5F2ED] font-black uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4 text-right">Amount</th>
                    <th className="py-2.5 px-4 text-right">Share (%)</th>
                    <th className="py-2.5 px-4 text-right">Per Guest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#121212]/15 text-[#121212]">
                  {results.categories.map((cat, idx) => (
                    <tr key={cat.category} className="hover:bg-[#F5F2ED]/40 transition-colors">
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 inline-block"
                          style={{ backgroundColor: artisticColors[idx % artisticColors.length] }}
                        />
                        {cat.category}
                      </td>
                      <td className="py-3 px-4 text-right font-serif font-bold text-[#121212]">
                        {formatCurrency(cat.amount)}
                      </td>
                      <td className="py-3 px-4 text-right font-serif font-bold text-[#D44D26]">
                        {cat.percentage}%
                      </td>
                      <td className="py-3 px-4 text-right font-serif text-[#121212]/70">
                        {formatCurrency(cat.costPerGuest)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
