'use client'

import { useActionState, useEffect, useState,startTransition } from 'react'
import { signIn } from 'next-auth/react'
import { register, sendWelcomeEmail } from '@/lib/actions'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { Github } from 'lucide-react';
import { registerSchema } from '@/lib/zodSchemas'
import Link from 'next/link';



export default function LoginForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleClick(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 

    const form = document.querySelector("form");
    if (!(form instanceof HTMLFormElement)) return;
    const formData = new FormData(form);
      
  
    const data = {
      username: formData.get("username")?.toString() || '',
      email: formData.get("email")?.toString() || '',
      password: formData.get("password")?.toString() || '',
      mobile: formData.get("mobile")?.toString() || '',
      address: formData.get("address")?.toString() || '',
    };
  
    const result = registerSchema.safeParse(data);
    //console.log('clicked',result)


    if (!result.success) {


      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors); 
      return;
    }
  
    
    
  
    setErrors({});

    try {
      const res = await sendWelcomeEmail(data.email, data.username);
      //console.log('111', res)
  
      if (!res.data?.id) {
        toast.error("Failed to send welcome email. Please try later.");
        return; 
      }
    } catch (err) {
      console.error("Email send failed", err);
      toast.error("Failed to send welcome email. Please try again.");
      return;  
    }



    startTransition(() => {
      formAction(formData);
    });
  }


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
    <div  className='flex flex-col md:flex-row'>
    <div className='w-full md:w-1/2 hidden md:block'><img
        src="/login.jpg"     
        alt="User Profile Picture"
                                      
      />
      </div>
    <div className="flex justify-center items-center max-h-screen bg-gray-100 w-full md:w-1/2 pt-20">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-xl space-y-6">
        <form onSubmit={handleClick} className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              id="mobile"
              type="text"
              name="mobile"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile[0]}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
          </div>

          <button
            
            type="submit"
            disabled={isPending}
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
             {!isPending? "Register": <ClipLoader color="#3b82f6"  />}
          </button>
          <label className='text-sm ml-12 mr-4'>Already have an Account?</label><Link href='/auth/login'><label className='text-sm font-bold cursor-pointer underline '>Login</label></Link>
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
