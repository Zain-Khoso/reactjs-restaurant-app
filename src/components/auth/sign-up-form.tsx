'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
// Shadcn
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Separator } from '@/components/shadcn/separator';
// Animations
import { FadeIn } from '@/components/animations';
// Typography
import { H2, Muted } from '@/components/shadcn/typography';

export function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Branding Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary px-12 gap-8">
        <FadeIn direction="right">
          <Image
            src="/brand.png"
            alt="Urban Dish"
            width={180}
            height={60}
            className="h-16 w-auto object-contain brightness-0 invert"
          />
        </FadeIn>
        <FadeIn delay={0.1} direction="right">
          <p className="text-primary-foreground/80 text-center text-lg max-w-sm leading-relaxed">
            Join Urban Dish today. Create an account to start ordering, book tables, and track your
            dining history.
          </p>
        </FadeIn>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col items-center justify-center px-6 py-16">
        <FadeIn className="w-full max-w-md flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <H2>Create an account</H2>
            <Muted>Fill in your details to get started.</Muted>
          </div>

          {/* Google OAuth */}
          <Button variant="outline" className="w-full gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <Muted className="text-xs">or continue with email</Muted>
            <Separator className="flex-1" />
          </div>

          {/* Form Fields */}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">
                <User className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Full Name
              </Label>
              <Input id="name" type="text" placeholder="John Doe" autoComplete="name" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">
                <Mail className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Email
              </Label>
              <Input id="email" type="email" placeholder="john@example.com" autoComplete="email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">
                <Lock className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm">
                <Lock className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <Button type="submit" className="w-full mt-2">
              Create Account
            </Button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
