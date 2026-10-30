'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
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

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = codeToApply || couponInput.trim();
    if (!code) return;

    setIsApplying(true);
    setCouponMsg(null);

    const res = await applyCoupon(code);
    setIsApplying(false);

    if (res.success) {
      setCouponMsg({ text: res.message, error: false });
      setCouponInput('');
    } else {
      setCouponMsg({ text: res.message, error: true });
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountNeededForFreeShipping) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E11B23]" />
              <h2 className="text-sm sm:text-base font-black uppercase text-zinc-900 tracking-wider">
                My Shopping Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-800 rounded-full hover:bg-zinc-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Delivery Goal Indicator */}
          {items.length > 0 && (
            <div className="bg-red-50 p-3.5 border-b border-red-100">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800 mb-1.5">
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#E11B23]">₹{amountNeededForFreeShipping}</strong> more for{' '}
                    <strong className="text-emerald-700">FREE EXPRESS DELIVERY</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4" /> You have unlocked FREE Express Delivery!
                  </span>
                )}
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-red-200/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#E11B23] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* 3. Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-zinc-800">Your bag is empty!</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  Looks like you haven't added any official pop-culture merch yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-block bg-[#E11B23] text-white text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-red-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-zinc-100 items-start group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-lg bg-zinc-100 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-zinc-900 truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-600 transition p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-500">
                      <span>Size: <strong className="text-zinc-800">{item.size}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-zinc-800">{item.color}</strong></span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <span className="text-xs font-black text-zinc-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.product.mrp > item.price && (
                          <div className="text-[10px] text-zinc-400 line-through">
                            {formatPrice(item.product.mrp * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

            {/* 4. Footer & Bill Summary */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50 space-y-3.5">
                {/* Coupon Box */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-lg text-xs">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>"{appliedCoupon.code}" applied (-₹{couponDiscount})</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-600 font-bold hover:underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Apply Coupon (e.g. ASHH200)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="flex-1 bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs uppercase focus:outline-none focus:border-[#E11B23]"
                        />
                        <button
                          onClick={() => handleApplyCoupon()}
                          disabled={isApplying || !couponInput.trim()}
                          className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase px-3.5 py-1.5 rounded-lg disabled:opacity-50"
                        >
                          {isApplying ? 'Applying...' : 'Apply'}
                        </button>
                      </div>

                      {/* Suggested promo chips */}
                      <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
                        <span className="text-[10px] text-zinc-500 font-semibold shrink-0">Try:</span>
                        {['ASHH200', 'ASHH10', 'FREESHIP'].map((code) => (
                          <button
                            key={code}
                            onClick={() => handleApplyCoupon(code)}
                            className="text-[10px] bg-red-100 hover:bg-red-200 text-[#E11B23] font-bold px-2 py-0.5 rounded border border-red-200 shrink-0"
                          >
                            {code}
                          </button>
                        ))}
                      </div>

                      {couponMsg && (
                        <p
                          className={`text-[11px] mt-1.5 font-semibold ${
                            couponMsg.error ? 'text-red-600' : 'text-emerald-600'
                          }`}
                        >
                          {couponMsg.text}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-zinc-600 pt-2 border-t border-zinc-200">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Coupon Savings</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-600 uppercase">FREE</strong>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>GST (Inclusive)</span>
                    <span>Included in MRP</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-black text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>Grand Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#E11B23] hover:bg-[#c5161d] text-white text-xs sm:text-sm font-black uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
