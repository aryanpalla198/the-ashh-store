'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Check, AlertCircle } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    couponDiscount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeShipping,
    freeShippingThreshold,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (code?: string) => {
    const toApply = code || couponCode.trim();
    if (!toApply) return;
    setIsApplying(true);
    const res = await applyCoupon(toApply);
    setIsApplying(false);
    if (res.success) {
      setCouponMsg({ text: res.message, error: false });
      setCouponCode('');
    } else {
      setCouponMsg({ text: res.message, error: true });
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black uppercase text-zinc-900">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto">
          Explore our trending oversized t-shirts, winter fleece hoodies, and official superhero gear!
        </p>
        <Link
          href="/oversized"
          className="mt-6 inline-block bg-[#E11B23] text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-red-700 shadow-md transition"
        >
          Explore Trending Drops
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 mb-6">
          My Shopping Bag ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping banner */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-200">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-800 mb-1.5">
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#E11B23]">₹{amountNeededForFreeShipping}</strong> more to unlock <strong className="text-emerald-700">FREE EXPRESS DELIVERY</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 flex items-center gap-1 font-bold">
                    <Check className="w-4 h-4" /> You've qualified for FREE Delivery!
                  </span>
                )}
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#E11B23] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      ((freeShippingThreshold - amountNeededForFreeShipping) / freeShippingThreshold) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Product items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.title}
                    className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-zinc-100 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#E11B23]">
                      {item.product.fandom || item.product.category}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 line-clamp-1">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Size: <strong className="text-zinc-800">{item.size}</strong> • Color:{' '}
                      <strong className="text-zinc-800">{item.color}</strong>
                    </p>
                    <div className="mt-2 text-sm font-black text-zinc-950">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                  {/* Stepper */}
                  <div className="flex items-center border border-zinc-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-zinc-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Line item total */}
                  <div className="text-right">
                    <div className="text-sm font-black text-zinc-950">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-zinc-400 hover:text-red-600 flex items-center gap-1 mt-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Coupon Box */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
              <h3 className="text-xs font-black uppercase text-zinc-900 tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#E11B23]" />
                <span>Apply Coupons</span>
              </h3>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold">
                  <span>Code "{appliedCoupon.code}" applied (-₹{couponDiscount})</span>
                  <button onClick={removeCoupon} className="text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#E11B23]"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      disabled={isApplying || !couponCode.trim()}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                    {['ASHH200', 'ASHH10', 'FREESHIP'].map((c) => (
                      <button
                        key={c}
                        onClick={() => handleApplyCoupon(c)}
                        className="text-[10px] bg-red-50 text-[#E11B23] font-bold px-2 py-0.5 rounded border border-red-200 shrink-0"
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {couponMsg && (
                    <p className={`text-xs font-semibold ${couponMsg.error ? 'text-red-600' : 'text-emerald-700'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
              <h3 className="text-xs font-black uppercase text-zinc-900 tracking-wider">
                Price Summary
              </h3>

              <div className="space-y-2 text-xs text-zinc-600 pt-2 border-t border-zinc-100">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>{formatPrice(subtotal + couponDiscount)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>GST</span>
                  <span>Included in prices</span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-3 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span className="text-[#E11B23]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full mt-4 bg-[#E11B23] hover:bg-[#c5161d] text-white text-xs sm:text-sm font-black uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-semibold pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure Checkout via Razorpay & Shiprocket</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
