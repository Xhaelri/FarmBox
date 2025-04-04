"use client";
import { useQuery } from "@tanstack/react-query";
import { getImagesByProductId, getProductById } from "../../_lib/data-service";

import Product from "../../types/Product";
import Spinner from "../Spinner";
import ProductDetailsCard from "./ProductDetailsCard";
import { ProductImage } from "../../types/Product";

interface Props {
  productId: string;
  initialProduct?: Product;
}

const ProductDetails = ({ productId, initialProduct }: Props) => {
  // Query for product data
  const { data: product, isLoading: productLoading, isError: productError } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 5 * 60 * 1000,
    initialData: initialProduct,
  });

  // Query for product images
  const { data: productImages, isLoading: imagesLoading, isError: imagesError } = useQuery<ProductImage[]>({
    queryKey: ["productImages", productId],
    queryFn: () => getImagesByProductId(productId),
    staleTime: 5 * 60 * 1000,
  });

  // Show loading spinner if either query is loading
  if (productLoading || imagesLoading) {
    return <Spinner />;
  }

  // Show error if either query failed
  if (productError || imagesError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error loading product data</p>
      </div>
    );
  }

  // Transform product data to match ProductDetailsCard props
  const transformedProduct = {
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stock: product?.stock || 0, // Convert stock number to boolean
    images: productImages?.map(img => img.image_url) || [],
    rating: product?.rating || product?.rating ==0 ? product?.rating : 0, // Ensure rating is non-negative
    reviewCount: product?.reviews_count || 0,
    sku: product?.sku || "",
    originalPrice: calculateOriginalPrice(product?.price || 0, product?.discount_percentage || 0),
    discountPercentage: product?.discount_percentage || 0,
    brand: product?.brand || "",
    category_id: product?.category_id || 0,

  };

  return <ProductDetailsCard data={transformedProduct} />;
};

// Helper function to calculate original price based on discount
function calculateOriginalPrice(currentPrice: number, discountPercentage: number): number {
  if (discountPercentage <= 0) return currentPrice;
  return parseFloat((currentPrice / (1 - discountPercentage / 100)).toFixed(2));
}

export default ProductDetails;