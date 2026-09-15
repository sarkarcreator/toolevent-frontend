import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { MarketProvider } from '@/components/layout/MarketContext';
import { AuthProvider } from '@/components/layout/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/layout/AuthModal';

const siteUrl = 'https://toolbox.events';
const siteTitle = 'Toolbox.Events — Free Event Planning Tools & AI Planner';
const siteDescription = 'Plan better events with free event budget, ticket pricing, profit, break-even, wedding, catering, staffing and guest calculators plus an AI event planner.';
const googleAnalyticsId = 'G-GC8RRRRKG8';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { template: '%s | Toolbox.Events', default: siteTitle },
  description: siteDescription,
  applicationName: 'Toolbox.Events',
  keywords: ['event planning tools','event budget calculator','event profit calculator','ticket price calculator','break even calculator event','AI event planner','wedding budget calculator','catering calculator','event staffing calculator','guest attendance calculator','event ROI calculator','event checklist generator'],
  authors: [{ name: 'Toolbox.Events' }],
  creator: 'Toolbox.Events',
  publisher: 'Toolbox.Events',
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/favicon.png', shortcut: '/favicon.png', apple: '/favicon.png' },
  openGraph: { title: siteTitle, description: siteDescription, url: siteUrl, siteName: 'Toolbox.Events', locale: 'en_US', type: 'website', images: [{ url: '/logo.png', width: 96, height: 72, alt: 'Toolbox.Events logo' }] },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription, images: ['/logo.png'] },
  verification: { google: '5A84C0gweZo3zHX_Kz_WKQGT-J_pYMl-U7Lu9dlCbkc' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Toolbox.Events',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: ['https://github.com/sarkarcreator/toolevent-frontend'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Toolbox.Events',
  url: siteUrl,
  description: siteDescription,
};

const applicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Toolbox.Events',
  url: siteUrl,
  description: siteDescription,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#17191F] antialiased" suppressHydrationWarning>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }} />
        <MarketProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">{children}</main>
            <Footer />
            <AuthModal />
          </AuthProvider>
        </MarketProvider>
      </body>
    </html>
  );
}
