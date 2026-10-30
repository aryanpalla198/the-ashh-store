'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { INITIAL_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const savedProducts = INITIAL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-neutral-50 pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">
              Saved Items
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 mt-1">
              My Wishlist ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={() => {
                savedProducts.forEach((p) => addToCart(p, 'L', p.variants[0]?.color, 1));
              }}
              className="bg-zinc-900 hover:bg-[#E11B23] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition"
            >
              Move All To Bag
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-zinc-200 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-red-50 text-[#E11B23] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900">Your wishlist is empty</h2>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
              Save your favorite pop-culture t-shirts, oversized hoodies, and cargo pants by tapping the heart icon.
            </p>
            <Link
              href="/oversized"
              className="mt-6 inline-block bg-[#E11B23] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Explore Drops
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
