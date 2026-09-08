'use client';

import React from 'react';
import Link from 'next/link';
import { useMarket } from './MarketContext';
import { SUPPORTED_MARKETS } from '@/lib/market';
import { SupportedCountry } from '@/lib/types';
import { ShieldCheck, Heart, ExternalLink, Globe, Sparkles } from 'lucide-react';

export function Footer() {
  const { country, setCountry, currency } = useMarket();

  const toolLinks = [
    { name: 'Event Budget Calculator', href: '/tools/event-budget-calculator' },
    { name: 'Event Profit Calculator', href: '/tools/event-profit-calculator' },
    { name: 'Ticket Price Calculator', href: '/tools/ticket-price-calculator' },
    { name: 'Break-Even Calculator', href: '/tools/break-even-calculator' },
    { name: 'Event ROI Calculator', href: '/tools/event-roi-calculator' },
    { name: 'Wedding Budget Calculator', href: '/tools/wedding-budget-calculator' },
    { name: 'Catering Cost Calculator', href: '/tools/catering-calculator' },
    { name: 'Event Staffing Calculator', href: '/tools/event-staffing-calculator' },
    { name: 'Guest RSVP Calculator', href: '/tools/guest-calculator' },
    { name: 'Event Checklist Generator', href: '/tools/event-checklist-generator' },
  ];

  const regionalLinks = [
    { name: 'Dubai Wedding Budget Guide', href: '/uae/dubai-wedding-budget-calculator' },
    { name: 'Dubai Event Budget Calculator', href: '/uae/dubai-event-budget-calculator' },
    { name: 'UK Wedding Budget Calculator', href: '/uk/wedding-budget-calculator' },
    { name: 'USA Wedding Budget Calculator', href: '/us/wedding-budget-calculator' },
    { name: 'UAE Event Budget Calculator', href: '/uae/event-budget-calculator' },
  ];

  return (
    <footer className="bg-[#121212] text-[#F5F2ED] pt-16 pb-12 border-t-2 border-[#121212] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/15">
          {/* Col 1: Brand & Market Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#D44D26] text-white flex items-center justify-center font-serif font-black text-lg">
                T
              </div>
              <span className="font-serif font-black text-[#F5F2ED] text-2xl tracking-tight">
                TOOLBOX<span className="text-[#D44D26] italic">.EVENTS</span>
              </span>
            </Link>
            <p className="text-xs text-[#F5F2ED]/70 max-w-sm leading-relaxed font-medium">
              Curated financial modeling engines, event ROI simulations, and Gemini AI master dossiers for producers, event directors, and wedding planners worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] uppercase tracking-widest text-[#F5F2ED]/50 flex items-center gap-1 font-bold">
                <Globe className="w-3.5 h-3.5 text-[#D44D26]" /> Active Market:
              </span>
              {(Object.keys(SUPPORTED_MARKETS) as SupportedCountry[]).map((cKey) => {
                const isSelected = country === cKey;
                const m = SUPPORTED_MARKETS[cKey];
                return (
                  <button
                    key={cKey}
                    onClick={() => setCountry(cKey)}
                    className={`px-3 py-1 text-[10px] uppercase font-black tracking-widest transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#D44D26] text-white border-[#D44D26]'
                        : 'bg-white/5 text-[#F5F2ED]/70 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span>{m.flag}</span>
                    <span>{cKey}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Col 2: Free Calculators */}
          <div>
            <h3 className="text-[10px] uppercase font-black tracking-[0.25em] text-[#D44D26] mb-4">
              Financial Models
            </h3>
            <ul className="space-y-2.5 text-xs">
              {toolLinks.slice(0, 5).map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="text-[#F5F2ED]/70 hover:text-white hover:underline transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Operational Tools */}
          <div>
            <h3 className="text-[10px] uppercase font-black tracking-[0.25em] text-[#D44D26] mb-4">
              Operations & Logistics
            </h3>
            <ul className="space-y-2.5 text-xs">
              {toolLinks.slice(5).map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="text-[#F5F2ED]/70 hover:text-white hover:underline transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/ai-planner"
                  className="inline-flex items-center gap-1.5 text-[#D44D26] hover:text-[#D44D26]/80 text-xs font-black uppercase tracking-wider"
                >
                  <Sparkles className="w-3.5 h-3.5" /> AI Event Planner →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional & Resources */}
          <div>
            <h3 className="text-[10px] uppercase font-black tracking-[0.25em] text-[#D44D26] mb-4">
              Regional Editions
            </h3>
            <ul className="space-y-2.5 text-xs">
              {regionalLinks.map((r) => (
                <li key={r.name}>
                  <Link href={r.href} className="text-[#F5F2ED]/70 hover:text-white hover:underline transition-colors">
                    {r.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/templates" className="text-[#D44D26] hover:text-[#D44D26]/80 text-xs font-black uppercase tracking-wider">
                  Template Store →
                </Link>
              </li>
              <li>
                <Link href="/api/docs" className="text-[#F5F2ED]/70 hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Estimates & Disclaimer */}
        <div className="py-6 border-b border-white/10 space-y-2 text-[10px] uppercase tracking-wider text-[#F5F2ED]/50 leading-relaxed">
          <p>
            <strong className="text-[#F5F2ED]/90">Estimates Disclaimer:</strong> Toolbox.Events provides financial forecasts for planning and budget calibration. Actual costs are subject to individual vendor quotes, seasonality, local taxation, and contract scope.
          </p>
          <p>
            <strong className="text-[#F5F2ED]/90">Editorial Transparency:</strong> We may earn an affiliate commission on select vendor and software links, at zero additional cost to you.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-[#F5F2ED]/60 font-medium">
          <p>© {new Date().getFullYear()} TOOLBOX.EVENTS — ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">
              Disclosure
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
