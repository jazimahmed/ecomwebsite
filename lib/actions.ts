'use server'

import { signIn } from "next-auth/react";
import { prisma } from '@/lib/prisma' // Adjust path if needed
import bcrypt from 'bcrypt'
interface RegisterFormState {
    success: boolean;
    message?: string;
    email?: string;
    password?: string;
  }

// Type definition (optional but good)
interface RegisterFormState {
  success: boolean
  message?: string
}

export const register = async (_prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string


console.log(email,password,username);
  if (!email || !password || !username) {
    return { success: false, message: 'Email, Username and password are required.' }
  }

  const existingUser = await prisma.ecomUser.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { success: false, message: 'User already exists.' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.ecomUser.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })
  

  return { success: true, message: 'User registered successfully.',email, password }
}


