import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl = 'https://toolbox.events';

export const metadata: Metadata = {
  title: 'Event Calculator Methodology | Toolbox.Events',
  description:
    'Learn how Toolbox.Events approaches event budgets, ticket pricing, break-even, profit, ROI, staffing and attendance calculations with transparent planning assumptions.',
  alternates: { canonical: `${siteUrl}/methodology` },
  openGraph: {
    title: 'Event Calculator Methodology | Toolbox.Events',
    description:
      'Transparent methodology and planning assumptions behind Toolbox.Events calculators.',
    url: `${siteUrl}/methodology`,
    type: 'article',
  },
};

const sections = [
  {
    title: 'Event budget',
    text: 'Budget planning starts by separating fixed costs from costs that change with attendance, quantities or service levels. The useful result is not simply a total; it is a view of which assumptions drive the total and where a planner can adjust the plan.',
    href: '/tools/budget-calculator',
    label: 'Open budget calculator',
  },
  {
    title: 'Ticket pricing',
    text: 'Ticket pricing should connect expected attendance, ticket revenue, event costs and the desired margin. A practical pricing model should also allow different ticket tiers when the event has early-bird, standard or premium inventory.',
    href: '/tools/ticket-pricing',
    label: 'Open ticket pricing calculator',
  },
  {
    title: 'Break-even',
    text: 'Break-even planning asks how many paid attendees or what ticket price is required for revenue to cover the relevant event costs. The result changes when fixed costs, variable cost per attendee, capacity or price changes.',
    href: '/tools/break-even',
    label: 'Open break-even calculator',
  },
  {
    title: 'Profit and ROI',
    text: 'Profit focuses on the difference between event revenue and event costs. ROI adds the relationship between the return and the investment base. These measures should be interpreted together with the assumptions used to estimate revenue and costs.',
    href: '/tools/event-roi',
    label: 'Open ROI calculator',
  },
  {
    title: 'Staffing',
    text: 'Staffing estimates depend on event size, operating areas, service requirements and the level of support needed. A calculator can provide a planning estimate, but final staffing should be reviewed against venue rules, local requirements and the actual event run-of-show.',
    href: '/tools/staffing',
    label: 'Open staffing calculator',
  },
  {
    title: 'Attendance and catering',
    text: 'Attendance planning and catering quantities are estimates rather than guarantees. Planners should account for invitations, expected attendance, service style, dietary needs, venue constraints and reasonable contingency before placing final orders.',
    href: '/tools/guest-attendance',
    label: 'Open attendance calculator',
  },
];

export default function MethodologyPage() {
  const methodologySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Event Calculator Methodology',
    description: 'Transparent methodology and planning assumptions behind Toolbox.Events calculators.',
    url: `${siteUrl}/methodology`,
    publisher: { '@type': 'Organization', name: 'Toolbox.Events', url: siteUrl },
    mainEntityOfPage: `${siteUrl}/methodology`,
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologySchema) }} />

      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.12em] text-[#ff5a36]">METHODOLOGY</p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-.045em] sm:text-6xl">How Toolbox.Events calculators approach event planning decisions.</h1>
        <p className="mt-6 text-lg leading-8 text-[#667085]">
          Toolbox.Events is designed to help planners turn event assumptions into useful planning numbers. This page explains the thinking behind the main calculator categories so results can be reviewed in context rather than treated as guaranteed outcomes.
        </p>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="rounded-[26px] border border-[#e7e9ee] bg-white p-6 shadow-[0_8px_30px_rgba(23,25,31,.04)]">
            <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#667085]">{section.text}</p>
            <Link href={section.href} className="mt-5 inline-flex rounded-full bg-[#17191f] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a2d35]">
              {section.label} →
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-[28px] bg-[#f7f8fa] p-7 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight">Important planning assumptions</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <p className="rounded-2xl bg-white p-5 text-sm leading-7 text-[#667085]"><strong className="text-[#17191f]">Estimates are not guarantees.</strong> Actual costs, attendance, sales and staffing needs can differ from a planning estimate.</p>
          <p className="rounded-2xl bg-white p-5 text-sm leading-7 text-[#667085]"><strong className="text-[#17191f]">Use current inputs.</strong> Replace assumptions with supplier quotes, venue terms, capacity limits and confirmed ticket data when available.</p>
          <p className="rounded-2xl bg-white p-5 text-sm leading-7 text-[#667085]"><strong className="text-[#17191f]">Check local requirements.</strong> Permits, taxes, insurance, safety rules and venue requirements vary by location and event type.</p>
          <p className="rounded-2xl bg-white p-5 text-sm leading-7 text-[#667085]"><strong className="text-[#17191f]">Review the whole plan.</strong> A financially attractive result can still be impractical if capacity, operations, timing or service requirements do not support it.</p>
        </div>
      </section>

      <section className="mt-14 border-t border-[#e7e9ee] pt-10">
        <h2 className="text-2xl font-bold tracking-tight">Use the methodology with the guides</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#667085]">
          For deeper planning context, combine the calculators with the Toolbox.Events guides on budgets, ticket pricing, break-even analysis and staffing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/blog/event-budget-breakdown" className="rounded-full border border-[#dfe2e8] px-4 py-2.5 text-sm font-bold">Budget breakdown</Link>
          <Link href="/blog/event-ticket-pricing-strategy" className="rounded-full border border-[#dfe2e8] px-4 py-2.5 text-sm font-bold">Ticket pricing</Link>
          <Link href="/blog/event-break-even-analysis" className="rounded-full border border-[#dfe2e8] px-4 py-2.5 text-sm font-bold">Break-even analysis</Link>
          <Link href="/blog/event-staffing-guide" className="rounded-full border border-[#dfe2e8] px-4 py-2.5 text-sm font-bold">Staffing guide</Link>
        </div>
      </section>
    </main>
  );
}
