"use client"
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
export default function Settings() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState('/placeholder-profile.jpg');
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className=" container mx-auto px-4 py-6 space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-grow space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                    defaultValue="Dionne"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                    defaultValue="Russell"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                    defaultValue="dionne.russell@gmail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                    defaultValue="(603) 555-0123"
                  />
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 md:ml-6 flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <Image 
                    src={profileImage} 
                    alt="Profile" 
                    width={96} 
                    height={96} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profileImage"
                  className="mt-3 inline-flex items-center px-4 py-2 border border-green-500 text-sm font-medium rounded-full text-green-500 hover:bg-green-50 cursor-pointer"
                >
                  Change Image
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button type="button" className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  id="billingFirstName"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                  defaultValue="Dionne"
                />
              </div>
              
              <div>
                <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  id="billingLastName"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                  defaultValue="Russell"
                />
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name (optional)</label>
                <input
                  type="text"
                  id="companyName"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                  defaultValue="Zakirsoft"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                defaultValue="4140 Parker Rd."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
                <select
                  id="country"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border appearance-none"
                  defaultValue="US"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <select
                  id="state"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border appearance-none"
                  defaultValue="DC"
                >
                  <option value="DC">Washington DC</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                  defaultValue="20033"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="billingEmail"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                  defaultValue="dionne.russell@gmail.com"
                />
              </div>
              
              <div>
                <label htmlFor="billingPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="billingPhone"
                  className="mt-1 block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border"
                  defaultValue="(603) 555-0123"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <button type="button" className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
              <div className="mt-1 relative rounded-md ">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  className="block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="mt-1 relative rounded-md ">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    className="block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border pr-10"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="mt-1 relative rounded-md ">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="block w-full rounded-md border-gray-300  focus:border-green-500 focus:ring-green-500 p-2 border pr-10"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button type="button" className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-medium transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
