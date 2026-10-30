import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-950">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-4 text-xs text-zinc-600 leading-relaxed">
          <p>
            THE ASHH STORE respects your privacy and is committed to protecting your personal data in accordance with the Digital Personal Data Protection Act (DPDPA) of India.
          </p>
          <h2 className="text-sm font-bold text-zinc-900 uppercase">1. Information We Collect</h2>
          <p>
            We collect your name, delivery address, phone number, and email address solely for fulfilling orders, dispatching shipments via Shiprocket, and sending transactional notifications.
          </p>
          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">2. Payment Security</h2>
          <p>
            We never store your credit/debit card numbers or UPI MPINs. All payments are processed through Razorpay's PCI-DSS Level 1 certified payment gateway with 256-bit SSL encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
