// Lib Imports
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/providers/theme-provider';

// Assets
import './globals.css';

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
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
