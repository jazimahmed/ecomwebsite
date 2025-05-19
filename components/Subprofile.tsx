'use client';

import { Pencil, X } from 'lucide-react';
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { updateUser } from '@/lib/actions';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';


type User = {
    id?: string;
    profilePic?: string;
    username: string;
    email: string;
    mobile?: string;
    address?: string;
  };

const Subprofile = () => {
    const dispatch = useDispatch();
    

  const user: User = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

    const [formData, setFormData] = useState<User>({
    id: user.id || '' ,    
    username: user.username || '',
    email: user.email || '',
    mobile: user.mobile || '',
    address: user.address || '',
    });

  if (!user || !user.username) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-40 md:mt-12 p-8 bg-white md:shadow-xl rounded-2xl text-center">
      <div className="flex flex-col items-center">
        <img
          src={user.profilePic || '/profiledummy.jpg'}
          alt={`${user.username} Profile`}
          className="md:w-32 md:h-32 h-16 w-16 rounded-full object-cover border-4 border-blue-400"
        />
        <h2 className="text-sm md:text-xl md:text-3xl font-bold mt-6 flex items-center gap-2">
          {user.username}
          <Pencil
            className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsEditing(!isEditing)}

            /> </h2>
        <p className="text-sm md:text-lg text-gray-600 mt-2">{user.email}</p>

        <div className="mt-6 space-y-4 text-left w-full px-6">
          <div className="text-sm md:text-lg flex justify-between items-center">
            <span>
              <strong>Mobile:</strong> {user.mobile}
            </span>
          </div>

          <div className="text-sm md:text-lg flex justify-between items-start">
            <span>
              <strong>Address:</strong> {user.address}
            </span>
          </div>
        </div>
      </div>
      {isEditing && (
  <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
      <button className="absolute top-2 right-2" onClick={() => setIsEditing(false)}>
        <X />
      </button>
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <form
        onSubmit={async(e) => {
          e.preventDefault();
          setIsUpdating(true)
          
          //console.log('Updated Data:', formData);
          const res = await updateUser( formData);
          if(!res){
            toast.error('Could\'nt update profile!');
            setIsUpdating(false)
            return;
          }
          dispatch(setUser(formData));
          toast.success('Profile updated successfully!')
          setIsEditing(false);
          setIsUpdating(false)
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-4 py-2 rounded"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile"
          className="w-full border px-4 py-2 rounded"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        <textarea
          placeholder="Address"
          className="w-full border px-4 py-2 rounded"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <button
          type="submit"
          disabled = {isUpdating}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {!isUpdating? "Save change": <ClipLoader color="#3b82f6"  />}
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Subprofile;
