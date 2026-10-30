import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-950">
          Terms & Conditions
        </h1>
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-4 text-xs text-zinc-600 leading-relaxed">
          <p>
            Welcome to THE ASHH STORE. These Terms and Conditions govern your use of the website and the purchase of any apparel, accessories, or pop-culture merchandise from us.
          </p>
          <h2 className="text-sm font-bold text-zinc-900 uppercase">1. Intellectual Property & Official Licensing</h2>
          <p>
            All superhero characters, anime trademarks, logos, and artwork displayed are the intellectual property of their respective copyright holders (Marvel Studios, DC Comics, Toei Animation, etc.) and are produced under valid licensing agreements.
          </p>
          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">2. Pricing & GST Compliance</h2>
          <p>
            All product prices are quoted in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST). Official GST tax invoices with HSN classifications are issued for all orders.
          </p>
          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">3. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes are subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
          </p>
        </div>
      </div>
    </div>
  );
}
