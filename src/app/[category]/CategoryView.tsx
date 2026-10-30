'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/data/products';
import { CATEGORIES, CATEGORY_SUB_COLLECTIONS } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Check,
  Sparkles,
  Shirt,
  Scissors,
  Layers,
  Footprints,
  Flame,
  Shield,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { Product, ProductSize } from '@/types';

function CategoryListingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categorySlug = (params?.category as string) || 'men';
  const initialFandom = searchParams.get('fandom') || '';
  const initialSubCategory = searchParams.get('subCategory') || 'all';

  // Find category metadata
  const categoryInfo = CATEGORIES.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase()
  ) || {
    name: categorySlug.replace(/-/g, ' ').toUpperCase(),
    slug: categorySlug,
    description: 'Explore the latest streetwear drops, oversized silhouettes, and official pop-culture merchandise.',
    heroBanner: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1600&q=80',
  };

  // Subcategory collection state
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialSubCategory);

  // Sync state if URL search param changes
  useEffect(() => {
    const param = searchParams.get('subCategory') || 'all';
    setSelectedSubCategory(param);
  }, [searchParams]);

  // Filter states
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFandoms, setSelectedFandoms] = useState<string[]>(
    initialFandom ? [initialFandom] : []
  );
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available filter options
  const allSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = [
    { name: 'Black', hex: '#111827', border: false },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Navy', hex: '#1E3A8A', border: false },
    { name: 'Charcoal', hex: '#374151', border: false },
    { name: 'Olive', hex: '#4D533C', border: false },
    { name: 'Khaki', hex: '#D4B996', border: false },
    { name: 'Red', hex: '#E11B23', border: false },
    { name: 'Sky Blue', hex: '#38BDF8', border: false },
    { name: 'Beige', hex: '#E6D7C3', border: true },
    { name: 'Lavender', hex: '#C084FC', border: false },
  ];
  const allFandoms = [
    'Anime / Naruto',
    'Marvel',
    'DC Comics',
    'Supima Solids',
    'Friends',
    'Disney',
    'Star Wars',
    'Ashh Originals',
  ];
  const allFits = ['Oversized Fit', 'Regular Fit', 'Relaxed Fit', 'Slim Fit'];

  // Base list filtered by current top-level category
  const categoryProducts = useMemo(() => {
    if (categorySlug === 'all') return INITIAL_PRODUCTS;
    if (categorySlug === 'sale') {
      return INITIAL_PRODUCTS.filter((p) => p.discountPercentage >= 45 || p.category === 'sale');
    }
    if (categorySlug === 'collections') {
      return INITIAL_PRODUCTS.filter((p) => Boolean(p.fandom));
    }
    if (categorySlug === 'men') {
      return INITIAL_PRODUCTS.filter((p) => p.gender === 'men' || p.gender === 'unisex' || p.category === 'men');
    }
    if (categorySlug === 'women') {
      return INITIAL_PRODUCTS.filter((p) => p.gender === 'women' || p.gender === 'unisex' || p.category === 'women');
    }
    if (categorySlug === 'kids') {
      return INITIAL_PRODUCTS.filter((p) => p.gender === 'kids' || p.category === 'kids');
    }
    if (categorySlug === 'shoes') {
      return INITIAL_PRODUCTS.filter(
        (p) =>
          p.category === 'shoes' ||
          p.subCategory === 'shoes-sneakers' ||
          p.title.toLowerCase().includes('sneaker') ||
          p.title.toLowerCase().includes('shoe')
      );
    }
    if (categorySlug === 'shirts') {
      return INITIAL_PRODUCTS.filter(
        (p) =>
          p.category === 'shirts' ||
          p.subCategory === 'shirts' ||
          p.title.toLowerCase().includes('shirt')
      );
    }
    if (categorySlug === 'trousers') {
      return INITIAL_PRODUCTS.filter(
        (p) =>
          p.category === 'trousers' ||
          p.subCategory === 'trousers' ||
          p.title.toLowerCase().includes('trouser') ||
          p.title.toLowerCase().includes('chino') ||
          p.title.toLowerCase().includes('pants')
      );
    }
    if (categorySlug === 'shorts') {
      return INITIAL_PRODUCTS.filter(
        (p) =>
          p.category === 'shorts' ||
          p.subCategory === 'shorts' ||
          p.title.toLowerCase().includes('short')
      );
    }
    return INITIAL_PRODUCTS.filter((p) => p.category === categorySlug || p.subCategory === categorySlug);
  }, [categorySlug]);

  // Subcollection matching function
  const matchesSubCollection = (product: Product, subId: string) => {
    if (!subId || subId === 'all') return true;

    const titleLower = product.title.toLowerCase();
    const catLower = (product.category || '').toLowerCase();
    const subCatLower = (product.subCategory || '').toLowerCase();
    const tagsLower = (product.tags || []).join(' ').toLowerCase();

    if (subId === 'shirts') {
      return (
        subCatLower === 'shirts' ||
        catLower === 'shirts' ||
        titleLower.includes('shirt') ||
        titleLower.includes('polo') ||
        titleLower.includes('resort') ||
        tagsLower.includes('shirt')
      );
    }

    if (subId === 'trousers') {
      return (
        subCatLower === 'trousers' ||
        catLower === 'trousers' ||
        titleLower.includes('trousers') ||
        titleLower.includes('chino') ||
        titleLower.includes('pants') ||
        tagsLower.includes('trousers')
      );
    }

    if (subId === 'shorts') {
      return (
        subCatLower === 'shorts' ||
        catLower === 'shorts' ||
        titleLower.includes('short') ||
        tagsLower.includes('shorts')
      );
    }

    if (subId === 'shoes-sneakers' || subId === 'shoes') {
      return (
        subCatLower === 'shoes-sneakers' ||
        catLower === 'shoes' ||
        titleLower.includes('sneaker') ||
        titleLower.includes('shoe') ||
        titleLower.includes('kicks') ||
        tagsLower.includes('sneakers') ||
        tagsLower.includes('shoes')
      );
    }

    if (subId === 'oversized-t-shirts') {
      return (
        subCatLower === 'oversized-t-shirts' ||
        catLower === 'oversized' ||
        titleLower.includes('oversized') ||
        tagsLower.includes('oversized')
      );
    }

    if (subId === 'hoodies-sweatshirts' || subId === 'hoodies') {
      return (
        subCatLower === 'hoodies-sweatshirts' ||
        catLower === 'hoodies' ||
        titleLower.includes('hoodie') ||
        titleLower.includes('sweat') ||
        tagsLower.includes('hoodie')
      );
    }

    if (subId === 'cargo-joggers' || subId === 'joggers') {
      return (
        subCatLower === 'cargo-joggers' ||
        catLower === 'joggers' ||
        titleLower.includes('jogger') ||
        titleLower.includes('cargo') ||
        tagsLower.includes('cargo') ||
        tagsLower.includes('jogger')
      );
    }

    if (subId === 't-shirts') {
      return (
        subCatLower === 't-shirts' ||
        catLower === 'printed-tshirts' ||
        (titleLower.includes('tee') && !titleLower.includes('oversized')) ||
        titleLower.includes('t-shirt')
      );
    }

    if (subId === 'dresses') {
      return (
        subCatLower === 'dresses' ||
        titleLower.includes('dress') ||
        titleLower.includes('co-ord')
      );
    }

    // Fandom match
    if (subId === 'anime') return product.fandom === 'Anime / Naruto';
    if (subId === 'marvel') return product.fandom === 'Marvel';
    if (subId === 'dc') return product.fandom === 'DC Comics';
    if (subId === 'star-wars') return product.fandom === 'Ashh Originals' || product.tags.includes('star wars');
    if (subId === 'supima') return product.fandom === 'Supima Solids' || product.fabric.includes('Supima');

    return subCatLower === subId || catLower === subId;
  };

  // Get configured sub-collections for this parent category
  const subCollections = useMemo(() => {
    return CATEGORY_SUB_COLLECTIONS[categorySlug] || CATEGORY_SUB_COLLECTIONS['men'] || [];
  }, [categorySlug]);

  // Compute live count for each sub-collection
  const subCollectionWithCounts = useMemo(() => {
    return subCollections.map((item) => {
      const count = categoryProducts.filter((p) => matchesSubCollection(p, item.id)).length;
      return { ...item, count };
    });
  }, [subCollections, categoryProducts]);

  // Handle clicking a subcategory
  const handleSelectSubCategory = (subId: string) => {
    setSelectedSubCategory(subId);
    const newParams = new URLSearchParams(searchParams.toString());
    if (subId === 'all') {
      newParams.delete('subCategory');
    } else {
      newParams.set('subCategory', subId);
    }
    const query = newParams.toString();
    router.push(`/${categorySlug}${query ? `?${query}` : ''}`, { scroll: false });
  };

  // Active subcategory object
  const activeSubItem = subCollectionWithCounts.find((s) => s.id === selectedSubCategory);

  // Apply active filters & sorting
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];

    // Filter by SubCategory / Collection
    if (selectedSubCategory && selectedSubCategory !== 'all') {
      list = list.filter((p) => matchesSubCollection(p, selectedSubCategory));
    }

    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => selectedSizes.includes(v.size) && v.stock > 0)
      );
    }

    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        (p.variants || []).some((v) =>
          selectedColors.some(
            (sc) =>
              (v.color || '').toLowerCase().includes(sc.toLowerCase()) ||
              sc.toLowerCase().includes((v.color || '').toLowerCase())
          )
        )
      );
    }

    if (selectedFandoms.length > 0) {
      list = list.filter((p) =>
        selectedFandoms.some((f) => p.fandom?.toLowerCase().includes(f.toLowerCase()))
      );
    }

    if (selectedFits.length > 0) {
      list = list.filter((p) => selectedFits.includes(p.fit));
    }

    if (priceRange < 5000) {
      list = list.filter((p) => p.price <= priceRange);
    }

    if (minDiscount > 0) {
      list = list.filter((p) => p.discountPercentage >= minDiscount);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.stock > 0));
    }

    // Sort
    switch (sortBy) {
      case 'price_low_high':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'discount_desc':
        list.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
      default:
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return list;
  }, [
    categoryProducts,
    selectedSubCategory,
    selectedSizes,
    selectedColors,
    selectedFandoms,
    selectedFits,
    priceRange,
    minDiscount,
    inStockOnly,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedSubCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFandoms([]);
    setSelectedFits([]);
    setPriceRange(5000);
    setMinDiscount(0);
    setInStockOnly(false);
    router.push(`/${categorySlug}`, { scroll: false });
  };

  const hasActiveFilters =
    (selectedSubCategory && selectedSubCategory !== 'all') ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFandoms.length > 0 ||
    selectedFits.length > 0 ||
    priceRange < 5000 ||
    minDiscount > 0 ||
    inStockOnly;

  return (
    <div className="bg-neutral-50 pb-20">
      {/* 1. Category Hero Banner */}
      <div className="relative bg-zinc-950 text-white overflow-hidden py-10 sm:py-14">
        <div className="absolute inset-0 opacity-25">
          <img
            src={categoryInfo.heroBanner}
            alt={categoryInfo.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block bg-[#E11B23] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded">
              OFFICIAL DROP
            </span>
            {selectedSubCategory !== 'all' && activeSubItem && (
              <span className="inline-flex items-center gap-1 bg-white/10 text-zinc-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm border border-white/20">
                <ArrowRight className="w-2.5 h-2.5 text-[#E11B23]" />
                {activeSubItem.name}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white flex items-baseline gap-3">
            <span>{categoryInfo.name}</span>
            {selectedSubCategory !== 'all' && activeSubItem && (
              <span className="text-xl sm:text-2xl text-[#E11B23]">
                — {activeSubItem.name}
              </span>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-2 font-medium leading-relaxed">
            {selectedSubCategory !== 'all' && activeSubItem
              ? `Browse official ${activeSubItem.name.toLowerCase()} curated for supreme streetwear drape, high GSM cotton, and iconic graphic designs.`
              : categoryInfo.description}
          </p>
        </div>
      </div>

      {/* 2. Horizontal Quick-Filter Chip Bar (The Souled Store / ASOS Style) */}
      <div className="bg-white border-b border-zinc-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] font-black uppercase text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E11B23]" />
              <span>Collections:</span>
            </span>

            {subCollectionWithCounts.map((sub) => {
              const isActive = selectedSubCategory === sub.id || (!selectedSubCategory && sub.id === 'all');
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubCategory(sub.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                    isActive
                      ? 'bg-[#E11B23] text-white border-[#E11B23] shadow-sm scale-102'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-zinc-200'
                  }`}
                >
                  <span>{sub.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive ? 'bg-black/30 text-white' : 'bg-zinc-200 text-zinc-600'
                    }`}
                  >
                    {sub.count}
                  </span>
                  {sub.badge && (
                    <span
                      className={`text-[9px] uppercase px-1 rounded font-black ${
                        isActive ? 'bg-white text-[#E11B23]' : 'bg-red-100 text-[#E11B23]'
                      }`}
                    >
                      {sub.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Sticky Top Sort & Active Chips Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-300"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E11B23]" />
              <span>Collections & Filters {hasActiveFilters ? `(Active)` : ''}</span>
            </button>

            <span className="text-xs font-bold text-zinc-500">
              Showing <strong className="text-zinc-900">{filteredProducts.length}</strong> styles
              {selectedSubCategory !== 'all' && activeSubItem && (
                <span> in <strong className="text-[#E11B23]">{activeSubItem.name}</strong></span>
              )}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-semibold text-zinc-500">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-lg text-xs font-bold text-zinc-800 py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#E11B23] appearance-none cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="discount_desc">Highest Discount</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="max-w-7xl mx-auto mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-zinc-400 mr-1">Active:</span>

            {selectedSubCategory !== 'all' && activeSubItem && (
              <span className="inline-flex items-center gap-1 bg-[#E11B23] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                Collection: {activeSubItem.name}
                <button
                  onClick={() => handleSelectSubCategory('all')}
                  className="hover:text-black/80 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-zinc-200"
              >
                Size: {s}
                <button
                  onClick={() => setSelectedSizes(selectedSizes.filter((x) => x !== s))}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedColors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-zinc-200"
              >
                Color: {c}
                <button
                  onClick={() => setSelectedColors(selectedColors.filter((x) => x !== c))}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedFandoms.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-zinc-200"
              >
                {f}
                <button
                  onClick={() => setSelectedFandoms(selectedFandoms.filter((x) => x !== f))}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedFits.map((fit) => (
              <span
                key={fit}
                className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-zinc-200"
              >
                {fit}
                <button
                  onClick={() => setSelectedFits(selectedFits.filter((x) => x !== fit))}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {priceRange < 5000 && (
              <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-zinc-200">
                Under ₹{priceRange}
                <button onClick={() => setPriceRange(5000)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-[11px] font-bold text-[#E11B23] hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* 4. Main Catalog Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex gap-8">
          {/* Desktop Left Sidebar: Collections & Refinements */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6 bg-white p-5 rounded-2xl border border-zinc-200 h-fit sticky top-36">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#E11B23]" />
                <span>Collections & Filters</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-[#E11B23] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* A. Subcategories / Collections List (Requested Primary Feature) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black uppercase text-zinc-900 tracking-wide flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#E11B23]" />
                  <span>Category Collections</span>
                </h4>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">
                  {subCollectionWithCounts.length} Types
                </span>
              </div>

              <div className="space-y-1">
                {subCollectionWithCounts.map((sub) => {
                  const isSelected = selectedSubCategory === sub.id || (!selectedSubCategory && sub.id === 'all');
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSelectSubCategory(sub.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                        isSelected
                          ? 'bg-[#E11B23] text-white shadow-sm font-black'
                          : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isSelected ? 'bg-white' : 'bg-zinc-400'
                          }`}
                        />
                        <span className="truncate">{sub.name}</span>
                        {sub.badge && (
                          <span
                            className={`text-[8px] uppercase font-black px-1 py-0.2 rounded ${
                              isSelected ? 'bg-white text-[#E11B23]' : 'bg-red-100 text-[#E11B23]'
                            }`}
                          >
                            {sub.badge}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                          isSelected ? 'bg-black/20 text-white' : 'bg-zinc-100 text-zinc-500'
                        }`}
                      >
                        {sub.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* B. Sizes Filter */}
            <div className="pt-4 border-t border-zinc-100">
              <h4 className="text-xs font-bold uppercase text-zinc-700 mb-2.5">Size</h4>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSizes(
                          isSelected ? selectedSizes.filter((s) => s !== size) : [...selectedSizes, size]
                        )
                      }
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition flex items-center justify-center border ${
                        isSelected
                          ? 'bg-[#E11B23] text-white border-[#E11B23]'
                          : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border-zinc-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* C. Color Swatch Filter (The Souled Store Style) */}
            <div className="pt-4 border-t border-zinc-100">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold uppercase text-zinc-700">Colors</h4>
                {selectedColors.length > 0 && (
                  <button
                    onClick={() => setSelectedColors([])}
                    className="text-[10px] text-[#E11B23] font-bold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      title={color.name}
                      onClick={() =>
                        setSelectedColors(
                          isSelected
                            ? selectedColors.filter((c) => c !== color.name)
                            : [...selectedColors, color.name]
                        )
                      }
                      className={`relative w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                        isSelected ? 'scale-110 ring-2 ring-offset-2 ring-[#E11B23]' : 'hover:scale-105'
                      } ${color.border ? 'border border-zinc-300' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            color.name === 'White' || color.name === 'Beige'
                              ? 'text-zinc-900'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* D. Fandom & Theme Filter */}
            <div className="pt-4 border-t border-zinc-100">
              <h4 className="text-xs font-bold uppercase text-zinc-700 mb-2.5">Fandom & Theme</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {allFandoms.map((fandom) => {
                  const isSelected = selectedFandoms.includes(fandom);
                  return (
                    <label
                      key={fandom}
                      className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          setSelectedFandoms(
                            isSelected ? selectedFandoms.filter((f) => f !== fandom) : [...selectedFandoms, fandom]
                          )
                        }
                        className="rounded text-[#E11B23] focus:ring-[#E11B23] w-4 h-4 border-zinc-300"
                      />
                      <span>{fandom}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* D. Fit Filter */}
            <div className="pt-4 border-t border-zinc-100">
              <h4 className="text-xs font-bold uppercase text-zinc-700 mb-2.5">Fit</h4>
              <div className="space-y-1.5">
                {allFits.map((fit) => {
                  const isSelected = selectedFits.includes(fit);
                  return (
                    <label
                      key={fit}
                      className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          setSelectedFits(
                            isSelected ? selectedFits.filter((f) => f !== fit) : [...selectedFits, fit]
                          )
                        }
                        className="rounded text-[#E11B23] focus:ring-[#E11B23] w-4 h-4 border-zinc-300"
                      />
                      <span>{fit}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* E. Price Range */}
            <div className="pt-4 border-t border-zinc-100">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold uppercase text-zinc-700">Max Price</h4>
                <span className="text-xs font-bold text-zinc-900">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="499"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#E11B23] cursor-pointer"
              />
            </div>

            {/* F. Availability */}
            <div className="pt-4 border-t border-zinc-100">
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#E11B23] focus:ring-[#E11B23] w-4 h-4"
                />
                <span>Exclude Out of Stock</span>
              </label>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200">
                <p className="text-base font-bold text-zinc-800">No products found in this selection</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Try switching collection categories or resetting filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 bg-[#E11B23] text-white text-xs font-bold uppercase px-4 py-2 rounded-lg"
                >
                  View All {categoryInfo.name}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 5. Mobile Filter & Collection Drawer */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-5/6 max-w-sm bg-white h-full flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <h3 className="text-sm font-black uppercase text-zinc-900">Collections & Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 py-4 flex-1">
              {/* Mobile Subcategories / Collections */}
              <div>
                <h4 className="text-xs font-black uppercase text-zinc-900 mb-2.5">
                  Select Collection
                </h4>
                <div className="space-y-1">
                  {subCollectionWithCounts.map((sub) => {
                    const isSelected = selectedSubCategory === sub.id || (!selectedSubCategory && sub.id === 'all');
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          handleSelectSubCategory(sub.id);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-left ${
                          isSelected
                            ? 'bg-[#E11B23] text-white font-black'
                            : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                        }`}
                      >
                        <span>{sub.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isSelected ? 'bg-black/20 text-white' : 'bg-zinc-200 text-zinc-600'
                          }`}
                        >
                          {sub.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-bold uppercase text-zinc-700 mb-2">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSizes(
                            isSelected ? selectedSizes.filter((s) => s !== size) : [...selectedSizes, size]
                          )
                        }
                        className={`w-9 h-9 rounded-lg text-xs font-bold border ${
                          isSelected ? 'bg-[#E11B23] text-white border-[#E11B23]' : 'bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase text-zinc-700">Color</h4>
                  {selectedColors.length > 0 && (
                    <button
                      onClick={() => setSelectedColors([])}
                      className="text-[10px] text-[#E11B23] font-bold"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => {
                    const isSelected = selectedColors.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        onClick={() =>
                          setSelectedColors(
                            isSelected
                              ? selectedColors.filter((c) => c !== color.name)
                              : [...selectedColors, color.name]
                          )
                        }
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                          isSelected ? 'scale-110 ring-2 ring-offset-2 ring-[#E11B23]' : ''
                        } ${color.border ? 'border border-zinc-300' : ''}`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              color.name === 'White' || color.name === 'Beige'
                                ? 'text-zinc-900'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fandoms */}
              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-bold uppercase text-zinc-700 mb-2">Fandom</h4>
                <div className="space-y-2">
                  {allFandoms.map((fandom) => (
                    <label key={fandom} className="flex items-center gap-2 text-xs text-zinc-700">
                      <input
                        type="checkbox"
                        checked={selectedFandoms.includes(fandom)}
                        onChange={() =>
                          setSelectedFandoms(
                            selectedFandoms.includes(fandom)
                              ? selectedFandoms.filter((f) => f !== fandom)
                              : [...selectedFandoms, fandom]
                          )
                        }
                        className="rounded text-[#E11B23]"
                      />
                      <span>{fandom}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 text-xs font-bold uppercase border border-zinc-300 rounded-lg text-zinc-700"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold uppercase bg-[#E11B23] text-white rounded-lg"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryListingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-xs font-bold uppercase text-zinc-500">
          Loading Collections...
        </div>
      }
    >
      <CategoryListingContent />
    </Suspense>
  );
}
