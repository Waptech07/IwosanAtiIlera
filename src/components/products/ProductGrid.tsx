import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
  onClearFilters: () => void;
}

export default function ProductGrid({
  loading,
  paginatedProducts,
  bgColor,
  borderColor,
  textColor,
  onClearFilters,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
              We couldn't find any matches. Try adjusting your filters or search
              terms.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearFilters} 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              <XMarkIcon className="h-5 w-5" />
              Reset Filters
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
