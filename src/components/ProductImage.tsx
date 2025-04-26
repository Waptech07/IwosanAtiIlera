"use client";

import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  width,
  height,
  className,
}: ProductImageProps) {
  // Construct full backend URL for development
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1/products", "") ||
    "http://localhost:8000";
  const imageUrl = src.startsWith("/api/v1/products/image/")
    ? `${baseUrl}${src}`
    : src || "/placeholder.jpg";

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL="/placeholder.jpg"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
