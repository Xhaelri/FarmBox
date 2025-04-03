// components/ProductCard.tsx
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Product from "../../types/Product";
import ImageWithPlaceholder from "../ImageWithPlaceholder";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const primaryImage = useMemo(() => {
    return (
      product.product_images?.find((img) => img.is_primary)?.image_url ||
      product.product_images?.[0]?.image_url
    );
  }, [product.product_images]);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInCart(!isInCart);
    console.log(
      `${isInCart ? "Removed from" : "Added to"} cart: ${product.name}`
    );
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    console.log(
      `${isFavorite ? "Removed from" : "Added to"} favorites: ${product.name}`
    );
  };

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group flex flex-col items-center justify-between pt-10 p-5 border border-[#cacaca] rounded-lg transition-all duration-300 hover:border-[#4b8a44] hover:shadow-[0_0_15px_0_rgba(0,178,7,0.2)] relative"
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleFavoriteClick}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <span className="text-red-500">❤️</span>
          ) : (
            <span>🤍</span>
          )}
        </button>
      </div>

      <div className="w-full flex justify-center">
        {primaryImage ? (
          <ImageWithPlaceholder
            src={primaryImage}
            alt={product.name}
            width={200}
            height={200}
          
            className="w-[200px] h-[200px] object-contain"
            priority={true}
            
          />
        ) : (
          <div className="w-[200px] h-[200px] bg-gray-100 flex items-center justify-center rounded">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <div className="w-full mt-4">
        <h2 className="text-[#4D4D4D] line-clamp-2 text-sm group-hover:text-[#2C742F] min-h-[40px]">
          {product.name}
        </h2>
        <p className="text-black font-medium mt-1">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleCartClick}
          className={`mt-3 w-full py-2 px-4 text-sm rounded transition-colors ${
            isInCart
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-[#4b8a44] hover:bg-[#2C742F] text-white"
          }`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
