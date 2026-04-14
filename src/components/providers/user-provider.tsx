'use client';

import * as React from 'react';
import { useSession } from '@/utils/auth-client';
import { useUserStore } from '@/store/user';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);

  React.useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
        role: session.user.role as string,
        phone: (session.user as any).phone ?? null,
      });
    } else {
      clearUser();
    }
  }, [session]);

  return <>{children}</>;
}
