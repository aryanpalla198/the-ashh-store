'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Package,
  LogOut,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalQuantity, subtotal, setIsCartOpen } = useCart();
  const { user, logout, switchRole } = useAuth();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'men' | 'women' | 'collections' | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu & mega menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  const handleMouseEnterNav = (megaKey?: 'men' | 'women' | 'collections') => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    if (megaKey) {
      setActiveMegaMenu(megaKey);
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleMouseLeaveNav = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const handleCancelMegaLeave = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchDropdownOpen(false);
    }
  };

  interface NavItem {
    name: string;
    href: string;
    badge?: string;
    isSpecial?: boolean;
    megaKey?: 'men' | 'women' | 'collections';
  }

  const navCategories: NavItem[] = [
    { name: 'MEN', href: '/men', megaKey: 'men' },
    { name: 'WOMEN', href: '/women', megaKey: 'women' },
    { name: 'OVERSIZED', href: '/oversized', badge: 'HOT' },
    { name: 'SHIRTS', href: '/men?subCategory=shirts', badge: 'NEW' },
    { name: 'HOODIES', href: '/hoodies' },
    { name: 'CARGO & JOGGERS', href: '/joggers' },
    { name: 'SHOES', href: '/men?subCategory=shoes-sneakers', badge: 'DROPS' },
    { name: 'FANDOM MERCH', href: '/collections', badge: 'OFFICIAL', megaKey: 'collections' },
    { name: 'SALE', href: '/sale', isSpecial: true },
  ];

  const popularSearches = [
    'Naruto Akatsuki',
    'Spider-Man Hoodie',
    'Cargo Joggers',
    'Supima Cotton',
    'Batman',
    'Oversized T-Shirts',
    'Gojo Satoru',
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      {/* 1. Top Announcement Marquee Bar (The Souled Store Style) */}
      <div className="bg-[#18181B] text-white text-[11px] sm:text-xs py-1.5 px-4 font-semibold tracking-wide overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <span className="bg-[#E11B23] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
            SPECIAL OFFER
          </span>
          <span>⚡ Flat ₹200 OFF on your first app order | Code: <strong className="text-yellow-400">ASHH200</strong></span>
          <span className="hidden md:inline text-zinc-400">|</span>
          <span className="hidden md:inline text-zinc-300">Free Express Shipping on Orders Above ₹999</span>
        </div>

        {/* Demo Role Switcher (Admin / Customer Quick Toggle) */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px]">
          <span className="text-zinc-400">View as:</span>
          <button
            onClick={() => switchRole('customer')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
              user?.role === 'customer'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
              user?.role === 'admin'
                ? 'bg-[#E11B23] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Admin Panel
          </button>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-[#E11B23] -ml-2"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo size="md" showSubtitle />
          </div>

          {/* Desktop Search Bar with Live Suggestions */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md relative mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for anime, marvel, oversized hoodies, cargo..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchDropdownOpen(true);
                  }}
                  onFocus={() => setSearchDropdownOpen(true)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-100 border border-transparent rounded-full focus:bg-white focus:border-[#E11B23] focus:outline-none transition-all placeholder:text-zinc-400"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </form>

            {/* Instant Search Dropdown */}
            {searchDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-zinc-200 p-4 z-50 animate-fade-in">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        router.push(`/search?q=${encodeURIComponent(term)}`);
                        setSearchDropdownOpen(false);
                      }}
                      className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-full transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <div className="border-t border-zinc-100 pt-2 flex items-center justify-between text-xs text-zinc-500">
                  <span>Press Enter to view all results</span>
                  <Link
                    href="/oversized"
                    onClick={() => setSearchDropdownOpen(false)}
                    className="text-[#E11B23] font-semibold hover:underline"
                  >
                    View Top Drops →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Actions: Track, Wishlist, Account, Cart */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Delivery Pincode Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-zinc-600 bg-zinc-50 px-2.5 py-1.5 rounded-lg border border-zinc-200">
              <MapPin className="w-3.5 h-3.5 text-[#E11B23]" />
              <span className="font-medium">Deliver to: <strong className="text-zinc-800">Mumbai 400052</strong></span>
            </div>

            {/* Track Order link */}
            <Link
              href="/track-order"
              className="hidden lg:flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-[#E11B23] transition"
            >
              <Package className="w-4 h-4" />
              <span>Track Order</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-zinc-700 hover:text-[#E11B23] transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#E11B23] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2 text-zinc-700 hover:text-[#E11B23] transition group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-105 transition" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-[#E11B23] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse-subtle">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left text-xs leading-none">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">Cart</span>
                <span className="font-bold text-zinc-900">₹{subtotal}</span>
              </div>
            </button>

            {/* User Profile / Admin Link */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-zinc-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name[0].toUpperCase() : <UserIcon className="w-4 h-4" />}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-zinc-200 py-2 z-50 animate-fade-in text-sm">
                  <div className="px-4 py-2 border-b border-zinc-100">
                    <p className="font-bold text-zinc-900 truncate">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-zinc-500 truncate">{user?.email || 'Sign in to access orders'}</p>
                    {user?.isMember && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        <Sparkles className="w-3 h-3" /> ASHH CLUB VIP
                      </span>
                    )}
                  </div>

                  <Link
                    href="/account"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-[#E11B23]"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>My Profile & Orders</span>
                  </Link>

                  <Link
                    href="/track-order"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-[#E11B23]"
                  >
                    <Package className="w-4 h-4" />
                    <span>Live Tracking</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-[#E11B23]"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Wishlist ({wishlistCount})</span>
                  </Link>

                  {/* Admin Portal Direct Link */}
                  <Link
                    href="/admin"
                    onClick={() => {
                      switchRole('admin');
                      setProfileDropdownOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-4 py-2 text-[#E11B23] font-bold bg-red-50 hover:bg-red-100 transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>

                  <div className="border-t border-zinc-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Desktop Sub-Navigation Menu Bar with Souled Store Mega Menus */}
        <nav
          onMouseLeave={handleMouseLeaveNav}
          className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-zinc-100 text-xs font-black tracking-wider uppercase relative"
        >
          {navCategories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              onMouseEnter={() => handleMouseEnterNav(cat.megaKey)}
              className={`relative py-1 transition flex items-center gap-1.5 ${
                pathname === cat.href || (cat.megaKey && activeMegaMenu === cat.megaKey)
                  ? 'text-[#E11B23] border-b-2 border-[#E11B23]'
                  : cat.isSpecial
                  ? 'text-[#E11B23] font-black'
                  : 'text-zinc-700 hover:text-[#E11B23]'
              }`}
            >
              <span>{cat.name}</span>
              {cat.badge && (
                <span className="text-[9px] bg-red-100 text-[#E11B23] font-bold px-1.5 py-0.2 rounded">
                  {cat.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* 4. Souled Store Style Mega Menu Dropdown */}
      <MegaMenu
        activeMenu={activeMegaMenu}
        onClose={() => setActiveMegaMenu(null)}
        onMouseEnter={handleCancelMegaLeave}
        onMouseLeave={handleMouseLeaveNav}
      />

      {/* 5. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <Logo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-zinc-500 hover:text-zinc-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search input */}
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search merchandise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E11B23]"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </form>

            {/* Mobile Categories list with Expandable Subcategories */}
            <div className="flex flex-col gap-1 mt-6 text-sm font-bold uppercase tracking-wider text-zinc-800">
              {navCategories.map((cat) => {
                const isExpanded = mobileExpandedSection === cat.name;
                const hasSub = cat.megaKey === 'men' || cat.megaKey === 'women' || cat.megaKey === 'collections';

                return (
                  <div key={cat.name} className="border-b border-zinc-100 last:border-b-0 pb-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={cat.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2 py-2.5 px-2 rounded-lg flex-1 ${
                          pathname === cat.href
                            ? 'text-[#E11B23]'
                            : cat.isSpecial
                            ? 'text-[#E11B23]'
                            : 'hover:bg-zinc-50'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.badge && (
                          <span className="text-[10px] bg-red-100 text-[#E11B23] px-1.5 py-0.5 rounded">
                            {cat.badge}
                          </span>
                        )}
                      </Link>

                      {hasSub && (
                        <button
                          onClick={() => setMobileExpandedSection(isExpanded ? null : cat.name)}
                          className="p-2 text-zinc-400 hover:text-zinc-900"
                          aria-label={`Expand ${cat.name} subcategories`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-[#E11B23]' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Expandable Sub-Collections */}
                    {hasSub && isExpanded && (
                      <div className="pl-4 pr-2 py-2 mb-2 bg-zinc-50 rounded-xl space-y-1.5 text-xs font-semibold normal-case text-zinc-600 animate-fade-in">
                        {cat.megaKey === 'men' && (
                          <>
                            <Link
                              href="/men"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23] font-bold text-zinc-900"
                            >
                              👕 All Men's Collection →
                            </Link>
                            <Link
                              href="/men?subCategory=shirts"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23] flex items-center justify-between"
                            >
                              <span>Shirts & Resort Fits</span>
                              <span className="text-[9px] bg-amber-100 text-amber-700 px-1 rounded font-black">NEW</span>
                            </Link>
                            <Link
                              href="/men?subCategory=trousers"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Trousers & Chinos
                            </Link>
                            <Link
                              href="/men?subCategory=shorts"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Shorts & French Terry
                            </Link>
                            <Link
                              href="/oversized"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Oversized T-Shirts
                            </Link>
                            <Link
                              href="/hoodies"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Hoodies & Sweatshirts
                            </Link>
                            <Link
                              href="/joggers"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Tactical Cargo & Joggers
                            </Link>
                            <Link
                              href="/men?subCategory=shoes-sneakers"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23] flex items-center justify-between"
                            >
                              <span>Shoes & Sneakers</span>
                              <span className="text-[9px] bg-red-100 text-[#E11B23] px-1 rounded font-black">DROPS</span>
                            </Link>
                          </>
                        )}

                        {cat.megaKey === 'women' && (
                          <>
                            <Link
                              href="/women"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23] font-bold text-zinc-900"
                            >
                              👗 All Women's Collection →
                            </Link>
                            <Link
                              href="/women?subCategory=oversized-t-shirts"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Boyfriend & Oversized Tees
                            </Link>
                            <Link
                              href="/women?subCategory=shirts"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Linen & Poplin Resort Shirts
                            </Link>
                            <Link
                              href="/women?subCategory=trousers"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Wide-Leg Korean Trousers
                            </Link>
                            <Link
                              href="/women?subCategory=cargo-joggers"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Cargo Pants & Joggers
                            </Link>
                            <Link
                              href="/women?subCategory=shoes-sneakers"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Chunky Pastel Sneakers
                            </Link>
                          </>
                        )}

                        {cat.megaKey === 'collections' && (
                          <>
                            <Link
                              href="/collections"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23] font-bold text-zinc-900"
                            >
                              ⚡ All Official Collabs →
                            </Link>
                            <Link
                              href="/collections?fandom=Naruto"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Naruto Shippuden Akatsuki
                            </Link>
                            <Link
                              href="/collections?fandom=Marvel"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Marvel Studios Spider-Man & Iron Man
                            </Link>
                            <Link
                              href="/collections?fandom=DC+Comics"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              DC Comics Batman Dark Knight
                            </Link>
                            <Link
                              href="/collections?fandom=Supima+Solids"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#E11B23]"
                            >
                              Supima 100% Solid Luxury
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Quick Links */}
            <div className="mt-auto pt-6 border-t border-zinc-200 flex flex-col gap-2 text-xs text-zinc-600">
              <Link href="/admin" className="text-[#E11B23] font-bold py-1">
                ⚙️ Open Admin Panel
              </Link>
              <Link href="/track-order" className="py-1">
                📦 Track Order
              </Link>
              <Link href="/account" className="py-1">
                👤 My Account
              </Link>
              <Link href="/about" className="py-1">
                ℹ️ About The Ashh Store
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
