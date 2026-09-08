'use client';

import React, { useState, useEffect } from 'react';
import { TemplateStore } from '@/components/store/TemplateStore';
import { ProductItem } from '@/lib/types';

export default function TemplatesPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data || []);
        }
      } catch {
        // fallback to default mock if needed
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
      ) : (
        <TemplateStore products={products} />
      )}
    </div>
  );
}
