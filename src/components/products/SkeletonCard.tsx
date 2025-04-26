import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 rounded-2xl bg-cream/50 dark:bg-dark-background/50 backdrop-blur-sm border border-primary/20 dark:border-dark-primary/20"
    >
      <div className="w-full aspect-square bg-cream/70 dark:bg-dark-background/70 rounded-xl mb-4 animate-pulse" />
      <div className="h-6 bg-cream/70 dark:bg-dark-background/70 rounded-full w-3/4 mb-3" />
      <div className="h-4 bg-cream/70 dark:bg-dark-background/70 rounded-full w-1/2 mb-3" />
      <div className="h-6 bg-cream/70 dark:bg-dark-background/70 rounded-full w-1/4" />
    </motion.div>
  );
}