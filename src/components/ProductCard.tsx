import Link from "next/link";
import ProductImage from "./ProductImage";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow bg-cream dark:bg-dark-background">
        <ProductImage
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h3 className="font-heading text-lg text-charcoal dark:text-dark-text">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 font-body">
          {product.description}
        </p>
        <p className="text-primary dark:text-dark-primary font-bold mt-2 font-body">
          ₦{product.price}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-body">
          {product.category}
        </p>
      </div>
    </Link>
  );
}
