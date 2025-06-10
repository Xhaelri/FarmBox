// lib/data-service.ts
import { supabase } from "./supabase";
import Product, { ProductImage, Category } from "../types/Product"; // Ensure path is correct

// Helper: Type for the raw item fetched from Supabase (adjust if using generated types)
// This is illustrative; using 'any' as before is also acceptable if types aren't generated.
type RawProductData = {
  id: number;
  name: string | null;
  price: number | null;
  description: string | null;
  stock: number | null;
  category_id: number | null;
  categories: { name: string } | { name: string }[] | null; // Raw relation data
  product_images: { image_url: string; is_primary: boolean }[] | null; // Raw relation data
  rating: number | null;
  brand: string | null;
  sku: string | null;
};

// Helper to safely extract category name
const getCategoryName = (
  categoriesData: RawProductData["categories"]
): Category | null => {
  if (!categoriesData) return null;
  // Handle both single object and array (Supabase might return array even for single)
  const category = Array.isArray(categoriesData)
    ? categoriesData[0]
    : categoriesData;
  return category && typeof category.name === "string"
    ? { name: category.name }
    : null;
};

// Helper to safely process images
const processImages = (
  imagesData: RawProductData["product_images"]
): ProductImage[] | null => {
  // Ensure it's a non-empty array
  if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) {
    return null;
  }
  // Filter out any malformed image objects, though Supabase should return consistent data
  const validImages = imagesData.filter(
    (
      img
    ): img is ProductImage => // Type predicate for stricter checking
      img &&
      typeof img.image_url === "string" &&
      typeof img.is_primary === "boolean"
  );
  return validImages.length > 0 ? validImages : null;
};

export const getProducts = async function (): Promise<Product[]> {
  // Select statement remains the same
  const { data, error } = await supabase.from("products").select(`
      id, name, price, description, stock, category_id,
      categories (name),
      product_images (image_url, is_primary),
      rating, brand, sku
    `);

  if (error) {
    console.error("Error fetching products:", error);
    // Throwing an error is better for React Query's error handling
    throw new Error(`Could not fetch products: ${error.message}`);
  }
  // If data is explicitly null or undefined, return empty array
  if (!data) return [];

  // Transform data using the raw type
  const products: Product[] = data.map(
    (item: RawProductData): Product => ({
      // Ensure ID is treated as number
      id:
        typeof item.id === "number"
          ? item.id
          : parseInt(String(item.id), 10) || 0, // Robust ID parsing
      name: item.name ?? "Unnamed Product", // Provide default name
      price: item.price ?? 0,
      description: item.description ?? "",
      stock: item.stock ?? 0,
      // Ensure category_id is a number, default or handle appropriately
      category_id: item.category_id ?? 0, // Or throw error if category_id is essential
      categories: getCategoryName(item.categories),
      rating: item.rating ?? null,
      product_images: processImages(item.product_images),
      brand: item.brand ?? undefined, // Use undefined for optional fields
      sku: item.sku ?? undefined,
    })
  );

  // Filter out any products that failed parsing (e.g., id 0 if that's invalid)
  return products.filter((p) => p.id > 0);
};

// Accepts number ID
export const getProductById = async function (
  id: number
): Promise<Product | null> {
  // Initial validation
  if (isNaN(id) || id <= 0) {
    console.warn("getProductById called with invalid ID:", id);
    // Let React Query handle the error state rather than calling notFound here
    throw new Error(`Invalid product ID requested: ${id}`);
    // Alternatively, return null immediately: return null;
  }

  // Select statement remains the same
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, name, price, description, stock, category_id,
      categories (name),
      product_images (image_url, is_primary),
      rating, brand, sku
    `
    )
    .eq("id", id)
    .maybeSingle(); // Returns null if not found, data otherwise

  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    // Let React Query handle the error
    throw new Error(`Database error fetching product ${id}: ${error.message}`);
  }

  // If maybeSingle() returns null, product wasn't found
  if (!data) {
    // Returning null is the expected behavior for maybeSingle when not found
    return null;
    // Don't call notFound() here; let the calling component/page decide (e.g., based on useQuery result)
  }

  // Transform the single product data (casting to RawProductData for consistency)
  const rawData = data as RawProductData;
  const product: Product = {
    // Ensure ID is treated as number
    id:
      typeof rawData.id === "number"
        ? rawData.id
        : parseInt(String(rawData.id), 10) || 0,
    name: rawData.name ?? "Unnamed Product",
    price: rawData.price ?? 0,
    description: rawData.description ?? "",
    stock: rawData.stock ?? 0,
    category_id: rawData.category_id ?? 0,
    categories: getCategoryName(rawData.categories),
    rating: rawData.rating ?? null,
    product_images: processImages(rawData.product_images),
    brand: rawData.brand ?? undefined,
    sku: rawData.sku ?? undefined,
  };

  // Add final validation if needed (e.g., check if ID became 0)
  if (product.id <= 0) {
    console.error(
      `Failed to parse valid ID for fetched product data:`,
      rawData
    );
    throw new Error(
      `Workspaceed product data resulted in invalid ID for request ${id}`
    );
  }

  return product;
};

export async function getUser(email: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  return user;
}

export async function newUser(newUser: {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image_url: string;
}) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select()
    .single();

  if (error) {
    throw new Error(`Could not create user: ${error.message}`);
  }

  return data;
}
