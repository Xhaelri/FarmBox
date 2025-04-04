import ProductPage from "./ProductPage"; // Import the correct component

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <ProductPage params={resolvedParams} />;
};

export default Page;
