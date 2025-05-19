'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify';
// interface product {
//                 id       : String 
//                 title    : String
//                 price    : number
//                 rating    :number
//                 category  :String
//                 thumbnail :String
//                 sold      :number
//                 email     :String
//                 brand     :String  
//   }

const Subcartpage = ({products,quantity}) => {

  const final = products.map((product) => {
    const match = quantity.find((q) => q.prodId === product.id);
    return {
      ...product,
      quantity: match ? match.quantity : 0, // default to 0 if not found
    };
  });
    const [cartItems, setCartItems] = useState(final);

  const [selectedItems, setSelectedItems] = useState(cartItems.map(item => item.id))

  const handleCheckboxChange = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  
  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  
  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  
  const total = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  
  return (
    
    <div className="flex flex-col md:flex-row justify-between px-4 md:px-30 pt-10 gap-6">
      {/* Left - Cart Items */}
      <div className="md:w-2/3 w-full p-5 md:p-10 bg-gray-100/50 outline outline-gray-200">
        <h2 className="text-lg md:text-2xl font-bold mb-6">Shopping Cart</h2>
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b py-6">
            <div className="flex items-center md:gap-4 gap-2">
              <input
                type="checkbox"
                className="h-5 w-5 accent-black"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-contain" />
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-gray-800">{item.title}</h3>
                <div className="text-orange-600 text-xl font-bold">$. {item.price}</div>
                
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => decreaseQuantity(item.id)}>-</Button>
              <span className="text-sm md:text-lg">{item.quantity}</span>
              <Button variant="outline" onClick={() => increaseQuantity(item.id)}>+</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Right - Summary */}
      <div className="w-full md:w-1/3 bg-gray-50 p-6 border rounded-lg h-fit">
        <h2 className="text-lg md:text-2xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2 md:text-lg text-sm">
          <span>Subtotal</span>
          <span>$. {(total).toPrecision(4)}</span>
        </div>
        <div className="flex justify-between mb-2 md:text-lg text-sm">
          <span>Shipping</span>
          <span>$. {(total * 0.14).toPrecision(4)}</span>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex justify-between font-bold md:text-xl text-lg mb-10">
          <span>Total</span>
          <span>$. {(total - (total * 0.14)).toPrecision(4)}</span>
        </div>

        <Button onClick={()=>{toast.success('payment proceed successfully!')}} className="w-full bg-black hover:bg-gray-800 rounded-none text-white text-lg">
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </div>
  )
}

export default Subcartpage
