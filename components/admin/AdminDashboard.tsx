'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../layout/AuthContext';
import {
  Shield,
  Users,
  DollarSign,
  Calculator,
  Sparkles,
  Globe,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'orders'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes, ordersRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/users'),
          fetch('/api/admin/orders'),
        ]);

        if (statsRes.ok) {
          const s = await statsRes.json();
          setStats(s.stats);
        }
        if (usersRes.ok) {
          const u = await usersRes.json();
          setUsersList(u.data || []);
        }
        if (ordersRes.ok) {
          const o = await ordersRes.json();
          setOrdersList(o.data || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="text-center py-20 space-y-4 max-w-md mx-auto bg-white p-10 border-2 border-[#121212] shadow-xl">
        <Shield className="w-12 h-12 text-[#D44D26] mx-auto" />
        <h2 className="text-2xl font-serif font-black text-[#121212]">Admin Access Required</h2>
        <p className="text-xs text-[#121212]/70 font-medium">
          Please log in with administrator credentials (e.g. admin@toolbox.events) to view executive analytics.
        </p>
      </div>
    );
  }

  const artisticColors = ['#121212', '#D44D26', '#8C8275', '#3E3832', '#B85D38'];

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-[#121212] text-[#F5F2ED] p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#D44D26] text-white">
              Executive CMS & Analytics
            </span>
            <span className="text-[10px] uppercase font-bold text-[#F5F2ED]/60 tracking-wider">
              Toolbox.Events Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">Admin Operations Panel</h1>
        </div>

        <div className="flex items-center gap-2">
          {(['overview', 'users', 'orders'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                activeTab === tab
                  ? 'bg-[#D44D26] text-white border-[#D44D26]'
                  : 'bg-[#121212] text-[#F5F2ED]/70 border-[#F5F2ED]/20 hover:border-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
            <div className="flex items-center justify-between text-[#121212]/60 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Total Users</span>
              <Users className="w-4 h-4 text-[#D44D26]" />
            </div>
            <div className="text-3xl font-serif font-black text-[#121212]">
              {stats.totalUsers.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#D44D26] uppercase font-bold tracking-wider mt-1 block">Active across USA, UAE & UK</span>
          </div>

          <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
            <div className="flex items-center justify-between text-[#121212]/60 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-[#D44D26]" />
            </div>
            <div className="text-3xl font-serif font-black text-[#121212]">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#121212]/60 uppercase font-bold tracking-wider mt-1 block">From template downloads</span>
          </div>

          <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
            <div className="flex items-center justify-between text-[#121212]/60 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Calculations Run</span>
              <Calculator className="w-4 h-4 text-[#D44D26]" />
            </div>
            <div className="text-3xl font-serif font-black text-[#121212]">
              {stats.totalCalculations.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#D44D26] uppercase font-bold tracking-wider mt-1 block">Across 10 core tools</span>
          </div>

          <div className="bg-white p-6 border-2 border-[#121212] shadow-xs">
            <div className="flex items-center justify-between text-[#121212]/60 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">AI Operations</span>
              <Sparkles className="w-4 h-4 text-[#D44D26]" />
            </div>
            <div className="text-3xl font-serif font-black text-[#121212]">
              {stats.totalAIUsage.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#121212]/60 uppercase font-bold tracking-wider mt-1 block">Gemini Flash executions</span>
          </div>
        </div>
      )}

      {/* Overview Charts */}
      {activeTab === 'overview' && stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#D44D26]" /> Most Popular Planning Tools
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topTools} layout="vertical">
                  <XAxis type="number" stroke="#121212" fontSize={10} />
                  <YAxis type="category" dataKey="name" stroke="#121212" fontSize={10} width={130} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#121212', borderRadius: '0px', color: '#F5F2ED', border: '1px solid #D44D26', fontSize: '11px' }}
                  />
                  <Bar dataKey="count" fill="#121212" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-7 border-2 border-[#121212] shadow-xs space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#121212] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D44D26]" /> Traffic & User Market Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.marketDistribution} dataKey="percentage" nameKey="market" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                    {stats.marketDistribution.map((entry: any, i: number) => (
                      <Cell key={`m-${i}`} fill={artisticColors[i % artisticColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: any) => [`${v}%`, 'Traffic Share']}
                    contentStyle={{ backgroundColor: '#121212', borderRadius: '0px', color: '#F5F2ED', border: '1px solid #D44D26', fontSize: '11px' }}
                  />
                  <Legend formatter={(v) => <span className="text-[11px] font-medium text-[#121212]">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white border-2 border-[#121212] shadow-xs overflow-hidden">
          <div className="px-6 py-3 border-b border-[#121212] bg-[#F5F2ED] flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#121212]">Registered Users Roster</h3>
            <span className="text-[10px] font-bold text-[#121212]/70 font-mono">{usersList.length} Total Users</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121212] text-[#F5F2ED] font-black uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Market</th>
                <th className="py-3 px-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#121212]/15 text-[#121212]">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-[#F5F2ED]/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#121212]">{u.name}</div>
                    <div className="text-xs text-[#121212]/60">{u.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${u.role === 'ADMIN' ? 'bg-[#121212] text-[#F5F2ED]' : 'bg-[#F5F2ED] text-[#121212] border border-[#121212]/20'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#D44D26]">{u.subscriptionTier}</td>
                  <td className="py-3 px-4">{u.countryPreference} ({u.currencyPreference})</td>
                  <td className="py-3 px-4 text-[#121212]/60 font-mono">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white border-2 border-[#121212] shadow-xs overflow-hidden">
          <div className="px-6 py-3 border-b border-[#121212] bg-[#F5F2ED] flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#121212]">Commercial Template Orders</h3>
            <span className="text-[10px] font-bold text-[#121212]/70 font-mono">{ordersList.length} Total Orders</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121212] text-[#F5F2ED] font-black uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Gateway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#121212]/15 text-[#121212]">
              {ordersList.map((o) => (
                <tr key={o.id} className="hover:bg-[#F5F2ED]/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-[10px] text-[#121212]/60">{o.id}</td>
                  <td className="py-3 px-4 font-bold text-[#121212]">{o.customerEmail}</td>
                  <td className="py-3 px-4">{o.items[0]?.name || 'Template Bundle'}</td>
                  <td className="py-3 px-4 text-right font-serif font-black text-[#D44D26]">
                    {o.currency} {o.totalAmount}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#121212] text-[#F5F2ED]">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#121212]/60">{o.paymentProvider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
