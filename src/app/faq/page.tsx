import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How long does delivery take across India?',
      a: 'We partner with Shiprocket (Bluedart, Delhivery, Xpressbees). Metro orders (Mumbai, Delhi, Bangalore, etc.) are delivered in 2 to 3 business days. Non-metro destinations take 3 to 5 business days. Real-time GPS tracking is provided upon dispatch.',
    },
    {
      q: 'Is Cash on Delivery (COD) available?',
      a: 'Yes! We offer Cash on Delivery across 18,000+ Indian pincodes. You can pay with cash or via UPI QR code directly to the courier rider upon delivery. A nominal ₹50 COD handling fee applies.',
    },
    {
      q: 'What is your Return & Exchange policy?',
      a: 'We offer a 15-day hassle-free return and exchange policy from the date of delivery. If the size does not fit or you wish to exchange it, request a return from your account and our courier will pick it up from your doorstep for free.',
    },
    {
      q: 'How do refunds work for COD and prepaid orders?',
      a: 'For prepaid orders (Razorpay UPI, Cards, Netbanking), refunds are returned to the source payment method within 2-4 business days. For COD orders, you can choose instant Ashh Store Credits (with ₹100 bonus) or direct bank transfer via UPI / NEFT.',
    },
    {
      q: 'Are your superhero & anime products officially licensed?',
      a: '100% YES! All our Naruto, Marvel, Spider-Man, DC Comics, Harry Potter, and Disney apparel is officially licensed and created in collaboration with the respective global studios.',
    },
    {
      q: 'What does "Oversized Fit" mean?',
      a: 'Our oversized tees and hoodies are specifically patterned with a dropped shoulder, wider chest, and modern streetwear boxy drape. They are designed to fit loose and relaxed. If you prefer a regular tailored fit, order one size down.',
    },
  ];

  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">
            Help Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-2"
            >
              <h3 className="text-sm font-bold text-zinc-900">{faq.q}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
