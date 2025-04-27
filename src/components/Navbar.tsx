"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import LogoImage from "@/app/images/logo.png";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, Category } from "@/lib/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categoryPage, setCategoryPage] = useState(1);
  const { theme } = useTheme();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);

  // Fetch categories using React Query
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Pagination for categories dropdown
  const categoriesPerPage = 5;
  const totalCategoryPages = Math.ceil(categories.length / categoriesPerPage);
  const paginatedCategories = categories.slice(
    (categoryPage - 1) * categoriesPerPage,
    categoryPage * categoriesPerPage
  );

  const handleCategoryClick = (category: string) => {
    setIsCategoriesOpen(false);
    setIsOpen(false); // Close mobile menu if open
    router.push(
      `/products?category=${encodeURIComponent(category.toLowerCase())}`
    );
  };

  // Ensure the component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsFixed(scrollPosition > viewportHeight + 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until hydrated
  }

  const navbarStyle = isFixed
    ? theme === "dark"
      ? "bg-dark-background/95 backdrop-blur-md shadow-lg fixed top-0"
      : "bg-cream/95 backdrop-blur-md shadow-lg fixed top-0"
    : "bg-transparent absolute top-0";

  const textColor = theme === "dark" ? "text-dark-text" : "text-charcoal";
  const hoverColor =
    theme === "dark" ? "hover:text-dark-primary" : "hover:text-primary";
  const dropdownBg = theme === "dark" ? "bg-dark-background" : "bg-cream";
  const dropdownBorder =
    theme === "dark" ? "border-dark-text/20" : "border-charcoal/20";

  return (
    <div>
      {/* Main Navbar */}
      <header
        className={`w-full z-50 transition-all duration-300 ${navbarStyle}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label="Home"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 mr-2 group-hover:rotate-6 transition-transform">
                <Image
                  src={LogoImage}
                  alt="Iwosan Ati Ilera"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className={`text-xl md:text-2xl font-bold ${textColor} group-hover:text-primary dark:group-hover:text-dark-primary transition-colors`}
              >
                Iwosan Ati Ilera
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <NavLink
                href="/"
                text="Home"
                hoverColor={hoverColor}
                textColor={textColor}
              />
              <NavLink
                href="/products"
                text="Products"
                hoverColor={hoverColor}
                textColor={textColor}
              />
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleCategories}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${textColor} ${hoverColor} flex items-center gap-1 relative group`}
                >
                  Categories
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-[2px] ${hoverColor.replace(
                      "hover:",
                      ""
                    )} transition-all group-hover:w-full`}
                  />
                </button>
                {isCategoriesOpen && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg ${dropdownBg} border ${dropdownBorder} z-50`}
                  >
                    {categoriesLoading ? (
                      <div className={`p-4 text-center ${textColor}`}>
                        Loading categories...
                      </div>
                    ) : categoriesError ? (
                      <div
                        className={`p-4 text-center text-red-500 dark:text-red-400`}
                      >
                        Failed to load categories
                      </div>
                    ) : paginatedCategories.length > 0 ? (
                      <div>
                        {paginatedCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`block w-full text-left px-4 py-2 text-sm ${textColor} ${hoverColor} hover:bg-cream/20 dark:hover:bg-dark-background/20 transition-colors`}
                          >
                            {category.name}
                          </button>
                        ))}
                        {/* Pagination Controls */}
                        {totalCategoryPages > 1 && (
                          <div className="flex justify-between items-center px-4 py-2 border-t border-charcoal/20 dark:border-dark-text/20">
                            <button
                              onClick={() =>
                                setCategoryPage((prev) => Math.max(prev - 1, 1))
                              }
                              disabled={categoryPage === 1}
                              className={`p-1 ${textColor} disabled:opacity-50`}
                            >
                              <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <span className={`text-sm ${textColor}`}>
                              Page {categoryPage} of {totalCategoryPages}
                            </span>
                            <button
                              onClick={() =>
                                setCategoryPage((prev) =>
                                  Math.min(prev + 1, totalCategoryPages)
                                )
                              }
                              disabled={categoryPage === totalCategoryPages}
                              className={`p-1 ${textColor} disabled:opacity-50`}
                            >
                              <ChevronRightIcon className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`p-4 text-center ${textColor}`}>
                        No categories found
                      </div>
                    )}
                  </div>
                )}
              </div>
              <NavLink
                href="/training"
                text="Training"
                hoverColor={hoverColor}
                textColor={textColor}
              />
              {/* <NavLink
                href="/about"
                text="About"
                hoverColor={hoverColor}
                textColor={textColor}
              /> */}

              <div
                className="h-6 w-px mx-4 bg-cream/30 dark:bg-dark-text/30"
                aria-hidden="true"
              />
              <AuthButtons theme={theme} />
            </nav>

            {/* Mobile Menu Button */}
            <MobileMenuButton
              isOpen={isOpen}
              toggleMenu={toggleMenu}
              textColor={textColor}
            />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <MobileMenu
          isOpen={isOpen}
          theme={theme}
          toggleMenu={toggleMenu}
          hoverColor={hoverColor}
          textColor={textColor}
          categories={paginatedCategories}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
          handleCategoryClick={handleCategoryClick}
          categoryPage={categoryPage}
          totalCategoryPages={totalCategoryPages}
          setCategoryPage={setCategoryPage}
        />
      </header>

      {/* Spacer to prevent content jump when navbar becomes fixed */}
      {!isFixed && <div className="h-16 md:h-20" />}
    </div>
  );
}

// Reusable Components
const NavLink = ({
  href,
  text,
  hoverColor,
  textColor,
}: {
  href: string;
  text: string;
  hoverColor: string;
  textColor: string;
}) => (
  <Link
    href={href}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${textColor} ${hoverColor} relative group`}
  >
    {text}
    <span
      className={`absolute bottom-0 left-0 w-0 h-[2px] ${hoverColor.replace(
        "hover:",
        ""
      )} transition-all group-hover:w-full`}
    />
  </Link>
);

const AuthButtons = ({ theme }: { theme: string | undefined }) => (
  <div className="flex gap-2">
    <Link
      href="/login"
      className={`px-4 py-2 rounded-md font-medium transition-all ${
        theme === "dark"
          ? "bg-dark-primary hover:bg-dark-accent text-dark-text"
          : "bg-primary hover:bg-accent text-cream"
      }`}
    >
      Login
    </Link>
    <Link
      href="/signup"
      className={`px-4 py-2 rounded-md font-medium transition-all border ${
        theme === "dark"
          ? "border-dark-primary text-dark-primary hover:bg-dark-primary/20"
          : "border-primary text-primary hover:bg-primary/10"
      }`}
    >
      Sign Up
    </Link>
  </div>
);

const MobileMenuButton = ({
  isOpen,
  toggleMenu,
  textColor,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
  textColor: string;
}) => (
  <button
    onClick={toggleMenu}
    className={`md:hidden p-2 rounded-md ${textColor} hover:bg-cream/20 dark:hover:bg-dark-background/20 transition-colors`}
    aria-label="Toggle menu"
  >
    {isOpen ? (
      <XMarkIcon className="h-6 w-6" />
    ) : (
      <Bars3Icon className="h-6 w-6" />
    )}
  </button>
);

const MobileMenu = ({
  isOpen,
  theme,
  toggleMenu,
  hoverColor,
  textColor,
  categories,
  categoriesLoading,
  categoriesError,
  handleCategoryClick,
  categoryPage,
  totalCategoryPages,
  setCategoryPage,
}: {
  isOpen: boolean;
  theme: string | undefined;
  toggleMenu: () => void;
  hoverColor: string;
  textColor: string;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: unknown;
  handleCategoryClick: (category: string) => void;
  categoryPage: number;
  totalCategoryPages: number;
  setCategoryPage: (page: number) => void;
}) =>
  isOpen && (
    <div
      className={`md:hidden ${
        theme === "dark" ? "bg-dark-background" : "bg-cream"
      } border-t ${
        theme === "dark" ? "border-dark-text/20" : "border-charcoal/20"
      }`}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <MobileNavLink
          href="/"
          text="Home"
          onClick={toggleMenu}
          textColor={textColor}
          hoverColor={hoverColor}
        />
        <MobileNavLink
          href="/products"
          text="Products"
          onClick={toggleMenu}
          textColor={textColor}
          hoverColor={hoverColor}
        />
        {/* Categories Section in Mobile Menu */}
        <div className="border-t border-charcoal/20 dark:border-dark-text/20 pt-2">
          <span
            className={`block px-3 py-2 text-base font-medium ${textColor}`}
          >
            Categories
          </span>
          {categoriesLoading ? (
            <div className={`px-3 py-2 text-sm ${textColor}`}>
              Loading categories...
            </div>
          ) : categoriesError ? (
            <div className={`px-3 py-2 text-sm text-red-500 dark:text-red-400`}>
              Failed to load categories
            </div>
          ) : categories.length > 0 ? (
            <div>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`block w-full text-left px-5 py-2 text-sm ${textColor} ${hoverColor} hover:bg-cream/20 dark:hover:bg-dark-background/20 transition-colors`}
                >
                  {category.name}
                </button>
              ))}
              {/* Pagination Controls */}
              {totalCategoryPages > 1 && (
                <div className="flex justify-between items-center px-5 py-2">
                  <button
                    onClick={() =>
                      setCategoryPage(Math.max(categoryPage - 1, 1))
                    }
                    disabled={categoryPage === 1}
                    className={`p-1 ${textColor} disabled:opacity-50`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <span className={`text-sm ${textColor}`}>
                    Page {categoryPage} of {totalCategoryPages}
                  </span>
                  <button
                    onClick={() =>
                      setCategoryPage(
                        Math.min(categoryPage + 1, totalCategoryPages)
                      )
                    }
                    disabled={categoryPage === totalCategoryPages}
                    className={`p-1 ${textColor} disabled:opacity-50`}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={`px-3 py-2 text-sm ${textColor}`}>
              No categories found
            </div>
          )}
        </div>
        <MobileNavLink
          href="/training"
          text="Training"
          onClick={toggleMenu}
          textColor={textColor}
          hoverColor={hoverColor}
        />
        {/* <MobileNavLink
          href="/about"
          text="About"
          onClick={toggleMenu}
          textColor={textColor}
          hoverColor={hoverColor}
        /> */}

        <div className="pt-4 pb-2 border-t border-charcoal/20 dark:border-dark-text/20">
          <AuthButtons theme={theme} />
        </div>
      </div>
    </div>
  );

const MobileNavLink = ({
  href,
  text,
  onClick,
  hoverColor,
  textColor,
}: {
  href: string;
  text: string;
  onClick: () => void;
  hoverColor: string;
  textColor: string;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${textColor} ${hoverColor}`}
  >
    {text}
  </Link>
);
