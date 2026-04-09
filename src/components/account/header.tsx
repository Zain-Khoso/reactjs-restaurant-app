import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Badge } from '@/components/shadcn/badge';
import { FadeIn } from '@/components/animations';
import { H2, Muted } from '@/components/shadcn/typography';

type User = {
  name: string;
  email: string;
  image?: string | null;
  role: string;
  createdAt?: Date | string;
};

export function AccountHeader({ user }: { user: User }) {
  const initials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar className="h-20 w-20 ring-2 ring-primary/20">
            <AvatarImage src={user.image ?? ''} alt={user.name} />
            <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <H2 className="text-2xl">{user.name}</H2>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <Muted>{user.email}</Muted>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
