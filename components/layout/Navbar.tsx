'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarket } from './MarketContext';
import { useAuth } from './AuthContext';
import { SupportedCountry } from '@/lib/types';
import { SUPPORTED_MARKETS } from '@/lib/market';
import {
  Calculator,
  Sparkles,
  Layers,
  BookOpen,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  PlusCircle,
  FileSpreadsheet,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { country, setCountry, currency } = useMarket();
  const { user, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [marketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Calculators', href: '/tools', icon: Calculator },
    { name: 'AI Planner', href: '/ai-event-planner', icon: Sparkles, badge: 'AI' },
    { name: 'Templates', href: '/templates', icon: FileSpreadsheet },
    { name: 'Blog & Guides', href: '/blog', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F2ED]/95 backdrop-blur-md border-b border-[#121212]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - Artistic Flair */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#121212] text-[#F5F2ED] flex items-center justify-center font-serif font-black text-xl border border-[#121212] group-hover:bg-[#D44D26] transition-colors shadow-sm">
              T
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-[#121212] text-xl tracking-tight leading-none group-hover:text-[#D44D26] transition-colors">
                  TOOLBOX<span className="text-[#D44D26] italic font-medium">.EVENTS</span>
                </span>
                <span className="text-[9px] uppercase font-black tracking-[0.25em] px-2 py-0.5 bg-[#121212] text-[#F5F2ED] hidden sm:inline-block">
                  CURATED
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#121212]/50 font-bold mt-0.5 hidden sm:block">
                Financial OS & Strategic Dossiers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Ultra Tracked Editorial Style */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase font-black tracking-[0.2em] transition-all border-b-2 ${
                    isActive
                      ? 'border-[#D44D26] text-[#121212]'
                      : 'border-transparent text-[#121212]/70 hover:text-[#121212] hover:border-[#121212]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D44D26]' : 'text-[#121212]/40'}`} />
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider bg-[#D44D26] text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Market Selector + Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Global Market / Country Selector */}
            <div className="relative">
              <button
                onClick={() => setMarketDropdownOpen(!marketDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase font-black tracking-widest text-[#121212] bg-white hover:bg-[#EAE6DF] transition-all border border-[#121212]/20 shadow-xs"
                aria-label="Select country market"
              >
                <span className="text-sm leading-none">{SUPPORTED_MARKETS[country].flag}</span>
                <span>{country}</span>
                <span className="text-[#121212]/50">({currency})</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#121212]/60" />
              </button>

              {marketDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMarketDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-60 bg-white border-2 border-[#121212] py-2 z-20 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-[#121212]/50 border-b border-[#121212]/10">
                      Fiscal Region
                    </div>
                    {(Object.keys(SUPPORTED_MARKETS) as SupportedCountry[]).map((cKey) => {
                      const m = SUPPORTED_MARKETS[cKey];
                      const isSelected = country === cKey;
                      return (
                        <button
                          key={cKey}
                          onClick={() => {
                            setCountry(cKey);
                            setMarketDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between hover:bg-[#F5F2ED] transition-colors ${
                            isSelected ? 'bg-[#F5F2ED] font-black text-[#D44D26] border-l-4 border-[#D44D26]' : 'text-[#121212]'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-medium">
                            <span className="text-base">{m.flag}</span>
                            <span>{m.name}</span>
                          </div>
                          <span className="text-[#121212]/50 font-mono text-[11px] font-semibold">
                            {m.defaultCurrency} ({m.currencySymbol.trim()})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Auth State Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#EAE6DF] border border-[#121212]/20 text-[10px] uppercase font-black tracking-widest text-[#121212] transition-colors"
                >
                  <div className="w-5 h-5 bg-[#121212] text-[#F5F2ED] flex items-center justify-center text-[10px] font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name || user.email}</span>
                  {user.role === 'ADMIN' && (
                    <span className="px-1.5 py-0.5 bg-[#D44D26] text-white text-[8px] font-black uppercase">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-[#121212]/60" />
                </button>

                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-[#121212] py-2 z-20 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3 py-2 border-b border-[#121212]/10">
                        <p className="text-xs font-bold text-[#121212] truncate">{user.name || 'User'}</p>
                        <p className="text-[10px] text-[#121212]/60 truncate font-mono">{user.email}</p>
                        <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-wider bg-[#F5F2ED] text-[#121212] p-1.5 font-bold border border-[#121212]/10">
                          <span>AI Credits:</span>
                          <span className="font-black text-[#D44D26]">{user.aiCreditsRemaining} remaining</span>
                        </div>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs text-[#121212] hover:bg-[#F5F2ED] transition-colors font-bold uppercase tracking-wider"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#D44D26]" />
                        My Dashboard
                      </Link>

                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-xs text-[#D44D26] hover:bg-[#F5F2ED] transition-colors font-black uppercase tracking-wider"
                        >
                          <Shield className="w-4 h-4 text-[#D44D26]" />
                          Admin CMS Panel
                        </Link>
                      )}

                      <div className="border-t border-[#121212]/10 my-1" />

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors font-bold text-left uppercase tracking-wider"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-2 text-[10px] uppercase font-black tracking-widest text-[#121212] hover:text-[#D44D26] transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2 text-[10px] uppercase font-black tracking-widest text-[#F5F2ED] bg-[#121212] hover:bg-[#D44D26] border border-[#121212] transition-all shadow-xs"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMarketDropdownOpen(!marketDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#121212] bg-white border border-[#121212]/20"
            >
              <span>{SUPPORTED_MARKETS[country].flag}</span>
              <span>{country}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#121212] hover:bg-white border border-transparent hover:border-[#121212]/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#121212]/15 animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1 pb-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 text-xs uppercase font-black tracking-wider ${
                      isActive ? 'bg-[#121212] text-[#F5F2ED]' : 'text-[#121212] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </div>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-black bg-[#D44D26] text-white">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#121212]/10 space-y-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#121212] hover:bg-white"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#D44D26]" />
                    My Dashboard
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#D44D26] hover:bg-white"
                    >
                      <Shield className="w-4 h-4 text-[#D44D26]" />
                      Admin CMS
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3 text-center text-[10px] uppercase font-black tracking-widest text-[#121212] bg-white border border-[#121212]/20"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('register');
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3 text-center text-[10px] uppercase font-black tracking-widest text-[#F5F2ED] bg-[#121212]"
                  >
                    Sign Up Free
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
