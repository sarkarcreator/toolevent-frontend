'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateGuestAttendance } from '@/lib/calculators';
import {
  UserCheck,
  Save,
  CheckCircle2,
  Users,
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

export function GuestCalculator() {
  const { country, formatPercent } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [invitedCount, setInvitedCount] = useState<number>(250);
  const [rsvpYes, setRsvpYes] = useState<number>(140);
  const [rsvpNo, setRsvpNo] = useState<number>(30);
  const [guestType, setGuestType] = useState<'wedding' | 'corporate_free' | 'corporate_paid' | 'conference' | 'private_party'>('wedding');

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateGuestAttendance({
      country,
      invitedCount,
      rsvpYes,
      rsvpNo,
      guestType,
    });
  }, [country, invitedCount, rsvpYes, rsvpNo, guestType]);

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
          toolType: 'guest',
          title: `Guest RSVP Forecast (${results.projectedAttendanceCount} Attendees from ${invitedCount} Invites)`,
          country,
          currency: 'USD',
          inputs: { invitedCount, rsvpYes, rsvpNo, guestType },
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

  const chartData = [
    { name: 'Confirmed (Yes)', value: results.confirmedCount, color: '#121212' },
    { name: 'Declined (No)', value: results.declinedCount, color: '#D44D26' },
    { name: 'Pending RSVP', value: results.pendingCount, color: '#A0988A' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
              RSVP & Turnout Engine
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Attrition Predictor
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Guest RSVP & Attendance Calculator
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Forecast actual attendance headcounts from total invitation lists, factoring in attrition benchmarks and buffer requirements.
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
          {isSaved ? 'Saved!' : 'Save Forecast'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] border-b border-[#121212]/15 pb-2">
              Guest List Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1.5">
                  Total Invitations Sent
                </label>
                <input
                  type="number"
                  min="1"
                  value={invitedCount}
                  onChange={(e) => setInvitedCount(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-serif font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1.5">
                  Confirmed RSVPs (Yes)
                </label>
                <input
                  type="number"
                  min="0"
                  max={invitedCount}
                  value={rsvpYes}
                  onChange={(e) => setRsvpYes(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-serif font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1.5">
                  Declined RSVPs (No)
                </label>
                <input
                  type="number"
                  min="0"
                  max={invitedCount}
                  value={rsvpNo}
                  onChange={(e) => setRsvpNo(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-serif font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1.5">
                  Event Category & Attrition Profile
                </label>
                <select
                  value={guestType}
                  onChange={(e) => setGuestType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] font-bold outline-none uppercase tracking-wider"
                >
                  <option value="wedding">Wedding (~88% turnout rate)</option>
                  <option value="corporate_free">Corporate Free Event (~60% turnout rate)</option>
                  <option value="corporate_paid">Corporate Paid Ticket (~90% turnout rate)</option>
                  <option value="conference">Industry Conference (~85% turnout rate)</option>
                  <option value="private_party">Private Celebration (~78% turnout rate)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#121212] text-[#F5F2ED] p-6 border-2 border-[#121212] shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Projected Turnout
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {results.projectedAttendanceCount}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                {results.historicalShowRatePercent}% Show Benchmark
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/60">
                Turnout Window
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {results.projectedAttendanceMin}–{results.projectedAttendanceMax}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Min–Max Range
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Catering Order Target
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {results.recommendedCateringOrderCount}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Includes +5% Buffer
              </span>
            </div>
          </div>

          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212]">
                RSVP Breakdown Distribution
              </h3>
              <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#F5F2ED] border border-[#121212]/20 text-[#121212]">
                {results.attritionRisk} Attrition Risk
              </span>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
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
