import ProductPage from "./ProductPage"; // Import the correct component

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  return <ProductPage params={params} />;
};

export default Page;
