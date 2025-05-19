"use client"
import React from 'react'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
type User = {
  profilePic?: string;
  username?: string;
  email?: string;
  mobile?: string;
  address?: string;
};

const AvatarCom = () => {
  const user: User = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Avatar className="md:h-14 md:w-14 h-10 w-10 ">
        <AvatarImage src={user?.profilePic || "/profiledummy.jpg"} alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      
    </div>
  )
}

export default AvatarCom
