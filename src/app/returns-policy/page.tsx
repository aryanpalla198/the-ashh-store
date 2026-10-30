import React from 'react';

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-950">
          Returns & Exchange Policy
        </h1>
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-4 text-xs text-zinc-600 leading-relaxed">
          <h2 className="text-sm font-bold text-zinc-900 uppercase">1. 15-Day Free Returns</h2>
          <p>
            At THE ASHH STORE, we want you to love your merch. If you are not completely satisfied with the fit or quality, you can initiate a return or exchange within 15 days of receiving your order.
          </p>

          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">2. Condition of Returned Items</h2>
          <p>
            Items must be unworn, unwashed, and returned with original brand tags and polybag packaging intact.
          </p>

          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">3. Doorstep Reverse Pickup</h2>
          <p>
            Our courier partner will pick up the package from your doorstep within 24 to 48 hours of requesting a return. No shipping label or courier deposit is required from your end.
          </p>

          <h2 className="text-sm font-bold text-zinc-900 uppercase pt-2">4. Refund Methods</h2>
          <p>
            - <strong>Prepaid Orders:</strong> Refund is automatically credited back to your original payment method (Bank / UPI / Card) via Razorpay within 2-4 working days after inspection.
          </p>
          <p>
            - <strong>Cash on Delivery (COD) Orders:</strong> You can choose Instant Store Credit (with a bonus ₹100 added) or provide your bank UPI ID for direct transfer.
          </p>
        </div>
      </div>
    </div>
  );
}
