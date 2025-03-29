import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product: Product = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="object-contain"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-700">{product.description}</p>
        <p className="font-semibold text-lg">${product.price}</p>
        <p>Category: {product.category}</p>
        <p>
          Rating: ⭐️ {product.rating.rate} ({product.rating.count} reviews)
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
