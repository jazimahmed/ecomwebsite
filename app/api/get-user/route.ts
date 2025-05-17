// app/api/get-user/route.ts
import { NextResponse } from 'next/server';
import { getUserById } from '@/app/actions/getUser';

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await getUserById(email);
  return NextResponse.json(user);
}
