"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../lib/data-service";
import ProductCard from "./ProductCard";
import Spinner from "../Spinner";
import Product from "../../types/Product";

interface Props {
  initialData: Product[];
  filter: string;
}

const ProductList = ({ initialData, filter }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
    initialData: initialData,
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

  let displayedProducts;
  if (filter === "all") {
    displayedProducts = data;
  } else if (filter === "vegetables") {
    displayedProducts = data?.filter((product) => product.category_id === 2);
  } else if (filter === "fruits") {
    displayedProducts = data?.filter((product) => product.category_id === 1);
  } else if (filter === "meat") {
    displayedProducts = data?.filter((product) => product.category_id === 3);
  } else if (filter === "dairy") {
    displayedProducts = data?.filter((product) => product.category_id === 4);
  } else {
    displayedProducts = data;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10 mx-4 sm:mx-[10%]">
      {displayedProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
