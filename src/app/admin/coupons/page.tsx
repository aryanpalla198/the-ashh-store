'use client';

import React, { useState } from 'react';
import { INITIAL_COUPONS } from '@/data/coupons';
import { Coupon } from '@/types';
import { Tag, Plus, Check, Trash2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [code, setCode] = useState('');
  const [desc, setDesc] = useState('');
  const [discountType, setDiscountType] = useState<'flat' | 'percentage'>('percentage');
  const [discountValue, setDiscountValue] = useState(15);
  const [minOrder, setMinOrder] = useState(999);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.toUpperCase().trim(),
      description: desc || `${discountValue}${discountType === 'percentage' ? '%' : '₹'} OFF`,
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrder),
      validFrom: '2026-01-01',
      validTill: '2026-12-31',
      usageCount: 0,
      isActive: true,
    };

    setCoupons([newCoupon, ...coupons]);
    setCode('');
    setDesc('');
    alert(`Coupon "${newCoupon.code}" created successfully!`);
  };

  const toggleCoupon = (id: string) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">
          Marketing & Promotions
        </span>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
          Coupons & Discounts
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Coupon Form */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#E11B23]" />
            <span>Create Promotional Coupon</span>
          </h3>

          <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER25 or ASHH500"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white uppercase font-mono font-bold focus:outline-none focus:border-[#E11B23]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">Description / Title</label>
              <input
                type="text"
                required
                placeholder="e.g. 15% OFF on all Anime Drops"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#E11B23]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Discount Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Discount Value</label>
                <input
                  type="number"
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">Min Order Value (₹)</label>
              <input
                type="number"
                required
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E11B23] hover:bg-red-700 text-white font-black uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition"
            >
              Publish Coupon
            </button>
          </form>
        </div>

        {/* Existing Coupons Table */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-black uppercase text-white tracking-wider">
            Active Campaign Coupons ({coupons.length})
          </h3>

          <div className="space-y-3">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-[#E11B23] bg-red-950/60 border border-red-800 px-2 py-0.5 rounded">
                      {c.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        c.isActive ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {c.isActive ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <p className="text-zinc-300 font-semibold mt-1.5">{c.description}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Min Order: ₹{c.minOrderValue} • Redeemed: {c.usageCount} times
                  </p>
                </div>

                <button
                  onClick={() => toggleCoupon(c.id)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300"
                >
                  {c.isActive ? 'Pause' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
