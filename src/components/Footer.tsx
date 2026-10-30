'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  Sparkles,
  CreditCard,
  Send,
  CheckCircle2,
} from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#18181B] text-zinc-300 pt-14 pb-24 lg:pb-12 border-t border-zinc-800">
      {/* 1. Value Proposition Pillars (Souled Store Trust Bar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-800 flex items-center justify-center text-[#E11B23] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-wide">100% Official Merch</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Authentic Marvel, Anime & DC licensed gear</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-800 flex items-center justify-center text-[#E11B23] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-wide">15 Days Easy Returns</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Instant door-step pickup & fast refunds</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-800 flex items-center justify-center text-[#E11B23] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-wide">Free Express Shipping</h4>
              <p className="text-xs text-zinc-400 mt-0.5">On all prepaid & COD orders above ₹999</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-800 flex items-center justify-center text-[#E11B23] shrink-0">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-wide">The Ashh Club</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Save up to 20% extra on every product</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Intro & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="inverted" size="lg" showSubtitle />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-3">
              <strong>The Ashh Store</strong> is India’s premium pop-culture apparel destination.
              From oversized anime drops and heavy French Terry hoodies to certified Supima basics,
              we design streetwear that lets you wear your passion with pride.
            </p>

            <div className="pt-2">
              <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
                Join The Ashh Squad
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/50 border border-emerald-800 p-2.5 rounded-lg max-w-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome to the squad! Use code <strong>ASHH200</strong> on checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for ₹200 off..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#E11B23]"
                  />
                  <button
                    type="submit"
                    className="bg-[#E11B23] hover:bg-[#c5161d] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition flex items-center gap-1.5 shrink-0"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Need Help Column */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4 border-l-2 border-[#E11B23] pl-2">
              Need Help?
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition">Track Your Order</Link>
              </li>
              <li>
                <Link href="/returns-policy" className="hover:text-white transition">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">FAQs</Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories Column */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4 border-l-2 border-[#E11B23] pl-2">
              Popular Drops
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/oversized" className="hover:text-white transition">Oversized T-Shirts</Link>
              </li>
              <li>
                <Link href="/hoodies" className="hover:text-white transition">Winter Hoodies</Link>
              </li>
              <li>
                <Link href="/joggers" className="hover:text-white transition">Cargo Joggers</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition">Naruto & Anime Merch</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition">Marvel Superhero Gear</Link>
              </li>
              <li>
                <Link href="/sale" className="text-red-400 hover:text-red-300 font-bold transition">Clearance Sale (60% Off)</Link>
              </li>
            </ul>
          </div>

          {/* Company & Policies */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4 border-l-2 border-[#E11B23] pl-2">
              The Company
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition">About The Ashh Store</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#E11B23] font-bold hover:underline">Admin Portal</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Payment Partners & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p>© 2026 The Ashh Store Private Limited. All rights reserved. Crafted with passion in Mumbai, India.</p>

        {/* Payment logos badges */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">100% Safe Payments:</span>
          <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700">Razorpay</span>
          <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700">UPI / GPay</span>
          <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700">RuPay</span>
          <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700">Visa / Mastercard</span>
          <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700">Cash On Delivery</span>
        </div>
      </div>
    </footer>
  );
}
