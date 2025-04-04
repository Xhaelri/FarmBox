// types/Product.ts
interface ProductImage {
  image_url: string;
  is_primary: boolean;
}

interface Category {
  name: string;
}

interface Product {
  id: number; // Changed to number
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  categories: Category | null; // Simplified relation
  rating: number | null;
  product_images: ProductImage[] | null;
  brand?: string; // Optional
  sku?: string; // Optional
}

export default Product;
export type { ProductImage, Category };