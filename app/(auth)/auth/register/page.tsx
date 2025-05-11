'use client'

import { useActionState, useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { register } from '@/lib/actions'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';


export default function LoginForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(register, {
        success: false,
        message: '',
        email: '',
        password: ''
      })

      useEffect(()=>{
        let res = null;
        if(state.success && state.message){
          const handleauth = async()=>{
            res = await signIn("credentials", {
            email : state.email,
            password: state.password,
            redirect: false,
            
          });
          if(res?.ok){
            
            toast.success('Registration successful!');
            router.push('/');
          }else{
            
            toast.error('registered but not session created');
            
            
          }
          
        }
        handleauth();
        
        }else {
          if(state.message)
          toast.error(state.message);
        }

      },[state])

      

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-xl space-y-6">
        <form action={formAction} className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              username
            </label>
            <input
              id="username"
              type="text"
              name='username'
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name='email'
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name='password'
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>

        <div className="flex items-center space-x-2">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500">or</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <button

          disabled={isPending}
          onClick={() => signIn('github')}
          className="cursor-pointer w-full border-2 border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Sign in with GitHub
        </button>
        <div>{isPending? ('loading...') :(null)}</div>
      </div>
    </div>
  )
}
