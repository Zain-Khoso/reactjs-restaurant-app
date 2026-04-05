// Lib Imports
import type { Metadata } from 'next';

import { Geist } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';

// Asset Imports
import './globals.css';

// Component Imports
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

// Fot Setup
const Font_Geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

// Metadata Setup
export const metadata: Metadata = {
  title: {
    default: 'Urban Dish',
    template: '%s | Urban Dish',
  },
  description:
    'Urban Dish — a culinary journey through bold flavours and unforgettable dining experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Font_Geist.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
