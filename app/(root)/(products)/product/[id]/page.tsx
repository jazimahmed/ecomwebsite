import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Itemdetailsbox from '@/components/Itemdetailsbox'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import { auth } from "@/auth"
import DetailPageAddress from '@/components/DetailPageAddress'


interface ProductPageProps {
  params: { id: string }
}


const page = async({ params }: ProductPageProps) => {
  const { id } = await params

  const [session, item] = await Promise.all([
    auth(),
    prisma.ecomItems.findUnique({
    where: {
      id: id, 
    },
  }),
  ]);

  //const item = await 
  if (!item) {
    return <div>Product not found.</div>
  }
    // const item =  {
    //     "title": "Essence Mascara Lash Princess #1",
    //     "brand":"Lash",
    //     "price": 9.99,
    //     "rating": 2.56,
    //     "category": "beauty",
    //     "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    //     "description":"Essence Lash Princess Mascara delivers dramatic volume and defined lashes in just one swipe. With its specially shaped conic fiber brush, this mascara lifts and separates each lash for a bold, false-lash effect — without clumping or flaking. Perfect for all-day wear, it's cruelty-free and budget-friendly, making it a favorite among beauty lovers.",
    //     "id": 1,
    //     "sold": 120
    //   }
      
  return (
    <>
   <div className="fixed top-0 left-0 w-full z-50 ">

    <Navbar search={''} session={session?true:false} />
    </div>
    <div className="flex flex-row bg-gray-50 p-4  min-h-[500px] p-[50px] pt-40">
  {/* Review Image */}
  <div className="w-2/6 flex items-center justify-center   bg-white p-2 outline rounded-sm outline-gray-300/50 ">
    <img src={item?.thumbnail} alt="Review" className="max-w-full object-contain" />
  </div>
  
  
  

  <Itemdetailsbox item ={item}/>
  


  {/* Price + Shipping */}
  <div className='w-2/6 '>
  <Card className="w-full min-h-[00px] bg-gray-50">
  <CardContent className="p-4 space-y-4 text-md text-gray-700 flex flex-col gap-5">
    {/* Dummy Address */}
    <DetailPageAddress/>
    

    {/* Cash on Delivery */}
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-green-100 text-green-700">
        Cash on Delivery
      </Badge>
      <span>Available</span>
    </div>

    {/* Return Policy */}
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
        Return Policy
      </Badge>
      <span>14 Days Easy Return</span>
    </div>

    {/* Shipping Date */}
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-blue-100 text-blue-800">
        Estimated Delivery
      </Badge>
      <span>May 18 - May 22</span>
    </div>
  </CardContent>
</Card>
  </div>
</div>
</>

  )
}

export default page
