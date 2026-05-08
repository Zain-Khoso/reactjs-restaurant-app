'use client';

// Lib Imports
import { useState, useEffect, ComponentProps } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Types
type Props = ComponentProps<typeof NextThemesProvider>;

// Theme provider setup component
export function ThemeProvider({ children, ...props }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const originalError = console.error;

    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
        return;
      }
      originalError(...args);
    };

    setMounted(true);

    return () => {
      console.error = originalError;
    };
  }, []);

  if (!mounted) return <>{children}</>;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
