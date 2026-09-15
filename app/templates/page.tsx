'use client';

import React, { useEffect, useState } from 'react';
import { TemplateStore } from '@/components/store/TemplateStore';
import { ProductItem } from '@/lib/types';

export default function TemplatesPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.data)) {
          throw new Error(data.error?.message || 'Unable to load the template catalog.');
        }
        setProducts(data.data);
      } catch (error: any) {
        setLoadError(error?.message || 'Unable to load the template catalog.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="py-4">
      {loading ? (
        <div className="text-center py-20 text-xs text-slate-400">Loading digital template inventory...</div>
      ) : loadError ? (
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
          {loadError}
        </div>
      ) : products.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-600">
          No templates are currently available.
        </div>
      ) : (
        <TemplateStore products={products} />
      )}
    </div>
  );
}
