import ProductPage from "./ProductPage"; // Import the correct component

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  return <ProductPage params={params} />;
};

export default Page;

/* export async function generateStaticParams() {
  const products = await getProducts();


  const ids = products?.map((product: Product) => ({
    id: String(product.id)
  })) || [];
  return ids
}

 */

/* export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // Use your Supabase data service instead of fetching from an external API
  const product = await getProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    };
  }

  return {
    title: `${product.name}`,
    description: `Details about product ${product.name}`,
  };
}
 */