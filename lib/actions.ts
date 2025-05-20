'use server'
import { auth } from '@/auth';
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
  const mobile = formData.get('mobile') as string
  const address = formData.get('address') as string


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
      mobile,
      address
    },
  })
  
  
  

  return { success: true, message: 'User registered successfully.',email, password }
}

export type CartFormState = {
  success: boolean;
  message: string;
};

export async function handleAddToCart(prevState: CartFormState, formData: FormData) {
  const session = await auth();
  
  if (!session) {
    return { success: false, message: 'unautherized' }
  }
  const id = formData.get('id') as string
  const quantityStr = formData.get('quantity') as string  

  if (!id || !quantityStr) {
    return { success: false, message: 'Missing item or quantity' }
  }

  const quantity = parseInt(quantityStr, 10)  

  if (isNaN(quantity)) {
    return { success: false, message: 'Invalid quantity' }
  }

  await prisma.ecomCart.create({
    data: {
      prodId: id,
      quantity,
      userEmail: session?.user?.email as string,
    },
  })

  return { success: true, message: `Added ${quantity} item(s) to cart!` }
}

type UserData = {
  id?: string;
    profilePic?: string;
    username: string;
    email: string;
    mobile?: string;
    address?: string;
};

export async function updateUser(data: UserData) {
  return await prisma.ecomUser.update({
    where: { id: data.id },
    data: {
      username: data.username,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
    },
  });
}

// utils/sendEmail.ts
export async function sendWelcomeEmail(email: string, username: string) {
  console.log('registered users email address', email);

  //You can only send testing emails to your own email address (your resend account email address). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain 

  const testEmail = process.env.RESEND_TEST_EMAIL;

  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ testEmail, username }),
  });
  

  const result = await res.json();
  if (!res.ok) {
    const errorMessage =
      typeof result.error === 'string'
        ? result.error
        : result.message || 'Failed to send email';
    throw new Error(errorMessage);
  }
  return result;
}

