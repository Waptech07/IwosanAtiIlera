import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import ProductImage from "../ProductImage";

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

interface ProductCardProps {
  product: Product;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export default function ProductCard({
  product,
  bgColor,
  borderColor,
  textColor,
}: ProductCardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative group rounded-2xl overflow-hidden shadow-lg ${bgColor} ${borderColor} border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm bg-opacity-50`}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full aspect-square">
          <ProductImage
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.title}
            width={400}
            height={400}
            className="object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 dark:from-dark-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              className={`px-4 py-2 rounded-xl font-body backdrop-blur-sm border border-cream/20 dark:border-dark-text/20
                ${
                  theme === "dark"
                    ? "bg-dark-primary/50 hover:bg-dark-accent/60 text-dark-text"
                    : "bg-primary/50 hover:bg-accent/60 text-cream"
                } transition-all duration-300`}
            >
              Quick View
            </button>
          </div>
        </div>
        <div className="p-5">
          <h3 className={`text-lg font-body ${textColor} truncate`}>
            {product.title}
          </h3>
          <p className={`text-sm ${textColor} opacity-75 truncate`}>
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </p>
          <p className={`text-lg font-body ${textColor} mt-2`}>
            ₦{parseInt(product.price).toLocaleString()}
          </p>
          <p
            className={`text-sm ${
              product.inStock ? "text-secondary" : "text-red-500"
            } dark:${product.inStock ? "text-dark-secondary" : "text-red-400"}`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
