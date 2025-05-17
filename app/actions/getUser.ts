'use server';

import { prisma } from '@/lib/prisma';

export async function getUserByEmail(email: string) {
  try {
    if (!email) {
      throw new Error('Email must be provided');
    }
    const user = await prisma.ecomUser.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('getUserByEmail error:', error);
    return null; // Or re-throw if you want API route to catch it
  }
}
