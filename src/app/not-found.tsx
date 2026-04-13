import Link from 'next/link';
import { Button } from '@/components/shadcn/button';
import { H1, Lead } from '@/components/shadcn/typography';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col gap-2">
        <p className="text-8xl font-bold text-primary">404</p>
        <H1 className="text-3xl">Page not found.</H1>
        <Lead className="text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Lead>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button asChild variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild>
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    </div>
  );
}
