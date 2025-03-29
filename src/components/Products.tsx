import Image from "next/image";
import Link from "next/link";

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
const Products = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: Product[] = await res.json();

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 py-10 mx-4 sm:mx-[10%]">
        {data.map((product) => (
          <Link
          href={`/shop/${product.id}`}
            key={product.id}
            className="group flex flex-col items-center justify-between pt-10 p-5 border-1 border-[#cacaca] rounded-lg transition-all duration-300 ease-in-out hover:border-[#4b8a44] hover:shadow-[0_0_15px_0_rgba(0,178,7,0.2)]"
          >
            <div>
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={150}
                className="object-contain"
              />
            </div>
            <div >
              <h2 className="text-[#4D4D4D] line-clamp-1 text-sm group-hover:text-[#2C742F]">{product.title}</h2>
              <p className="text-black text-xs">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
  );
};

export default Products;
