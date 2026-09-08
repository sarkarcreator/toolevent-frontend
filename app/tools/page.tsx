'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarket } from '@/components/layout/MarketContext';
import {
  Calculator,
  TrendingUp,
  Ticket,
  Scale,
  Heart,
  Utensils,
  Users,
  UserCheck,
  CheckSquare,
  Award,
  Search,
  Filter,
  ArrowRight,
  Globe,
} from 'lucide-react';

export default function ToolsCatalogPage() {
  const { country, currency } = useMarket();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const tools = [
    {
      id: 'budget-calculator',
      name: 'Event Budget Calculator',
      description: 'Allocate expenses across 7 core event categories with contingency buffers and market tax automation.',
      category: 'Financial',
      icon: Calculator,
      badge: 'Core Model',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'profit-calculator',
      name: 'Event Profit Margin Calculator',
      description: 'Model gross and net profit margins, corporate tax liabilities, and ticket revenue thresholds.',
      category: 'Financial',
      icon: TrendingUp,
      badge: 'Financial',
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'ticket-pricing',
      name: 'Ticket Pricing & Tier Optimizer',
      description: 'Model Early Bird, General Admission, and VIP tiered bundles with booking fee absorption.',
      category: 'Financial',
      icon: Ticket,
      badge: 'Revenue',
      color: 'bg-indigo-50 text-indigo-700',
    },
    {
      id: 'break-even',
      name: 'Break-Even Attendance Calculator',
      description: 'Calculate the exact number of paid tickets required to cover fixed venue and variable catering costs.',
      category: 'Financial',
      icon: Scale,
      badge: 'Risk Control',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      id: 'event-roi',
      name: 'Corporate Event ROI Calculator',
      description: 'Quantify direct revenues, sales-qualified leads (SQLs), pipeline value, and long-term brand equity.',
      category: 'Financial',
      icon: Award,
      badge: 'Enterprise',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      id: 'dubai-wedding',
      name: 'Dubai & UAE Wedding Calculator',
      description: 'Specialized 10-category luxury wedding estimator built for Dubai hotels, desert resorts, and 5% UAE VAT.',
      category: 'Weddings',
      icon: Heart,
      badge: 'UAE Luxury',
      color: 'bg-rose-50 text-rose-700',
    },
    {
      id: 'wedding-budget',
      name: 'Standard Wedding Budget Calculator',
      description: 'Comprehensive wedding cost distribution model across venue, attire, photo/video, decor, and music.',
      category: 'Weddings',
      icon: Heart,
      badge: 'Weddings',
      color: 'bg-rose-50 text-rose-700',
    },
    {
      id: 'catering',
      name: 'Catering & Bar Cost Calculator',
      description: 'Estimate per-guest meal pricing, full bar packages, vendor meals, service fees, and local catering taxes.',
      category: 'Operations',
      icon: Utensils,
      badge: 'Hospitality',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      id: 'staffing',
      name: 'Event Staffing & Labor Roster',
      description: 'Determine required event managers, waitstaff, bartenders, and security officers with hourly wages.',
      category: 'Operations',
      icon: Users,
      badge: 'Operations',
      color: 'bg-sky-50 text-sky-700',
    },
    {
      id: 'guest-attendance',
      name: 'Guest RSVP & Attendance Predictor',
      description: 'Predict actual event attendance from invitation lists, factoring in destination logistics and ticket pricing.',
      category: 'Logistics',
      icon: UserCheck,
      badge: 'Logistics',
      color: 'bg-teal-50 text-teal-700',
    },
    {
      id: 'checklist',
      name: 'Master Event Checklist Generator',
      description: 'Generate milestone operational roadmaps from 12-month prep down to minute-by-minute execution.',
      category: 'Planning',
      icon: CheckSquare,
      badge: 'Planning',
      color: 'bg-slate-100 text-slate-700',
    },
  ];

  const categories = ['All', 'Financial', 'Weddings', 'Operations', 'Logistics', 'Planning'];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = categoryFilter === 'All' || tool.category === categoryFilter;
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 py-6">
      {/* Header - Artistic Flair */}
      <div className="bg-white p-8 sm:p-12 border-2 border-[#121212] shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
                Archive Catalog
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D44D26] font-black">
                100% Free Financial Suites
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#121212] tracking-tight">
              Event Financial & Strategic Models
            </h1>
            <p className="text-xs sm:text-sm text-[#121212]/70 font-medium">
              Curated calculation models and operational engines calibrated for the {country} region ({currency}).
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-[#F5F2ED] border border-[#121212]/20 text-[10px] uppercase font-black tracking-widest text-[#121212]">
            <Globe className="w-4 h-4 text-[#D44D26]" />
            Region: <strong className="text-[#121212] font-black">{country}</strong>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#121212]/15">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#121212]/50" />
            <input
              type="text"
              placeholder="Search models (break-even, catering, wedding, ROI, staffing)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-3 text-[10px] uppercase font-black tracking-widest transition-all border ${
                  categoryFilter === cat
                    ? 'bg-[#121212] text-[#F5F2ED] border-[#121212]'
                    : 'bg-white text-[#121212] border-[#121212]/20 hover:border-[#121212] hover:bg-[#F5F2ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group bg-white p-7 border-2 border-[#121212] shadow-xs hover:border-[#D44D26] hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] group-hover:bg-[#121212] group-hover:text-[#F5F2ED] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.25em] bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] group-hover:bg-[#D44D26] group-hover:text-white group-hover:border-[#D44D26] transition-colors">
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-lg font-serif font-bold text-[#121212] group-hover:text-[#D44D26] transition-colors leading-snug">
                  {tool.name}
                </h2>

                <p className="text-xs text-[#121212]/75 leading-relaxed font-medium">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#121212]/15 flex items-center justify-between text-[10px] uppercase font-black tracking-[0.2em] text-[#121212] group-hover:text-[#D44D26]">
                <span>Launch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
