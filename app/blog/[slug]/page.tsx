import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const posts: Record<string, { category: string; title: string; excerpt: string; readTime: string; sections: { heading: string; body: string }[] }> = {
  'how-to-create-an-event-budget': {
    category: 'Budgeting', title: 'How to Create a Rock-Solid Event Budget (With Free Formulas & Checklist)', excerpt: 'Allocate venue, catering, production, marketing, staffing and contingency costs before surprises appear.', readTime: '6 min read', sections: [
      { heading: 'Start with seven core categories', body: 'Group your event spend into venue, catering and beverage, production and AV, decor and signage, marketing and invitations, staffing and logistics, and a contingency reserve. A clear category structure makes vendor quotes easier to compare.' },
      { heading: 'Protect the budget with contingency', body: 'A 10% contingency reserve is a practical starting point for many events. Keep it separate from normal operating spend so the reserve remains available for scope changes, overtime, taxes and last-minute requirements.' },
      { heading: 'Use Toolbox.Events', body: 'Run your numbers through the Event Budget Calculator, then use the result as the starting point for vendor conversations and approval decisions.' },
    ],
  },
  'how-much-should-i-charge-for-event-tickets': {
    category: 'Ticketing & Profit', title: 'How Much Should You Charge for Event Tickets? The Complete Pricing Strategy', excerpt: 'Build ticket prices around costs, desired profit and payment/platform fees instead of guessing.', readTime: '5 min read', sections: [
      { heading: 'The pricing math', body: 'Start with cost per attendee, add desired profit per attendee and fixed fees, then account for percentage-based payment and platform fees. This gives you a defensible minimum price instead of an arbitrary number.' },
      { heading: 'Use three ticket tiers', body: 'Super Early Bird can create momentum, General Admission can carry the target price, and VIP can capture premium demand. The tiers should have clearly communicated differences in access or experience.' },
      { heading: 'Test the result', body: 'Use the Ticket Price Calculator to compare break-even, recommended and desired-profit pricing scenarios before publishing your ticket page.' },
    ],
  },
  'dubai-wedding-budget-guide': {
    category: 'Weddings', title: 'Dubai Wedding Budget Guide 2026: Realistic Costs in AED & Luxury Planning', excerpt: 'Plan for venue commitments, catering, VAT, service charges, decor and the premium requirements common to luxury UAE weddings.', readTime: '7 min read', sections: [
      { heading: 'Venue and catering commitments', body: 'Luxury Dubai venues can have significant minimum food and beverage commitments. Compare the complete package rather than headline venue pricing, including service charges, taxes and production requirements.' },
      { heading: 'Decor and floral planning', body: 'Stage design, florals, lighting and guest-facing styling can become a major share of the budget. Separate must-have design elements from upgrades so the couple can control scope without losing the core look.' },
      { heading: 'Build the AED plan', body: 'Use the Dubai Wedding Budget Calculator to structure the event around local AED assumptions and then validate every major category with current vendor quotes.' },
    ],
  },
  'how-to-calculate-event-roi': {
    category: 'Analytics', title: 'How to Calculate Event ROI & Prove Business Value to Executives', excerpt: 'Translate event spend into direct revenue, pipeline value, customer acquisition metrics and broader business impact.', readTime: '6 min read', sections: [
      { heading: 'Start with the ROI formula', body: 'Event ROI can be expressed as net return divided by total investment, multiplied by 100. For business events, define exactly what counts as direct return and what belongs in pipeline or attributed value.' },
      { heading: 'Measure the pipeline', body: 'Track sourced pipeline, accelerated opportunities and qualified leads after the event. Give every metric a consistent attribution window so leadership can compare events fairly.' },
      { heading: 'Turn the analysis into a decision', body: 'Use the Event ROI Calculator to compare investment, value generated, cost per lead and ROI multiple before presenting the next event proposal.' },
    ],
  },
};

export function generateStaticParams() { return Object.keys(posts).map((slug) => ({ slug })); }

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return <div className="py-20 text-center"><h1 className="text-3xl font-bold">Article not found</h1><Link href="/blog" className="mt-5 inline-flex text-sm font-bold text-[#ff5a36]">Back to blog</Link></div>;

  return (
    <article className="mx-auto max-w-4xl pb-12">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#17191f]"><ArrowLeft className="h-4 w-4" />Back to journal</Link>
      <header className="mt-8 rounded-[30px] bg-[#17191f] p-7 text-white sm:p-10 lg:p-14"><span className="rounded-full bg-[#ff5a36]/15 px-3 py-1.5 text-xs font-bold text-[#ff8b70]">{post.category}</span><h1 className="mt-6 text-4xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-6xl">{post.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/65">{post.excerpt}</p><p className="mt-6 text-xs font-semibold text-white/40">{post.readTime} · Toolbox.Events Journal</p></header>
      <div className="mx-auto max-w-3xl py-10 sm:py-14">
        {post.sections.map((section, index) => <section key={section.heading} className="mb-10"><div className="mb-3 text-xs font-bold text-[#ff5a36]">0{index + 1}</div><h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">{section.heading}</h2><p className="mt-3 text-base leading-8 text-[#475467]">{section.body}</p></section>)}
        <div className="rounded-[24px] border border-[#e7e9ee] bg-white p-6"><Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-[#17191f] hover:text-[#ff5a36]">Explore the free event tools <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </article>
  );
}
