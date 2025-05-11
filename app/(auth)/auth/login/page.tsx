'use client'

import React, { useState } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function LoginForm() {
    const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Login successful!");
      router.push('/');
    } else {
      //setError("Invalid username or password");
      toast.error("Login failed. Please check your credentials.");
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            login
          </button>
        </form>

        <div className="flex items-center space-x-2">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500">or</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <button
          disabled={loading}
          onClick={() => signIn('github',{ callbackUrl: '/' })}
          className="cursor-pointer w-full border-2 border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Sign in with GitHub
        </button>
        <div>{loading? ('loading...') :(null)}</div>
      </div>
    </div>
  )
}
