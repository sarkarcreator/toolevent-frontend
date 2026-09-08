'use client';

import React, { useState } from 'react';
import { useMarket } from '../layout/MarketContext';
import { useAuth } from '../layout/AuthContext';
import { ProductItem } from '@/lib/types';
import {
  FileSpreadsheet,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  X,
  CreditCard,
  Sparkles,
} from 'lucide-react';

interface TemplateStoreProps {
  products: ProductItem[];
}

export function TemplateStore({ products }: TemplateStoreProps) {
  const { country, currency, formatCurrency } = useMarket();
  const { user, openAuthModal } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'TEST_MODE' | 'STRIPE' | 'PAYPAL' | 'UAE_GATEWAY'>('TEST_MODE');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getProductPrice = (p: ProductItem) => {
    if (currency === 'AED') return p.priceAED;
    if (currency === 'GBP') return p.priceGBP;
    return p.priceUSD;
  };

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
    <div className="space-y-12 py-6">
      {/* Hero Header - Artistic Flair */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#121212] text-[#F5F2ED] text-[9px] font-black uppercase tracking-[0.25em]">
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#D44D26]" /> Enterprise Excel Toolkits
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#121212] tracking-tight">
          Master Spreadsheets & Toolkits
        </h1>
        <p className="text-xs sm:text-sm text-[#121212]/75 leading-relaxed font-medium">
          Production-tested financial models, budget tracking spreadsheets, vendor RFP matrices, and minute-by-minute run of show templates built for high-stakes events.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const price = getProductPrice(product);
          return (
            <div
              key={product.id}
              className={`bg-white border-2 transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl ${
                product.isFeatured ? 'border-[#D44D26]' : 'border-[#121212]'
              }`}
            >
              {product.isFeatured && (
                <div className="bg-[#D44D26] text-white text-center py-1 text-[9px] font-black uppercase tracking-[0.25em]">
                  ★ Best Seller • Complete Suite
                </div>
              )}

              <div className="p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.25em] bg-[#F5F2ED] border border-[#121212]/20 text-[#121212]">
                    {product.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#121212]/50 tracking-wider">Instant .xlsx</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#121212] leading-snug">{product.name}</h3>
                <p className="text-xs text-[#121212]/75 leading-relaxed font-medium">{product.description}</p>

                {/* Features List */}
                <div className="pt-3 border-t border-[#121212]/15 space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#121212]/60">
                    Included Spreadsheets & Tools:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#121212]/80 font-medium">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D44D26] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-[#F5F2ED]/70 border-t-2 border-[#121212] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-[#121212]/60 block">One-Time License</span>
                  <span className="text-2xl font-serif font-bold text-[#121212]">
                    {formatCurrency(price)}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenCheckout(product)}
                  className="px-5 py-3 bg-[#121212] hover:bg-[#D44D26] text-white text-[10px] uppercase font-black tracking-widest transition-all flex items-center gap-1.5 shadow-md"
                >
                  Buy Template <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-6 bg-white border-2 border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#121212]">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#D44D26] shrink-0" />
          <div>
            <strong className="text-[#121212] block font-serif font-bold text-sm">100% Risk-Free Satisfaction Guarantee</strong>
            <span className="text-[#121212]/75 font-medium">Compatible with Microsoft Excel 2016+, Google Sheets, Apple Numbers, and LibreOffice.</span>
          </div>
        </div>
        <span className="text-[10px] uppercase font-black tracking-widest text-[#D44D26]">Instant Digital Delivery</span>
      </div>

      {/* Checkout Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border-2 border-[#121212] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-[#121212] hover:bg-[#F5F2ED] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-[#F5F2ED] border border-[#121212] text-[#D44D26] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#121212]">Order Confirmed</h3>
                <p className="text-xs text-[#121212]/80 font-medium">
                  Thank you for your purchase. Your master template spreadsheet is ready for immediate download.
                </p>
                <div className="p-3 bg-[#F5F2ED] border border-[#121212]/15 text-xs font-mono text-[#121212]">
                  Order ID: {orderComplete.orderId}
                </div>
                <a
                  href={orderComplete.downloadUrl || `/api/products/download?orderId=${orderComplete.orderId}&key=${orderComplete.downloadKey}`}
                  download
                  className="w-full py-3.5 px-4 bg-[#D44D26] hover:bg-[#121212] text-white font-black text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 inline-flex"
                >
                  <Download className="w-4 h-4" /> Download Excel Template (.xlsx)
                </a>
              </div>
            ) : (
              <form onSubmit={handleProcessOrder} className="p-7 space-y-4">
                <div className="border-b border-[#121212]/15 pb-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D44D26]">Instant Checkout</span>
                  <h3 className="text-base font-serif font-bold text-[#121212] mt-0.5">{selectedProduct.name}</h3>
                  <div className="text-xl font-serif font-bold text-[#121212] mt-1">
                    Total: {formatCurrency(getProductPrice(selectedProduct))}
                  </div>
                </div>

                {error && (
                  <div className="p-3 text-xs font-bold text-[#D44D26] bg-[#F5F2ED] border border-[#D44D26]">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1.5">
                    Delivery Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212] mb-1.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('TEST_MODE')}
                      className={`p-3 border text-left font-medium transition-all ${
                        paymentMethod === 'TEST_MODE'
                          ? 'border-[#121212] bg-[#121212] text-white'
                          : 'border-[#121212]/20 bg-[#F5F2ED] text-[#121212]'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-[#D44D26] mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-wider block">Instant Test</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('STRIPE')}
                      className={`p-3 border text-left font-medium transition-all ${
                        paymentMethod === 'STRIPE'
                          ? 'border-[#121212] bg-[#121212] text-white'
                          : 'border-[#121212]/20 bg-[#F5F2ED] text-[#121212]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#D44D26] mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-wider block">Credit / Debit</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#D44D26] hover:bg-[#121212] text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 shadow-md"
                >
                  {loading ? 'Processing...' : `Pay ${formatCurrency(getProductPrice(selectedProduct))} & Download`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
