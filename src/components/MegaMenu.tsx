'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Flame, Star, Zap } from 'lucide-react';

interface MegaMenuProps {
  activeMenu: 'men' | 'women' | 'collections' | null;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface MenuSection {
  title: string;
  items: {
    label: string;
    href: string;
    badge?: string;
    isHot?: boolean;
    isNew?: boolean;
  }[];
}

interface MenuData {
  title: string;
  sections: MenuSection[];
  featured: {
    tag: string;
    title: string;
    subtitle: string;
    image: string;
    href: string;
    cta: string;
  };
}

const MEGA_MENUS: Record<'men' | 'women' | 'collections', MenuData> = {
  men: {
    title: "Men's Streetwear & Pop Culture",
    sections: [
      {
        title: 'TOPWEAR',
        items: [
          { label: 'All Topwear', href: '/men' },
          { label: 'Oversized T-Shirts', href: '/oversized', badge: 'HOT', isHot: true },
          { label: 'Casual & Resort Shirts', href: '/men?subCategory=shirts', badge: 'NEW', isNew: true },
          { label: 'Supima Cotton T-Shirts', href: '/men?subCategory=t-shirts' },
          { label: 'Polos & Collared Tees', href: '/men?subCategory=t-shirts' },
          { label: 'Winter Hoodies & Sweats', href: '/hoodies', badge: 'WINTER' },
        ],
      },
      {
        title: 'BOTTOMWEAR',
        items: [
          { label: 'All Bottomwear', href: '/joggers' },
          { label: 'Korean Pleated Trousers', href: '/men?subCategory=trousers', badge: 'TRENDING', isHot: true },
          { label: 'Tactical Cargo Joggers', href: '/joggers', badge: 'BESTSELLER' },
          { label: 'Stretch Daily Chinos', href: '/men?subCategory=trousers' },
          { label: 'French Terry Sweatshorts', href: '/men?subCategory=shorts' },
          { label: 'Ripstop Utility Cargo Shorts', href: '/men?subCategory=shorts' },
        ],
      },
      {
        title: 'FOOTWEAR & SHOES',
        items: [
          { label: 'All Sneakers & Footwear', href: '/men?subCategory=shoes-sneakers' },
          { label: 'Velocity Chunky Kicks', href: '/men?subCategory=shoes-sneakers', badge: 'DROPS', isHot: true },
          { label: 'Retro Canvas Skate High-Tops', href: '/men?subCategory=shoes-sneakers' },
          { label: 'Triple White Street Court Shoes', href: '/men?subCategory=shoes-sneakers' },
          { label: 'Memory Foam Street Sliders', href: '/men?subCategory=shoes-sneakers' },
        ],
      },
      {
        title: 'OFFICIAL COLLABS',
        items: [
          { label: 'Naruto Shippuden Drops', href: '/collections?fandom=Naruto', badge: 'POPULAR' },
          { label: 'Marvel Cinematic Universe', href: '/collections?fandom=Marvel' },
          { label: 'DC Comics Batman', href: '/collections?fandom=DC+Comics' },
          { label: 'Supima Luxury Solids', href: '/collections?fandom=Supima+Solids' },
          { label: 'Anime Tapestry Series', href: '/collections?fandom=Anime' },
        ],
      },
    ],
    featured: {
      tag: 'SUMMER RESORT DROP',
      title: 'Riviera Linen Shirts & Chunky Kicks',
      subtitle: 'Engineered for summer breezes, effortless drape, and iconic street style.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
      href: '/men?subCategory=shirts',
      cta: "Explore Men's Drop",
    },
  },

  women: {
    title: "Women's Streetwear & Chic Aesthetics",
    sections: [
      {
        title: 'TOPWEAR',
        items: [
          { label: 'All Women Topwear', href: '/women' },
          { label: 'Boyfriend & Oversized Tees', href: '/women?subCategory=oversized-t-shirts', badge: 'HOT', isHot: true },
          { label: 'Linen & Poplin Resort Shirts', href: '/women?subCategory=shirts', badge: 'NEW', isNew: true },
          { label: 'Cropped Streetwear Hoodies', href: '/women?subCategory=hoodies-sweatshirts' },
          { label: 'Casual T-Shirts & Tops', href: '/women?subCategory=t-shirts' },
          { label: 'Street Dresses & Co-ords', href: '/women?subCategory=dresses' },
        ],
      },
      {
        title: 'BOTTOMWEAR',
        items: [
          { label: 'All Bottomwear', href: '/women' },
          { label: 'Wide-Leg Korean Trousers', href: '/women?subCategory=trousers', badge: 'TRENDING', isHot: true },
          { label: 'Parachute Cargo Joggers', href: '/women?subCategory=cargo-joggers' },
          { label: 'High-Waist Sweatshorts', href: '/women?subCategory=shorts' },
          { label: 'Relaxed Daily Chinos', href: '/women?subCategory=trousers' },
        ],
      },
      {
        title: 'FOOTWEAR & KICKS',
        items: [
          { label: 'All Footwear & Kicks', href: '/women?subCategory=shoes-sneakers' },
          { label: 'Pastel Chunky Sneakers', href: '/women?subCategory=shoes-sneakers', badge: 'CHIC', isHot: true },
          { label: 'Retro Canvas Skate High-Tops', href: '/women?subCategory=shoes-sneakers' },
          { label: 'Minimalist Court Whites', href: '/women?subCategory=shoes-sneakers' },
        ],
      },
      {
        title: 'THEMED DROPS',
        items: [
          { label: 'Women of Marvel Drop', href: '/collections?fandom=Marvel', badge: 'OFFICIAL' },
          { label: 'Pastel Anime Aesthetics', href: '/collections?fandom=Anime' },
          { label: 'Friends Central Perk Cozy', href: '/collections?fandom=Friends' },
          { label: 'Disney Cartoon Nostalgia', href: '/collections?fandom=Disney' },
        ],
      },
    ],
    featured: {
      tag: 'KOREAN STREETWEAR',
      title: 'Wide-Leg Pleated Trousers & Cropped Fits',
      subtitle: 'High-waisted, impeccably tailored silhouette for all-day comfort and flow.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
      href: '/women?subCategory=trousers',
      cta: "Shop Women's Drop",
    },
  },

  collections: {
    title: '100% Official Licensed Fandom Merchandise',
    sections: [
      {
        title: 'ANIME & MANGA',
        items: [
          { label: 'Naruto Shippuden Akatsuki', href: '/collections?fandom=Naruto', badge: 'BESTSELLER', isHot: true },
          { label: 'One Piece Straw Hat Fleet', href: '/collections?fandom=Anime', badge: 'NEW' },
          { label: 'Jujutsu Kaisen Gojo Satoru', href: '/collections?fandom=Anime' },
          { label: 'Dragon Ball Z Super Saiyan', href: '/collections?fandom=Anime' },
        ],
      },
      {
        title: 'MARVEL UNIVERSE',
        items: [
          { label: 'Spider-Man Across The Verse', href: '/collections?fandom=Marvel', badge: 'HOT', isHot: true },
          { label: 'Iron Man Arc Reactor Edit', href: '/collections?fandom=Marvel' },
          { label: 'Avengers Assemble Streetwear', href: '/collections?fandom=Marvel' },
          { label: 'Deadpool & Wolverine Collab', href: '/collections?fandom=Marvel' },
        ],
      },
      {
        title: 'DC COMICS GOTHAM',
        items: [
          { label: 'Batman The Dark Knight', href: '/collections?fandom=DC+Comics', badge: 'ICONIC' },
          { label: 'The Joker Smile Heavyweight', href: '/collections?fandom=DC+Comics' },
          { label: 'Superman Metropolis Crest', href: '/collections?fandom=DC+Comics' },
        ],
      },
      {
        title: 'POP CULTURE & LUXURY',
        items: [
          { label: 'Friends Central Perk Series', href: '/collections?fandom=Friends' },
          { label: 'Star Wars The Mandalorian', href: '/collections?fandom=Star+Wars' },
          { label: 'Supima 100% Solid Luxury', href: '/collections?fandom=Supima+Solids', badge: 'PREMIUM' },
        ],
      },
    ],
    featured: {
      tag: 'OFFICIAL ANIME MERCH',
      title: 'Naruto Akatsuki Heavyweight 240 GSM',
      subtitle: 'Official licensed cloud graphics with HD puff print and pre-shrunk cotton.',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80',
      href: '/collections?fandom=Naruto',
      cta: 'View All Fandoms',
    },
  },
};

export default function MegaMenu({
  activeMenu,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  if (!activeMenu || !MEGA_MENUS[activeMenu]) return null;

  const data = MEGA_MENUS[activeMenu];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 right-0 bg-white border-t border-b border-zinc-200 shadow-2xl z-40 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Header strip */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E11B23]" />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-900">
              {data.title}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-zinc-400">
            Click any collection to explore filtered merchandise
          </span>
        </div>

        {/* 5-Column Grid: 4 category columns + 1 featured promo card */}
        <div className="grid grid-cols-12 gap-6">
          {/* 4 Category Columns */}
          <div className="col-span-9 grid grid-cols-4 gap-6 border-r border-zinc-100 pr-6">
            {data.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-900 pb-1.5 border-b border-zinc-200/80 flex items-center justify-between">
                  <span>{sec.title}</span>
                  {idx === 0 && <Sparkles className="w-3 h-3 text-[#E11B23]" />}
                </h4>

                <ul className="space-y-2 text-xs">
                  {sec.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center justify-between text-zinc-600 hover:text-[#E11B23] transition-colors py-0.5"
                      >
                        <span className="group-hover:translate-x-1 transition-transform truncate font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded shrink-0 ml-1.5 ${
                              item.isHot
                                ? 'bg-red-50 text-[#E11B23] border border-red-200'
                                : item.isNew
                                ? 'bg-amber-50 text-amber-600 border border-amber-200'
                                : 'bg-zinc-100 text-zinc-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 1 Featured Drop Showcase Card */}
          <div className="col-span-3 flex flex-col">
            <Link
              href={data.featured.href}
              onClick={onClose}
              className="group relative h-full flex flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 p-4 text-white shadow-md hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={data.featured.image}
                  alt={data.featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-1.5">
                <span className="inline-block bg-[#E11B23] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                  {data.featured.tag}
                </span>
                <h5 className="text-sm font-black uppercase text-white leading-tight">
                  {data.featured.title}
                </h5>
                <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                  {data.featured.subtitle}
                </p>
                <div className="pt-2 flex items-center text-xs font-black uppercase text-white group-hover:text-red-400 gap-1.5">
                  <span>{data.featured.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
