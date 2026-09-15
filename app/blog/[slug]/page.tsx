import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const siteUrl = 'https://toolbox.events';
type Post = { category: string; title: string; excerpt: string; readTime: string; sections: { heading: string; body: string }[]; tool: { href: string; label: string }; related: { href: string; label: string }[] };

const posts: Record<string, Post> = {
  'how-to-create-an-event-budget': {
    category: 'Budgeting', title: 'How to Create a Rock-Solid Event Budget (With Free Formulas & Checklist)', excerpt: 'Allocate venue, catering, production, marketing, staffing and contingency costs before surprises appear.', readTime: '6 min read', tool: { href: '/tools/budget-calculator', label: 'Event Budget Calculator' }, related: [{ href: '/blog/how-to-calculate-event-roi', label: 'How to Calculate Event ROI' }, { href: '/tools/checklist', label: 'Master Event Checklist Generator' }], sections: [
      { heading: 'Start with seven core categories', body: 'Group your event spend into venue, catering and beverage, production and AV, decor and signage, marketing and invitations, staffing and logistics, and a contingency reserve. A clear category structure makes vendor quotes easier to compare and helps you see which costs are fixed, variable or optional.' },
      { heading: 'Separate fixed and variable costs', body: 'Fixed costs stay broadly the same as attendance changes, such as venue hire, permits and core production. Variable costs usually move with guest count, such as catering, seating materials and some staffing. Keeping these groups separate makes later attendance and break-even decisions much easier.' },
      { heading: 'Protect the budget with contingency', body: 'A 10% contingency reserve is a practical starting point for many events, but the right reserve depends on scope, supplier certainty and how close the event is. Keep it separate from normal operating spend so it remains available for scope changes, overtime, taxes and last-minute requirements.' },
      { heading: 'Turn the budget into decisions', body: 'A useful budget is more than a list of expenses. Compare the planned total with the expected attendance, revenue model and required margin. If the numbers do not work, adjust scope before signing major supplier commitments.' },
      { heading: 'Use Toolbox.Events', body: 'Run your numbers through the Event Budget Calculator, then use the result as the starting point for vendor conversations and approval decisions. For execution, pair the budget with a structured event checklist so financial decisions stay connected to the work that has to happen.' },
    ],
  },
  'how-much-should-i-charge-for-event-tickets': {
    category: 'Ticketing & Profit', title: 'How Much Should You Charge for Event Tickets? The Complete Pricing Strategy', excerpt: 'Build ticket prices around costs, desired profit and payment/platform fees instead of guessing.', readTime: '5 min read', tool: { href: '/tools/ticket-pricing', label: 'Ticket Pricing & Tier Optimizer' }, related: [{ href: '/blog/how-to-create-an-event-budget', label: 'How to Create an Event Budget' }, { href: '/tools/break-even', label: 'Break-Even Attendance Calculator' }], sections: [
      { heading: 'Start with your total event cost', body: 'Add fixed event costs such as venue, production and marketing, then estimate variable cost per attendee. Your price needs to cover the expected cost base before it can produce a reliable profit.' },
      { heading: 'The pricing math', body: 'A useful starting point is: required ticket revenue = total costs + desired profit. Divide that revenue requirement by expected paid attendance, then account for payment and platform fees. The result is a defensible minimum price rather than an arbitrary number.' },
      { heading: 'Use three ticket tiers carefully', body: 'Super Early Bird can create momentum, General Admission can carry the target price, and VIP can capture premium demand. The tiers should have clearly communicated differences in access or experience rather than simply different labels.' },
      { heading: 'Check break-even attendance', body: 'Price and attendance are connected. A lower ticket price may require a larger audience, while a higher price can reduce the number of paid attendees needed but may affect demand. Model both variables before publishing the ticket page.' },
      { heading: 'Test the result', body: 'Use the Ticket Pricing & Tier Optimizer to compare scenarios, then check the break-even attendance with the dedicated calculator. This gives you a clearer view of the minimum viable price and the attendance level needed to reach your target.' },
    ],
  },
  'dubai-wedding-budget-guide': {
    category: 'Weddings', title: 'Dubai Wedding Budget Guide 2026: Realistic Costs in AED & Luxury Planning', excerpt: 'Plan for venue commitments, catering, VAT, service charges, decor and the premium requirements common to luxury UAE weddings.', readTime: '7 min read', tool: { href: '/tools/dubai-wedding', label: 'Dubai & UAE Wedding Calculator' }, related: [{ href: '/tools/wedding-budget', label: 'Standard Wedding Budget Calculator' }, { href: '/blog/how-to-create-an-event-budget', label: 'How to Create an Event Budget' }], sections: [
      { heading: 'Start with the complete venue quote', body: 'Luxury Dubai venues can have significant minimum food and beverage commitments. Compare the complete package rather than headline venue pricing, including service charges, taxes, production requirements and any minimum-spend conditions.' },
      { heading: 'Model catering and guest count', body: 'Guest count is one of the strongest drivers of wedding cost because catering, beverages, seating and some staffing requirements scale with attendance. Build the guest estimate before locking the food and beverage budget.' },
      { heading: 'Decor and floral planning', body: 'Stage design, florals, lighting and guest-facing styling can become a major share of the budget. Separate must-have design elements from upgrades so the couple can control scope without losing the core look.' },
      { heading: 'Keep local charges visible', body: 'For a UAE wedding budget, record VAT, service charges and other applicable fees as separate lines when quotes provide them. Do not hide these costs inside a generic contingency number; visibility makes supplier comparisons more reliable.' },
      { heading: 'Build the AED plan', body: 'Use the Dubai Wedding Budget Calculator to structure the event around AED assumptions and then validate every major category with current vendor quotes. For a broader wedding plan, compare the result with the standard Wedding Budget Calculator as well.' },
    ],
  },
  'how-to-calculate-event-roi': {
    category: 'Analytics', title: 'How to Calculate Event ROI & Prove Business Value to Executives', excerpt: 'Translate event spend into direct revenue, pipeline value, customer acquisition metrics and broader business impact.', readTime: '6 min read', tool: { href: '/tools/event-roi', label: 'Corporate Event ROI Calculator' }, related: [{ href: '/blog/how-to-create-an-event-budget', label: 'How to Create an Event Budget' }, { href: '/tools/profit-calculator', label: 'Event Profit Margin Calculator' }], sections: [
      { heading: 'Start with the ROI formula', body: 'Event ROI can be expressed as net return divided by total investment, multiplied by 100. Define exactly what counts as return and investment before calculating it, otherwise two events may appear comparable while using different accounting rules.' },
      { heading: 'Separate revenue from pipeline value', body: 'Track closed revenue separately from sourced pipeline, accelerated opportunities and qualified leads. Pipeline can be useful for forecasting, but it should not automatically be treated as cash revenue.' },
      { heading: 'Measure acquisition and efficiency', body: 'Useful supporting metrics include cost per lead, cost per qualified lead, conversion rate and revenue per attendee. Keep the attribution window consistent so leadership can compare events fairly.' },
      { heading: 'Turn the analysis into a decision', body: 'A strong ROI report should answer what was invested, what value was generated, which assumptions were used and what should change next time. This turns a retrospective metric into a planning tool.' },
      { heading: 'Calculate and compare', body: 'Use the Event ROI Calculator to compare investment, value generated, cost per lead and ROI across scenarios. For a full event business case, pair the result with your event budget and profit calculations rather than relying on a single metric.' },
    ],
  },
};

export function generateStaticParams() { return Object.keys(posts).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: 'Article Not Found', robots: { index: false, follow: false } };
  const url = `${siteUrl}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: { title: `${post.title} | Toolbox.Events`, description: post.excerpt, url, type: 'article', siteName: 'Toolbox.Events' },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return <div className="py-20 text-center"><h1 className="text-3xl font-bold">Article not found</h1><Link href="/blog" className="mt-5 inline-flex text-sm font-bold text-[#ff5a36]">Back to blog</Link></div>;

  const url = `${siteUrl}/blog/${slug}`;
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, mainEntityOfPage: { '@type': 'WebPage', '@id': url }, author: { '@type': 'Organization', name: 'Toolbox.Events', url: siteUrl }, publisher: { '@type': 'Organization', name: 'Toolbox.Events', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` } }, articleSection: post.category, isPartOf: { '@type': 'Blog', name: 'Toolbox.Events Journal', url: `${siteUrl}/blog` } };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` }, { '@type': 'ListItem', position: 3, name: post.title, item: url }] };

  return (
    <article className="mx-auto max-w-4xl pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#17191f]"><ArrowLeft className="h-4 w-4" />Back to journal</Link>
      <header className="mt-8 rounded-[30px] bg-[#17191f] p-7 text-white sm:p-10 lg:p-14"><span className="rounded-full bg-[#ff5a36]/15 px-3 py-1.5 text-xs font-bold text-[#ff8b70]">{post.category}</span><h1 className="mt-6 text-4xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-6xl">{post.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/65">{post.excerpt}</p><p className="mt-6 text-xs font-semibold text-white/40">{post.readTime} · Toolbox.Events Journal</p></header>
      <div className="mx-auto max-w-3xl py-10 sm:py-14">
        {post.sections.map((section, index) => <section key={section.heading} className="mb-10"><div className="mb-3 text-xs font-bold text-[#ff5a36]">0{index + 1}</div><h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">{section.heading}</h2><p className="mt-3 text-base leading-8 text-[#475467]">{section.body}</p>{index === post.sections.length - 1 && <Link href={post.tool.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#17191f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#ff5a36]">Open {post.tool.label} <ArrowRight className="h-4 w-4" /></Link>}</section>)}
        <section className="rounded-[24px] border border-[#e7e9ee] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5a36]">Continue planning</p><div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{post.related.map((item) => <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 text-sm font-bold text-[#17191f] hover:text-[#ff5a36]">{item.label} <ArrowRight className="h-4 w-4" /></Link>)}</div><Link href="/tools" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#667085] hover:text-[#17191f]">Explore all free event tools <ArrowRight className="h-4 w-4" /></Link></section>
      </div>
    </article>
  );
}
