"use client";

import Link from "next/link";
import ProductCard from "./products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/lib/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fetch products using React Query
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"], // Unique key for caching
    queryFn: fetchProducts,
  });

  // Ensure the component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until hydrated
  }

  const textColor = theme === "dark" ? "text-dark-text" : "text-charcoal";
  const bgColor = theme === "dark" ? "bg-dark-background" : "bg-cream";
  const borderColor =
    theme === "dark" ? "border-dark-primary/30" : "border-primary/30";

  // Limit to 6 featured products
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className={`font-heading text-3xl ${textColor} mb-8 text-center`}>
        Featured Products
      </h2>
      {isLoading && (
        <div className={`text-center ${textColor} font-body`}>Loading...</div>
      )}
      {error && (
        <div className="text-center text-red-500 dark:text-red-400 font-body">
          Failed to load products
        </div>
      )}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              bgColor={bgColor}
              borderColor={borderColor}
              textColor={textColor}
            />
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <Link
          href="/products"
          className={`inline-block px-6 py-3 rounded-md font-body transition-all ${
            theme === "dark"
              ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
              : "bg-primary hover:bg-accent text-cream"
          }`}
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
