'use client';

import { useMarket } from './MarketContext';
import { SUPPORTED_MARKETS } from '@/lib/market';
import { SupportedCountry } from '@/lib/types';
import { Globe2 } from 'lucide-react';

export function FooterMarketPicker() {
  const { country, setCountry } = useMarket();

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/50"><Globe2 className="h-4 w-4" />Your planning market</div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SUPPORTED_MARKETS) as SupportedCountry[]).map((key) => {
          const market = SUPPORTED_MARKETS[key];
          const active = country === key;
          return <button key={key} onClick={() => setCountry(key)} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${active ? 'border-[#ff5a36] bg-[#ff5a36] text-white' : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white'}`}>{market.flag} {key}</button>;
        })}
      </div>
    </div>
  );
}
