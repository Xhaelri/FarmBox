"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Product from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the Link from navigating
    setIsInCart(!isInCart);
    // Here you would typically dispatch to a cart state manager like Redux, Zustand, etc.
    console.log(`${isInCart ? 'Removed from' : 'Added to'} cart: ${product.name}`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the Link from navigating
    setIsFavorite(!isFavorite);
    console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites: ${product.name}`);
  };

  // Find the primary image or use the first one
  const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url 

  return (
    <Link
      href={`/shop/${product.id}`}
      key={product.id}
      className="group flex flex-col items-center justify-between pt-10 p-5 border-1 border-[#cacaca] rounded-lg transition-all duration-300 ease-in-out hover:border-[#4b8a44] hover:shadow-[0_0_15px_0_rgba(0,178,7,0.2)] relative"
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <button 
          onClick={toggleFavorite}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {isFavorite ? (
            <span className="text-red-500">❤️</span>
          ) : (
            <span>🤍</span>
          )}
        </button>
      </div>
      
      <div>
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            width={250}
            height={250}
            className="w-[250px] h-[250px] object-contain"
          />
        ) : (
          <div className="w-[100px] h-[150px] bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
      </div>
      
      <div className="w-full">
        <h2 className="text-[#4D4D4D] line-clamp-1 text-sm group-hover:text-[#2C742F]">
          {product.name}
        </h2>
        <p className="text-black text-xs">${product.price}</p>
        
        <button
          onClick={addToCart}
          className={`mt-3 w-full py-1 px-2 text-xs rounded transition-colors ${
            isInCart 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-[#4b8a44] hover:bg-[#2C742F] text-white'
          }`}
        >
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;