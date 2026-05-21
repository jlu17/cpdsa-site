import './globals.css';
import { Anton, Poppins } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'CPDSA — Central Park Dance Skaters Association',
  description: 'Free, open-air roller skating with live DJs in the heart of Central Park. Join us every weekend at the Skate Circle.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${poppins.variable}`}>
      <body style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
