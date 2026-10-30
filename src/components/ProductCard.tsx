'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductSize } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Images: primary and secondary on hover
  const primaryImg = product.images[0]?.url || 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80';
  const secondaryImg = product.images[1]?.url || primaryImg;

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const variant = product.variants.find((v) => v.size === size);
    if (!variant || variant.stock <= 0) return;

    addToCart(product, size, variant.color, 1);
    setSelectedSize(size);
    setAddedSuccess(true);
    setIsCartOpen(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setShowQuickAdd(false);
    }, 1200);
  };

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-zinc-200 hover:border-zinc-300 hover:shadow-lg transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* 1. Image Container with Hover Model Swap */}
      <Link href={`/products/${product.id}`} className="relative block aspect-[3/4] bg-zinc-100 overflow-hidden">
        {/* Primary Image */}
        <img
          src={isHovered && secondaryImg ? secondaryImg : primaryImg}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* License Badge */}
        {product.officialLicenseBadge && (
          <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
            {product.officialLicenseBadge}
          </div>
        )}

        {/* Fit Badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-zinc-900 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
          {product.fit}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition z-10 ${
            isFavorited
              ? 'bg-red-50 text-[#E11B23]'
              : 'bg-white/80 text-zinc-600 hover:bg-white hover:text-[#E11B23]'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#E11B23]' : ''}`} />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-3 transition-transform duration-300 z-20 ${
            showQuickAdd || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.preventDefault()}
        >
          <p className="text-[10px] font-black uppercase text-zinc-500 mb-1.5 text-center tracking-wider">
            {addedSuccess ? '✓ Added To Bag!' : 'Select Size to Quick Add'}
          </p>

          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {product.variants.map((v) => {
              const isOutOfStock = v.stock <= 0;
              return (
                <button
                  key={v.sku}
                  disabled={isOutOfStock}
                  onClick={(e) => handleQuickAdd(v.size, e)}
                  className={`w-7 h-7 rounded text-[11px] font-bold transition flex items-center justify-center relative ${
                    isOutOfStock
                      ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed line-through'
                      : addedSuccess && selectedSize === v.size
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-100 text-zinc-800 hover:bg-[#E11B23] hover:text-white border border-zinc-200'
                  }`}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
        </div>
      </Link>

      {/* 2. Product Details */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Rating & Fandom */}
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="text-zinc-500 font-semibold truncate uppercase">
            {product.fandom || product.category}
          </span>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-emerald-700 text-emerald-700" />
            <span className="text-zinc-400 font-normal">| {product.reviewCount}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#E11B23] line-clamp-1 transition">
            {product.title}
          </h3>
        </Link>

        {/* Price & Discounts */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-black text-zinc-900">
            {formatPrice(product.price)}
          </span>
          {product.mrp > product.price && (
            <>
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.mrp)}
              </span>
              <span className="text-xs font-black text-[#E11B23]">
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        {/* Ashh Member Exclusive Price */}
        {product.memberPrice && (
          <div className="mt-1.5 text-[10px] text-amber-700 bg-amber-50 font-bold px-2 py-0.5 rounded inline-flex items-center gap-1 self-start">
            <span>👑 ₹{product.memberPrice} for Ashh Club</span>
          </div>
        )}
      </div>
    </div>
  );
}
