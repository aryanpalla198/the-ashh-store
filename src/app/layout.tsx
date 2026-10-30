import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'The Ashh Store | Official Pop Culture Merchandise & Fashion Apparel',
  description:
    "India's coolest pop culture apparel brand. Official Marvel, Anime, Naruto, DC Comics, Oversized T-Shirts, Winter Hoodies, Tactical Cargo Joggers and Supima basics.",
  keywords: [
    'The Ashh Store',
    'The Souled Store',
    'Oversized T-Shirts',
    'Anime Merchandise India',
    'Marvel Hoodies',
    'Cargo Joggers',
    'Naruto T-Shirts',
    'Supima Cotton',
  ],
  authors: [{ name: 'The Ashh Store Team' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'The Ashh Store | Official Pop Culture Merchandise',
    description: 'Shop official anime, superhero, and streetwear apparel with express delivery across India.',
    url: 'https://theashhstore.com',
    siteName: 'The Ashh Store',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'The Ashh Store Hero Drops',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'OnlineStore',
              name: 'The Ashh Store',
              url: 'https://theashhstore.com',
              logo: 'https://theashhstore.com/logo.svg',
              description: 'Official Pop Culture Merchandise & Streetwear Fashion Apparel',
              priceRange: '₹499 - ₹2999',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mumbai',
                addressRegion: 'Maharashtra',
                postalCode: '400051',
                addressCountry: 'IN',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <CartDrawer />
              <BottomNav />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
