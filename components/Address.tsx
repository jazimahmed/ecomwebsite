'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
type User = {
    id?: string;
    profilePic?: string;
    username: string;
    email: string;
    mobile?: string;
    address?: string;
  };

const Address = () => {
    const user: User = useSelector((state: RootState) => state.user);

  //console.log(user,"user");
  if (!user) return <p>Loading address...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-xl">Address</h2>
      </div>
      <p className="font-semibold text-lg">{user.username}</p>
      <p className="text-lg text-gray-700">{user.mobile}</p>
      <p className="text-lg text-gray-700 mt-1">{user.address}</p>
    </div>
  );
};

export default Address;
