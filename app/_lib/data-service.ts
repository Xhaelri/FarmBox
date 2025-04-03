// data-service.ts
import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export const getProducts = async function() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, 
      name, 
      price, 
      description,
      stock, 
      category_id,
      categories (name), 
      product_images (image_url, is_primary),
      rating
    `);

    //For Testing
   // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log('Error fetching products:', error);
    return [];
  }

  // Transform data to match our Product interface


  return data;
}

export const getProductById = async function(id: string){
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, 
      name, 
      price, 
      description,
      stock, 
      category_id,
      categories (name), 
      product_images (image_url, is_primary),
      rating
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.log('Error fetching product:', error);
    notFound()
  }

return data;
}