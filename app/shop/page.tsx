import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import ProductsPage from "./ProductsPage";
import FilterBar from "../_components/FilterBar";

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

const Shop = async ({ searchParams }: Props) => {

  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams?.category ?? "all";
  //We pass key to the suspense component because the navigation is always wrapped in a transition,
  //and suspense cannot hide the already rendered content. it'll wait and swap it with the new content
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center py-10">Shop</h1>
        <p className="text-center text-lg">
          Discover our exclusive collection of products.
        </p>
      </div>
      <FilterBar/>
      
      <Suspense fallback={<Spinner />} key={filter}>
        <ProductsPage filter={filter} />
      </Suspense>
    </>
  );
};

export default Shop;