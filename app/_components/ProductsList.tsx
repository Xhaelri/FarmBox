import { getProducts } from "../_lib/data-service";
import ProductCard from "./ProductCard"

const ProductList = async () => {
    const products = await getProducts();

    if (!products) {
      return <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error loading products</p>
      </div>;
    }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10 mx-4 sm:mx-[10%]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>  )
}

export default ProductList