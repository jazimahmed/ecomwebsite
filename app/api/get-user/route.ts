import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/app/actions/getUser';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in /api/get-user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
