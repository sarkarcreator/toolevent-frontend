'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, Award, Zap, Building, CheckCircle2 } from 'lucide-react';

export default function AffiliatesPage() {
  const partners = [
    {
      name: 'Eventbrite',
      category: 'Ticketing & Registration',
      description: 'Global industry standard for event ticketing, reserved seating, and attendee management.',
      benefit: 'Special fee discount for new event organizers',
      link: 'https://www.eventbrite.com',
      partnerCode: 'TOOLBOX_EB',
    },
    {
      name: 'Platinumlist UAE',
      category: 'Middle East Ticketing',
      description: 'The #1 ticketing platform in the UAE, Saudi Arabia, and GCC for concerts, galas, and exhibitions.',
      benefit: 'Priority onboarding & regional payment gateway integration',
      link: 'https://platinumlist.net',
      partnerCode: 'TOOLBOX_PL',
    },
    {
      name: 'Cvent',
      category: 'Enterprise Event Management',
      description: 'Comprehensive software for corporate meetings, RFP venue sourcing, and attendee lead capture.',
      benefit: 'Complimentary demo & tailored enterprise pricing',
      link: 'https://www.cvent.com',
      partnerCode: 'TOOLBOX_CVENT',
    },
    {
      name: 'Social Tables',
      category: 'Floor Plan & 3D Diagramming',
      description: 'Cloud-based 3D event floor plan designer and banquet seating coordinator.',
      benefit: '30-day extended trial for Toolbox.Events users',
      link: 'https://www.socialtables.com',
      partnerCode: 'TOOLBOX_ST',
    },
  ];

  const handlePartnerClick = async (partnerCode: string, link: string) => {
    try {
      await fetch('/api/affiliates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerCode, partnerName: partnerCode }),
      });
    } catch {
      // ignore
    }
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-12 py-4 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Partner Ecosystem
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Recommended Event Technology Partners
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
          We partner with vetted, industry-leading platforms across ticketing, venue RFP management, and 3D diagramming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-700">
                  {partner.category}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Partner
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{partner.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{partner.description}</p>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900">
                <strong>Partner Offer:</strong> {partner.benefit}
              </div>
            </div>

            <button
              onClick={() => handlePartnerClick(partner.partnerCode, partner.link)}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              Visit Partner Portal <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-100 rounded-2xl text-xs text-slate-500 space-y-2">
        <strong className="text-slate-700 block">Affiliate Disclosure:</strong>
        <p>
          Some links on this page are partner referral links. If you purchase or register through these links, Toolbox.Events may receive an affiliate commission at no additional cost to you. We only endorse platforms tested and proven in high-stakes live productions.
        </p>
      </div>
    </div>
  );
}
