'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { totalQuantity, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Shop', icon: Grid, href: '/oversized' },
    { label: 'Wishlist', icon: Heart, href: '/wishlist', badge: wishlistCount },
    { label: 'Account', icon: User, href: '/account' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 py-1.5 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center p-1 relative text-[10px] font-bold ${
                isActive ? 'text-[#E11B23]' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-0.5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#E11B23] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center p-1 relative text-[10px] font-bold text-zinc-600 hover:text-zinc-900"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E11B23] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {totalQuantity}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
}
