import { SupportedCountry, SupportedCurrency, MarketConfig } from '../types';

export const SUPPORTED_MARKETS: Record<SupportedCountry, MarketConfig> = {
  USA: {
    code: 'USA',
    name: 'United States',
    flag: '🇺🇸',
    defaultCurrency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    taxRateDefault: 8.25,
    serviceChargeDefault: 18.0,
    tippingGuideline: '15-20% standard for catering and service staff',
    popularCities: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas', 'Austin', 'San Francisco'],
  },
  UAE: {
    code: 'UAE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    defaultCurrency: 'AED',
    currencySymbol: 'AED ',
    locale: 'en-AE',
    taxRateDefault: 5.0, // 5% VAT in UAE
    serviceChargeDefault: 10.0, // 10% municipality/service in luxury venues
    tippingGuideline: '10-15% discretionary in hospitality and event venues',
    popularCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman'],
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    defaultCurrency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    taxRateDefault: 20.0, // 20% standard VAT in UK
    serviceChargeDefault: 12.5, // 12.5% standard discretionary service charge
    tippingGuideline: '10-12.5% standard discretionary service charge',
    popularCities: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Bristol', 'Glasgow'],
  },
};

export function getMarketConfig(country: SupportedCountry = 'USA'): MarketConfig {
  return SUPPORTED_MARKETS[country] || SUPPORTED_MARKETS.USA;
}

export function formatCurrency(
  amount: number,
  currency: SupportedCurrency = 'USD',
  country: SupportedCountry = 'USA'
): string {
  const market = SUPPORTED_MARKETS[country] || SUPPORTED_MARKETS.USA;
  const validAmount = isNaN(amount) || !isFinite(amount) ? 0 : amount;

  try {
    return new Intl.NumberFormat(market.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: validAmount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(validAmount);
  } catch {
    const symbol = currency === 'AED' ? 'AED ' : currency === 'GBP' ? '£' : '$';
    return `${symbol}${validAmount.toLocaleString(undefined, {
      minimumFractionDigits: validAmount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  }
}

export function formatNumber(value: number, country: SupportedCountry = 'USA'): string {
  const market = SUPPORTED_MARKETS[country] || SUPPORTED_MARKETS.USA;
  const validValue = isNaN(value) || !isFinite(value) ? 0 : value;
  return new Intl.NumberFormat(market.locale).format(validValue);
}

export function formatPercent(value: number, decimals: number = 1): string {
  const valid = isNaN(value) || !isFinite(value) ? 0 : value;
  return `${valid.toFixed(decimals)}%`;
}
