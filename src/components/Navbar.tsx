"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import LogoImage from "@/app/images/logo.png";
import { useTheme } from "next-themes";
import React from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Ensure the component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Become fixed when scrolled past 100vh
      setIsFixed(scrollPosition > viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until hydrated
  }

  // Navbar styling based on scroll and theme
  const navbarStyle = isFixed
    ? theme === "dark"
      ? "bg-dark-background/95 backdrop-blur-md shadow-lg fixed top-0"
      : "bg-cream/95 backdrop-blur-md shadow-lg fixed top-0"
    : "bg-transparent absolute top-0";

  const textColor = theme === "dark" ? "text-dark-text" : "text-charcoal"; // Fixed: Use text-charcoal in light mode
  const hoverColor =
    theme === "dark" ? "hover:text-dark-primary" : "hover:text-primary";

  return (
    <>
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
              <NavLink
                href="/categories"
                text="Categories"
                hoverColor={hoverColor}
                textColor={textColor}
              />
              <NavLink
                href="/training"
                text="Training"
                hoverColor={hoverColor}
                textColor={textColor}
              />
              <NavLink
                href="/about"
                text="About"
                hoverColor={hoverColor}
                textColor={textColor}
              />

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
        />
      </header>

      {/* Spacer to prevent content jump when navbar becomes fixed */}
      {!isFixed && <div className="h-16 md:h-20" />}
    </>
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
}: {
  isOpen: boolean;
  theme: string | undefined;
  toggleMenu: () => void;
  hoverColor: string;
  textColor: string;
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
        <MobileNavLink
          href="/categories"
          text="Categories"
          onClick={toggleMenu}
          textColor={textColor}
          hoverColor={hoverColor}
        />
        <MobileNavLink
          href="/training"
          text="Training"
          onClick={toggleMenu}
          textColor={textColor}
          hoverColor={hoverColor}
        />
        <MobileNavLink
          href="/about"
          text="About"
          onClick={toggleMenu}
          textColor={textColor}
          hoverColor={hoverColor}
        />

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
