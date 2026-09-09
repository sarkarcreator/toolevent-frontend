import type { Metadata } from 'next';
import './globals.css';
import { MarketProvider } from '@/components/layout/MarketContext';
import { AuthProvider } from '@/components/layout/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/layout/AuthModal';

export const metadata: Metadata = {
  title: { template: '%s | Toolbox.Events', default: 'Toolbox.Events — Free Tools for Planning Better Events' },
  description: 'Free event calculators, AI planning tools, budgets, profit calculators and professional event templates for the USA, UAE and UK. Calculate. Plan. Budget. Profit. Launch.',
  keywords: ['event budget calculator','event profit calculator','wedding budget calculator','ticket price calculator','break-even calculator event','AI event planner','catering calculator','event staffing calculator','Dubai wedding budget','UK event planning tools'],
  authors: [{ name: 'Toolbox.Events' }],
  metadataBase: new URL('https://toolbox.events'),
  icons: { icon: '/favicon.png', shortcut: '/favicon.png', apple: '/favicon.png' },
  openGraph: { title: 'Toolbox.Events — Free Tools for Planning Better Events', description: 'Free event calculators, AI planning tools, budgets, profit calculators and professional event templates for the USA, UAE and UK.', url: 'https://toolbox.events', siteName: 'Toolbox.Events', locale: 'en_US', type: 'website', images: [{ url: '/logo.png', width: 96, height: 72, alt: 'Toolbox.Events logo' }] },
  twitter: { card: 'summary_large_image', title: 'Toolbox.Events — Free Tools for Planning Better Events', description: 'Free event calculators, AI planning tools, budgets, profit calculators and professional event templates for the USA, UAE and UK.', images: ['/logo.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#17191F] antialiased" suppressHydrationWarning>
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
