'use client';

import * as React from 'react';
import { useSettingsStore } from '@/store/settings';
import { getDeliveryFee } from '@/actions/settings';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const setDeliveryFee = useSettingsStore((s) => s.setDeliveryFee);

  React.useEffect(() => {
    getDeliveryFee().then(setDeliveryFee);
  }, []);

  return <>{children}</>;
}
