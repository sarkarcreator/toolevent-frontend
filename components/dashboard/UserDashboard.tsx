'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../layout/AuthContext';
import { useMarket } from '../layout/MarketContext';
import {
  LayoutDashboard, Calculator, FileSpreadsheet, Download, Trash2, ExternalLink,
  ArrowRight, Sparkles, Clock3, WalletCards, Plus, CheckCircle2,
} from 'lucide-react';

export function UserDashboard() {
  const { user, openAuthModal } = useAuth();
  const { currency } = useMarket();
  const [activeTab, setActiveTab] = useState<'calculations' | 'plans' | 'orders'>('calculations');
  const [calculations, setCalculations] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [calcRes, ordersRes] = await Promise.all([
          fetch('/api/calculations'),
          fetch(`/api/orders?email=${encodeURIComponent(user.email)}`),
        ]);
        if (calcRes.ok) {
          const cData = await calcRes.json();
          setCalculations(cData.data || []);
        }
        if (ordersRes.ok) {
          const oData = await ordersRes.json();
          setOrders(oData.data || []);
        }
      } catch {
        // Keep the dashboard usable even if one request fails.
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleDeleteCalculation = async (id: string) => {
    try {
      await fetch(`/api/calculations/${id}`, { method: 'DELETE' });
      setCalculations((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // ignore
    }
  };

  if (!user) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center py-10">
        <div className="w-full max-w-lg rounded-[28px] bg-[#17191f] text-white p-8 sm:p-12 text-center shadow-[0_24px_70px_rgba(23,25,31,.18)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#ff5a36]/25 blur-3xl" />
          <div className="relative space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto ring-1 ring-white/10">
              <LayoutDashboard className="w-7 h-7 text-[#ff8b72]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#ff8b72] mb-2">Your event workspace</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.04em]">Everything in one place.</h2>
              <p className="text-sm text-white/65 leading-6 mt-3">Save calculations, access purchased templates and keep your event planning work organized.</p>
            </div>
            <button onClick={() => openAuthModal('login')} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 bg-white text-[#17191f] font-bold text-sm hover:bg-[#ff5a36] hover:text-white transition-colors">
              Sign in to continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 py-2 sm:py-5">
      <section className="rounded-[28px] bg-[#17191f] text-white p-6 sm:p-9 relative overflow-hidden shadow-[0_20px_60px_rgba(23,25,31,.14)]">
        <div className="absolute -top-28 -right-20 w-72 h-72 rounded-full bg-[#ff5a36]/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-[#3867ff]/10 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/70 ring-1 ring-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#ff8b72]" /> {user.subscriptionTier} account
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-[-0.055em]">Good to see you, {user.name || 'Planner'}.</h1>
            <p className="text-sm text-white/55 mt-2">Your event decisions, saved plans and downloads — ready when you are.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/8 px-5 py-3.5 ring-1 ring-white/10 min-w-[145px]">
              <span className="text-[11px] text-white/50 block">AI credits</span>
              <span className="text-xl font-bold">{user.aiCreditsRemaining}</span>
              <span className="text-xs text-white/45 ml-1">remaining</span>
            </div>
            <Link href="/ai-planner" className="rounded-2xl px-5 py-3.5 bg-[#ff5a36] hover:bg-[#ff6b4b] font-bold text-sm flex items-center gap-2 transition-colors">
              <Sparkles className="w-4 h-4" /> Start with AI
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-[#e7e9ee] p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm text-[#667085]">Saved calculations</span><Calculator className="w-4 h-4 text-[#ff5a36]" /></div>
          <p className="text-3xl font-bold tracking-tight mt-3">{calculations.length}</p>
          <p className="text-xs text-[#98a2b3] mt-1">Financial models & decisions</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#e7e9ee] p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm text-[#667085]">Template orders</span><FileSpreadsheet className="w-4 h-4 text-[#3867ff]" /></div>
          <p className="text-3xl font-bold tracking-tight mt-3">{orders.length}</p>
          <p className="text-xs text-[#98a2b3] mt-1">Purchased downloads</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#e7e9ee] p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm text-[#667085]">Planning status</span><CheckCircle2 className="w-4 h-4 text-[#ff5a36]" /></div>
          <p className="text-3xl font-bold tracking-tight mt-3">Ready</p>
          <p className="text-xs text-[#98a2b3] mt-1">Pick up where you left off</p>
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-[#e7e9ee] shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#e7e9ee] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#ff5a36]">Your workspace</p>
            <h2 className="text-xl font-bold tracking-tight mt-1">Saved work & downloads</h2>
          </div>
          <div className="flex rounded-xl bg-[#f7f8fa] p-1 border border-[#e7e9ee]">
            <button onClick={() => setActiveTab('calculations')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === 'calculations' ? 'bg-white shadow-sm text-[#17191f]' : 'text-[#667085]'}`}>
              Calculations <span className="text-xs ml-1 text-[#98a2b3]">{calculations.length}</span>
            </button>
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === 'orders' ? 'bg-white shadow-sm text-[#17191f]' : 'text-[#667085]'}`}>
              Templates <span className="text-xs ml-1 text-[#98a2b3]">{orders.length}</span>
            </button>
          </div>
        </div>

        {activeTab === 'calculations' && (
          <div className="p-5 sm:p-6">
            {loading ? (
              <div className="py-14 text-center text-sm text-[#98a2b3] flex items-center justify-center gap-2"><Clock3 className="w-4 h-4 animate-pulse" /> Loading your workspace…</div>
            ) : calculations.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#fff0eb] flex items-center justify-center mx-auto"><WalletCards className="w-6 h-6 text-[#ff5a36]" /></div>
                <h3 className="font-bold text-lg mt-4">No saved calculations yet</h3>
                <p className="text-sm text-[#667085] mt-1 max-w-md mx-auto">Run a calculator and save the result. Your financial decisions will appear here.</p>
                <Link href="/tools" className="inline-flex items-center gap-2 mt-5 rounded-full bg-[#17191f] text-white px-5 py-3 text-sm font-bold hover:bg-[#ff5a36] transition-colors"><Plus className="w-4 h-4" /> Explore tools</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {calculations.map((calc) => (
                  <div key={calc.id} className="rounded-2xl border border-[#e7e9ee] p-5 hover:border-[#cfd4dc] hover:shadow-md transition-all flex flex-col justify-between min-h-[190px]">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3"><span className="rounded-full bg-[#fff0eb] px-2.5 py-1 text-[11px] font-bold text-[#d94324]">{calc.toolType}</span><span className="text-xs text-[#98a2b3]">{new Date(calc.updatedAt || calc.createdAt).toLocaleDateString()}</span></div>
                      <h3 className="font-bold text-base leading-6">{calc.title}</h3>
                      <p className="text-xs text-[#667085] mt-2">{calc.country} · {calc.currency || currency}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#e7e9ee]">
                      <Link href={`/tools/${calc.toolType.includes('calculator') ? calc.toolType : `${calc.toolType}-calculator`}`} className="text-sm font-semibold flex items-center gap-1.5 hover:text-[#ff5a36]">Open tool <ExternalLink className="w-3.5 h-3.5" /></Link>
                      <button onClick={() => handleDeleteCalculation(calc.id)} className="p-2 rounded-lg text-[#98a2b3] hover:bg-[#fff0eb] hover:text-[#d94324] transition-colors" title="Delete calculation"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-5 sm:p-6">
            {orders.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#eef2ff] flex items-center justify-center mx-auto"><FileSpreadsheet className="w-6 h-6 text-[#3867ff]" /></div>
                <h3 className="font-bold text-lg mt-4">No template purchases yet</h3>
                <p className="text-sm text-[#667085] mt-1 max-w-md mx-auto">Get a professional event template and download it directly from your workspace.</p>
                <Link href="/templates" className="inline-flex items-center gap-2 mt-5 rounded-full bg-[#17191f] text-white px-5 py-3 text-sm font-bold hover:bg-[#3867ff] transition-colors"><Plus className="w-4 h-4" /> Browse templates</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl border border-[#e7e9ee] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2"><span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[11px] font-bold text-[#3867ff]">{order.status}</span><span className="text-xs text-[#98a2b3] truncate">Ref {order.id}</span></div>
                      <h3 className="font-bold">{order.items[0]?.name || 'Event Template Bundle'}</h3>
                      <p className="text-xs text-[#667085] mt-1">Purchased {new Date(order.createdAt).toLocaleDateString()} · {order.currency} {order.totalAmount}</p>
                    </div>
                    <a href={`/api/products/download?orderId=${order.id}&key=event_master_suite.xlsx`} download className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#17191f] text-white px-5 py-3 text-sm font-bold hover:bg-[#ff5a36] transition-colors"><Download className="w-4 h-4" /> Download Excel</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
