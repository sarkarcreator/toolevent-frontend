'use client';

import { useMarket } from '@/components/layout/MarketContext';

export function HomeMarketBadge() {
  const { country, currency } = useMarket();
  return <span>✓ {country} · {currency}</span>;
}
