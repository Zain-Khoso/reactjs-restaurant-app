import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';
import { UserProvider } from '@/components/providers/user-provider';
import { SettingsProvider } from '@/components/providers/settings-providers';

const Font_Geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Urban Dish',
    template: '%s | Urban Dish',
  },
  description:
    'Urban Dish — a culinary journey through bold flavours and unforgettable dining experiences.',
  icons: {
    icon: '/brand/icon.png',
    apple: '/brand/icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Urban Dish',
    title: 'Urban Dish',
    description:
      'Urban Dish — a culinary journey through bold flavours and unforgettable dining experiences.',
    images: [
      {
        url: 'https://placehold.co/1200x630',
        width: 1200,
        height: 630,
        alt: 'Urban Dish',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urban Dish',
    description:
      'Urban Dish — a culinary journey through bold flavours and unforgettable dining experiences.',
    images: ['https://placehold.co/1200x630'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Font_Geist.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <SettingsProvider>{children}</SettingsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
