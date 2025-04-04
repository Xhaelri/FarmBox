// components/ProductCard.tsx
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Product from "../../types/Product"; // Ensure path is correct
import ImageWithPlaceholder from "../ImageWithPlaceholder"; // Assuming this component exists and works
import { useCart } from "../../_components/CartContext/CartContext"; // Import useCart - Adjust path if necessary
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icons

interface ProductCardProps {
  product: Product; // Uses the Product type with id: number
}

const ProductCard = ({ product }: ProductCardProps) => {
  // --- Use Cart Context ---
  const { addToCart, removeFromCart, isInCart } = useCart();

  // Determine if the product is actually in the cart using the context function
  const isProductInCart = useMemo(() => isInCart(product.id), [isInCart, product.id]);

  // --- Local state for Favorites (remains local for now) ---
  const [isFavorite, setIsFavorite] = useState(false);

  // --- Get Primary Image ---
  const primaryImage = useMemo(() => {
    // Safely access product_images and find the primary or first image URL
    return (
      product.product_images?.find((img) => img.is_primary)?.image_url ||
      product.product_images?.[0]?.image_url || // Fallback to the first image
      null // Return null if no images exist
    );
  }, [product.product_images]);

  // --- Event Handlers ---

  // Updated to use Cart Context functions
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking the button

    if (isProductInCart) {
      // If already in cart, remove it
      removeFromCart(product.id);
      console.log(`Removed from cart: ${product.name}`);
    } else {
      // If not in cart, check stock and add it (quantity 1 by default)
      if (product.stock > 0) {
        addToCart(
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: primaryImage || "/placeholder.jpg", // Use determined image or placeholder
          },
          1 // Add quantity 1
        );
        console.log(`Added to cart: ${product.name}`);
      } else {
        console.warn(`Cannot add to cart: ${product.name} is out of stock.`);
        // Optionally, provide user feedback (e.g., toast notification)
      }
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setIsFavorite(!isFavorite);
    console.log(
      `${!isFavorite ? "Added to" : "Removed from"} favorites: ${product.name}`
    );
    // Add actual favorite logic here (e.g., context or API call)
  };

  // Determine if the "Add to Cart" button should be disabled
  const canAddToCart = product.stock > 0;

  return (
    // Link wraps the entire card
    <Link
      href={`/shop/${product.id}`} // Uses number ID
      className="group flex flex-col justify-between border border-gray-200 rounded-lg transition-all duration-300 hover:border-green-600 hover:shadow-lg overflow-hidden h-full" // Added h-full for consistent height in grids
    >
      {/* Top Section: Image and Favorite Button */}
      <div className="relative aspect-square w-full p-4 flex items-center justify-center bg-gray-50"> {/* Added padding and centering */}
        {/* Favorite Button */}
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

        {/* Product Image */}
        <div className="w-full max-w-[200px] h-auto aspect-square relative"> {/* Constrain image size */}
         {primaryImage ? (
            <ImageWithPlaceholder
              src={primaryImage}
              alt={product.name}
              width={200}
              height={200} // Use fill and let the parent div control size
              className="object-contain" // Use contain to show the whole product
              priority={false} // Only prioritize above-the-fold images typically
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Details and Cart Button */}
      <div className="w-full p-4 flex flex-col flex-grow"> {/* Added flex-grow */}
        <h2
          title={product.name} // Add title for full name on hover
          className="text-gray-700 line-clamp-2 text-sm font-medium group-hover:text-green-700 flex-grow min-h-[40px]" // Allow title to grow
        >
          {product.name}
        </h2>
        <p className="text-gray-900 font-semibold mt-2"> {/* Increased spacing */}
          ${product.price.toFixed(2)}
        </p>
         {/* Optional: Show stock status */}
         <p className={`text-xs mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
         </p>

        {/* Use actual cart status for button appearance */}
        <button
          onClick={handleCartClick}
          disabled={!canAddToCart && !isProductInCart} // Disable adding if out of stock, allow removing
          className={`mt-4 w-full py-2 px-4 text-sm rounded-md transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
             isProductInCart
              ? "bg-red-100 text-red-700 hover:bg-red-200 border border-red-200" // Style for Remove
              : canAddToCart
              ? "bg-green-600 text-white hover:bg-green-700 border border-transparent" // Style for Add
              : "bg-gray-300 text-gray-500 cursor-not-allowed border border-transparent" // Style for Disabled/Out of Stock
          }`}
        >
          {isProductInCart ? (
             <> <TrashIcon className="w-4 h-4"/> Remove </>
          ) : canAddToCart ? (
             <> <ShoppingBagIcon className="w-4 h-4"/> Add to Cart </>
          ) : (
             'Out of Stock'
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;