import { Suspense } from "react";
import ProductsList from "../_components/ProductsList";
import Spinner from "../_components/Spinner";

const Shop = async () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center py-10">Shop</h1>
        <p className="text-center text-lg">
          Discover our exclusive collection of products.
        </p>
      </div>
      {/* the loading is now overridden by the suspense component */}
      <Suspense fallback={<Spinner />}>
        <ProductsList />
      </Suspense>
    </>
  );
};

export default Shop;
