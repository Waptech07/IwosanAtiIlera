"use client";

import { useTheme } from "next-themes";
import { Check, ChevronDown, Search, Sliders, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface ProductFiltersProps {
  categories: Category[];
  initialFilters: {
    selectedCategory: string;
    searchInput: string;
    descInput: string;
    priceMin: string;
    priceMax: string;
    inStockFilter: boolean;
    sort: string;
  };
  onFilterChange: (filters: {
    selectedCategory: string;
    searchInput: string;
    descInput: string;
    priceMin: string;
    priceMax: string;
    inStockFilter: boolean;
    sort: string;
    page: string;
  }) => void;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export default function ProductFilters({
  categories,
  initialFilters,
  onFilterChange,
  bgColor,
  borderColor,
  textColor,
}: ProductFiltersProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters.selectedCategory
  );
  const [searchInput, setSearchInput] = useState(initialFilters.searchInput);
  const [descInput, setDescInput] = useState(initialFilters.descInput);
  const [priceMin, setPriceMin] = useState(initialFilters.priceMin);
  const [priceMax, setPriceMax] = useState(initialFilters.priceMax);
  const [inStockFilter, setInStockFilter] = useState(
    initialFilters.inStockFilter
  );
  const [sort, setSort] = useState(initialFilters.sort);

  // Ensure the component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync initial filters when they change (e.g., if parent resets filters)
  useEffect(() => {
    setSelectedCategory(initialFilters.selectedCategory);
    setSearchInput(initialFilters.searchInput);
    setDescInput(initialFilters.descInput);
    setPriceMin(initialFilters.priceMin);
    setPriceMax(initialFilters.priceMax);
    setInStockFilter(initialFilters.inStockFilter);
    setSort(initialFilters.sort);
  }, [initialFilters]);

  const handleCategory = (cat: string) => {
    setSelectedCategory(cat);
    onFilterChange({
      selectedCategory: cat,
      searchInput,
      descInput,
      priceMin,
      priceMax,
      inStockFilter,
      sort,
      page: "1",
    });
  };

  const handleSearch = () => {
    onFilterChange({
      selectedCategory,
      searchInput,
      descInput,
      priceMin,
      priceMax,
      inStockFilter,
      sort,
      page: "1",
    });
  };

  const handleDesc = () => {
    onFilterChange({
      selectedCategory,
      searchInput,
      descInput,
      priceMin,
      priceMax,
      inStockFilter,
      sort,
      page: "1",
    });
  };

  const handlePriceRange = () => {
    onFilterChange({
      selectedCategory,
      searchInput,
      descInput,
      priceMin,
      priceMax,
      inStockFilter,
      sort,
      page: "1",
    });
  };

  const handleInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setInStockFilter(newValue);
    onFilterChange({
      selectedCategory,
      searchInput,
      descInput,
      priceMin,
      priceMax,
      inStockFilter: newValue,
      sort,
      page: "1",
    });
  };

  const handleSort = (sortValue: string) => {
    setSort(sortValue);
    onFilterChange({
      selectedCategory,
      searchInput,
      descInput,
      priceMin,
      priceMax,
      inStockFilter,
      sort: sortValue,
      page: "1",
    });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchInput("");
    setDescInput("");
    setPriceMin("0");
    setPriceMax("1000000");
    setInStockFilter(false);
    setSort("");
    onFilterChange({
      selectedCategory: "",
      searchInput: "",
      descInput: "",
      priceMin: "0",
      priceMax: "1000000",
      inStockFilter: false,
      sort: "",
      page: "1",
    });
  };

  if (!mounted) {
    return null; // Prevent rendering until hydrated
  }

  return (
    <div
      className={`mb-12 p-8 rounded-3xl ${bgColor} backdrop-blur-sm bg-opacity-50 shadow-2xl ${borderColor} border-2`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Category Dropdown */}
        <div className="relative">
          <label
            className={`block text-sm font-semibold mb-3 ${textColor} pl-1`}
          >
            Category
          </label>
          <div className="relative group">
            <select
              title="selectedCategory"
              value={selectedCategory}
              onChange={(e) => handleCategory(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor} 
                focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-dark-primary/30
                transition-all duration-300 appearance-none font-medium
                hover:border-primary dark:hover:border-dark-primary`}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name.toLowerCase()}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${textColor}`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search by Name */}
        <div>
          <label
            className={`block text-sm font-semibold mb-3 ${textColor} pl-1`}
          >
            Search Products
          </label>
          <div className="relative flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor}
                focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-dark-primary/30
                transition-all duration-300 pr-14
                hover:border-primary dark:hover:border-dark-primary`}
              placeholder="Organic honey..."
            />
            <button
              onClick={handleSearch}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl
                ${
                  theme === "dark"
                    ? "bg-dark-primary/20 hover:bg-dark-primary/30 text-dark-text"
                    : "bg-primary/20 hover:bg-primary/30 text-charcoal"
                }
                transition-all duration-300`}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search by Description */}
        <div>
          <label
            className={`block text-sm font-semibold mb-3 ${textColor} pl-1`}
          >
            Search Description
          </label>
          <div className="relative flex gap-2">
            <input
              type="text"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor}
                focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-dark-primary/30
                transition-all duration-300 pr-14
                hover:border-primary dark:hover:border-dark-primary`}
              placeholder="Natural remedies..."
            />
            <button
              onClick={handleDesc}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl
                ${
                  theme === "dark"
                    ? "bg-dark-primary/20 hover:bg-dark-primary/30 text-dark-text"
                    : "bg-primary/20 hover:bg-primary/30 text-charcoal"
                }
                transition-all duration-300`}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sort By */}
        <div className="relative">
          <label
            className={`block text-sm font-semibold mb-3 ${textColor} pl-1`}
          >
            Sort By
          </label>
          <div className="relative group">
            <select
              title="Select Sorting"
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor} 
                focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-dark-primary/30
                transition-all duration-300 appearance-none font-medium
                hover:border-primary dark:hover:border-dark-primary`}
            >
              <option value="">Select Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${textColor}`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Price Range, In Stock, and Clear Filters */}
      <div className="mt-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full">
          <label
            className={`block text-sm font-semibold mb-4 ${textColor} pl-1`}
          >
            Price Range: ₦{parseInt(priceMin).toLocaleString()} - ₦
            {parseInt(priceMax).toLocaleString()}
          </label>
          <div className="flex flex-col gap-4">
            <div className="relative pt-4">
              <div className="relative h-2 bg-cream/50 dark:bg-dark-background/50 rounded-full">
                <div
                  className="absolute h-2 bg-primary dark:bg-dark-primary rounded-full"
                  style={{
                    left: `${(parseInt(priceMin) / 20000) * 100}%`,
                    right: `${100 - (parseInt(priceMax) / 1000000) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between gap-4">
                <input
                  title="priceMin"
                  type="range"
                  min="0"
                  max="20000"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="absolute w-full top-0 opacity-0 cursor-pointer"
                />
                <input
                  title="priceMax"
                  type="range"
                  min="0"
                  max="1000000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="absolute w-full top-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <button
              onClick={handlePriceRange}
              className={`self-end flex items-center gap-2 px-5 py-3 rounded-xl font-medium
                ${
                  theme === "dark"
                    ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
                    : "bg-primary hover:bg-accent text-cream"
                }
                transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              <Sliders className="w-5 h-5" />
              Apply Range
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div
              className={`relative w-7 h-7 rounded-lg border-2 ${borderColor} 
                group-hover:border-primary dark:group-hover:border-dark-primary
                transition-all duration-300 ${
                  inStockFilter
                    ? "bg-primary dark:bg-dark-primary border-transparent"
                    : ""
                }`}
            >
              {inStockFilter && (
                <Check className="absolute inset-0 m-auto w-4 h-4 text-cream dark:text-dark-text" />
              )}
              <input
                type="checkbox"
                checked={inStockFilter}
                onChange={handleInStock}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <span className={`text-sm font-medium ${textColor}`}>
              Show Only In Stock
            </span>
          </label>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium
              ${
                theme === "dark"
                  ? "bg-red-500/20 hover:bg-red-500/30 text-dark-text"
                  : "bg-red-500/20 hover:bg-red-500/30 text-charcoal"
              }
              transition-all duration-300 shadow-sm hover:shadow-md`}
          >
            <X className="w-5 h-5" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
