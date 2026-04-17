'use server';

import prisma from '@/utils/prisma';
import { requireAdmin } from '@/utils/session';
import { revalidatePath } from 'next/cache';

export async function getDeliveryFee(): Promise<number> {
  const setting = await prisma.settings.findUnique({
    where: { key: 'delivery_fee' },
  });
  return setting ? parseInt(setting.value) : 150;
}

export async function updateDeliveryFee(fee: number) {
  await requireAdmin();

  await prisma.settings.upsert({
    where: { key: 'delivery_fee' },
    update: { value: fee.toString() },
    create: { key: 'delivery_fee', value: fee.toString() },
  });

  revalidatePath('/order');
  revalidatePath('/admin');
  return { success: true };
}
