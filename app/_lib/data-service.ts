// data-service.ts
import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export const getProducts = async function() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      stock,
      category_id,
      seller_id,
      created_at,
      rating,
      discount_percentage,
      sku,
      brand,
      reviews_count,
      categories (name),
      product_images (id, image_url, is_primary, uploaded_at, sort_order)
    `);

  // For Testing
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  
  if (error) {
    console.log('Error fetching products:', error);
    return [];
  }

  // Transform data to match our Product interface
  return data;
}

export const getProductById = async function(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      stock,
      category_id,
      seller_id,
      created_at,
      rating,
      discount_percentage,
      sku,
      brand,
      reviews_count,
      categories (name),
      product_images (id, image_url, is_primary, uploaded_at, sort_order),
      product_tags (id, tag_name, created_at)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.log('Error fetching product:', error);
    notFound();
  }

  return data;
}


export const getImagesByProductId = async function(productId: string) {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.log('Error fetching product images:', error);
    return [];
  }
  
  return data;
}


export const getImagesForMultipleProducts = async function(productIds: string[]) {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .in('product_id', productIds)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.log('Error fetching images for multiple products:', error);
    return {};
  }
  
  // Group images by product_id
  const imagesByProductId = data.reduce((acc, image) => {
    const productId = image.product_id;
    if (!acc[productId]) {
      acc[productId] = [];
    }
    acc[productId].push(image);
    return acc;
  }, {});
  
  return imagesByProductId;
}

