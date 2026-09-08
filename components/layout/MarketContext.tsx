'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedCountry, SupportedCurrency, MarketConfig } from '@/lib/types';
import { SUPPORTED_MARKETS, formatCurrency as formatCurr, formatNumber as formatNum, formatPercent as formatPct } from '@/lib/market';

interface MarketContextType {
  country: SupportedCountry;
  currency: SupportedCurrency;
  market: MarketConfig;
  setCountry: (country: SupportedCountry) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  formatCurrency: (amount: number) => string;
  formatNumber: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<SupportedCountry>('USA');
  const [currency, setCurrencyState] = useState<SupportedCurrency>('USD');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCountry = localStorage.getItem('tb_country') as SupportedCountry;
        const savedCurrency = localStorage.getItem('tb_currency') as SupportedCurrency;
        if (savedCountry && SUPPORTED_MARKETS[savedCountry]) {
          setCountryState(savedCountry);
        }
        if (savedCurrency && ['USD', 'AED', 'GBP'].includes(savedCurrency)) {
          setCurrencyState(savedCurrency);
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setCountry = (newCountry: SupportedCountry) => {
    setCountryState(newCountry);
    const newMarket = SUPPORTED_MARKETS[newCountry] || SUPPORTED_MARKETS.USA;
    setCurrencyState(newMarket.defaultCurrency);
    try {
      localStorage.setItem('tb_country', newCountry);
      localStorage.setItem('tb_currency', newMarket.defaultCurrency);
    } catch {
      // ignore
    }
  };

  const setCurrency = (newCurrency: SupportedCurrency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem('tb_currency', newCurrency);
    } catch {
      // ignore
    }
  };

  const market = SUPPORTED_MARKETS[country] || SUPPORTED_MARKETS.USA;

  const formatCurrency = (amount: number) => formatCurr(amount, currency, country);
  const formatNumber = (value: number) => formatNum(value, country);
  const formatPercent = (value: number, decimals?: number) => formatPct(value, decimals);

  return (
    <MarketContext.Provider
      value={{
        country,
        currency,
        market,
        setCountry,
        setCurrency,
        formatCurrency,
        formatNumber,
        formatPercent,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
