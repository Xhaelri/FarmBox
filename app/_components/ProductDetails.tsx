"use client";
import Image from "next/image";
import Product from "../types/Product";
import { useState } from "react";

const ProductDetails = ({ product }: { product: Product }) => {
  const [isInCart, setIsInCart] = useState(false);

  const primaryImage = product.product_images?.find(
    (img) => img.is_primary
  )?.image_url;

  const addToCart = () => {
    setIsInCart(!isInCart);
    console.log(
      `${isInCart ? "Removed from" : "Added to"} cart: ${product.name}`
    );
  };

  // Get category names (handling categories as an array)
  let categoryDisplay = "Unknown";
  if (product.categories) {
    if (Array.isArray(product.categories)) {
      categoryDisplay = product.categories.map(cat => cat.name).join(", ");
    } else if (typeof product.categories === 'object' && product.categories.name) {
      categoryDisplay = product.categories.name;
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              width="400"
              height="400"
              className="object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
              No Image Available
            </div>
          )}
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="font-semibold text-2xl text-green-700">
            ${product.price}
          </p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Category: {categoryDisplay}</p>
            <p>Stock Available: {product.stock}</p>
            {product.rating && <p>Rating: ⭐️ {product.rating}</p>}
          </div>

          <button
            onClick={addToCart}
            className={`mt-6 py-3 px-6 rounded-lg transition-colors font-semibold ${
              isInCart
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-[#4b8a44] hover:bg-[#2C742F] text-white"
            }`}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;