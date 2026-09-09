'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarket } from './MarketContext';
import { useAuth } from './AuthContext';
import { SupportedCountry } from '@/lib/types';
import { SUPPORTED_MARKETS } from '@/lib/market';
import { Calculator, Sparkles, FileSpreadsheet, BookOpen, LayoutDashboard, Shield, Menu, X, ChevronDown, LogOut } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { country, setCountry, currency } = useMarket();
  const { user, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [marketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Tools', href: '/tools', icon: Calculator },
    { name: 'AI Planner', href: '/ai-planner', icon: Sparkles, badge: 'AI' },
    { name: 'Templates', href: '/templates', icon: FileSpreadsheet },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  const closeMenus = () => { setMobileMenuOpen(false); setMarketDropdownOpen(false); setUserDropdownOpen(false); };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e7e9ee] bg-[#f7f8fa]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" onClick={closeMenus} className="group flex shrink-0 items-center gap-2.5">
            <Image src="/logo.png" alt="Toolbox.Events" width={44} height={44} className="h-11 w-11 rounded-xl object-cover shadow-sm transition-transform duration-200 group-hover:scale-105" priority />
            <span className="text-[19px] font-extrabold tracking-[-0.045em] text-[#17191f] sm:text-[21px]">Toolbox<span className="text-[#ff5a36]">.Events</span></span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[#e7e9ee] bg-white/80 p-1 md:flex">{navLinks.map((link) => { const Icon = link.icon; const active = pathname === link.href || pathname.startsWith(`${link.href}/`); return <Link key={link.name} href={link.href} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${active ? 'bg-[#17191f] text-white shadow-sm' : 'text-[#667085] hover:bg-[#f1f3f6] hover:text-[#17191f]'}`}><Icon className="h-4 w-4" />{link.name}{link.badge && <span className="rounded-full bg-[#ff5a36] px-1.5 py-0.5 text-[9px] font-bold text-white">{link.badge}</span>}</Link>; })}</nav>

          <div className="hidden items-center gap-2 md:flex">
            <div className="relative"><button onClick={() => setMarketDropdownOpen((v) => !v)} className="flex items-center gap-2 rounded-full border border-[#e7e9ee] bg-white px-3 py-2 text-xs font-semibold text-[#475467] transition hover:border-[#d0d5dd] hover:text-[#17191f]" aria-label="Select country market"><span className="text-base">{SUPPORTED_MARKETS[country].flag}</span><span>{country}</span><span className="text-[#98a2b3]">{currency}</span><ChevronDown className="h-3.5 w-3.5" /></button>{marketDropdownOpen && <><button className="fixed inset-0 z-10 cursor-default" onClick={() => setMarketDropdownOpen(false)} aria-label="Close market menu" /><div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border border-[#e7e9ee] bg-white p-2 shadow-xl"><p className="px-3 py-2 text-xs font-semibold text-[#98a2b3]">Planning market</p>{(Object.keys(SUPPORTED_MARKETS) as SupportedCountry[]).map((cKey) => { const market = SUPPORTED_MARKETS[cKey]; const selected = country === cKey; return <button key={cKey} onClick={() => { setCountry(cKey); setMarketDropdownOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${selected ? 'bg-[#fff0eb] text-[#e34d2b]' : 'text-[#344054] hover:bg-[#f7f8fa]'}`}><span className="flex items-center gap-2"><span>{market.flag}</span><span>{market.name}</span></span><span className="text-xs text-[#98a2b3]">{market.defaultCurrency}</span></button>; })}</div></>}</div>
            {user ? <div className="relative"><button onClick={() => setUserDropdownOpen((v) => !v)} className="flex items-center gap-2 rounded-full border border-[#e7e9ee] bg-white py-1.5 pl-1.5 pr-3 text-sm font-semibold text-[#344054] hover:border-[#d0d5dd]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef2ff] text-xs font-bold text-[#3867ff]">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span><span className="max-w-[110px] truncate">{user.name || user.email}</span><ChevronDown className="h-3.5 w-3.5 text-[#98a2b3]" /></button>{userDropdownOpen && <><button className="fixed inset-0 z-10 cursor-default" onClick={() => setUserDropdownOpen(false)} aria-label="Close user menu" /><div className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-[#e7e9ee] bg-white p-2 shadow-xl"><div className="rounded-xl bg-[#f7f8fa] p-3"><p className="truncate text-sm font-bold text-[#17191f]">{user.name || 'User'}</p><p className="truncate text-xs text-[#667085]">{user.email}</p><p className="mt-2 text-xs font-semibold text-[#ff5a36]">{user.aiCreditsRemaining} AI credits remaining</p></div><Link href="/dashboard" onClick={() => setUserDropdownOpen(false)} className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#344054] hover:bg-[#f7f8fa]"><LayoutDashboard className="h-4 w-4" />Dashboard</Link>{user.role === 'ADMIN' && <Link href="/admin" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#3867ff] hover:bg-[#eef2ff]"><Shield className="h-4 w-4" />Admin panel</Link>}<button onClick={() => { logout(); setUserDropdownOpen(false); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" />Sign out</button></div></>}</div> : <><button onClick={() => openAuthModal('login')} className="rounded-full px-4 py-2 text-sm font-semibold text-[#475467] hover:bg-white hover:text-[#17191f]">Sign in</button><button onClick={() => openAuthModal('register')} className="rounded-full bg-[#ff5a36] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ed4b29] hover:shadow-lg">Get started</button></>}
          </div>

          <div className="flex items-center gap-2 md:hidden"><button onClick={() => setMobileMenuOpen((v) => !v)} className="rounded-xl border border-[#e7e9ee] bg-white p-2.5 text-[#17191f]" aria-label="Toggle menu">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div>
        </div>

        {mobileMenuOpen && <div className="border-t border-[#e7e9ee] py-4 md:hidden"><nav className="space-y-1">{navLinks.map((link) => { const Icon = link.icon; const active = pathname === link.href || pathname.startsWith(`${link.href}/`); return <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${active ? 'bg-[#17191f] text-white' : 'text-[#344054] hover:bg-white'}`}><span className="flex items-center gap-3"><Icon className="h-4 w-4" />{link.name}</span>{link.badge && <span className="rounded-full bg-[#ff5a36] px-2 py-0.5 text-[9px] font-bold text-white">AI</span>}</Link>; })}</nav><div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#e7e9ee] pt-4">{user ? <><Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#344054]">Dashboard</Link><button onClick={() => { logout(); setMobileMenuOpen(false); }} className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">Sign out</button></> : <><button onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#344054]">Sign in</button><button onClick={() => { openAuthModal('register'); setMobileMenuOpen(false); }} className="rounded-xl bg-[#ff5a36] px-4 py-3 text-sm font-bold text-white">Get started</button></>}</div></div>}
      </div>
    </header>
  );
}
