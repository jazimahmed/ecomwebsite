"use client"
import React from 'react'
import { toast } from 'react-toastify'

const Paybutton = () => {
    const handleclick = ()=>{
        toast.success('payment succeed ✅')
    }
  return (
    <button onClick={handleclick} className="w-full bg-black text-white mt-4 py-2 hover:bg-gray-800 transition font-semibold text-lg">
              Pay Now
    </button>
  )
}

export default Paybutton
