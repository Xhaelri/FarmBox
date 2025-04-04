import ProductDetails from "../../../_components/ProductDetails/ProductDetails"; // Correct import path
import { getProductById } from "../../../_lib/data-service";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = await getProductById(productId); // lowercase to avoid type shadowing
  return <ProductDetails initialProduct={product} productId={productId} />; // Fix prop name to camelCase
};

export default ProductPage;
