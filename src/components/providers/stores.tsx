'use client';

// Lib Imports
import { useEffect } from 'react';

// Actions
import { getDeliveryFee } from '@/actions/settings';

// Utils
import { useSession } from '@/utils/auth-client';
import { useUserStore } from '@/store/user';
import { useSettingsStore } from '@/store/settings';

export function StoresProvider() {
  const { data: session } = useSession();

  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const setDeliveryFee = useSettingsStore((s) => s.setDeliveryFee);

  useEffect(() => {
    getDeliveryFee().then(setDeliveryFee);

    if (session?.user) setUser(session.user);
    else clearUser();
  }, [session]);

  return <></>;
}
