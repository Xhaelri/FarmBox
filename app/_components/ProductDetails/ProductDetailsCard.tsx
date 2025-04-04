"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import TextExpander from "../TextExpander"; // Assuming TextExpander component exists
import { useCart } from "../CartContext/CartContext"; // Adjust path if needed
import Product, { ProductImage } from "../../types/Product"; // Use unified Product type

// No separate ProductDetailsData interface needed

interface ProductDetailsCardProps {
  data: Product; // Use the main Product type directly
}

// Helper to find the primary image URL or fallback to the first one
const getDisplayImage = (images: ProductImage[] | null): string | null => {
    if (!images || images.length === 0) return null;
    const primary = images.find(img => img.is_primary);
    return primary ? primary.image_url : images[0].image_url;
}

const ProductDetailsCard = ({ data }: ProductDetailsCardProps) => {
  const {
    addToCart, removeFromCart, updateQuantity, isInCart, getItemQuantity,
  } = useCart();

  // Get image URLs from the product_images array
  const imageUrls = useMemo(() => data.product_images?.map(img => img.image_url) ?? [], [data.product_images]);
  const displayImage = useMemo(() => getDisplayImage(data.product_images), [data.product_images]);

  const [localQuantity, setLocalQuantity] = useState(1);
  // Find the index of the display image for initial selection, default to 0
  const initialImageIndex = displayImage ? imageUrls.findIndex(url => url === displayImage) : 0;
  const [selectedImageIndex, setSelectedImageIndex] = useState(Math.max(0, initialImageIndex)); // Ensure index is non-negative


  const productId = data.id; // ID is number

  // Memoize cart checks
  const productInCart = useMemo(() => isInCart(productId), [isInCart, productId]);
  const cartItemQuantity = useMemo(() => getItemQuantity(productId), [getItemQuantity, productId]);

  // Reset local quantity if item removed from cart elsewhere
  useEffect(() => {
    if (!productInCart) {
      setLocalQuantity(1);
    }
    // No dependency on cartItemQuantity needed here, localQuantity is for adding *new* items
  }, [productInCart]);

   // Update selected image if displayImage changes (e.g., initial load hydration)
  useEffect(() => {
      const currentDisplayImage = getDisplayImage(data.product_images);
      const newIndex = currentDisplayImage ? imageUrls.findIndex(url => url === currentDisplayImage) : 0;
      setSelectedImageIndex(Math.max(0, newIndex));
  }, [data.product_images, imageUrls]);


  const decreaseLocalQuantity = () => {
    setLocalQuantity((prev) => Math.max(1, prev - 1));
  };
  const increaseLocalQuantity = () => {
    // Ensure local quantity doesn't exceed stock
    setLocalQuantity((prev) => Math.min(data.stock, prev + 1));
  };

  const handleLocalQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    // Clamp value between 1 and stock
    setLocalQuantity(Math.min(data.stock, Math.max(1, isNaN(value) ? 1 : value)));
  };

  const handleAddToCart = () => {
     // Double check stock before adding
    if (data.stock <= 0 || localQuantity > data.stock) {
      console.error("Cannot add to cart: Out of stock or invalid quantity.");
      // Add user feedback here (e.g., toast notification)
      return;
    }

    addToCart(
      {
        id: productId, // number
        name: data.name,
        price: data.price,
        image: displayImage || "/placeholder.jpg", // Use calculated display image
      },
      localQuantity
    );
  };

  // Update quantity already in cart
  const handleUpdateCartQuantity = (newQuantity: number) => {
    // Clamp between 1 and stock
    const validatedQuantity = Math.min(data.stock, Math.max(1, isNaN(newQuantity) ? 1 : newQuantity));

    if (validatedQuantity > data.stock) {
      console.error("Cannot update quantity: Not enough stock.");
       // Add user feedback
      return;
    }
    // Only update if quantity actually changes
    if (validatedQuantity !== cartItemQuantity) {
         updateQuantity(productId, validatedQuantity); // ID is number
    }
  };

  const handleCartQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    handleUpdateCartQuantity(value); // Use the validating update handler
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productId); // ID is number
  };

  const handleThumbnailClick = (index: number) => setSelectedImageIndex(index);

  const categoryName = data.categories?.name ?? 'N/A'; // Safely access category name

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row-reverse gap-4">
          {/* Main Image */}
          <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-lg border border-gray-200 flex-grow bg-gray-50">
            {imageUrls.length > 0 && selectedImageIndex < imageUrls.length ? (
              <Image
                key={imageUrls[selectedImageIndex]} // Add key for potential re-renders
                src={imageUrls[selectedImageIndex]}
                alt={data.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain" // Use contain to see the whole image
                quality={90}
                priority={true} // Prioritize LCP image
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {imageUrls.length > 1 && (
            <div className="flex flex-row sm:flex-col gap-3 items-center justify-center sm:justify-start shrink-0">
              {imageUrls.map((imgUrl, index) => (
                <button
                  key={imgUrl + index} // Use URL + index for key
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`border-2 rounded w-16 h-16 sm:w-20 sm:h-20 overflow-hidden cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    selectedImageIndex === index
                      ? "border-green-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${data.name} thumbnail ${index + 1}`}
                    fill
                    sizes="80px" // Provide appropriate size for thumbnails
                    quality={75}
                    className="object-cover" // Cover for thumbnails usually looks better
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Actions */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
              {data.name}
            </h1>
            <span
              className={`px-3 py-1 rounded text-xs sm:text-sm font-medium whitespace-nowrap ${
                data.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {data.stock > 0 ? `${data.stock} In Stock` : "Out of Stock"}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4 text-sm sm:text-base">
             {/* Display SKU if available */}
             {data.sku && <span className="text-gray-600">SKU: {data.sku}</span>}
          </div>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-green-600">
              ${data.price.toFixed(2)}
            </span>
            {/* Add original price / discount display if needed */}
          </div>
           {/* Display Brand if available */}
          {data.brand && (
                <div className="mb-4 text-sm sm:text-base">
                <span className="text-gray-600">Brand:</span>
                <span className="font-medium text-gray-800 ml-1">{data.brand}</span>
                </div>
           )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Description</h3>
            <TextExpander>{data.description}</TextExpander>
          </div>

          {/* Cart Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            {productInCart ? (
              // --- Item is IN CART ---
              <>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleUpdateCartQuantity(cartItemQuantity - 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cartItemQuantity <= 1}
                    aria-label="Decrease quantity in cart"
                  > − </button>
                  <input
                    type="number"
                    value={cartItemQuantity}
                    onChange={handleCartQuantityInputChange}
                    min="1"
                    max={data.stock}
                    className="w-12 text-center py-2 border-x border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="Current quantity in cart"
                  />
                  <button
                    onClick={() => handleUpdateCartQuantity(cartItemQuantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cartItemQuantity >= data.stock} // Disable if at stock limit
                    aria-label="Increase quantity in cart"
                  > + </button>
                </div>
                <button
                  onClick={handleRemoveFromCart}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition duration-200 flex-grow text-sm font-medium"
                >
                  <ShoppingBag size={18} /> Remove from Cart
                </button>
              </>
            ) : (
              // --- Item is NOT IN CART ---
              <>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decreaseLocalQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={localQuantity <= 1 || data.stock <= 0}
                    aria-label="Decrease quantity to add"
                  > − </button>
                  <input
                    type="number"
                    value={localQuantity}
                    onChange={handleLocalQuantityChange}
                    min="1"
                    max={data.stock} // Set max based on stock
                    className="w-12 text-center py-2 border-x border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="Quantity to add"
                    disabled={data.stock <= 0} // Disable if out of stock
                  />
                  <button
                    onClick={increaseLocalQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={localQuantity >= data.stock || data.stock <= 0} // Disable if at stock limit or out of stock
                    aria-label="Increase quantity to add"
                  > + </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-200 flex-grow text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={data.stock <= 0} // Disable if out of stock
                >
                  <ShoppingBag size={18} />
                  {data.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </>
            )}
            {/* Wishlist Button */}
            <button
              className="flex items-center justify-center w-full sm:w-12 h-[50px] rounded border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-red-500 transition duration-200 shrink-0 mt-2 sm:mt-0"
              aria-label="Add to wishlist"
              // Add wishlist functionality onClick
            >
              <Heart size={20} />
              <span className="sm:hidden ml-2">Add to Wishlist</span>
            </button>
          </div>

           {/* Category Info */}
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex gap-2">
              <span className="text-gray-600">Category:</span>
              <span className="text-gray-800 font-medium">{categoryName}</span>
            </div>
            {/* Add Tags or other info if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;