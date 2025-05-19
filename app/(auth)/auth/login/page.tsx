'use client'

import React, { useState } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice'
import ClipLoader from 'react-spinners/ClipLoader';
import { Github } from 'lucide-react';
import { loginSchema } from '@/lib/zodSchemas';
import Link from 'next/link';


export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const validation = loginSchema.safeParse({email,password});
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setFormErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      setLoading(false);
      return;
    } else {
      setFormErrors({});
      
    }

    if(validation.success){
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  
    

    if (res.ok) {try {
      
      const userRes = await fetch('/api/get-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const userinfo = await userRes.json();
      if (userinfo) {
        dispatch(setUser({
          id: userinfo.id,
          username: userinfo.username,
          email: userinfo.email,
          mobile : userinfo.mobile,
          profilePic: userinfo.profilePic,
          address: userinfo.address
        }));
        console.log(userinfo,'userinfo');
      }
      toast.success("Login successful!");
      setLoading(false);
      router.push('/');
    } catch (err) {
      console.error('Failed to fetch user:', err);
      toast.error("Failed to load user data.");

    }
    } else {
      //setError("Invalid username or password");
      toast.error("Login failed. Please check your credentials.");
    }
  }
  };



  return (
    <div className='flex flex-col md:flex-row '>
      <div className='w-full md:w-1/2 hidden md:block'><img
        src="/login.jpg"     
        alt="User Profile Picture"
                                      
      />
      </div>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full md:w-1/2">
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
              className={`mt-1 p-2 w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.email && (
              <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
            )}
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
              className={`mt-1 p-2 w-full border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.password && (
              <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {!loading? "Login": <ClipLoader color="#3b82f6"  />}
          </button>
          <label className='text-sm ml-12 mr-4'>Dont have an Account?</label><Link href='/auth/register'><label className='text-sm font-bold cursor-pointer underline '>Register</label></Link>
        
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
          <div className='flex flex-row justify-center item-center gap-4'>
            <div>Sign in with GitHub</div>
            <div><Github /></div>
          </div>
        </button>
        
      </div>
    </div>
    </div>
  )
}
