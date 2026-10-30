'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  const results = useMemo(() => {
    const q = (searchTerm || query).toLowerCase().trim();
    if (!q) return INITIAL_PRODUCTS;

    return INITIAL_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fandom?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchTerm, query]);

  return (
    <div className="bg-neutral-50 pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Bar */}
        <div className="max-w-2xl mx-auto mb-10 text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
            Search The Ashh Store
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search anime, marvel, oversized hoodies, cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-zinc-300 rounded-2xl shadow-sm text-sm focus:outline-none focus:border-[#E11B23]"
            />
            <SearchIcon className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
          <p className="text-xs text-zinc-500">
            Found <strong className="text-zinc-900">{results.length}</strong> styles matching{' '}
            <strong className="text-[#E11B23]">"{searchTerm || query}"</strong>
          </p>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-zinc-200 max-w-md mx-auto">
            <p className="text-base font-bold text-zinc-800">No results found for "{searchTerm}"</p>
            <p className="text-xs text-zinc-500 mt-1">Try searching for "Naruto", "Spider-Man", "Cargo", or "Supima".</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs font-bold uppercase text-zinc-500">Searching catalog...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
