// Lib Imports
import { headers } from 'next/headers';

// Utils
import { auth } from '@/utils/auth';

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function getUser() {
  const session = await getSession();

  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) throw new Error('Unauthorized');

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'ADMIN') throw new Error('Forbidden');

  return user;
}
