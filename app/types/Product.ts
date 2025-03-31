interface ProductImage {
  image_url: string;
  is_primary: boolean;
}

interface Product {
  id: string;  // This is a UUID in Supabase
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  categories: { name: string } | { name: string }[];  // Can be either an object or array
  rating: number;
  product_images?: ProductImage[];  // Make optional since some data sources might not have it
}

export default Product;