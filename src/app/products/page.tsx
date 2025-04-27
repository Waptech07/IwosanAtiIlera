"use client";

import { Suspense } from 'react';
import ProductsContent from '@/components/products/ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect, Suspense } from "react";
// import { useTheme } from "next-themes";
// import { useQueries } from "@tanstack/react-query";
// import { fetchProducts, fetchCategories, Product, Category } from "@/lib/api";
// import ProductFilters from "@/components/products/ProductFilters";
// import ProductGrid from "@/components/products/ProductGrid";
// import ProductPagination from "@/components/products/ProductPagination";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowPathIcon } from "@heroicons/react/24/solid";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
// import { Sliders, X } from "lucide-react";

// // Force dynamic rendering to bypass prerendering
// export const dynamic = "force-dynamic";

// export default function ProductsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [showFilters, setShowFilters] = useState(true);

//   // Fetch products and categories using React Query
//   const [productsQuery, categoriesQuery] = useQueries({
//     queries: [
//       {
//         queryKey: ["products"],
//         queryFn: fetchProducts,
//       },
//       {
//         queryKey: ["categories"],
//         queryFn: fetchCategories,
//       },
//     ],
//   });

//   const products = productsQuery.data || [];
//   const categories = categoriesQuery.data || [];
//   const loading = productsQuery.isLoading || categoriesQuery.isLoading;
//   const error = productsQuery.error || categoriesQuery.error;

//   // Extract query parameters
//   const category = searchParams.get("category") || "";
//   const search = searchParams.get("search") || "";
//   const desc = searchParams.get("desc") || "";
//   const priceRange = searchParams.get("price_range") || "";
//   const inStock = searchParams.get("in_stock") || "";
//   const sort = searchParams.get("sort") || "";
//   const page = parseInt(searchParams.get("page") || "1");

//   // Filter states
//   const [searchInput, setSearchInput] = useState<string>(search);
//   const [descInput, setDescInput] = useState<string>(desc);
//   const [priceMin, setPriceMin] = useState<string>(
//     priceRange.split("-")[0] || "0"
//   );
//   const [priceMax, setPriceMax] = useState<string>(
//     priceRange.split("-")[1] || "100000"
//   );
//   const [inStockFilter, setInStockFilter] = useState<boolean>(
//     inStock === "true"
//   );
//   const [selectedCategory, setSelectedCategory] = useState<string>(category);

//   // Pagination
//   const productsPerPage = 12;
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   // Filter products
//   const filteredProducts = products.filter((product: Product) => {
//     const matchesCategory = selectedCategory
//       ? product.category.toLowerCase() === selectedCategory.toLowerCase()
//       : true;
//     const matchesSearch = search
//       ? product.title.toLowerCase().includes(search.toLowerCase())
//       : true;
//     const matchesDesc = desc
//       ? product.description.toLowerCase().includes(desc.toLowerCase())
//       : true;
//     const [min, max] = [parseInt(priceMin), parseInt(priceMax)];
//     const productPrice = parseInt(product.price);
//     const matchesPrice =
//       priceMin && priceMax && !isNaN(min) && !isNaN(max)
//         ? productPrice >= min && productPrice <= max
//         : true;
//     const matchesStock = inStock === "true" ? product.inStock : true;

//     return (
//       matchesCategory &&
//       matchesSearch &&
//       matchesDesc &&
//       matchesPrice &&
//       matchesStock
//     );
//   });

//   // Sort products
//   let sortedProducts = [...filteredProducts];
//   if (sort) {
//     if (sort === "price-asc")
//       sortedProducts.sort(
//         (a: Product, b: Product) => parseInt(a.price) - parseInt(b.price)
//       );
//     if (sort === "price-desc")
//       sortedProducts.sort(
//         (a: Product, b: Product) => parseInt(b.price) - parseInt(a.price)
//       );
//     if (sort === "name-asc")
//       sortedProducts.sort((a: Product, b: Product) =>
//         a.title.localeCompare(b.title)
//       );
//     if (sort === "name-desc")
//       sortedProducts.sort((a: Product, b: Product) =>
//         b.title.localeCompare(a.title)
//       );
//   }

//   // Paginate sorted products
//   const startIndex = (page - 1) * productsPerPage;
//   const paginatedProducts = sortedProducts.slice(
//     startIndex,
//     startIndex + productsPerPage
//   );

//   // Update URL with filters
//   const updateFilters = (newParams: Record<string, string>) => {
//     const params = new URLSearchParams(searchParams.toString());
//     Object.entries(newParams).forEach(([key, value]) => {
//       if (value) params.set(key, value);
//       else params.delete(key);
//     });
//     router.push(`/products?${params.toString()}`);
//   };

//   // Handle filter changes
//   const handleSearch = () => updateFilters({ search: searchInput, page: "1" });
//   const handleDesc = () => updateFilters({ desc: descInput, page: "1" });
//   const handlePriceRange = () => {
//     if (priceMin && priceMax) {
//       updateFilters({ price_range: `${priceMin}-${priceMax}`, page: "1" });
//     }
//   };
//   const handleInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInStockFilter(e.target.checked);
//     updateFilters({ in_stock: e.target.checked ? "true" : "", page: "1" });
//   };
//   const handleCategory = (cat: string) => {
//     setSelectedCategory(cat);
//     updateFilters({ category: cat, page: "1" });
//   };
//   const handlePageChange = (newPage: number) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     updateFilters({ page: newPage.toString() });
//   };

//   const textColor = theme === "dark" ? "text-dark-text" : "text-charcoal";
//   const bgColor = theme === "dark" ? "bg-dark-background" : "bg-cream";
//   const borderColor =
//     theme === "dark" ? "border-dark-primary/30" : "border-primary/30";

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null; // Prevent rendering until hydrated
//   }

//   if (error) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
//       >
//         <div className="max-w-md space-y-6">
//           <div className="inline-flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 p-6">
//             <ExclamationTriangleIcon className="h-12 w-12 text-red-500 dark:text-red-400" />
//           </div>
//           <h2 className="text-3xl font-heading font-bold text-foreground">
//             Something Went Wrong
//           </h2>
//           <p className="text-lg text-muted-foreground">
//             We're having trouble loading products. Please check your connection
//             and try again.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => window.location.reload()}
//             className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 transition-all shadow-lg hover:shadow-xl"
//           >
//             <ArrowPathIcon className="h-5 w-5" />
//             Try Again
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${bgColor} ${textColor} py-12`}>
//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
//         <div className="flex flex-row justify-between items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//           <h1
//             className={`text-3xl sm:text-4xl lg:text-5xl font-heading ${textColor} text-center sm:text-left transition-colors`}
//           >
//             Our Collection
//           </h1>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowFilters(!showFilters)}
//             className={`
//       flex items-center justify-center gap-1.5 sm:gap-2 
//       px-3 sm:px-4 py-2 
//       rounded-lg sm:rounded-xl 
//       font-medium
//       ${
//         theme === "dark"
//           ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
//           : "bg-primary hover:bg-accent text-cream"
//       }
//       transition-all duration-300 
//       shadow-sm hover:shadow-md 
//       text-sm sm:text-base
//       min-w-[48px] sm:min-w-fit
//     `}
//           >
//             {showFilters ? (
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
//                 <span className="hidden sm:inline">Hide Filters</span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <Sliders className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
//                 <span className="hidden sm:inline">Show Filters</span>
//               </div>
//             )}
//           </motion.button>
//         </div>

//         <AnimatePresence initial={false}>
//           {showFilters && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <Suspense
//                 fallback={
//                   <div
//                     className={`mb-12 p-8 rounded-3xl ${bgColor} backdrop-blur-sm bg-opacity-50 shadow-2xl ${borderColor} border-2 animate-pulse`}
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                       {[...Array(4)].map((_, i) => (
//                         <div
//                           key={i}
//                           className={`h-14 rounded-xl ${borderColor} ${bgColor}`}
//                         />
//                       ))}
//                     </div>
//                     <div className="mt-8 flex flex-col md:flex-row gap-6 items-center">
//                       <div className="flex-1 w-full space-y-4">
//                         <div className={`h-4 w-1/2 rounded-lg ${bgColor}`} />
//                         <div className={`h-2 rounded-full ${bgColor}`} />
//                         <div
//                           className={`h-12 w-32 ml-auto rounded-xl ${bgColor}`}
//                         />
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <div className={`h-7 w-7 rounded-lg ${bgColor}`} />
//                         <div className={`h-12 w-32 rounded-xl ${bgColor}`} />
//                       </div>
//                     </div>
//                   </div>
//                 }
//               >
//                 <ProductFilters
//                   categories={categories}
//                   initialFilters={{
//                     selectedCategory,
//                     searchInput,
//                     descInput,
//                     priceMin,
//                     priceMax,
//                     inStockFilter,
//                     sort,
//                   }}
//                   onFilterChange={(newFilters) => {
//                     updateFilters({
//                       category: newFilters.selectedCategory,
//                       search: newFilters.searchInput,
//                       desc: newFilters.descInput,
//                       price_range:
//                         newFilters.priceMin && newFilters.priceMax
//                           ? `${newFilters.priceMin}-${newFilters.priceMax}`
//                           : "",
//                       in_stock: newFilters.inStockFilter ? "true" : "",
//                       sort: newFilters.sort,
//                       page: newFilters.page,
//                     });
//                     setSelectedCategory(newFilters.selectedCategory);
//                     setSearchInput(newFilters.searchInput);
//                     setDescInput(newFilters.descInput);
//                     setPriceMin(newFilters.priceMin);
//                     setPriceMax(newFilters.priceMax);
//                     setInStockFilter(newFilters.inStockFilter);
//                   }}
//                   bgColor={bgColor}
//                   borderColor={borderColor}
//                   textColor={textColor}
//                 />
//               </Suspense>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <ProductGrid
//           loading={loading}
//           paginatedProducts={paginatedProducts}
//           bgColor={bgColor}
//           borderColor={borderColor}
//           textColor={textColor}
//           onClearFilters={() => {
//             setSelectedCategory("");
//             setSearchInput("");
//             setDescInput("");
//             setPriceMin("0");
//             setPriceMax("100000");
//             setInStockFilter(false);
//             updateFilters({
//               category: "",
//               search: "",
//               desc: "",
//               price_range: "",
//               in_stock: "",
//               sort: "",
//               page: "1",
//             });
//           }}
//         />

//         {totalPages > 1 && !loading && (
//           <ProductPagination
//             page={page}
//             totalPages={totalPages}
//             handlePageChange={handlePageChange}
//             borderColor={borderColor}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
