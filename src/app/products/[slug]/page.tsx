"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { getProductBySlug, getProducts } from "@/lib/api"; // Import Product interface
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


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
  created_at: string;
  updated_at: string;
}

// Skeleton Loader for Product Details
const SkeletonDetail = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

// Image Carousel using Swiper
const ImageCarousel = ({ images }: { images: string[] }) => {
  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={displayImages.length > 1}
        className="w-full h-full"
      >
        {displayImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { theme } = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productData = await getProductBySlug(slug);
        console.log("Product data:", productData);
        setProduct(productData);

        if (productData) {
          const allProducts = await getProducts();
          const related = allProducts
            .filter(
              (p: Product) =>
                p.category === productData.category && p.slug !== slug
            )
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

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

  if (error) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor} py-8 text-center`}>
        <p>{error}</p>
        <Link
          href="/products"
          className={`mt-4 inline-block px-6 py-2 rounded-md font-body ${
            theme === "dark"
              ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
              : "bg-primary hover:bg-accent text-cream"
          } transition-all hover:scale-105`}
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor} py-12`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonDetail />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor} py-8 text-center`}>
        <p>
          Product not found. It may have been removed or the link is incorrect.
        </p>
        <Link
          href="/products"
          className={`mt-4 inline-block px-6 py-2 rounded-md font-body ${
            theme === "dark"
              ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
              : "bg-primary hover:bg-accent text-cream"
          } transition-all hover:scale-105`}
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} py-12`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className={`text-sm font-body ${textColor} hover:text-primary dark:hover:text-dark-primary transition-colors mb-6 inline-block`}
        >
          ← Back to Products
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Carousel */}
          <ImageCarousel images={product.images} />

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className={`text-4xl font-heading ${textColor} mb-3`}>
              {product.title}
            </h1>
            <p className={`text-sm ${textColor} opacity-75 mb-4`}>
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </p>
            <p className={`text-3xl font-body ${textColor} mb-4`}>
              ₦{parseInt(product.price).toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                product.inStock
                  ? "text-green-500 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              } mb-6`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p
              className={`text-base font-body ${textColor} mb-8 leading-relaxed`}
            >
              {product.description}
            </p>
            <button
              disabled={!product.inStock}
              className={`px-8 py-4 rounded-md font-body text-lg ${
                theme === "dark"
                  ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
                  : "bg-primary hover:bg-accent text-cream"
              } disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-md hover:shadow-lg`}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2
              className={`text-3xl font-heading ${textColor} mb-8 text-center`}
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((related: Product) => (
                <div
                  key={related.id}
                  className={`relative group rounded-xl overflow-hidden shadow-lg ${bgColor} ${borderColor} border transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
                >
                  <Link href={`/products/${related.slug}`}>
                    <div className="relative w-full h-56">
                      <Image
                        src={related.images[0] || "/placeholder.jpg"}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          className={`px-4 py-2 rounded-md font-body ${
                            theme === "dark"
                              ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
                              : "bg-primary hover:bg-accent text-cream"
                          } transition-all`}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className={`text-lg font-body ${textColor} truncate`}>
                        {related.title}
                      </h3>
                      <p className={`text-sm ${textColor} opacity-75 truncate`}>
                        {related.category.charAt(0).toUpperCase() +
                          related.category.slice(1)}
                      </p>
                      <p className={`text-lg font-body ${textColor} mt-2`}>
                        ₦{parseInt(related.price).toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          related.inStock
                            ? "text-green-500 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {related.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
