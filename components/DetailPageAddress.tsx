'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store' // adjust path if needed

type User = {
    id?: string;
    profilePic?: string;
    username: string;
    email: string;
    mobile?: string;
    address?: string;
  };
const DetailPageAddress = () => {
    const user: User  = useSelector((state: RootState) => state.user)
  return (
    <div >
      <p className="font-semibold text-gray-800">Shipping to:</p>
      <p>{user?.address}</p>
    </div>
  )
}

export default DetailPageAddress
