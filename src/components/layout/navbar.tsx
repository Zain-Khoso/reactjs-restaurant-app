'use client';

// Lib Imports
import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, Sun, Moon, ExternalLink, LogIn, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { CartDrawer } from '../cart/drawer';
// Add these imports
import { useSession, signOut } from '@/utils/auth-client';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';

// Util Imports
import { cn } from '@/utils';

// Component Imports
import { Button } from '@/components/shadcn/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/shadcn/sheet';
import { Separator } from '../shadcn/separator';

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
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { data: session } = useSession();
  const user = session?.user;

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
            className="h-12 w-auto object-contain"
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

        <div className="hidden md:flex items-center gap-2">
          <CartDrawer />
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.image ?? ''} alt={user.name} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                {user.role === 'ADMIN' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push('/') } })}
                  className="text-destructive focus:text-destructive gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/reservations">Book a Table</Link>
            </Button>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-2">
          <CartDrawer />
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
            <SheetContent side="right" className="w-72 flex flex-col px-6">
              {/* Nav Links */}
              <ul className="flex flex-col gap-1 mt-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        pathname === link.href ? 'bg-accent text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Logged in — Account + Admin + Sign Out */}
              {user && (
                <>
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/account"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        setOpen(false);
                        await signOut({
                          fetchOptions: { onSuccess: () => router.push('/') },
                        });
                      }}
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-accent w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}

              {/* Logged out — Sign In + Sign Up */}
              {!user && (
                <>
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </div>
                </>
              )}

              {/* Book a Table CTA — logged out only */}
              {!user && (
                <div className="mt-auto pb-4">
                  <Button asChild className="w-full" onClick={() => setOpen(false)}>
                    <Link href="/reservations">Book a Table</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
