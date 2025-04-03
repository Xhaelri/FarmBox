"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../_lib/data-service";

import Product from "../../types/Product";
import Spinner from "../Spinner";
import ProductDetailsCard from "./ProductDetailsCard";

interface Props {
  productId: string;
  initialProduct?: Product;
}

const ProductDetails = ({ productId, initialProduct }: Props) => {
  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 5 * 60 * 1000,
    initialData: initialProduct, // Use a function if initialProduct is optional
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error loading products</p>
      </div>
    );
  }

  return data && <ProductDetailsCard data={data} />;
};

export default ProductDetails;
