// app/actions/getUser.ts
'use server'

import { prisma } from '@/lib/prisma'

export async function getUserById(email: string) {
  const user = await prisma.ecomUser.findUnique({
    where: { email: email },
  })
  return user
}
