// page.tsx (product detail page)
import { getProductById } from "../../_lib/data-service";
import ProductDetails from "../../_components/ProductDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  // Use your Supabase data service instead of fetching from an external API
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <ProductDetails  product={product} />
  );
};

export default ProductPage;