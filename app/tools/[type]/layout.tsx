import type { Metadata } from 'next';

const siteUrl = 'https://toolbox.events';

const toolSeo: Record<string, { title: string; description: string; canonical: string }> = {
  'budget-calculator': { title: 'Event Budget Calculator', description: 'Build a realistic event budget with venue, catering, production, staffing and contingency costs.', canonical: '/tools/budget-calculator' },
  'profit-calculator': { title: 'Event Profit Margin Calculator', description: 'Calculate event revenue, costs and profit margin so you can plan pricing with confidence.', canonical: '/tools/profit-calculator' },
  'ticket-pricing': { title: 'Event Ticket Pricing Calculator', description: 'Calculate ticket prices, revenue and margins for event ticket tiers including early bird, general admission and VIP.', canonical: '/tools/ticket-pricing' },
  'break-even': { title: 'Event Break-Even Calculator', description: 'Find the number of paid tickets or attendees your event needs to cover fixed and variable costs.', canonical: '/tools/break-even' },
  'event-roi': { title: 'Event ROI Calculator', description: 'Estimate event ROI from revenue, leads, pipeline value and event costs to measure business impact.', canonical: '/tools/event-roi' },
  'dubai-wedding': { title: 'Dubai Wedding Budget Calculator', description: 'Estimate a Dubai or UAE wedding budget across venue, catering, decor, entertainment and other major costs.', canonical: '/tools/dubai-wedding' },
  'wedding-budget': { title: 'Wedding Budget Calculator', description: 'Create a practical wedding budget for venue, catering, attire, photography, decor, music and more.', canonical: '/tools/wedding-budget' },
  catering: { title: 'Event Catering Cost Calculator', description: 'Estimate catering, drinks, service fees and food costs based on your guest count and event plan.', canonical: '/tools/catering' },
  staffing: { title: 'Event Staffing Calculator', description: 'Estimate event staffing requirements, roles, headcount and labor costs for your event.', canonical: '/tools/staffing' },
  'guest-attendance': { title: 'Event Guest Attendance Calculator', description: 'Forecast event attendance and capacity from invitations, RSVP expectations and event conditions.', canonical: '/tools/guest-attendance' },
  checklist: { title: 'Event Checklist Generator', description: 'Create an organized event checklist covering planning milestones, operations and execution tasks.', canonical: '/tools/checklist' },
};

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const seo = toolSeo[type];
  if (!seo) return { robots: { index: false, follow: false } };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `${siteUrl}${seo.canonical}` },
    openGraph: { title: `${seo.title} | Toolbox.Events`, description: seo.description, url: `${siteUrl}${seo.canonical}`, type: 'website' },
  };
}

export default function ToolTypeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
