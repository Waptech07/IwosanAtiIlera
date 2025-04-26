"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useQueries } from "@tanstack/react-query";
import { fetchProducts, fetchCategories, Product, Category } from "@/lib/api";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";

// Force dynamic rendering to bypass prerendering
export const dynamic = "force-dynamic";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fetch products and categories using React Query
  const [productsQuery, categoriesQuery] = useQueries({
    queries: [
      {
        queryKey: ["products"],
        queryFn: fetchProducts,
      },
      {
        queryKey: ["categories"],
        queryFn: fetchCategories,
      },
    ],
  });

  const products = productsQuery.data || [];
  const categories = categoriesQuery.data || [];
  const loading = productsQuery.isLoading || categoriesQuery.isLoading;
  const error = productsQuery.error || categoriesQuery.error;

  // Extract query parameters
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const desc = searchParams.get("desc") || "";
  const priceRange = searchParams.get("price_range") || "";
  const inStock = searchParams.get("in_stock") || "";
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page") || "1");

  // Filter states
  const [searchInput, setSearchInput] = useState<string>(search);
  const [descInput, setDescInput] = useState<string>(desc);
  const [priceMin, setPriceMin] = useState<string>(
    priceRange.split("-")[0] || "0"
  );
  const [priceMax, setPriceMax] = useState<string>(
    priceRange.split("-")[1] || "1000000"
  );
  const [inStockFilter, setInStockFilter] = useState<boolean>(
    inStock === "true"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(category);

  // Pagination
  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Filter products
  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = search
      ? product.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesDesc = desc
      ? product.description.toLowerCase().includes(desc.toLowerCase())
      : true;
    const [min, max] = [parseInt(priceMin), parseInt(priceMax)];
    const productPrice = parseInt(product.price);
    const matchesPrice =
      priceMin && priceMax && !isNaN(min) && !isNaN(max)
        ? productPrice >= min && productPrice <= max
        : true;
    const matchesStock = inStock === "true" ? product.inStock : true;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesDesc &&
      matchesPrice &&
      matchesStock
    );
  });

  // Sort products
  let sortedProducts = [...filteredProducts];
  if (sort) {
    if (sort === "price-asc")
      sortedProducts.sort(
        (a: Product, b: Product) => parseInt(a.price) - parseInt(b.price)
      );
    if (sort === "price-desc")
      sortedProducts.sort(
        (a: Product, b: Product) => parseInt(b.price) - parseInt(a.price)
      );
    if (sort === "name-asc")
      sortedProducts.sort((a: Product, b: Product) =>
        a.title.localeCompare(b.title)
      );
    if (sort === "name-desc")
      sortedProducts.sort((a: Product, b: Product) =>
        b.title.localeCompare(a.title)
      );
  }

  // Paginate sorted products
  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Update URL with filters
  const updateFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/products?${params.toString()}`);
  };

  // Handle filter changes
  const handleSearch = () => updateFilters({ search: searchInput, page: "1" });
  const handleDesc = () => updateFilters({ desc: descInput, page: "1" });
  const handlePriceRange = () => {
    if (priceMin && priceMax) {
      updateFilters({ price_range: `${priceMin}-${priceMax}`, page: "1" });
    }
  };
  const handleInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInStockFilter(e.target.checked);
    updateFilters({ in_stock: e.target.checked ? "true" : "", page: "1" });
  };
  const handleCategory = (cat: string) => {
    setSelectedCategory(cat);
    updateFilters({ category: cat, page: "1" });
  };
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateFilters({ page: newPage.toString() });
  };

  const textColor = theme === "dark" ? "text-dark-text" : "text-charcoal";
  const bgColor = theme === "dark" ? "bg-dark-background" : "bg-cream";
  const borderColor =
    theme === "dark" ? "border-dark-primary/30" : "border-primary/30";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until hydrated
  }

  if (error) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor} py-8 text-center`}>
        <p className={`text-lg font-body ${textColor}`}>
          Failed to load products. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className={`mt-4 px-6 py-2 rounded-md font-body ${
            theme === "dark"
              ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
              : "bg-primary hover:bg-accent text-cream"
          } transition-all hover:scale-105`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} py-12`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-5xl font-heading mb-8 ${textColor} text-center`}>
          Explore Our Organic Products
        </h1>

        <ProductFilters
          categories={categories}
          initialFilters={{
            selectedCategory,
            searchInput,
            descInput,
            priceMin,
            priceMax,
            inStockFilter,
            sort,
          }}
          onFilterChange={(newFilters) => {
            updateFilters({
              category: newFilters.selectedCategory,
              search: newFilters.searchInput,
              desc: newFilters.descInput,
              price_range:
                newFilters.priceMin && newFilters.priceMax
                  ? `${newFilters.priceMin}-${newFilters.priceMax}`
                  : "",
              in_stock: newFilters.inStockFilter ? "true" : "",
              sort: newFilters.sort,
              page: newFilters.page,
            });
            setSelectedCategory(newFilters.selectedCategory);
            setSearchInput(newFilters.searchInput);
            setDescInput(newFilters.descInput);
            setPriceMin(newFilters.priceMin);
            setPriceMax(newFilters.priceMax);
            setInStockFilter(newFilters.inStockFilter);
          }}
          bgColor={bgColor}
          borderColor={borderColor}
          textColor={textColor}
        />

        <ProductGrid
          loading={loading}
          paginatedProducts={paginatedProducts}
          bgColor={bgColor}
          borderColor={borderColor}
          textColor={textColor}
        />

        {totalPages > 1 && !loading && (
          <ProductPagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            borderColor={borderColor}
          />
        )}
      </div>
    </div>
  );
}
