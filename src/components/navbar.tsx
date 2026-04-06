'use client';

// Lib Imports
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, Sun, Moon, ExternalLink } from 'lucide-react';
import Image from 'next/image';

// Util Imports
import { cn } from '@/utils';

// Component Imports
import { Button } from '@/components/shadcn/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/shadcn/sheet';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Creator',
    href: 'https://www.linkedin.com/in/zainkhoso',
    external: true,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/brand/icon.png"
            alt="Urban Dish"
            width={160}
            height={50}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
                {link.external && <ExternalLink className="h-3 w-3" />}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Book a Table CTA */}
          <Button asChild>
            <Link href="/reservations">Book a Table</Link>
          </Button>
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-2">
          {/* Dark Mode Toggle - visible on mobile outside sheet */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Hamburger Sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 flex flex-col">
              <div className="mb-8 mt-2"></div>

              {/* Mobile Nav Links */}
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-6',
                        pathname === link.href ? 'bg-accent text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Book a Table inside sheet */}
              <div className="mt-auto pb-4 px-6">
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <Link href="/reservations">Book a Table</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
