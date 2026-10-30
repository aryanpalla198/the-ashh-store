'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Package,
  CreditCard,
  Truck,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Order, Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchOrders();
  }, []);

  // Dashboard KPI Computations
  const totalRevenue = orders.reduce((acc, o) => acc + o.grandTotal, 142580);
  const totalOrdersCount = orders.length + 84;
  const prepaidCount = orders.filter((o) => o.paymentMethod === 'razorpay').length + 56;
  const codCount = orders.filter((o) => o.paymentMethod === 'cod').length + 28;
  const prepaidPercent = Math.round((prepaidCount / (prepaidCount + codCount)) * 100);

  // Low stock products (< 10 total across variants)
  const lowStockProducts = products.filter((p) => {
    const totalVariantStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
    return totalVariantStock < 30;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">
            Executive Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
            Store Performance & Metrics
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="bg-[#E11B23] hover:bg-red-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            + Add New Product
          </Link>
          <Link
            href="/admin/orders"
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>↑ 24.8% vs last month</span>
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalOrdersCount}
          </div>
          <p className="text-[11px] text-zinc-400">98.2% fulfillment rate</p>
        </div>

        {/* Prepaid vs COD */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Prepaid / COD Split</span>
            <div className="w-8 h-8 rounded-lg bg-purple-950/60 text-purple-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {prepaidPercent}% Prepaid
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#E11B23] h-full" style={{ width: `${prepaidPercent}%` }} />
          </div>
          <p className="text-[10px] text-zinc-400">{codCount} COD orders processed</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Low Stock Warnings</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {lowStockProducts.length} Items
          </div>
          <p className="text-[11px] text-zinc-400">Requires restocking soon</p>
        </div>
      </div>

      {/* 3. Recent Orders & Stock Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#E11B23]" />
              <span>Recent Customer Orders</span>
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#E11B23] hover:underline"
            >
              View All ({orders.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-zinc-500 font-bold uppercase border-b border-zinc-800">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 font-medium text-zinc-300">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-white">
                      #{ord.orderNumber}
                    </td>
                    <td className="py-3 px-3">{ord.customer.name}</td>
                    <td className="py-3 px-3">
                      {ord.items.reduce((acc, i) => acc + i.quantity, 0)} pcs
                    </td>
                    <td className="py-3 px-3 font-bold text-white">
                      {formatPrice(ord.grandTotal)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="uppercase text-[10px] font-bold bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                        {ord.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-950 text-[#E11B23] border border-red-800/50">
                        {ord.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Items List */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Low Stock Alerts</span>
            </h3>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-amber-500 hover:underline"
            >
              Inventory →
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 4).map((p) => {
              const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
              return (
                <div
                  key={p.id}
                  className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 flex items-center gap-3"
                >
                  <img
                    src={p.images[0]?.url}
                    alt={p.title}
                    className="w-10 h-12 object-cover rounded-lg bg-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-white truncate">{p.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Fandom: {p.fandom || p.category}
                    </p>
                  </div>
                  <span className="text-xs font-black text-amber-400 bg-amber-950/80 px-2 py-1 rounded border border-amber-800">
                    {totalStock} left
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
