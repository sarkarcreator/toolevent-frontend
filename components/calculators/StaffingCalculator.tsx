'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateStaffing } from '@/lib/calculators';
import {
  Users,
  Save,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export function StaffingCalculator() {
  const { country, currency, formatCurrency } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [guestCount, setGuestCount] = useState<number>(180);
  const [eventType, setEventType] = useState<'CORPORATE' | 'WEDDING' | 'CONCERT' | 'CONFERENCE' | 'GALA'>('GALA');
  const [eventDurationHours, setEventDurationHours] = useState<number>(5);
  const [serviceStyle, setServiceStyle] = useState<'PLATED' | 'BUFFET' | 'COCKTAIL'>('PLATED');
  const [numberOfBars, setNumberOfBars] = useState<number>(2);
  const [isVipEvent, setIsVipEvent] = useState<boolean>(true);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateStaffing({
      guestCount,
      eventDurationHours,
      serviceStyle,
      numberOfBars,
      isVipEvent,
    });
  }, [guestCount, eventDurationHours, serviceStyle, numberOfBars, isVipEvent]);

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
          toolType: 'event-staffing',
          title: `Staffing Model (${results.totalHeadcount} Staff - ${guestCount} Guests)`,
          country,
          currency,
          inputs: { guestCount, eventType, eventDurationHours, serviceStyle, numberOfBars, isVipEvent },
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
              Operations & Crew Roster
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Standard Hospitality Labor Ratios
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Event Staffing Calculator
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Determine required event directors, stage managers, waitstaff, bartenders, registration hosts, and security officers with total labor wages.
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
          {isSaved ? 'Saved!' : 'Save Staff Plan'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] border-b border-[#121212]/15 pb-2">
              Event Operational Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                  Expected Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] font-bold outline-none focus:bg-white focus:border-[#D44D26]"
                  >
                    <option value="GALA">Gala / Awards</option>
                    <option value="WEDDING">Wedding</option>
                    <option value="CORPORATE">Corporate Summit</option>
                    <option value="CONFERENCE">Multi-day Conference</option>
                    <option value="CONCERT">Concert / Festival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Shift Duration (Hrs)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={eventDurationHours}
                    onChange={(e) => setEventDurationHours(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Catering Service
                  </label>
                  <select
                    value={serviceStyle}
                    onChange={(e) => setServiceStyle(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] font-bold outline-none focus:bg-white focus:border-[#D44D26]"
                  >
                    <option value="PLATED">Plated (1:12 ratio)</option>
                    <option value="BUFFET">Buffet (1:25 ratio)</option>
                    <option value="COCKTAIL">Cocktail (1:20 ratio)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1">
                    Number of Bars
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={numberOfBars}
                    onChange={(e) => setNumberOfBars(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F2ED] border border-[#121212]/20 font-serif font-bold text-[#121212] outline-none focus:bg-white focus:border-[#D44D26]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#121212]/15 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="vipToggle"
                  checked={isVipEvent}
                  onChange={(e) => setIsVipEvent(e.target.checked)}
                  className="w-4 h-4 accent-[#D44D26] cursor-pointer"
                />
                <label htmlFor="vipToggle" className="text-xs font-bold text-[#121212] cursor-pointer">
                  High-Touch VIP Protocol (+2 Dedicated Concierges)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#121212] text-[#F5F2ED] p-6 border-2 border-[#121212] shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Total Headcount
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mt-1">
                {results.totalHeadcount} <span className="text-sm font-sans font-normal text-[#F5F2ED]/60">crew</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 mt-1 block">
                1 staff per {results.staffToGuestRatio} guests
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/60">
                Total Labor Cost
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.totalLaborCost)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                {eventDurationHours} hr shift basis
              </span>
            </div>

            <div className="bg-white p-6 border-2 border-[#121212] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">
                Labor / Guest
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] tracking-tight mt-1">
                {formatCurrency(results.costPerGuest)}
              </div>
              <span className="text-[10px] uppercase font-bold text-[#121212]/60 mt-1 block">
                Per attendee cost
              </span>
            </div>
          </div>

          {/* Roster Table */}
          <div className="bg-white border-2 border-[#121212] shadow-xs overflow-hidden">
            <div className="px-6 py-3 border-b border-[#121212] bg-[#F5F2ED] text-[10px] font-black uppercase tracking-[0.2em] text-[#121212]">
              Complete Staff Roster & Wage Allocations
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121212] text-[#F5F2ED] font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Role Description</th>
                  <th className="py-2.5 px-4 text-center">Quantity</th>
                  <th className="py-2.5 px-4 text-right">Hourly Rate</th>
                  <th className="py-2.5 px-4 text-right">Total Shift Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#121212]/15 text-[#121212]">
                {results.roles.map((r) => (
                  <tr key={r.role} className="hover:bg-[#F5F2ED]/40">
                    <td className="py-2.5 px-4 font-bold">{r.role}</td>
                    <td className="py-2.5 px-4 text-center font-serif font-bold text-[#D44D26]">{r.count}</td>
                    <td className="py-2.5 px-4 text-right font-serif text-[#121212]/70">{formatCurrency(r.hourlyRate)}/hr</td>
                    <td className="py-2.5 px-4 text-right font-serif font-bold">{formatCurrency(r.totalCost)}</td>
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
