import { motion } from "framer-motion";

interface SkeletonCardProps {
  bgColor: string;
  borderColor: string;
}

export default function SkeletonCard({
  bgColor,
  borderColor,
}: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-4 rounded-2xl backdrop-blur-sm border ${borderColor}`}
    >
      <div
        className={`w-full aspect-square rounded-xl mb-4 animate-pulse ${bgColor}`}
      />
      <div className={`h-6 rounded-full w-3/4 mb-3 animate-pulse ${bgColor}`} />
      <div className={`h-4 rounded-full w-1/2 mb-3 animate-pulse ${bgColor}`} />
      <div className={`h-6 rounded-full w-1/4 animate-pulse ${bgColor}`} />
    </motion.div>
  );
}
