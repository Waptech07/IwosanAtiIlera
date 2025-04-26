"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/app/images/logo.png";
import FacebookImage from "@/app/images/facebook.png"
import InstagramImage from "@/app/images/instagram.png"
import XImage from "@/app/images/x.png"
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until hydrated
  }

  return (
    <footer
      className={`
        ${
          theme === "dark"
            ? "bg-dark-background text-dark-text"
            : "bg-cream text-charcoal"
        }
        py-8
      `}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Image
              src={LogoImage}
              alt="Iwosan Ati Ilera"
              width={100}
              height={100}
              className="mr-2"
            />
            <span className="font-heading text-xl">Iwosan Ati Ilera</span>
          </div>
          <p className="text-sm font-body">
            Organic honey, herbs, and vocational training for sustainable
            living.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 font-body">
            <li>
              <Link
                href="/products"
                className="hover:text-primary dark:hover:text-dark-primary transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-primary dark:hover:text-dark-primary transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/training"
                className="hover:text-primary dark:hover:text-dark-primary transition-colors"
              >
                Training
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-primary dark:hover:text-dark-primary transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-lg mb-4">Contact Us</h3>
          <p className="text-sm font-body">Email: info@iwosanatiilera.com</p>
          <p className="text-sm font-body">Phone: +234 123 456 7890</p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={FacebookImage}
                alt="Facebook"
                width={40}
                height={40}
                className="text-primary dark:text-dark-primary hover:text-accent dark:hover:text-dark-accent transition-colors"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={XImage}
                alt="Twitter"
                width={40}
                height={40}
                className="text-primary dark:text-dark-primary hover:text-accent dark:hover:text-dark-accent transition-colors"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={InstagramImage}
                alt="Instagram"
                width={40}
                height={40}
                className="text-primary dark:text-dark-primary hover:text-accent dark:hover:text-dark-accent transition-colors"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-sm font-body">
        © {new Date().getFullYear()} Iwosan Ati Ilera. All rights reserved.
      </div>
    </footer>
  );
}
