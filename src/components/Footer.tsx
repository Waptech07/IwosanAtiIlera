"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/app/images/logo.png";
import FacebookImage from "@/app/images/facebook.png";
import InstagramImage from "@/app/images/instagram.png";
import WhatsAppImage from "@/app/images/whatsapp.png";
import WhatsAppQRImage from "@/app/images/whatsappQr.png";
import XImage from "@/app/images/x.png";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer
      className={`
        ${
          theme === "dark"
            ? "bg-dark-background text-dark-text border-t border-dark-primary/20"
            : "bg-cream text-charcoal border-t border-primary/20"
        }
        py-12 mt-24
      `}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Image
                src={LogoImage}
                alt="Iwosan Ati Ilera"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-accent dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent">
                Iwosan Ati Ilera
              </span>
            </motion.div>
            <p className="text-sm font-body opacity-80 leading-relaxed">
              Empowering communities through organic produce, natural remedies,
              and sustainable vocational training.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-xl font-semibold mb-6">Explore</h3>
            <ul className="space-y-4 font-body">
              {[
                ["Products", "/products"],
                ["Categories", "/categories"],
                ["Training", "/training"],
                ["About", "/about"],
              ].map(([text, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center hover:text-primary dark:hover:text-dark-primary transition-colors"
                  >
                    <span className="h-px w-4 bg-current opacity-0 group-hover:opacity-100 transition-all mr-2" />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6">Connect</h3>
            <div className="space-y-4 font-body">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:iwosan@gmail.com"
                  className="hover:text-primary dark:hover:text-dark-primary transition-colors"
                >
                  iwosan@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+2348036615816"
                  className="hover:text-primary dark:hover:text-dark-primary transition-colors"
                >
                  +234 803 6615 816
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6">
              Connect With Us
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                {[
                  [FacebookImage, "https://m.facebook.com/people/Iwosan-ati-Ilera/61574149693057/"],
                  // [XImage, "https://twitter.com"],
                  // [InstagramImage, "https://instagram.com"],
                  [WhatsAppImage, "https://wa.me/2341234567890"],
                ].map(([img, url], idx) => (
                  <motion.a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className={`p-2 rounded-lg ${
                      theme === "dark"
                        ? "bg-dark-primary/10 hover:bg-dark-primary/20"
                        : "bg-primary/10 hover:bg-primary/20"
                    } transition-colors`}
                  >
                    <Image
                      src={img}
                      alt="Social media"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp QR Code Section */}
              <div className="space-y-2">
                <p className="text-sm font-body opacity-75">
                  Scan to chat on WhatsApp
                </p>
                <motion.a
                  href="https://wa.me/2341234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <Image
                    src={WhatsAppQRImage}
                    alt="WhatsApp QR Code"
                    width={120}
                    height={120}
                    className="rounded-lg border-2 hover:border-primary dark:hover:border-dark-primary transition-colors p-1"
                    style={{
                      borderColor:
                        theme === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                    }}
                  />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`pt-8 border-t ${
            theme === "dark" ? "border-dark-primary/20" : "border-primary/20"
          }`}
        >
          <p className="text-sm text-center opacity-75 font-body">
            © {new Date().getFullYear()} Iwosan Ati Ilera. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
