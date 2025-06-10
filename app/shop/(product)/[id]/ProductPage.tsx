// app/shop/[id]/ProductPage.tsx
import ProductDetails from "../../../_components/ProductDetails/ProductDetails"; // Adjust import path
import { getProductById } from "../../../lib/data-service"; // Adjust import path
import { notFound } from "next/navigation";

interface Props {
  params: { id: string }; // Param is always string from URL
}

// This is a React Server Component
const ProductPage = async ({ params }: Props) => {
  const productIdString = params.id;
  const productId = parseInt(productIdString, 10); // Parse string ID to number

  // Validate parsed ID before fetching
  if (isNaN(productId) || productId <= 0) {
    console.warn(`Invalid product ID requested: ${productIdString}`);
    notFound(); // Show 404 for invalid numeric ID format
  }

  // Fetch initial data on the server
  // getProductById now expects a number
  const product = await getProductById(productId);

  // Although getProductById might call notFound(),
  // it's good practice to handle the null case explicitly if it could return null
  if (!product) {
    notFound();
  }

  // Pass the *number* ID and initial data to the client component
  return <ProductDetails initialProduct={product} productId={productId} />;
};

export default ProductPage;

// Optional: Generate static paths if you know the product IDs
// export async function generateStaticParams() {
//   const { data: products } = await supabase.from('products').select('id');
//   return products?.map((product) => ({
//     id: product.id.toString(), // Static params need to be strings
//   })) ?? [];
// }
