'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useMarket } from './MarketContext';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal, login, register } = useAuth();
  const { country, currency } = useMarket();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (authModalTab === 'login') {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message || 'Login failed');
      }
    } else {
      const res = await register({ email, password, name, country, currency });
      if (!res.success) {
        setError(res.message || 'Registration failed');
      }
    }
    setLoading(false);
  };

  const handleQuickDemoLogin = async (role: 'admin' | 'user') => {
    setError(null);
    setLoading(true);
    const demoEmail = role === 'admin' ? 'admin@toolbox.events' : 'user@toolbox.events';
    const demoPw = role === 'admin' ? 'Admin123!' : 'User123!';
    const res = await login(demoEmail, demoPw);
    if (!res.success) {
      setError(res.message || 'Quick login failed');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <span className="font-bold text-slate-900 text-lg">Toolbox.Events</span>
          </div>
          <p className="text-xs text-slate-500">
            {authModalTab === 'login'
              ? 'Access your saved calculations, AI planning credits, and downloads'
              : 'Create a free account to unlock 15 AI credits/month and save custom plans'}
          </p>

          {/* Tab Selector */}
          <div className="flex p-1 mt-4 bg-slate-200/70 rounded-xl">
            <button
              onClick={() => {
                setError(null);
                openAuthModal('login');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authModalTab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setError(null);
                openAuthModal('register');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authModalTab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl">
              {error}
            </div>
          )}

          {authModalTab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-slate-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              'Processing...'
            ) : authModalTab === 'login' ? (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Create Free Account <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick Demo Logins */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-center text-xs font-medium text-slate-400 mb-2">
              Quick 1-Click Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user')}
                disabled={loading}
                className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                Demo User
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                disabled={loading}
                className="py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Admin Panel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
