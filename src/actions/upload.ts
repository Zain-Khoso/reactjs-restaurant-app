'use server';

import { put } from '@vercel/blob';
import { requireAdmin } from '@/utils/session';

export async function uploadImage(formData: FormData) {
  await requireAdmin();

  const file = formData.get('file') as File;

  if (!file) return { error: 'No file provided' };

  const blob = await put(`menu/${Date.now()}-${file.name}`, file, {
    access: 'public',
  });

  return { url: blob.url };
}
