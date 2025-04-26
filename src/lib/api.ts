import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  stock: number;
  inStock?: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  headers: { "Content-Type": "application/json" },
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get("/products/");
    return response.data.data.map((product: Product) => ({
      ...product,
      inStock: product.stock > 0, // Map stock to inStock
    }));
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await apiClient.get(`/products/${id}/`);
    return {
      ...response.data.data,
      inStock: response.data.data.stock > 0,
    };
  } catch (error) {
    throw new Error("Failed to fetch product details");
  }
};

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  try {
    const response = await apiClient.get(`/products/${slug}/`);
    return {
      ...response.data.data,
      inStock: response.data.data.stock > 0,
    };
  } catch (error) {
    throw new Error("Failed to fetch product details by slug");
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get("/products/categories/");
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
