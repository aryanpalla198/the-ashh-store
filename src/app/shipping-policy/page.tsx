import React from 'react';
import { Truck, RotateCcw, Clock, ShieldCheck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-950">
          Shipping & Delivery Policy
        </h1>
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-4 text-xs text-zinc-600 leading-relaxed">
          <h2 className="text-sm font-bold text-zinc-900 uppercase">1. Free Shipping Threshold</h2>
          <p>
            We offer <strong>FREE Standard Express Shipping</strong> on all prepaid and Cash On Delivery orders with a cart value of ₹999 or more. For orders below ₹999, a flat shipping charge of ₹99 is applicable.
          </p>

          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">2. Delivery Timelines</h2>
          <p>
            Orders are dispatched within 24 hours from our central warehouse in Bhiwandi (Maharashtra). Estimated transit times:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Tier 1 Metros:</strong> 2 to 3 business days</li>
            <li><strong>Tier 2 Cities:</strong> 3 to 4 business days</li>
            <li><strong>North East & J&K:</strong> 4 to 6 business days</li>
          </ul>

          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">3. Courier Partners</h2>
          <p>
            All shipments are fulfilled through Shiprocket's tier-1 air logistics network, including Bluedart Express, Delhivery, Xpressbees, and Shadowfax. You will receive an SMS and email with live AWB tracking as soon as your package is dispatched.
          </p>

          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">4. Cash On Delivery (COD) Rules</h2>
          <p>
            COD is available for orders up to ₹5,000 across serviceable pincodes. An anti-fraud verification SMS/OTP may be sent prior to dispatch. A nominal convenience fee of ₹50 is added for COD logistics.
          </p>
        </div>
      </div>
    </div>
  );
}
