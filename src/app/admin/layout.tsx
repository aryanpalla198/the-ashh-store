'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  TicketPercent,
  RotateCcw,
  Users,
  Store,
  ShieldCheck,
  Menu,
  X,
  Bell,
  LogOut,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, switchRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Stock', href: '/admin/products', icon: Shirt },
    { label: 'Orders & Labels', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Coupons & Deals', href: '/admin/coupons', icon: TicketPercent },
    { label: 'Returns & Refunds', href: '/admin/returns', icon: RotateCcw },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-zinc-900 border-r border-zinc-800 flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <Logo variant="inverted" size="sm" />
        </div>

        {/* Admin Role Badge */}
        <div className="px-6 py-4 bg-zinc-950/60 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-zinc-300">Admin Operations</span>
          </div>
          <span className="text-[10px] font-black uppercase text-[#E11B23] bg-red-950/60 border border-red-800 px-2 py-0.5 rounded">
            SUPER ADMIN
          </span>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1.5 flex-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? 'bg-[#E11B23] text-white shadow-lg shadow-red-900/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Return to storefront */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            onClick={() => switchRole('customer')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
          >
            <Store className="w-4 h-4 text-[#E11B23]" />
            <span>View Customer Storefront</span>
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Admin Header */}
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-200">
              The Ashh Store • Control Center
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700"
            >
              <Store className="w-3.5 h-3.5 text-[#E11B23]" />
              <span className="hidden sm:inline">Storefront</span>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-[#E11B23] flex items-center justify-center font-bold text-xs text-white">
                A
              </div>
              <span className="text-xs font-bold text-zinc-300 hidden md:inline">
                {user?.name || 'Administrator'}
              </span>
            </div>
          </div>
        </header>

        {/* Admin Main Body */}
        <main className="flex-1 p-4 sm:p-8 bg-zinc-950 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 flex">
          <div className="w-64 bg-zinc-900 h-full p-4 flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <Logo variant="inverted" size="sm" />
              <button onClick={() => setSidebarOpen(false)} className="text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase text-zinc-300 hover:bg-zinc-800 rounded-lg"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
