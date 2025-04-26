"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Parallax,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroImage1 from "@/app/images/hero_1.avif";
import HeroImage2 from "@/app/images/hero_image.jpg";
import HeroImage3 from "@/app/images/hero_image.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const slides = [
  {
    image: HeroImage1,
    title: "Nature's Sweetest Treasure",
    subtitle: "Raw Organic Honey Collection",
    cta: "Explore Products",
    link: "/products",
  },
  {
    image: HeroImage2,
    title: "Herbal Wisdom",
    subtitle: "Ancient Remedies, Modern Wellness",
    cta: "Discover Herbs",
    link: "/herbs",
  },
  {
    image: HeroImage3,
    title: "Grow With Us",
    subtitle: "Sustainable Agriculture Training",
    cta: "Learn More",
    link: "/training",
  },
];

export default function HeroCarousel() {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (_swiper: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <section className="relative h-screen w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        effect="fade"
        speed={1500}
        parallax={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-3 !h-3 !bg-white/50 !opacity-100 hover:!scale-125 !transition-all"></span>`;
          },
        }}
        loop={true}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent dark:from-gray-900/60 z-10" />

            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full text-center justify-center flex items-center relative z-20">
              <div
                className="max-w-2xl text-white dark:text-gray-100"
                data-swiper-parallax="-300"
              >
                <h1
                  className="font-heading text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight"
                  data-swiper-parallax-opacity="0"
                  data-swiper-parallax-scale="0.5"
                >
                  {slide.title}
                </h1>
                <p
                  className="text-xl md:text-2xl mb-8 font-light opacity-90"
                  data-swiper-parallax="-100"
                >
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.link}
                  className="inline-block bg-primary/90 dark:bg-dark-primary/90 hover:bg-primary dark:hover:bg-dark-primary text-cream px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  data-swiper-parallax="-50"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev !left-4 !text-white/80 hover:!text-white !w-12 !h-12 backdrop-blur-sm !bg-black/10 hover:!bg-black/20 !rounded-full !transition-all">
          <ChevronLeftIcon />
        </div>
        <div className="swiper-button-next !right-4 !text-white/80 hover:!text-white !w-12 !h-12 backdrop-blur-sm !bg-black/10 hover:!bg-black/20 !rounded-full !transition-all">
          <ChevronRightIcon />
        </div>

        {/* Autoplay Progress */}
        <div className="absolute bottom-8 right-4 z-50 flex items-center gap-2">
          <svg
            viewBox="0 0 48 48"
            ref={progressCircle}
            className="w-12 h-12 rotate-[-90deg]"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="4"
              className="stroke-current"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="125.6"
              strokeDashoffset="125.6"
              className="stroke-primary dark:stroke-dark-primary"
              style={{
                strokeDashoffset: `calc(125.6 * (1 - var(--progress)))`,
              }}
            />
          </svg>
          <span
            ref={progressContent}
            className="text-white text-sm font-medium"
          ></span>
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-8" />
      </Swiper>
    </section>
  );
}
