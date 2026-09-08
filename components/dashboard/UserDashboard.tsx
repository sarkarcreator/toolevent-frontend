'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../layout/AuthContext';
import { useMarket } from '../layout/MarketContext';
import {
  LayoutDashboard,
  Calculator,
  FileSpreadsheet,
  Download,
  Trash2,
  ExternalLink,
  ArrowRight,
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
        // ignore
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
      <div className="text-center py-20 space-y-5 max-w-md mx-auto bg-white p-10 border-2 border-[#121212] shadow-xl">
        <div className="w-14 h-14 bg-[#121212] text-[#F5F2ED] flex items-center justify-center mx-auto border-2 border-[#121212]">
          <LayoutDashboard className="w-7 h-7 text-[#D44D26]" />
        </div>
        <h2 className="text-2xl font-serif font-black text-[#121212] tracking-tight">Sign in to Access Your Dashboard</h2>
        <p className="text-xs text-[#121212]/70 leading-relaxed font-medium">
          Save event financial calculations, view generated AI master plans, and access your purchased Excel template downloads.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-8 py-3.5 bg-[#121212] hover:bg-[#D44D26] text-white font-black text-[10px] uppercase tracking-widest border-2 border-[#121212] shadow-md transition-all"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
              {user.subscriptionTier} Account
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              {user.email}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Welcome back, {user.name || 'Planner'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-3 bg-[#F5F2ED] border-2 border-[#121212] text-center">
            <span className="text-[9px] uppercase font-black tracking-widest text-[#121212]/60 block">AI Planning Credits</span>
            <span className="text-base font-serif font-black text-[#D44D26]">
              {user.aiCreditsRemaining} Available
            </span>
          </div>
          <Link
            href="/tools"
            className="px-5 py-3.5 bg-[#121212] hover:bg-[#D44D26] text-white text-[10px] font-black uppercase tracking-widest border-2 border-[#121212] shadow-md transition-all flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-[#D44D26]" /> New Calculation
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-[#121212] pb-2">
        <button
          onClick={() => setActiveTab('calculations')}
          className={`flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase font-black tracking-widest border-2 transition-all ${
            activeTab === 'calculations'
              ? 'bg-[#121212] text-[#F5F2ED] border-[#121212]'
              : 'bg-white text-[#121212] border-transparent hover:border-[#121212]/30'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-[#D44D26]" />
          Saved Calculations ({calculations.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase font-black tracking-widest border-2 transition-all ${
            activeTab === 'orders'
              ? 'bg-[#121212] text-[#F5F2ED] border-[#121212]'
              : 'bg-white text-[#121212] border-transparent hover:border-[#121212]/30'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#D44D26]" />
          Purchased Templates ({orders.length})
        </button>
      </div>

      {/* Tab Content: Calculations */}
      {activeTab === 'calculations' && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-xs font-mono uppercase tracking-widest text-[#121212]/40">Loading saved calculations...</div>
          ) : calculations.length === 0 ? (
            <div className="bg-white p-10 border-2 border-[#121212] shadow-xs text-center space-y-4">
              <Calculator className="w-8 h-8 text-[#121212]/30 mx-auto" />
              <h3 className="text-lg font-serif font-black text-[#121212]">No saved calculations yet</h3>
              <p className="text-xs text-[#121212]/70 max-w-sm mx-auto font-medium">
                Use any of our 10 free event calculators and click &quot;Save Plan&quot; to store your financial models here.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] hover:bg-[#D44D26] text-white text-[10px] font-black uppercase tracking-widest border-2 border-[#121212] transition-all"
              >
                Browse Calculators <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calculations.map((calc) => (
                <div
                  key={calc.id}
                  className="bg-white p-6 border-2 border-[#121212] shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#121212]/60 mb-2 border-b border-[#121212]/10 pb-1.5">
                      <span className="font-black uppercase tracking-widest text-[#D44D26]">
                        {calc.toolType}
                      </span>
                      <span className="font-mono">{new Date(calc.updatedAt || calc.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-[#121212]">{calc.title}</h4>
                    <p className="text-xs text-[#121212]/60 mt-1">
                      Country: {calc.country} • Currency: {calc.currency}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#121212]/15 flex items-center justify-between">
                    <Link
                      href={`/tools/${calc.toolType.includes('calculator') ? calc.toolType : `${calc.toolType}-calculator`}`}
                      className="text-[10px] uppercase font-black tracking-widest text-[#121212] hover:text-[#D44D26] flex items-center gap-1 transition-colors"
                    >
                      Open Tool <ExternalLink className="w-3 h-3 text-[#D44D26]" />
                    </Link>
                    <button
                      onClick={() => handleDeleteCalculation(calc.id)}
                      className="p-1.5 text-[#121212]/40 hover:text-[#D44D26] transition-colors"
                      title="Delete calculation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Orders / Templates */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-10 border-2 border-[#121212] shadow-xs text-center space-y-4">
              <FileSpreadsheet className="w-8 h-8 text-[#121212]/30 mx-auto" />
              <h3 className="text-lg font-serif font-black text-[#121212]">No template purchases found</h3>
              <p className="text-xs text-[#121212]/70 max-w-sm mx-auto font-medium">
                Explore our digital event planner templates and master spreadsheets for instant Excel downloads.
              </p>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] hover:bg-[#D44D26] text-white text-[10px] font-black uppercase tracking-widest border-2 border-[#121212] transition-all"
              >
                Visit Template Store <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 border-2 border-[#121212] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#121212] text-[#F5F2ED]">
                        {order.status}
                      </span>
                      <span className="text-[10px] text-[#121212]/50 font-mono">Ref: {order.id}</span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-[#121212]">
                      {order.items[0]?.name || 'Event Template Bundle'}
                    </h4>
                    <p className="text-xs text-[#121212]/60">
                      Purchased on {new Date(order.createdAt).toLocaleDateString()} • {order.currency} {order.totalAmount}
                    </p>
                  </div>

                  <a
                    href={`/api/products/download?orderId=${order.id}&key=event_master_suite.xlsx`}
                    download
                    className="px-5 py-3 bg-[#121212] hover:bg-[#D44D26] text-white text-[10px] font-black uppercase tracking-widest border-2 border-[#121212] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[#D44D26]" /> Download .xlsx
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
