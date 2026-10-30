'use client';

import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
            Contact The Ashh Store
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Have a question regarding your order, refund, or size fit? We're here 7 days a week!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 text-center space-y-2 shadow-sm">
            <Mail className="w-8 h-8 text-[#E11B23] mx-auto" />
            <h3 className="text-xs font-bold uppercase text-zinc-900">Email Support</h3>
            <p className="text-xs text-zinc-500">Fast replies within 4-6 hours</p>
            <p className="text-xs font-bold text-[#E11B23]">support@theashhstore.com</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 text-center space-y-2 shadow-sm">
            <Phone className="w-8 h-8 text-[#E11B23] mx-auto" />
            <h3 className="text-xs font-bold uppercase text-zinc-900">Customer Helpline</h3>
            <p className="text-xs text-zinc-500">Mon - Sat (10 AM to 7 PM IST)</p>
            <p className="text-xs font-bold text-[#E11B23]">+91 98765 43210</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 text-center space-y-2 shadow-sm">
            <MapPin className="w-8 h-8 text-[#E11B23] mx-auto" />
            <h3 className="text-xs font-bold uppercase text-zinc-900">Headquarters</h3>
            <p className="text-xs text-zinc-500">BKC, Bandra East, Mumbai</p>
            <p className="text-xs font-bold text-zinc-800">Maharashtra - 400051</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-4">
          <h2 className="text-base font-black uppercase text-zinc-900">Send us a direct message</h2>
          <form className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Aryan Palla"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 text-xs focus:outline-none focus:border-[#E11B23]"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="aryan@example.com"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 text-xs focus:outline-none focus:border-[#E11B23]"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Order ID (If Applicable)</label>
              <input
                type="text"
                placeholder="e.g. ASHH-2026-SPK891"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 text-xs focus:outline-none focus:border-[#E11B23]"
              />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Message</label>
              <textarea
                rows={4}
                required
                placeholder="How can we help you today?"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-3 text-xs focus:outline-none focus:border-[#E11B23]"
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                alert('Thank you! Your message has been received by The Ashh Store support desk.');
              }}
              className="bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
