"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { handleAddToCart } from '@/lib/actions'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useSession } from "@/context/UserContaxt";

type ProductItem = {
  id: string;
  title: string;
  price: number;
  rating: number;
  brand: string;
};

const Itemdetailsbox = ({ item }: { item: ProductItem }) => {
    const router = useRouter();
    const { session } = useSession();

    //console.log(session,'1010')
    type FormState = {
      success: boolean;
      message: string;
    };
    const formAction2 = async (prevState: FormState, formData: FormData) => {
      return await handleAddToCart(prevState, formData);
    };



    const [quantity, setQuantity] = useState(1);
    const [state, formAction1] = useActionState(formAction2, { success: false, message: '' });
    useEffect(()=>{

        if(!state.success && state.message == 'unautherized'){
          toast.warning('u have to Sign in for add to Cart');
          router.push('/auth/login')
          return;
        }

        if(state.success && state.message){
            toast.success('Item added to cart')
        }else if(!state.success && state.message){
            toast.error('Failed to add to cart!')
        }
    },[state]);

    // const handleclick = ()=>{

    // }
  return (
    <form action={formAction1} className="w-full md:w-2/6  p-4  bg-gray-50 outline rounded-sm outline-gray-300/50 ">
 
  <div className='flex flex-col gap-7 outline p-4 bg-gray-200/30 outline-gray-200'>

{/* Price */}
<p className="text-4xl font-bold text-green-600">${item.price}</p>
  <input type="hidden" name="id" value={item.id} />



  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>

  {/* Rating */}
  <div className="flex items-center space-x-1">
    <span className="text-yellow-500">★</span>
    <span className="text-lg text-gray-600">{item.rating} / 5</span>
  </div>

  {/* Brand Name */}
  <p className="text-lg text-gray-500">Brand: {item.brand}</p>

  

  {/* Quantity */}
  <div className="flex items-center space-x-2">
    <label htmlFor="quantity" className="text-lg text-gray-700">Qty:</label>
    
    <Input
      id="quantity"
      name="quantity"
      type="number"
      min={1}
      defaultValue={1}
      className="w-20"
      required
      onChange={(e) => setQuantity(Number(e.target.value))}
    />
  </div>

  {/* Add to Cart Button */}
  <div className='flex flex-row gap-5 md:gap-10'>
  
    <Button onClick={
      ()=>{if (session) {
        router.push(`/shipping/?id=${item.id}&quantity=${quantity}`);
      } else {
        toast.warn("Please Sign in to save to Cart!");
        router.push("/auth/login");
      }
    }} type="button" className="w-[100px] md:w-[200px] hover:bg-gray-800 bg-black rounded-none" size={'lg'} >
        Buy Now
    </Button>
    
  
  <Button  type="submit" className="w-[100px] md:w-[200px]" size={'lg'} variant="outline" >
    Add to Cart
  </Button>
  

  </div>
  </div>
  
</form>
  )
}

export default Itemdetailsbox
