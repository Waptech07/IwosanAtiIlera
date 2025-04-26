'use client';

import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => 
      setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className={`
            fixed bottom-24 right-6 z-50
            h-12 w-12 rounded-full 
            backdrop-blur-lg border 
            flex items-center justify-center
            shadow-lg hover:shadow-xl
            transition-all duration-300
            bg-white/80 hover:bg-white 
            dark:bg-gray-900/80 dark:hover:bg-gray-900
            border-gray-200 dark:border-gray-700
            hover:scale-110 hover:ring-2 
            ring-primary/20 dark:ring-primary/30
          `}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}