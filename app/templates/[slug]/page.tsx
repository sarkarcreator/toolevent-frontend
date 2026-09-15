import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = 'https://toolbox.events';

const templates = {
  'ultimate-event-budget-planner': {
    name: 'Ultimate Event Budget Planner',
    category: 'Budget & Finance',
    description: 'Practical event budget workbook with 55 editable expense rows, budget-versus-actual variance formulas, vendor/payment fields and totals.',
    features: ['55 editable expense rows across common event categories', 'Budget, actual and automatic variance formulas', 'Vendor, payment status and notes fields', 'Purchase/license sheet with the real order and customer details'],
    prices: 'USD 29 · AED 105 · GBP 23',
  },
  'wedding-budget-planner': {
    name: 'Wedding Budget Planner Pro',
    category: 'Weddings',
    description: 'Wedding budget workbook with editable event details, 90 expense rows, due dates, vendor contacts, payment status and automatic variance calculations.',
    features: ['90 editable wedding expense rows', 'Wedding or couple name, event date and guest count fields', 'Budget, actual and automatic variance formulas', 'Due date, vendor/contact and payment status fields'],
    prices: 'USD 39 · AED 140 · GBP 31',
  },
  'corporate-event-planner': {
    name: 'Corporate Event Planner',
    category: 'Corporate',
    description: 'Corporate event workbook with stakeholder planning, vendor RFP comparison and sponsorship revenue calculations using blank user-entry fields.',
    features: ['Stakeholder and deliverable planner with 35 rows', 'Vendor RFP comparison matrix with 25 rows', 'Sponsorship calculator with 12 tier rows', 'Event objective, attendance and budget fields'],
    prices: 'USD 49 · AED 180 · GBP 39',
  },
  'conference-planner': {
    name: 'Conference Planner & Stage Flow',
    category: 'Conferences',
    description: 'Conference workbook covering agenda and stage flow, speaker management, and sponsor/exhibitor tracking with blank fields ready for your event data.',
    features: ['Conference agenda and stage-flow sheet with 100 rows', 'Speaker management sheet with 50 rows', 'Sponsor and exhibitor tracker with 50 rows', 'Session, room, AV, contact and payment-status fields'],
    prices: 'USD 49 · AED 180 · GBP 39',
  },
  'event-profit-planner': {
    name: 'Event Profit & Ticket Yield Planner',
    category: 'Profit & Revenue',
    description: 'Event ticket-yield workbook for ticket tiers, expected sales and processor/platform fees, with automatic gross sales, net sales, profit and break-even calculations.',
    features: ['15 editable ticket-tier rows', 'Gross sales and net sales formulas', 'Processor/platform fee inputs', 'Estimated profit and break-even ticket calculations'],
    prices: 'USD 35 · AED 129 · GBP 28',
  },
  'event-roi-planner': {
    name: 'Event ROI & Value Calculator',
    category: 'Corporate',
    description: 'Event ROI workbook for investment, direct revenue, pipeline value, other measurable returns and qualified leads, with automatic ROI and cost-per-lead calculations.',
    features: ['Investment and measurable return inputs', 'Direct revenue and pipeline/opportunity fields', 'Automatic total return, net return and ROI calculations', 'Qualified lead and cost-per-qualified-lead calculation'],
    prices: 'USD 35 · AED 129 · GBP 28',
  },
  'event-planning-checklist': {
    name: 'Event Planning Master Checklist',
    category: 'Checklists & Operations',
    description: 'Editable event planning checklist with 320 rows across nine planning phases, including ownership, due dates, priority, status and notes.',
    features: ['320 editable checklist rows', 'Nine planning phases from strategy through post-event', 'Owner, due date, priority, status and notes fields', 'Filterable worksheet with new tasks marked Not started'],
    prices: 'USD 19 · AED 70 · GBP 15',
  },
  'complete-event-planning-bundle': {
    name: 'Complete Event Planning Bundle',
    category: 'Bundles',
    description: 'One Excel workbook containing the seven standalone Toolbox.Events planners, with blank user-entry fields and formulas instead of fabricated event data.',
    features: ['Budget, wedding, corporate and conference planning worksheets', 'Profit, ROI and master checklist worksheets', 'Blank user-entry fields with calculation formulas', 'Bundle price is about 61% below the combined standalone prices'],
    prices: 'USD 99 · AED 360 · GBP 79',
  },
} as const;

type TemplateSlug = keyof typeof templates;

export function generateStaticParams() {
  return Object.keys(templates).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = templates[slug as TemplateSlug];
  if (!template) return { title: 'Template Not Found' };
  return {
    title: `${template.name} | Toolbox.Events`,
    description: template.description,
    alternates: { canonical: `${siteUrl}/templates/${slug}` },
    openGraph: {
      title: `${template.name} | Toolbox.Events`,
      description: template.description,
      url: `${siteUrl}/templates/${slug}`,
      type: 'website',
    },
  };
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = templates[slug as TemplateSlug];

  if (!template) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Template not found</h1>
        <Link href="/templates" className="mt-6 inline-flex rounded-xl bg-[#17191f] px-5 py-3 text-sm font-bold text-white">Back to templates</Link>
      </main>
    );
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: template.name,
    description: template.description,
    category: template.category,
    brand: { '@type': 'Brand', name: 'Toolbox.Events' },
    url: `${siteUrl}/templates/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Templates', item: `${siteUrl}/templates` },
      { '@type': 'ListItem', position: 3, name: template.name, item: `${siteUrl}/templates/${slug}` },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="mx-2">/</span><Link href="/templates">Templates</Link><span className="mx-2">/</span>{template.name}
      </nav>

      <section className="mt-8 rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(23,25,31,.06)] sm:p-10">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{template.category}</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.05em] text-slate-900 sm:text-5xl">{template.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{template.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {template.features.map((feature) => (
            <div key={feature} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">{feature}</div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Current prices</p>
            <p className="mt-1 text-lg font-bold">{template.prices}</p>
          </div>
          <Link href="/templates" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100">Buy from template library</Link>
        </div>
      </section>

      <section className="mt-6 rounded-[26px] border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-slate-900">What you receive</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">After successful Stripe payment verification, Toolbox.Events generates the Excel workbook for the purchased product. The workbook does not contain invented event, vendor, attendance, spending or revenue results. Your purchased file includes your real order/customer details where applicable, while event-specific planning fields remain ready for you to enter.</p>
      </section>
    </main>
  );
}
