'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TemplateStore } from '@/components/store/TemplateStore';
import { ProductItem } from '@/lib/types';

const detailSlugs = [
  'ultimate-event-budget-planner',
  'wedding-budget-planner',
  'corporate-event-planner',
  'conference-planner',
  'event-profit-planner',
  'event-roi-planner',
  'event-planning-checklist',
  'complete-event-planning-bundle',
] as const;

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
        <>
          <TemplateStore products={products} />
          <section className="mx-auto mt-8 max-w-6xl px-1" aria-labelledby="template-guides-heading">
            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(23,25,31,.04)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">Template guides</p>
              <h2 id="template-guides-heading" className="mt-1 text-2xl font-bold tracking-[-0.04em] text-slate-900">See exactly what each workbook contains</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Open a template detail page before purchasing to review its real worksheet structure, editable fields and current pricing.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {detailSlugs.map((slug) => {
                  const product = products.find((item) => item.slug === slug);
                  if (!product) return null;
                  return (
                    <Link key={slug} href={`/templates/${slug}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white">
                      <p className="text-sm font-bold text-slate-900">{product.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">View workbook details →</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
