import { getProducts } from "../_lib/data-service";
import ProductList from "../_components/Products/ProductsList";
import Product from "../types/Product";

interface ProductsPageProps {
  filter: string;
}

const ProductsPage = async ({ filter }: ProductsPageProps) => {
  const products: Product[] = await getProducts();
  return <ProductList initialData={products} filter={filter} />;
};

export default ProductsPage;