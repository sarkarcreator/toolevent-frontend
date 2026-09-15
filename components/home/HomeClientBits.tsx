'use client';

import { useAuth } from '@/components/layout/AuthContext';
import { useMarket } from '@/components/layout/MarketContext';

export function HomeMarketInfo() {
  const { country, currency } = useMarket();

  return (
    <span>
      ✓ {country} · {currency}
    </span>
  );
}

export function HomeAccountCta() {
  const { user, openAuthModal } = useAuth();

  if (user) return null;

  return (
    <button
      onClick={() => openAuthModal('register')}
      className="mt-7 w-full rounded-full border border-[#e7e9ee] px-5 py-3 text-sm font-bold transition hover:border-[#17191f]"
    >
      Create a free account
    </button>
  );
}
