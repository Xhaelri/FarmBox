import { getProducts } from "../_lib/data-service";
import Product from "../types/Product";
import ProductList from "../_components/Products/ProductsList";

const ProductsPage = async ({ filter }: { filter: string }) => {
  const Products: Product[] = await getProducts();
  return <ProductList initialData={Products} filter={filter} />;
};

export default ProductsPage;
