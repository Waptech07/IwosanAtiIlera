import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

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

interface ProductGridProps {
  loading: boolean;
  paginatedProducts: Product[];
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export default function ProductGrid({
  loading,
  paginatedProducts,
  bgColor,
  borderColor,
  textColor,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {loading ? (
        Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
      ) : paginatedProducts.length > 0 ? (
        paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            bgColor={bgColor}
            borderColor={borderColor}
            textColor={textColor}
          />
        ))
      ) : (
        <p
          className={`col-span-full text-center ${textColor} text-lg font-body`}
        >
          No products found. Try adjusting your filters.
        </p>
      )}
    </div>
  );
}
