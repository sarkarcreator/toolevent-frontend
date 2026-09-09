'use client';

import React, { useMemo, useState } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { ProductItem } from '@/lib/types';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  Download,
  FileSpreadsheet,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

interface TemplateStoreProps {
  products: ProductItem[];
}

const categoryLabels: Record<string, string> = {
  all: 'All templates',
  financial: 'Financial',
  planning: 'Planning',
  operations: 'Operations',
  wedding: 'Weddings',
  logistics: 'Logistics',
};

export function TemplateStore({ products }: TemplateStoreProps) {
  const { currency, formatCurrency } = useMarket();
  const { user } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'TEST_MODE' | 'STRIPE' | 'PAYPAL' | 'UAE_GATEWAY'>('TEST_MODE');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const getProductPrice = (p: ProductItem) => {
    if (currency === 'AED') return p.priceAED;
    if (currency === 'GBP') return p.priceGBP;
    return p.priceUSD;
  };

  const categories = useMemo(() => {
    const found = Array.from(new Set(products.map((p) => String(p.category || '').toLowerCase()).filter(Boolean)));
    return ['all', ...found];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || String(product.category || '').toLowerCase() === category;
      const haystack = `${product.name} ${product.description} ${product.category} ${(product.features || []).join(' ')}`.toLowerCase();
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [products, query, category]);

  const handleOpenCheckout = (product: ProductItem) => {
    setSelectedProduct(product);
    setError(null);
    setOrderComplete(null);
    if (user) {
      setEmail(user.email);
      setName(user.name || '');
    }
  };

  const handleProcessOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          customerEmail: email,
          customerName: name || 'Valued Customer',
          currency,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setOrderComplete(data.data);
      } else {
        setError(data.error?.message || 'Payment processing failed');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-8">
      <section className="relative overflow-hidden rounded-[32px] bg-[#17191f] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#ff5a36]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#3867ff]/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/80">
            <FileSpreadsheet className="h-3.5 w-3.5 text-[#ff8b70]" />
            Ready-to-use event templates
          </div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-[-0.055em] sm:text-6xl">
            Stop building spreadsheets from scratch.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Professional Excel toolkits for budgets, planning, vendors, staffing and event operations. Buy once, download instantly, and get to work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
            <span className="rounded-full bg-white/8 px-3.5 py-2">Instant .xlsx delivery</span>
            <span className="rounded-full bg-white/8 px-3.5 py-2">Built for real events</span>
            <span className="rounded-full bg-white/8 px-3.5 py-2">One-time purchase</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[24px] border border-[#e7e9ee] bg-white p-4 shadow-[0_12px_40px_rgba(23,25,31,.05)] sm:p-5 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search budgets, weddings, staffing..."
            className="h-12 w-full rounded-2xl border border-[#e7e9ee] bg-[#f7f8fa] pl-11 pr-4 text-sm outline-none transition focus:border-[#ff5a36] focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <Filter className="mr-1 h-4 w-4 shrink-0 text-[#98a2b3]" />
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${
                category === item ? 'bg-[#17191f] text-white' : 'bg-[#f2f4f7] text-[#667085] hover:bg-[#e9ebef]'
              }`}
            >
              {categoryLabels[item] || item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-end justify-between gap-4 px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">Template library</p>
          <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Tools that earn their place</h2>
        </div>
        <span className="hidden rounded-full bg-[#f2f4f7] px-3 py-1.5 text-xs font-semibold text-[#667085] sm:block">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'template' : 'templates'}
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const price = getProductPrice(product);
            const featured = product.isFeatured || index === 0;
            return (
              <article
                key={product.id}
                className={`group relative flex flex-col overflow-hidden rounded-[26px] border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(23,25,31,.10)] ${featured ? 'border-[#ffb7a8] shadow-[0_12px_35px_rgba(255,90,54,.07)]' : 'border-[#e7e9ee]'}`}
              >
                {featured && (
                  <div className="flex items-center justify-between bg-[#fff0eb] px-5 py-2.5 text-[11px] font-bold text-[#d94625]">
                    <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Recommended</span>
                    <span>Most popular</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#f2f4f7] px-3 py-1.5 text-[10px] font-bold text-[#667085]">{product.category}</span>
                    <span className="text-[10px] font-semibold text-[#98a2b3]">.XLSX</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.035em]">{product.name}</h3>
                  <p className="mt-3 min-h-[66px] text-sm leading-6 text-[#667085]">{product.description}</p>

                  <div className="mt-6 border-t border-[#eef0f3] pt-5">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#98a2b3]">What’s included</p>
                    <ul className="space-y-2.5">
                      {product.features.slice(0, 5).map((feat, i) => (
                        <li key={i} className="flex gap-2.5 text-xs font-medium text-[#475467]">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[#3867ff]"><Check className="h-2.5 w-2.5" /></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-7">
                    <div className="mb-4 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-semibold text-[#98a2b3]">One-time purchase</p>
                        <p className="mt-0.5 text-2xl font-bold tracking-[-0.04em]">{formatCurrency(price)}</p>
                      </div>
                      <span className="text-xs font-semibold text-[#667085]">Instant access</span>
                    </div>
                    <button
                      onClick={() => handleOpenCheckout(product)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#17191f] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#ff5a36]"
                    >
                      Get this template <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[26px] border border-dashed border-[#d7dbe2] bg-white px-6 py-16 text-center">
          <Search className="mx-auto h-8 w-8 text-[#98a2b3]" />
          <h3 className="mt-4 text-lg font-bold">No templates found</h3>
          <p className="mt-2 text-sm text-[#667085]">Try another search or switch back to all templates.</p>
          <button onClick={() => { setQuery(''); setCategory('all'); }} className="mt-5 rounded-full bg-[#17191f] px-5 py-2.5 text-xs font-bold text-white">Show all templates</button>
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        {[
          [Zap, 'Instant delivery', 'Complete your order and download the .xlsx file immediately.'],
          [ShieldCheck, 'Built for reliability', 'Clean, practical spreadsheets designed for real event decisions.'],
          [FileSpreadsheet, 'Works with your workflow', 'Use with Microsoft Excel, Google Sheets, Numbers or LibreOffice.'],
        ].map(([Icon, title, text]) => (
          <div key={String(title)} className="rounded-[22px] border border-[#e7e9ee] bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0eb] text-[#ff5a36]"><Icon className="h-4 w-4" /></div>
            <h3 className="mt-4 text-sm font-bold">{String(title)}</h3>
            <p className="mt-1.5 text-xs leading-5 text-[#667085]">{String(text)}</p>
          </div>
        ))}
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101218]/65 p-4 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[28px] border border-white/10 bg-white shadow-2xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute right-4 top-4 z-10 rounded-full bg-[#f2f4f7] p-2 text-[#475467] hover:bg-[#e7e9ee]"><X className="h-4 w-4" /></button>
            {orderComplete ? (
              <div className="p-8 text-center sm:p-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefbf3] text-[#1d9a54]"><CheckCircle2 className="h-7 w-7" /></div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#ff5a36]">Purchase complete</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Your template is ready.</h3>
                <p className="mt-3 text-sm leading-6 text-[#667085]">Thanks for your purchase. Your Excel template is ready for immediate download.</p>
                <div className="mt-5 rounded-2xl bg-[#f7f8fa] px-4 py-3 text-xs font-medium text-[#667085]">Order ID: <span className="font-mono text-[#17191f]">{orderComplete.orderId}</span></div>
                <a href={orderComplete.downloadUrl || `/api/products/download?orderId=${orderComplete.orderId}&key=${orderComplete.downloadKey}`} download className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff5a36] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#ed4b29]"><Download className="h-4 w-4" /> Download Excel template</a>
              </div>
            ) : (
              <form onSubmit={handleProcessOrder} className="p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff5a36]">Secure checkout</p>
                <h3 className="mt-2 pr-8 text-xl font-bold tracking-[-0.035em]">{selectedProduct.name}</h3>
                <div className="mt-3 text-2xl font-bold tracking-[-0.04em]">{formatCurrency(getProductPrice(selectedProduct))}</div>

                {error && <div className="mt-5 rounded-2xl border border-[#ffc8bc] bg-[#fff5f2] p-3 text-xs font-semibold text-[#c43f20]">{error}</div>}

                <div className="mt-6 space-y-4">
                  <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#344054]">Your name</span><input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="h-12 w-full rounded-xl border border-[#dfe3e9] bg-[#f7f8fa] px-4 text-sm outline-none focus:border-[#ff5a36] focus:bg-white" /></label>
                  <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#344054]">Delivery email</span><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-[#dfe3e9] bg-[#f7f8fa] px-4 text-sm outline-none focus:border-[#ff5a36] focus:bg-white" /></label>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold text-[#344054]">Payment method</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setPaymentMethod('TEST_MODE')} className={`rounded-xl border p-3 text-left transition ${paymentMethod === 'TEST_MODE' ? 'border-[#17191f] bg-[#17191f] text-white' : 'border-[#dfe3e9] bg-white text-[#344054]'}`}><Zap className="mb-1.5 h-4 w-4 text-[#ff7b5e]" /><span className="block text-xs font-bold">Instant test</span></button>
                    <button type="button" onClick={() => setPaymentMethod('STRIPE')} className={`rounded-xl border p-3 text-left transition ${paymentMethod === 'STRIPE' ? 'border-[#17191f] bg-[#17191f] text-white' : 'border-[#dfe3e9] bg-white text-[#344054]'}`}><CreditCard className="mb-1.5 h-4 w-4 text-[#3867ff]" /><span className="block text-xs font-bold">Card payment</span></button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff5a36] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#ed4b29] disabled:opacity-50">
                  {loading ? 'Processing...' : `Pay ${formatCurrency(getProductPrice(selectedProduct))} & download`}
                </button>
                <p className="mt-3 text-center text-[11px] text-[#98a2b3]">Secure order • Instant digital delivery</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
