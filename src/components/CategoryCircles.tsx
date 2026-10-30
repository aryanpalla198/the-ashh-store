import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';

export default function CategoryCircles() {
  return (
    <div className="py-6 sm:py-8 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar pb-2 justify-start md:justify-center">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="flex flex-col items-center gap-2 group shrink-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-zinc-200 via-zinc-100 to-[#E11B23] group-hover:from-[#E11B23] group-hover:to-red-600 transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-100">
                  <img
                    src={cat.iconImage}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {cat.badge && (
                  <span className="absolute -top-1 -right-1 bg-[#E11B23] text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-sm">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-zinc-800 group-hover:text-[#E11B23] transition text-center max-w-[80px] truncate">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
