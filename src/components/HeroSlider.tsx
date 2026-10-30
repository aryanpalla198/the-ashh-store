'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES, HeroSlide } from '@/data/categories';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay slider every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-zinc-950 aspect-[16/7] sm:aspect-[21/9] max-h-[560px]">
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
            />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          {/* Slide Content */}
          <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center text-white z-20">
            <div className="max-w-xl space-y-2 sm:space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#E11B23] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.tag}</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-white drop-shadow-md">
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-base text-zinc-300 font-medium max-w-md drop-shadow">
                {slide.subtitle}
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-2 bg-[#E11B23] hover:bg-[#c5161d] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-3 rounded-lg shadow-lg hover:shadow-red-900/50 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>{slide.ctaText}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-[#E11B23]' : 'w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
