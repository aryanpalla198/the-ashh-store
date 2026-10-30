'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import CategoryCircles from '@/components/CategoryCircles';
import ProductCard from '@/components/ProductCard';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Star, Quote, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'anime' | 'marvel' | 'oversized' | 'hoodies' | 'shirts' | 'shoes'>('all');

  // Filter products for trending section based on active tab
  const trendingProducts = INITIAL_PRODUCTS.filter((product) => {
    if (activeTab === 'anime') return product.fandom === 'Anime / Naruto';
    if (activeTab === 'marvel') return product.fandom === 'Marvel';
    if (activeTab === 'oversized') return product.category === 'oversized';
    if (activeTab === 'hoodies') return product.category === 'hoodies';
    if (activeTab === 'shirts') return product.subCategory === 'shirts' || product.category === 'shirts';
    if (activeTab === 'shoes') return product.subCategory === 'shoes-sneakers' || product.category === 'shoes';
    return product.isTrending || product.isBestseller;
  }).slice(0, 8);

  const bestsellers = INITIAL_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = INITIAL_PRODUCTS.filter((p) => p.isNewArrival || p.isTrending).slice(4, 8);

  // Fandom cards
  const fandoms = [
    {
      name: 'NARUTO & ANIME',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
      tag: 'OFFICIAL MERCH',
      link: '/oversized?fandom=Anime',
      color: 'from-amber-600/90 to-red-900/90',
    },
    {
      name: 'MARVEL STUDIOS',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      tag: 'AVENGERS & SPIDER-MAN',
      link: '/collections?fandom=Marvel',
      color: 'from-red-700/90 to-zinc-950/90',
    },
    {
      name: 'DC COMICS',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
      tag: 'BATMAN & JOKER',
      link: '/joggers?fandom=DC',
      color: 'from-zinc-800/90 to-black/90',
    },
    {
      name: 'SUPIMA LUXE SOLIDS',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      tag: '100% PURE COTTON',
      link: '/men?fandom=Supima',
      color: 'from-emerald-800/90 to-zinc-950/90',
    },
  ];

  // UGC Community photos
  const ugcPosts = [
    {
      handle: '@sneakerhead_sam',
      caption: 'Rocking the Naruto Akatsuki oversized tee. Fabric quality is insane! 🔥',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
    },
    {
      handle: '@priya_fits',
      caption: 'Loving this lavender crop top from @TheAshhStore. Super soft!',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80',
    },
    {
      handle: '@delhi_drip',
      caption: 'Utility cargos are a 10/10. Real pockets, comfortable stretch.',
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=500&q=80',
    },
    {
      handle: '@anime_geek_99',
      caption: 'Gojo Domain Expansion hoodie came in 2 days. The detailing is unreal.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <div className="bg-neutral-50 pb-16">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Category Story Circles */}
      <CategoryCircles />

      {/* 3. Trending Now Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#E11B23] text-xs font-black uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 fill-[#E11B23]" />
              <span>Hot Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900">
              Trending Right Now
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-zinc-200/60 p-1 rounded-xl">
            {(
              [
                { id: 'all', label: 'All Hits' },
                { id: 'oversized', label: 'Oversized Tees' },
                { id: 'shirts', label: 'Shirts & Resort' },
                { id: 'shoes', label: 'Sneakers' },
                { id: 'anime', label: 'Anime / Naruto' },
                { id: 'marvel', label: 'Marvel' },
                { id: 'hoodies', label: 'Hoodies' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-black uppercase rounded-lg transition shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/oversized"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-[#E11B23] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-3 rounded-xl transition-colors duration-200 shadow-md"
          >
            <span>View All Trending Styles ({INITIAL_PRODUCTS.length}+)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Fandom Showcase Tiles */}
      <section className="bg-white py-12 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[#E11B23] text-xs font-black uppercase tracking-widest">
              100% Officially Licensed
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-1">
              Shop By Official Fandoms
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Authentic pop-culture merchandise engineered with heavyweight fabrics & official artist graphics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {fandoms.map((fandom) => (
              <Link
                key={fandom.name}
                href={fandom.link}
                className="relative h-72 rounded-2xl overflow-hidden group shadow-md"
              >
                <img
                  src={fandom.image}
                  alt={fandom.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${fandom.color} mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity`}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-300 mb-1">
                    {fandom.tag}
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight leading-none mb-3">
                    {fandom.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-yellow-300 transition">
                    <span>Explore Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Ashh Club Membership Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-red-950 text-white p-8 sm:p-12 border border-zinc-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-yellow-500 text-zinc-950 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>MEMBERSHIP EXCLUSIVE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              Join <span className="text-[#E11B23]">The Ashh Club</span> & Save 20% Extra
            </h2>

            <p className="text-xs sm:text-base text-zinc-300 font-medium">
              Get member-only discounts on every single product, zero shipping fees, early access to limited edition anime & Marvel drops, and a ₹500 welcome credit!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/account"
                className="bg-[#E11B23] hover:bg-red-700 text-white text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                Join Now For Free
              </Link>
              <div className="text-xs text-zinc-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Over 250,000+ Active Squad Members</span>
              </div>
            </div>
          </div>

          {/* Decorative Background Graphic */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
              <polygon points="50,10 90,90 10,90" />
            </svg>
          </div>
        </div>
      </section>

      {/* 6. Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[#E11B23] text-xs font-black uppercase tracking-wider">
              Crowd Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-0.5">
              All-Time Bestsellers
            </h2>
          </div>
          <Link
            href="/oversized"
            className="text-xs sm:text-sm font-bold text-[#E11B23] hover:underline flex items-center gap-1"
          >
            <span>See All</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Ashh Squad UGC Gallery (Instagram Style) */}
      <section className="bg-zinc-100 py-12 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-[#E11B23] text-xs font-black uppercase tracking-widest">
              #AshhSquad
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-1">
              Styled By You
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Tag @TheAshhStore on Instagram to be featured on our official style wall!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ugcPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200 group"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-200">
                  <img
                    src={post.image}
                    alt={post.handle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {post.handle}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[11px] text-zinc-700 italic line-clamp-2">
                    "{post.caption}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Customer Testimonials & Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-lg mx-auto mb-10">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900">
            Over 500,000+ Happy Customers
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Rated 4.8 / 5 across 120,000+ verified customer reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col justify-between">
            <Quote className="w-8 h-8 text-red-200 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
              "The quality of the Naruto Akatsuki oversized tee blew my mind. True 240 GSM heavy fabric that holds its shape after 15 washes. Feels just like The Souled Store merchandise!"
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Rishabh Malhotra</h4>
                <p className="text-[10px] text-zinc-400">Verified Buyer • Mumbai</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Purchase
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col justify-between">
            <Quote className="w-8 h-8 text-red-200 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
              "Got the Spider-Man Miles Morales hoodie for winter. The fleece inside is heavenly and the neon spider print gets so many compliments on campus. 2-day delivery via Shiprocket!"
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Ananya Sen</h4>
                <p className="text-[10px] text-zinc-400">Verified Buyer • Bengaluru</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Purchase
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col justify-between">
            <Quote className="w-8 h-8 text-red-200 mb-2" />
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
              "Tactical cargo joggers have actual durable pockets and the stretch is super comfy for long travels. Paid via UPI on Razorpay, super seamless checkout experience."
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Karan Grover</h4>
                <p className="text-[10px] text-zinc-400">Verified Buyer • Delhi</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Purchase
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
