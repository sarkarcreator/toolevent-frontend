const siteUrl = 'https://toolbox.events';

const publicRoutes = [
  '/',
  '/tools',
  '/ai-planner',
  '/templates',
  '/resources',
  '/methodology',
  '/blog',
  '/about',
  '/contact',
  '/press-kit',
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
  '/blog/event-budget-breakdown',
  '/blog/event-ticket-pricing-strategy',
  '/blog/event-break-even-analysis',
  '/blog/event-staffing-guide',
];

export function GET() {
  const urls = publicRoutes
    .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
