'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateEventProfit } from '@/lib/calculators';
import { generateCalculatorPDF } from '@/lib/export/pdfGenerator';
import {
  DollarSign,
  TrendingUp,
  FileText,
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

export function ProfitCalculator() {
  const { country, currency, formatCurrency, formatPercent } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [ticketPrice, setTicketPrice] = useState<number>(country === 'UAE' ? 350 : 95);
  const [expectedAttendees, setExpectedAttendees] = useState<number>(country === 'UAE' ? 350 : 250);
  const [sponsorshipRevenue, setSponsorshipRevenue] = useState<number>(country === 'UAE' ? 35000 : 12000);
  const [merchandiseRevenue, setMerchandiseRevenue] = useState<number>(country === 'UAE' ? 6000 : 2000);
  const [otherRevenue, setOtherRevenue] = useState<number>(0);

  const [venueCost, setVenueCost] = useState<number>(country === 'UAE' ? 30000 : 9000);
  const [catering, setCatering] = useState<number>(country === 'UAE' ? 25000 : 7500);
  const [marketing, setMarketing] = useState<number>(country === 'UAE' ? 12000 : 3500);
  const [staff, setStaff] = useState<number>(country === 'UAE' ? 10000 : 3000);
  const [equipment, setEquipment] = useState<number>(country === 'UAE' ? 8000 : 2500);
  const [entertainment, setEntertainment] = useState<number>(country === 'UAE' ? 9000 : 2500);
  const [otherExpenses, setOtherExpenses] = useState<number>(country === 'UAE' ? 4000 : 1000);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateEventProfit({
      ticketPrice,
      expectedAttendees,
      sponsorshipRevenue,
      merchandiseRevenue,
      otherRevenue,
      venueCost,
      catering,
      marketing,
      staff,
      equipment,
      entertainment,
      otherExpenses,
    });
  }, [
    ticketPrice,
    expectedAttendees,
    sponsorshipRevenue,
    merchandiseRevenue,
    otherRevenue,
    venueCost,
    catering,
    marketing,
    staff,
    equipment,
    entertainment,
    otherExpenses,
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
          toolType: 'event-profit',
          title: `Profit Model (${currency} ${results.netProfit.toLocaleString()})`,
          country,
          currency,
          inputs: {
            ticketPrice,
            expectedAttendees,
            sponsorshipRevenue,
            merchandiseRevenue,
            venueCost,
            catering,
            marketing,
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

  const handleDownloadPDF = () => {
    generateCalculatorPDF({
      toolTitle: 'Event Profit & Loss Financial Statement',
      country,
      currency,
      inputs: {
        totalRevenue: formatCurrency(results.totalRevenue),
        totalExpenses: formatCurrency(results.totalExpenses),
        ticketPrice: formatCurrency(ticketPrice),
        attendees: `${expectedAttendees}`,
      },
      summaryMetrics: [
        { label: 'Total Revenue', value: formatCurrency(results.totalRevenue) },
        { label: 'Total Expenses', value: formatCurrency(results.totalExpenses) },
        { label: 'Net Profit', value: formatCurrency(results.netProfit) },
        { label: 'Net Profit Margin', value: formatPercent(results.profitMarginPercent) },
      ],
      tableData: {
        headers: ['Financial Stream', 'Amount', 'Category'],
        rows: [
          ['Ticket Sales Revenue', formatCurrency(results.ticketRevenue), 'Primary Revenue'],
          ['Sponsorships', formatCurrency(sponsorshipRevenue), 'Partner Revenue'],
          ['Merchandise & Concessions', formatCurrency(merchandiseRevenue), 'Auxiliary'],
          ['Venue & Facility Rental', formatCurrency(venueCost), 'Fixed Overhead'],
          ['Catering & Hospitality', formatCurrency(catering), 'Direct Cost'],
          ['Marketing & Advertising', formatCurrency(marketing), 'Acquisition'],
          ['Staffing & Operations', formatCurrency(staff), 'Direct Labor'],
          ['AV & Equipment Rental', formatCurrency(equipment), 'Production'],
          ['Talent & Entertainment', formatCurrency(entertainment), 'Programming'],
          ['Net Profit', formatCurrency(results.netProfit), formatPercent(results.profitMarginPercent)],
        ],
      },
    });
  };

  const comparisonData = [
    { name: 'Total Revenue', amount: results.totalRevenue, fill: '#121212' },
    { name: 'Total Expenses', amount: results.totalExpenses, fill: '#D44D26' },
    { name: 'Net Profit', amount: Math.max(0, results.netProfit), fill: '#2A7B4C' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
              P&L Financial Engine
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Multi-Stream Revenue Modeling
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Event Profit Calculator
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Calculate gross inflows, full operational budgets, net profit margins, and attendee break-even thresholds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saveLoading}
            className={`flex items-center gap-2 px-5 py-3 text-[10px] uppercase font-black tracking-widest border-2 transition-all shadow-md ${
              isSaved
                ? 'bg-[#D44D26] text-white border-[#D44D26]'
                : 'bg-[#121212] text-white border-[#121212] hover:bg-[#D44D26]'
            }`}
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4 text-[#D44D26]" />}
            {isSaved ? 'Saved!' : 'Save P&L'}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-3 text-[10px] uppercase font-black tracking-widest text-[#121212] bg-[#F5F2ED] border-2 border-[#121212] hover:bg-[#121212] hover:text-white transition-all shadow-md"
          >
            <FileText className="w-4 h-4 text-[#D44D26]" />
            PDF Statement
          </button>
        </div>
      </div>

      {/* Inputs & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Revenue Streams */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-1.5 border-b border-[#121212]/15 pb-2">
              <TrendingUp className="w-4 h-4 text-[#D44D26]" /> 1. Revenue Inflows ({currency})
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Ticket Price ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={ticketPrice || ''}
                  onChange={(e) => setTicketPrice(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Expected Attendees
                </label>
                <input
                  type="number"
                  min="0"
                  value={expectedAttendees || ''}
                  onChange={(e) => setExpectedAttendees(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Sponsorship Revenue ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={sponsorshipRevenue || ''}
                  onChange={(e) => setSponsorshipRevenue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Merchandise & Concessions ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={merchandiseRevenue || ''}
                  onChange={(e) => setMerchandiseRevenue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>
            </div>

            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-1.5 pt-4 border-t border-[#121212]/15 pb-2">
              <DollarSign className="w-4 h-4 text-[#D44D26]" /> 2. Operating Expenses ({currency})
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Venue Rental', val: venueCost, setter: setVenueCost },
                { label: 'Catering & Food Service', val: catering, setter: setCatering },
                { label: 'Marketing & Promotion', val: marketing, setter: setMarketing },
                { label: 'Staffing & Crew', val: staff, setter: setStaff },
                { label: 'Equipment & Stage AV', val: equipment, setter: setEquipment },
                { label: 'Entertainment & Speakers', val: entertainment, setter: setEntertainment },
                { label: 'Other Operating Expenses', val: otherExpenses, setter: setOtherExpenses },
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    {item.label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={item.val || ''}
                    onChange={(e) => item.setter(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS & CHARTS (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className={`p-6 border-2 border-[#121212] shadow-sm ${results.netProfit >= 0 ? 'bg-[#121212] text-[#F5F2ED]' : 'bg-[#D44D26] text-white'}`}>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Net Profit
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {formatCurrency(results.netProfit)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                {results.netProfit >= 0 ? 'Profitable Event' : 'Operating Deficit'}
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/60">
                Profit Margin
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatPercent(results.profitMarginPercent)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                ROI: {formatPercent(results.roiPercent)}
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Total Inflow
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.totalRevenue)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Costs: {formatCurrency(results.totalExpenses)}
              </span>
            </div>
          </div>

          {/* Bar Comparison Chart */}
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] mb-4">
              Revenue vs Operating Costs vs Profit
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" stroke="#121212" fontSize={11} />
                  <YAxis
                    stroke="#121212"
                    fontSize={10}
                    tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                  />
                  <Tooltip
                    formatter={(val: any) => [formatCurrency(Number(val)), 'Amount']}
                    contentStyle={{ backgroundColor: '#121212', borderRadius: '0px', color: '#F5F2ED', border: '1px solid #D44D26', fontSize: '11px' }}
                  />
                  <Bar dataKey="amount" radius={[0, 0, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Financial Summary Table */}
          <div className="bg-white border-2 border-[#121212] shadow-xs overflow-hidden">
            <div className="px-6 py-3 border-b border-[#121212] bg-[#F5F2ED] text-[10px] font-black uppercase tracking-[0.2em] text-[#121212]">
              Complete Profit & Loss Statement
            </div>
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-[#121212]/15 text-[#121212] font-medium">
                <tr className="hover:bg-[#F5F2ED]/40">
                  <td className="py-3 px-5 font-bold">Gross Total Inflow (Tickets + Sponsors)</td>
                  <td className="py-3 px-5 text-right font-serif font-bold text-[#121212]">
                    {formatCurrency(results.totalRevenue)}
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F2ED]/40">
                  <td className="py-3 px-5 font-bold">Total Operational Expenses</td>
                  <td className="py-3 px-5 text-right font-serif font-bold text-[#D44D26]">
                    - {formatCurrency(results.totalExpenses)}
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F2ED]/40">
                  <td className="py-3 px-5">Break-Even Attendee Threshold</td>
                  <td className="py-3 px-5 text-right font-serif font-semibold text-[#121212]">
                    {results.breakEvenAttendees} attendees
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F2ED]/40">
                  <td className="py-3 px-5">Average Revenue per Attendee</td>
                  <td className="py-3 px-5 text-right font-serif font-semibold text-[#121212]">
                    {formatCurrency(results.revenuePerAttendee)}
                  </td>
                </tr>
                <tr className="bg-[#121212] text-[#F5F2ED] font-bold">
                  <td className="py-3.5 px-5 font-black uppercase tracking-wider text-[11px] text-[#F5F2ED]">Net Take-Home Profit</td>
                  <td className="py-3.5 px-5 text-right font-serif font-extrabold text-[#F5F2ED] text-base">
                    {formatCurrency(results.netProfit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
