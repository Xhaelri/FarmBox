"use client";
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ShoppingBag, Heart } from 'lucide-react';
import Image from 'next/image';

interface ProductDetailsCardProps {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number; // Changed to boolean to match the transformed data
    images: string[];
    rating: number;
    reviewCount: number;
    sku: string;
    originalPrice: number;
    discountPercentage: number;
    brand: string;
    category_id: number;
  };
}

const ProductDetailsCard = ({ data }: ProductDetailsCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col">
      {/* Up Arrow Navigation */}
      <div className="flex justify-start mb-6">
        <button className="text-gray-400">
          <ChevronUp size={24} />
        </button>
      </div>
      
      {/* Product Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Product Images */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Main Image */}
          <div className="mb-4 relative h-96">
            {data.images.length > 0 && (
              <Image
                src={data.images[selectedImage]}
                alt={data.name}
                fill
                className="object-contain"
              />
            )}
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="flex flex-col items-center gap-3">
            {data.images.map((img, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded w-20 h-20 overflow-hidden cursor-pointer relative ${selectedImage === index ? 'border-green-500' : 'border-gray-200'}`}
              >
                <Image
                  src={img}
                  alt={`${data.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            
            {/* Down Arrow */}
            <button className="text-gray-400 mt-4">
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
        
        {/* Right Side - Product Info */}
        <div className="w-full md:w-1/2">
          {/* Product Title and Stock */}
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-4xl font-bold text-gray-800">{data.name}</h1>
            <span className={`px-3 py-1 rounded text-sm ${data.stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {data.stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {/* Rest of the component remains unchanged */}
          {/* Reviews */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < data.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">{data.reviewCount} Review{data.reviewCount !== 1 ? 's' : ''}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">SKU: {data.sku}</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-400 line-through">${data.originalPrice.toFixed(2)}</span>
            <span className="text-2xl font-bold text-green-600">${data.price.toFixed(2)}</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded">{data.discountPercentage}% Off</span>
          </div>
          
          {/* Brand */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium">{data.brand}</span>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-600">{data.description}</p>
          </div>
          
          {/* Share */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-600">Share item:</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">f</button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">t</button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">p</button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">i</button>
            </div>
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <input 
                type="text" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-12 text-center py-2 border-x border-gray-300"
              />
              <button 
                onClick={increaseQuantity}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            
            <button className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded hover:bg-green-600 transition flex-grow">
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            
            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50">
              <Heart size={20} />
            </button>
          </div>
          
          {/* Category and Tags */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="text-gray-600">Category:</span>
              <span className="text-gray-800">{data.category_id}</span>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;