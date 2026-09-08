'use client';

import React, { useState, useMemo } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { calculateCatering } from '@/lib/calculators';
import { generateCalculatorPDF } from '@/lib/export/pdfGenerator';
import {
  Utensils,
  Save,
  CheckCircle2,
  FileText,
  GlassWater,
  Sparkles,
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

export function CateringCalculator() {
  const { country, currency, formatCurrency } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [guestCount, setGuestCount] = useState<number>(120);
  const [mealType, setMealType] = useState<'PLATED' | 'BUFFET' | 'CANAPES' | 'FOOD_STATIONS' | 'COCKTAIL'>('BUFFET');
  const [barPackage, setBarPackage] = useState<'NONE' | 'SOFT_DRINKS' | 'BEER_WINE' | 'FULL_BAR' | 'PREMIUM_OPEN_BAR'>('BEER_WINE');
  const [eventDurationHours, setEventDurationHours] = useState<number>(4);
  const [childrenCount, setChildrenCount] = useState<number>(10);
  const [vendorMealsCount, setVendorMealsCount] = useState<number>(6);
  const [customCostPerPerson, setCustomCostPerPerson] = useState<number | undefined>(undefined);
  const [customDrinkCostPerPerson, setCustomDrinkCostPerPerson] = useState<number | undefined>(undefined);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const results = useMemo(() => {
    return calculateCatering({
      country,
      currency,
      guestCount,
      mealType,
      barPackage,
      eventDurationHours,
      childrenCount,
      vendorMealsCount,
      customCostPerPerson,
      customDrinkCostPerPerson,
    });
  }, [
    country,
    currency,
    guestCount,
    mealType,
    barPackage,
    eventDurationHours,
    childrenCount,
    vendorMealsCount,
    customCostPerPerson,
    customDrinkCostPerPerson,
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
          toolType: 'catering',
          title: `Catering Budget (${formatCurrency(results.totalCateringCost)} - ${guestCount} Guests)`,
          country,
          currency,
          inputs: { guestCount, mealType, barPackage, eventDurationHours, childrenCount, vendorMealsCount },
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
    { name: 'Food', amount: results.foodTotal, fill: '#121212' },
    { name: 'Beverages', amount: results.beverageTotal, fill: '#D44D26' },
    { name: 'Service / Gratuity', amount: results.serviceChargeAmount, fill: '#8C3217' },
    { name: 'Tax / VAT', amount: results.taxAmount, fill: '#64748b' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 rounded-md">
              Hospitality & Banquet Engine
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-500 font-medium">Food, Bar, Tax & Service Fee Estimator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Catering & Bar Cost Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Accurately model per-person meal costs, full bar packages, appetizers, vendor meals, service fees, and local taxes.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saveLoading}
          className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
            isSaved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4 text-slate-500" />}
          {isSaved ? 'Saved!' : 'Save Catering Plan'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Guest Count & Service Style
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Adult Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={eventDurationHours}
                    onChange={(e) => setEventDurationHours(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Meal Service Style</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="PLATED">Plated 3-Course Dinner</option>
                  <option value="BUFFET">Deluxe Buffet Stations</option>
                  <option value="FOOD_STATIONS">Interactive Food Stations</option>
                  <option value="CANAPES">Heavy Canap&eacute;s / Passed Hors d&apos;Oeuvres</option>
                  <option value="COCKTAIL">Light Cocktail Finger Food</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Beverage & Bar Package</label>
                <select
                  value={barPackage}
                  onChange={(e) => setBarPackage(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="NONE">No Bar (Water Only)</option>
                  <option value="SOFT_DRINKS">Non-Alcoholic (Soft Drinks, Juices, Mocktails)</option>
                  <option value="BEER_WINE">Beer, Wine & Soft Drinks</option>
                  <option value="FULL_BAR">Standard Full Open Bar</option>
                  <option value="PREMIUM_OPEN_BAR">Top-Shelf Premium Open Bar</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Children (Half Price)</label>
                  <input
                    type="number"
                    min="0"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vendor Meals (Photo/DJ)</label>
                  <input
                    type="number"
                    min="0"
                    value={vendorMealsCount}
                    onChange={(e) => setVendorMealsCount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-amber-600 text-white p-5 rounded-2xl shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100">
                Total Catering Bill
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {formatCurrency(results.totalCateringCost)}
              </div>
              <span className="text-[11px] text-amber-200 mt-1 block">
                Food, bar, tax & service
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Cost Per Person
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {formatCurrency(results.costPerPerson)}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                All inclusive rate
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Servings
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight mt-1">
                {results.totalPeopleServed}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {guestCount} guests + {vendorMealsCount} crew
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
              Catering Expense Breakdown
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip formatter={(v: any) => [formatCurrency(Number(v)), 'Amount']} />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
