"use client";

import Link from "next/link";
import ProductCard from "./products/ProductCard";
import SkeletonCard from "./products/SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/lib/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} bgColor={bgColor} borderColor={borderColor} />)}
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full py-24 text-center"
        >
          <div className="max-w-md mx-auto space-y-6">
            <div className="inline-flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 p-6">
              <MagnifyingGlassIcon className="h-12 w-12 text-amber-500 dark:text-amber-400" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground">
              No Products Found
            </h2>
            <p className="text-lg text-muted-foreground">
              We couldn't find any product. Try refreshing the page.
            </p>
          </div>
        </motion.div>
      )}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
