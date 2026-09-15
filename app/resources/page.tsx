import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl = 'https://toolbox.events';

export const metadata: Metadata = {
  title: 'Event Planning Resources & Calculators',
  description:
    'Explore practical event planning resources, free calculators, AI planning guidance and step-by-step guides for budgets, tickets, ROI, weddings and event operations.',
  alternates: { canonical: `${siteUrl}/resources` },
  openGraph: {
    title: 'Event Planning Resources & Calculators | Toolbox.Events',
    description:
      'Practical resources and free tools for planning event budgets, ticket pricing, ROI, weddings, catering, staffing and guest attendance.',
    url: `${siteUrl}/resources`,
    type: 'website',
  },
};

const calculatorGroups = [
  {
    title: 'Money & pricing',
    description: 'Make the financial decisions before committing to an event.',
    links: [
      ['Event Budget Calculator', '/tools/budget-calculator'],
      ['Event Profit Calculator', '/tools/profit-calculator'],
      ['Ticket Pricing Calculator', '/tools/ticket-pricing'],
      ['Break-Even Calculator', '/tools/break-even'],
      ['Event ROI Calculator', '/tools/event-roi'],
    ],
  },
  {
    title: 'People & operations',
    description: 'Estimate demand and turn plans into practical operating numbers.',
    links: [
      ['Guest Attendance Calculator', '/tools/guest-attendance'],
      ['Catering Calculator', '/tools/catering'],
      ['Event Staffing Calculator', '/tools/staffing'],
      ['Event Checklist Generator', '/tools/checklist'],
    ],
  },
  {
    title: 'Wedding planning',
    description: 'Plan wedding costs with dedicated calculators for common event decisions.',
    links: [
      ['Wedding Budget Calculator', '/tools/wedding-budget'],
      ['Dubai Wedding Budget Calculator', '/tools/dubai-wedding'],
      ['Dubai Event Budget Calculator', '/dubai/event-budget-calculator'],
    ],
  },
];

const guides = [
  ['How to create an event budget', '/blog/how-to-create-an-event-budget'],
  ['How much should I charge for event tickets?', '/blog/how-much-should-i-charge-for-event-tickets'],
  ['Dubai wedding budget guide', '/blog/dubai-wedding-budget-guide'],
  ['How to calculate event ROI', '/blog/how-to-calculate-event-roi'],
];

export default function ResourcesPage() {
  const resourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Event Planning Resources & Calculators',
    url: `${siteUrl}/resources`,
    description: 'Practical event planning resources, calculators and guides from Toolbox.Events.',
    isPartOf: { '@type': 'WebSite', name: 'Toolbox.Events', url: siteUrl },
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceSchema) }} />

      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.12em] text-[#ff5a36]">RESOURCE CENTER</p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-.045em] sm:text-6xl">Event planning resources that help you make the call.</h1>
        <p className="mt-6 text-lg leading-8 text-[#667085]">
          Start with the decision you need to make. Use a calculator for the numbers, read a practical guide for the method, or use the AI planner to turn an event idea into next steps.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tools" className="rounded-full bg-[#17191f] px-5 py-3 text-sm font-bold text-white">Explore all calculators</Link>
          <Link href="/ai-planner" className="rounded-full border border-[#dfe2e8] px-5 py-3 text-sm font-bold text-[#17191f]">Open AI Planner</Link>
        </div>
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-3">
        {calculatorGroups.map((group) => (
          <article key={group.title} className="rounded-[26px] border border-[#e7e9ee] bg-white p-6 shadow-[0_8px_30px_rgba(23,25,31,.04)]">
            <h2 className="text-xl font-bold tracking-tight">{group.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">{group.description}</p>
            <ul className="mt-6 space-y-3">
              {group.links.map(([label, href]) => (
                <li key={href + label}>
                  <Link href={href} className="flex items-center justify-between rounded-xl bg-[#f7f8fa] px-4 py-3 text-sm font-semibold transition hover:bg-[#fff0eb] hover:text-[#ff5a36]">
                    {label}<span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-16 rounded-[28px] bg-[#17191f] p-7 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[.12em] text-[#ff8b72]">PRACTICAL GUIDES</p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">Learn the method, then use the numbers.</h2>
        <p className="mt-3 max-w-2xl leading-7 text-white/65">These guides explain the planning decisions behind the calculators so you can use the results with context.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {guides.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold transition hover:bg-white/10">{label} <span aria-hidden="true">→</span></Link>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 sm:grid-cols-3">
        <div className="rounded-[24px] border border-[#e7e9ee] p-6"><h2 className="font-bold">Budget first</h2><p className="mt-2 text-sm leading-6 text-[#667085]">Understand fixed costs, variable costs and your available event budget before making commitments.</p></div>
        <div className="rounded-[24px] border border-[#e7e9ee] p-6"><h2 className="font-bold">Price with evidence</h2><p className="mt-2 text-sm leading-6 text-[#667085]">Connect ticket price, attendance, costs and margin instead of choosing a price in isolation.</p></div>
        <div className="rounded-[24px] border border-[#e7e9ee] p-6"><h2 className="font-bold">Turn plans into action</h2><p className="mt-2 text-sm leading-6 text-[#667085]">Use guest, catering, staffing and checklist tools to move from a plan to an operating workflow.</p></div>
      </section>
    </main>
  );
}
