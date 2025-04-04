export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  seller_id?: string;
  created_at?: string;
  rating?: number;
  discount_percentage?: number;
  sku?: string;
  brand?: string;
  reviews_count?: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  uploaded_at: string;
  sort_order: number;
}

export default Product;