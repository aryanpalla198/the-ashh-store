'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, Printer, ArrowRight, Truck, MapPin } from 'lucide-react';
import InvoiceModal from '@/components/InvoiceModal';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/types';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ASHH-2026-SPK891';

  const [order, setOrder] = useState<Order | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E11B23', '#FACC15', '#18181B', '#3B82F6'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Fetch or mock order details
  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch (e) {
        console.error('Error loading order', e);
      }
    }
    loadOrder();
  }, [orderId]);

  return (
    <div className="bg-neutral-50 pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#E11B23] bg-red-50 px-2.5 py-1 rounded">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 mt-2">
              Woohoo! Your Order is Placed! 🎉
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Order ID: <strong className="text-zinc-900 font-mono">#{orderId}</strong>
            </p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 max-w-lg mx-auto text-xs text-zinc-600 flex items-center justify-center gap-3">
            <Truck className="w-5 h-5 text-[#E11B23] shrink-0" />
            <span>
              Expected Delivery: <strong className="text-zinc-900 font-bold">Within 3-4 business days</strong> via Shiprocket Air
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/track-order?orderId=${orderId}`}
              className="w-full sm:w-auto bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Live Delivery</span>
            </Link>

            {order && (
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>View GST Tax Invoice</span>
              </button>
            )}

            <Link
              href="/oversized"
              className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Order Details Accordion / Summary */}
          {order && (
            <div className="pt-8 border-t border-zinc-200 text-left space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                Items In This Order
              </h3>

              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-14 object-cover rounded-lg bg-zinc-100 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-zinc-900">{item.title}</h4>
                        <p className="text-zinc-500 text-[11px]">
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-zinc-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span className="text-zinc-900 font-semibold">
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Mode:</span>
                  <span className="text-zinc-900 font-bold uppercase">
                    {order.paymentMethod} ({order.paymentStatus})
                  </span>
                </div>
                <div className="flex justify-between font-bold text-zinc-900 text-sm pt-2 border-t border-zinc-200">
                  <span>Grand Total Paid:</span>
                  <span className="text-[#E11B23]">{formatPrice(order.grandTotal)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      {order && (
        <InvoiceModal
          order={order}
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
        />
      )}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs font-bold uppercase text-zinc-500">Loading Order Confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
