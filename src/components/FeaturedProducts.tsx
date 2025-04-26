"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./products/ProductCard";
import { getProducts } from "@/lib/api";
import { useTheme } from "next-themes";

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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 6));
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const textColor = theme === "dark" ? "text-dark-text" : "text-charcoal";
  const bgColor = theme === "dark" ? "bg-dark-background" : "bg-cream";
  const borderColor =
    theme === "dark" ? "border-dark-primary/30" : "border-primary/30";

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className={`font-heading text-3xl ${textColor} mb-8 text-center`}>
        Featured Products
      </h2>
      {loading && (
        <div className={`text-center ${textColor} font-body`}>Loading...</div>
      )}
      {error && (
        <div className="text-center text-red-500 dark:text-red-400 font-body">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
