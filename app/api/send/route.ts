import EmailTemplate from '@/components/components/email-template';
import { Resend } from 'resend';
import * as React from 'react';
import { NextResponse } from 'next/server';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { testEmail, username } = body;
    

    

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [testEmail],
      subject: "Registration successfull!",
      react: EmailTemplate({ firstName : username }) as React.ReactElement,
    });
    //console.log('111', error)

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}