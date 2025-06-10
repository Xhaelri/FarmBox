"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../lib/data-service"; // Adjust path
import Product from "../../types/Product"; // Adjust path
import Spinner from "../Spinner"; // Adjust path
import ProductDetailsCard from "./ProductDetailsCard"; // Adjust path
import { useEffect } from "react";

interface Props {
  productId: number;
  initialProduct?: Product | null;
}

const ProductDetails = ({ productId, initialProduct }: Props) => {
  // --- Call Hooks Unconditionally at the Top Level ---
  const { data, isLoading, isError, error } = useQuery<Product | null, Error>({
    // Explicitly type Error
    queryKey: ["product", productId],
    // Only execute queryFn if productId is valid
    queryFn: () => {
      // Add validation *inside* queryFn or rely on getProductById's validation
      if (isNaN(productId) || productId <= 0) {
        // Throw an error that React Query can catch
        return Promise.reject(new Error("Invalid Product ID for query."));
      }
      return getProductById(productId);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: initialProduct, // Use initial data if provided
    // enabled: !isNaN(productId) && productId > 0, // You can use 'enabled' to prevent the query if ID is invalid initially
  });

  useEffect(() => {
    // This effect now runs unconditionally after hooks
    if (error) {
      // Log the specific query error
      console.error("Tanstack Query Error fetching product:", error.message);
    }
  }, [error]); // Dependency array is correct

  // --- Perform Validation Checks *After* Hooks ---
  const isProductIdInvalid = isNaN(productId) || productId <= 0;

  // --- Conditional Rendering Based on Validation and Query State ---

  // 1. Render error if the productId prop itself is invalid
  if (isProductIdInvalid) {
    return (
      <div className="text-center text-red-500 p-10">
        Invalid Product ID provided.
      </div>
    );
  }

  // 2. Render loading state (only show if not using initial data or if initial data is stale and refetching)
  // Let's simplify: Show spinner if isLoading is true *unless* we already have data to show.
  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  // 3. Render error state from the query
  // Check isError and also ensure we don't have stale data to potentially show
  if (isError && !data) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4 p-4">
        <p className="text-xl text-red-600 font-semibold">
          Error Loading Product
        </p>
        {/* Optionally display the error message */}
        <p className="text-sm text-gray-600 bg-red-50 p-2 border border-red-200 rounded">
          {error?.message ?? "An unknown error occurred."}
        </p>
      </div>
    );
  }

  // 4. Render "Not Found" state (if data fetch completed and returned null)
  if (!isLoading && !isError && data === null) {
    return (
      <div className="text-center text-gray-500 p-10">Product not found.</div>
    );
  }

  // 5. Render the Product Details Card if data exists
  if (data) {
    return <ProductDetailsCard data={data} />;
  }

  // Fallback rendering (should ideally not be reached with the logic above)
  return (
    <div className="text-center text-gray-500 p-10">
      Loading or unexpected state...
    </div>
  );
};

export default ProductDetails;
