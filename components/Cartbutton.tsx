"use client"

import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from "lucide-react"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
type Props = {
  
  session?: boolean
};

const Cartbutton = ({session}: Props) => {
  const router = useRouter();
  

  return (
    <Button
      onClick={() => {
        if(session){

            router.push('/cart')
        }else{
            toast.warning('u have to login first!');
            router.push('/auth/login')
        }

        }
        }
      variant="outline"
      size="lg"
      className="px-4 py-2 bg-blue-300 hover:bg-blue-400 h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
    >
      <ShoppingCart className="h-6 w-6" />
    </Button>
  )
}

export default Cartbutton
