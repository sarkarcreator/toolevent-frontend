import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

const posts = [
  { slug: 'how-to-create-an-event-budget', category: 'Budgeting', title: 'How to Create a Rock-Solid Event Budget (With Free Formulas & Checklist)', excerpt: 'A step-by-step masterclass in allocating venue, catering, AV production, and contingency funds without nasty surprise costs.', readTime: '6 min read' },
  { slug: 'how-much-should-i-charge-for-event-tickets', category: 'Ticketing & Profit', title: 'How Much Should You Charge for Event Tickets? The Complete Pricing Strategy', excerpt: 'Learn the mathematical formula to price your event tickets, cover all fixed fees, and guarantee your desired profit margin.', readTime: '5 min read' },
  { slug: 'dubai-wedding-budget-guide', category: 'Weddings', title: 'Dubai Wedding Budget Guide 2026: Realistic Costs in AED & Luxury Planning', excerpt: 'Everything you need to know about wedding venue fees, luxury floral arrangements, municipality taxes, and catering rates across the UAE.', readTime: '7 min read' },
  { slug: 'how-to-calculate-event-roi', category: 'Analytics', title: 'How to Calculate Event ROI & Prove Business Value to Executives', excerpt: 'Turn fuzzy event metrics into hard revenue, pipeline attribution, and cost-per-lead statistics that your CFO will love.', readTime: '6 min read' },
];

export const metadata = { title: 'Event Planning Blog' };

export default function BlogPage() {
  return (
    <div className="space-y-10 pb-10">
      <section className="relative overflow-hidden rounded-[32px] bg-[#17191f] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff5a36]/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/75"><BookOpen className="h-4 w-4 text-[#ff8b70]" /> Toolbox.Events Journal</span>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.055em] sm:text-6xl">Better event decisions, one insight at a time.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Practical guides for event budgets, ticket pricing, weddings, ROI, operations and the decisions that make events work.</p>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post, index) => (
          <article key={post.slug} className={`group rounded-[26px] border bg-white p-6 shadow-[0_12px_40px_rgba(23,25,31,.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(23,25,31,.10)] ${index === 0 ? 'border-[#ffb7a8]' : 'border-[#e7e9ee]'}`}>
            <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-[#fff0eb] px-3 py-1.5 text-[10px] font-bold text-[#d94625]">{post.category}</span><span className="text-xs text-[#98a2b3]">{post.readTime}</span></div>
            <h2 className="mt-6 text-2xl font-bold leading-tight tracking-[-0.04em]">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#667085]">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#17191f] hover:text-[#ff5a36]">Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
          </article>
        ))}
      </div>

      <section className="rounded-[26px] border border-[#e7e9ee] bg-white p-7 sm:p-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">Plan with the articles</p><h2 className="mt-1 text-2xl font-bold tracking-[-0.04em]">Turn advice into an actual event plan.</h2></div><Link href="/ai-planner" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17191f] px-5 py-3 text-sm font-bold text-white hover:bg-[#ff5a36]"><Sparkles className="h-4 w-4" />Start with AI</Link></div>
      </section>
    </div>
  );
}
