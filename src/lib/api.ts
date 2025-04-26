import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  stock: number;
  inStock?: boolean;
  slug: string;
  created_at: string; // Added
  updated_at: string; // Added
}

interface Category {
  id: number;
  name: string;
  description: string;
}

// In-memory cache with expiration
const cache: {
  [key: string]: {
    data: any;
    timestamp: number;
    expiry: number; // in milliseconds
  };
} = {};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  headers: { "Content-Type": "application/json" },
});

export const getProducts = async (): Promise<Product[]> => {
  const cacheKey = "products";
  const cached = cache[cacheKey];

  // Check if cache exists and is still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await apiClient.get("/products/");
    const data = response.data.data.map((product: Product) => ({
      ...product,
      inStock: product.stock > 0, // Map stock to inStock
    }));

    // Store in cache
    cache[cacheKey] = {
      data,
      timestamp: Date.now(),
      expiry: CACHE_DURATION,
    };

    return data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const cacheKey = `product_${id}`;
  const cached = cache[cacheKey];

  // Check if cache exists and is still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await apiClient.get(`/products/${id}/`);
    const data = {
      ...response.data.data,
      inStock: response.data.data.stock > 0,
    };

    // Store in cache
    cache[cacheKey] = {
      data,
      timestamp: Date.now(),
      expiry: CACHE_DURATION,
    };

    return data;
  } catch (error) {
    throw new Error("Failed to fetch product details");
  }
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const cacheKey = `product_slug_${slug}`;
  const cached = cache[cacheKey];

  // Check if cache exists and is still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await apiClient.get(`/products/${slug}/`);
    const data = {
      ...response.data.data,
      inStock: response.data.data.stock > 0,
    };

    // Store in cache
    cache[cacheKey] = {
      data,
      timestamp: Date.now(),
      expiry: CACHE_DURATION,
    };

    return data;
  } catch (error) {
    throw new Error("Failed to fetch product details by slug");
  }
};

export const getCategories = async (): Promise<Category[]> => {
  const cacheKey = "categories";
  const cached = cache[cacheKey];

  // Check if cache exists and is still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await apiClient.get("/products/categories/");
    const data = response.data.data;

    // Store in cache
    cache[cacheKey] = {
      data,
      timestamp: Date.now(),
      expiry: CACHE_DURATION,
    };

    return data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
