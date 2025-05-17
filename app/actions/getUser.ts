// app/actions/getUser.ts
'use server'

import { prisma } from '@/lib/prisma'

export async function getUserById(userId: string) {
  const user = await prisma.ecomUser.findUnique({
    where: { email: userId },
  })
  return user
}
