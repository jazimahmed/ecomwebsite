import Address from '@/components/Address';
import Navbar from '@/components/Navbar';
import Paybutton from '@/components/Paybutton';
import { prisma } from '@/lib/prisma';
import React from 'react';
type Props = {
  searchParams: {
    id?: string;
    quantity?: string;
  };
};


const page = async ({ searchParams }: Props) => {

  let discount = 0;
  let delivery = 0;

  const id =  searchParams?.id || '';
  const quantity =  searchParams?.quantity || '';

  const item = await prisma.ecomItems.findUnique({
    where: { id },
  });

  if (!item) return <div>Product not found.</div>;
  
  // const item =  {
  //   "title": "Essence Mascara Lash Princess #1",
  //   "brand":"Lash",
  //   "price": 9.99,
  //   "rating": 2.56,
  //   "category": "beauty",
  //   "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  //   "description":"Essence Lash Princess Mascara delivers dramatic volume and defined lashes in just one swipe. With its specially shaped conic fiber brush, this mascara lifts and separates each lash for a bold, false-lash effect — without clumping or flaking. Perfect for all-day wear, it's cruelty-free and budget-friendly, making it a favorite among beauty lovers.",
  //   "id": id,
  //   "sold": 120
  // }

  const totforquantity = item?.price * parseInt(quantity);
  
  return (
    <>
    <Navbar search={''} />
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex justify-center items-start">
      <div className="bg-white shadow-sm w-full  p-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left - Address & Product */}
        <div className="md:col-span-2 space-y-6">

          {/* Address */}
          <Address/>

          {/* Product Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Package</h3>

            {/* Delivery Info */}
            <div className="mb-3 bg-gray-50 border p-3">
              <p className="text-lg text-gray-800">Delivery: $. 105</p>
              <p className="text-lg text-gray-600">14–20 May</p>
            </div>

            {/* Product */}
            <div className="flex gap-4 items-start">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-contain border"
              />
              <div>
                <p className="text-lg font-medium">{item.title}</p>
                <p className="text-lg text-gray-500">{item?.brand}</p>
                <p className="text-lg font-semibold mt-1">$. {item.price}</p>
                <p className="text-lg mt-1">Qty: {quantity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Summary */}
        <div className="space-y-6">

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2">
            Contact 
            </h3>
          </div>

          {/* Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Summary</h3>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Items</span>
                <span>$. {totforquantity }</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>$. {delivery}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-$. {discount}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>$. {totforquantity - discount + delivery }</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">VAT included</p>
            </div>
            <Paybutton/>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default page;
