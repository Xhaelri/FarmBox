// components/ProductCard.tsx
"use client";
import { useState } from "react"; // Removed useMemo
import Link from "next/link";
import Product from "../../types/Product"; // Ensure path is correct
// import ImageWithPlaceholder from "../ImageWithPlaceholder"; // Ensure path is correct
import { useCart } from "../../_components/CartContext/CartContext"; // Ensure path is correct
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'; // Icons
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // --- Cart Context ---
  const { addToCart, removeFromCart, isInCart } = useCart();

  // --- Local state for Favorites ---
  const [isFavorite, setIsFavorite] = useState(false);

  // --- Determine derived state directly ---
  const isProductInCart = isInCart(product.id); // Directly call context function
  const canAddToCart = product.stock > 0;

  // Find the image URL directly
  const primaryImage =
    product.product_images?.find((img) => img.is_primary)?.image_url ||
    product.product_images?.[0]?.image_url ||
    null; // Fallback to first image or null

  // --- Event Handlers (logic remains the same) ---
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation

    if (isProductInCart) {
      removeFromCart(product.id);
      console.log(`Removed from cart: ${product.name}`);
    } else if (canAddToCart) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: primaryImage || "/placeholder.jpg", // Use determined image
        },
        1 // Add quantity 1
      );
      console.log(`Added to cart: ${product.name}`);
    } else {
      console.warn(`Cannot add to cart: ${product.name} is out of stock.`);
      // Feedback like a toast could be added here
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setIsFavorite(!isFavorite);
    console.log(
      `${!isFavorite ? "Added to" : "Removed from"} favorites: ${product.name}`
    );
    // Add actual favorite persistence logic (context/API) here if needed
  };

  // --- Determine Button State ahead of time for cleaner JSX ---
  let ButtonContent: React.ReactNode;
  let buttonStyles = "";
  const baseButtonStyles = "mt-4 w-full py-2 px-4 text-sm rounded-md transition-all flex items-center justify-center gap-2 whitespace-nowrap";
  const isButtonDisabled = !canAddToCart && !isProductInCart; // Disabled only if out of stock AND not in cart

  if (isProductInCart) {
    ButtonContent = <> <TrashIcon className="w-4 h-4" /> Remove </>;
    buttonStyles = `${baseButtonStyles} bg-red-100 text-red-700 hover:bg-red-200 border border-red-200`;
  } else if (canAddToCart) {
    ButtonContent = <> <ShoppingBagIcon className="w-4 h-4" /> Add to Cart </>;
    buttonStyles = `${baseButtonStyles} bg-green-600 text-white hover:bg-green-700 border border-transparent`;
  } else {
    ButtonContent = 'Out of Stock';
    buttonStyles = `${baseButtonStyles} bg-gray-300 text-gray-500 cursor-not-allowed border border-transparent`;
  }

  // --- Render Component ---
  return (
    // Link wraps the entire card - Styles remain the same
    <Link
      href={`/shop/${product.id}`}
      className="group flex flex-col justify-between border border-gray-200 rounded-lg transition-all duration-300 hover:border-green-600 hover:shadow-lg overflow-hidden h-full"
    >
      {/* Top Section: Image and Favorite Button - Styles remain the same */}
      <div className="relative aspect-square w-full p-4 flex items-center justify-center ">
        {/* Favorite Button - Logic and Styles remain the same */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white transition-all"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
               <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.004-.004.001z" />
             </svg>
           ) : (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
             </svg>
           )}
        </button>

        {/* Product Image Container - Styles remain the same */}
        <div className="w-full max-w-[220px] h-auto aspect-square relative">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              width={500}
              height={500}
              className="object-center" // Use contain
              // priority={false} // Keep priority low unless critical
            />
          ) : (
             // Fallback display - Styles remain the same
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Details and Cart Button - Styles remain the same */}
      <div className="w-full p-4 flex flex-col flex-grow">
         {/* Product Name - Styles remain the same */}
        <h2
          title={product.name}
          className="text-gray-700 line-clamp-2 text-sm font-medium group-hover:text-green-700 flex-grow min-h-[40px]"
        >
          {product.name}
        </h2>
         {/* Product Price - Styles remain the same */}
        <p className="text-gray-900 font-semibold mt-2">
          ${product.price.toFixed(2)}
        </p>
        {/* Stock Status - Styles remain the same */}
        <p className={`text-xs mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
           {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>

        {/* Cart Button - Uses pre-calculated state */}
        <button
          onClick={handleCartClick}
          disabled={isButtonDisabled}
          className={buttonStyles} // Apply determined styles
        >
          {ButtonContent} {/* Render determined content */}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;