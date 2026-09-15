import type { MetadataRoute } from 'next';

const siteUrl = 'https://toolbox.events';

const publicRoutes = [
  '/',
  '/tools',
  '/ai-planner',
  '/templates',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookie-policy',
  '/affiliate-disclosure',
  '/affiliates',
  '/tools/budget-calculator',
  '/tools/profit-calculator',
  '/tools/ticket-pricing',
  '/tools/break-even',
  '/tools/event-roi',
  '/tools/dubai-wedding',
  '/tools/wedding-budget',
  '/tools/catering',
  '/tools/staffing',
  '/tools/guest-attendance',
  '/tools/checklist',
  '/blog/how-to-create-an-event-budget',
  '/blog/how-much-should-i-charge-for-event-tickets',
  '/blog/dubai-wedding-budget-guide',
  '/blog/how-to-calculate-event-roi',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path, index) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path.startsWith('/blog/') ? 'monthly' : index === 0 ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/tools' || path === '/ai-planner' ? 0.9 : path.startsWith('/tools/') ? 0.8 : path.startsWith('/blog/') ? 0.7 : 0.5,
  }));
}
