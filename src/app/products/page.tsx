"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { getProducts, getCategories } from "@/lib/api";
import ProductFilters from "@/components/products/ProductFilters";

// Define interfaces (copied from src/lib/api.ts for clarity)
interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  inStock?: boolean;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function ProductsPage() {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    selectedCategory: "",
    searchInput: "",
    descInput: "",
    priceMin: "0",
    priceMax: "1000000",
    inStockFilter: false,
    sort: "",
    page: "1",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        let filteredProducts = productsData;

        // Apply category filter
        if (filters.selectedCategory) {
          filteredProducts = filteredProducts.filter(
            (p) => p.category.toLowerCase() === filters.selectedCategory
          );
        }

        // Apply search by name
        if (filters.searchInput) {
          filteredProducts = filteredProducts.filter((p) =>
            p.title.toLowerCase().includes(filters.searchInput.toLowerCase())
          );
        }

        // Apply search by description
        if (filters.descInput) {
          filteredProducts = filteredProducts.filter((p) =>
            p.description
              .toLowerCase()
              .includes(filters.descInput.toLowerCase())
          );
        }

        // Apply price range
        filteredProducts = filteredProducts.filter((p) => {
          const price = parseInt(p.price);
          return (
            price >= parseInt(filters.priceMin) &&
            price <= parseInt(filters.priceMax)
          );
        });

        // Apply in stock filter
        if (filters.inStockFilter) {
          filteredProducts = filteredProducts.filter((p) => p.inStock);
        }

        // Apply sorting
        if (filters.sort) {
          filteredProducts = [...filteredProducts].sort((a, b) => {
            if (filters.sort === "price-asc")
              return parseInt(a.price) - parseInt(b.price);
            if (filters.sort === "price-desc")
              return parseInt(b.price) - parseInt(a.price);
            if (filters.sort === "name-asc")
              return a.title.localeCompare(b.title);
            if (filters.sort === "name-desc")
              return b.title.localeCompare(a.title);
            return 0;
          });
        }

        setProducts(filteredProducts);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load products or categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  if (!mounted) {
    return null;
  }

  const textColor = theme === "dark" ? "text-dark-text" : "text-charcoal";
  const bgColor = theme === "dark" ? "bg-dark-background" : "bg-cream";
  const borderColor =
    theme === "dark" ? "border-dark-primary/30" : "border-primary/30";

  if (error) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor} py-8 text-center`}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} py-12`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-4xl font-heading ${textColor} mb-8 text-center`}>
          Products
        </h1>

        <ProductFilters
          categories={categories}
          initialFilters={{
            selectedCategory: filters.selectedCategory,
            searchInput: filters.searchInput,
            descInput: filters.descInput,
            priceMin: filters.priceMin,
            priceMax: filters.priceMax,
            inStockFilter: filters.inStockFilter,
            sort: filters.sort,
          }}
          onFilterChange={(newFilters) => setFilters(newFilters)}
          bgColor={bgColor}
          borderColor={borderColor}
          textColor={textColor}
        />

        {loading ? (
          <div className={`text-center ${textColor}`}>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className={`p-4 rounded-lg ${bgColor} ${borderColor} border shadow-md`}
              >
                <h2 className={`text-lg font-heading ${textColor}`}>
                  {product.title}
                </h2>
                <p className={`text-sm ${textColor}`}>{product.description}</p>
                <p className={`text-lg ${textColor}`}>
                  ₦{parseInt(product.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
