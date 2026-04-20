import type { Metadata } from 'next';
import { Manrope, Fraunces } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Second Chance Tails - Dog Shelter in Hyderabad',
    template: '%s | Second Chance Tails',
  },
  description:
    'Second Chance Tails is an animal rescue shelter in Bowrampet, Hyderabad, dedicated to rescuing, protecting and rehabilitating animals in need, primarily dogs.',
  keywords: [
    'animal shelter',
    'dog shelter',
    'animal rescue',
    'Hyderabad',
    'dog adoption',
    'animal welfare',
    'NGO',
    'Bowrampet',
    'pet rescue',
  ],
  authors: [{ name: 'Second Chance Tails' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://secondchancetails.org',
    siteName: 'Second Chance Tails',
    title: 'Second Chance Tails - Animal Rescue Shelter in Hyderabad',
    description:
      'Rescuing, protecting and rehabilitating animals in need across Hyderabad, primarily dogs.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Second Chance Tails Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
