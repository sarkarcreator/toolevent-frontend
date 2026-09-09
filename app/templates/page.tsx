'use client';

import React, { useEffect, useState } from 'react';
import { TemplateStore } from '@/components/store/TemplateStore';
import { ProductItem } from '@/lib/types';

const ORIGINAL_TEMPLATES: ProductItem[] = [
  { id: 'prod_01', slug: 'ultimate-event-budget-planner', name: 'Ultimate Event Budget Planner', category: 'Budget & Finance', description: 'Professional multi-currency Excel & Google Sheets model with dynamic contingency, vendor payment milestones, and real-time variance dashboard.', features: ['5 Multi-tab spreadsheets (Summary, Line Items, Variance, Cashflow, Invoices)', 'Built-in currency switchers for USD, AED, and GBP', 'Automatic contingency calculations and overspend alerts', 'Print-ready PDF summaries and client presentation templates'], priceUSD: 29, priceAED: 105, priceGBP: 23, badge: 'Best Seller', fileDownloadKey: 'ultimate_event_budget_planner_v2.xlsx', isActive: true, isFeatured: true },
  { id: 'prod_02', slug: 'wedding-budget-planner', name: 'Wedding Budget Planner Pro', category: 'Weddings', description: 'Comprehensive wedding budget toolkit customized for USA, UK, and UAE weddings with industry spend benchmarks and vendor payment schedules.', features: ['Over 140 pre-categorized wedding expense line items', 'Industry benchmark comparison gauges (Venue, Decor, Attire)', 'Payment due date tracker with automatic calendar alerts', 'Guest RSVP & seating budget link'], priceUSD: 39, priceAED: 140, priceGBP: 31, badge: 'Popular', fileDownloadKey: 'wedding_budget_planner_pro.xlsx', isActive: true },
  { id: 'prod_03', slug: 'corporate-event-planner', name: 'Corporate Event Planner', category: 'Corporate', description: 'Corporate-grade event management toolkit with stakeholder reporting, ROI models, RFP vendor comparison matrices, and run-of-show templates.', features: ['Executive board summary dashboard', 'Vendor RFP scoring matrix', 'Sponsorship tiered package calculator', 'Minute-by-minute master run of show'], priceUSD: 49, priceAED: 180, priceGBP: 39, badge: 'Executive', fileDownloadKey: 'corporate_event_planner_bundle.xlsx', isActive: true },
  { id: 'prod_04', slug: 'conference-planner', name: 'Conference Planner & Stage Flow', category: 'Conferences', description: 'Full scale conference planning system covering multi-track speaker management, AV production run sheets, registration logistics, and sponsor tiers.', features: ['Multi-stage agenda and speaker scheduler', 'AV technician cue sheet and teleprompter script tracker', 'Catering break and dietary distribution model', 'Sponsor booth floorplan inventory manager'], priceUSD: 49, priceAED: 180, priceGBP: 39, fileDownloadKey: 'conference_planner_toolkit.xlsx', isActive: true },
  { id: 'prod_05', slug: 'event-profit-planner', name: 'Event Profit & Ticket Yield Planner', category: 'Profit & Revenue', description: 'Advanced financial modeling tool to optimize ticket tier pricing, simulate attendance elasticity, and maximize gross profit margins.', features: ['Multi-tier ticket pricing simulator (Early Bird, GA, VIP)', 'Payment processor and platform fee deduction models', 'Break-even sensitivity curve with capacity ceilings', 'Sponsorship & Merchandise margin calculations'], priceUSD: 35, priceAED: 129, priceGBP: 28, fileDownloadKey: 'event_profit_planner.xlsx', isActive: true },
  { id: 'prod_06', slug: 'event-roi-planner', name: 'Event ROI & Value Calculator', category: 'Corporate', description: 'B2B event ROI analysis tool to calculate direct revenue, pipeline generation, customer acquisition cost (CAC), and multi-touch brand attribution.', features: ['Sales pipeline attribution formula', 'Cost per qualified lead (CPL) analytics', 'Post-event stakeholder ROI slide deck template', 'Comparative year-over-year event efficiency matrix'], priceUSD: 35, priceAED: 129, priceGBP: 28, fileDownloadKey: 'event_roi_planner.xlsx', isActive: true },
  { id: 'prod_07', slug: 'event-planning-checklist', name: 'Event Planning Master Checklist', category: 'Checklists & Ops', description: 'A comprehensive 300+ item operational timeline from 12 months out to post-event teardown, fully editable in Excel, Notion, and PDF.', features: ['Timeline segmented into 9 distinct planning phases', 'Role delegation tags and progress completion meters', 'Emergency contingency and vendor risk checklist', 'Post-event invoice and vendor reconciliation sheet'], priceUSD: 19, priceAED: 70, priceGBP: 15, fileDownloadKey: 'event_planning_checklist_master.xlsx', isActive: true },
  { id: 'prod_08', slug: 'complete-event-planning-bundle', name: 'Complete Event Planning Bundle (All 7 Planners)', category: 'Bundles', description: 'Get all 7 professional event planning tools, financial models, checklists, and templates in one complete master bundle at a 60% discount.', features: ['Includes all 7 standalone planners and toolkits', 'Lifetime updates and future template releases', 'Bonus: 50+ Event contract clause templates & vendor RFPs', 'Priority email support and setup consultation guide'], priceUSD: 99, priceAED: 360, priceGBP: 79, badge: 'Best Value (Save 60%)', fileDownloadKey: 'complete_event_planning_bundle_master.zip', isActive: true, isFeatured: true },
];

export default function TemplatesPage() {
  const [products, setProducts] = useState<ProductItem[]>(ORIGINAL_TEMPLATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) setProducts(data.data);
        }
      } catch {
        // Keep the original catalog as a safe fallback.
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
