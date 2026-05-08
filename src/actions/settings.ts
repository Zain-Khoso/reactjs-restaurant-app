'use server';

// Lib Imports
import { revalidatePath } from 'next/cache';

// Utils
import prisma from '@/utils/prisma';
import { requireAdmin } from '@/utils/session';

// DEFAULTS
const DEFAULT_DELIVERY_FEE = 250;

export async function getDeliveryFee(): Promise<number> {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: 'delivery_fee' },
    });

    return setting ? parseInt(setting.value) : DEFAULT_DELIVERY_FEE;
  } catch {
    return DEFAULT_DELIVERY_FEE;
  }
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
