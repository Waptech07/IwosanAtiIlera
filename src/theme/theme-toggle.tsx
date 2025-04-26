"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        fixed bottom-6 right-6 z-50
        h-12 w-12 rounded-full 
        backdrop-blur-lg border 
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-300
        bg-cream/80 hover:bg-cream 
        dark:bg-dark-background/80 dark:hover:bg-dark-background
        border-charcoal/20 dark:border-dark-text/20
        hover:scale-110 hover:ring-2 
        ring-primary/20 dark:ring-dark-primary/30
      `}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 45, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <MoonIcon className="h-6 w-6 text-dark-primary" />
          ) : (
            <SunIcon className="h-6 w-6 text-primary" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
