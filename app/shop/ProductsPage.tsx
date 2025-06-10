import { getProducts } from "../lib/data-service";
import Product from "../types/Product";
import ProductList from "../_components/Products/ProductsList";

const ProductsPage = async ({ filter }: { filter: string }) => {
  const Products: Product[] = await getProducts();
  console.log("Products",Products)
  return <ProductList initialData={Products} filter={filter} />;
};

export default ProductsPage;
