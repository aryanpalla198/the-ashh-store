'use client';

import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { SELLER_GSTIN, SELLER_STATE } from '@/lib/gst';

interface InvoiceModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-zinc-200 flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none">
        {/* Modal Controls (Hidden when printing) */}
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50 print:hidden">
          <h3 className="text-sm font-bold text-zinc-800">
            GST Tax Invoice — #{order.orderNumber}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#E11B23] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Document */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-800 text-xs">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-zinc-300 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-md bg-[#E11B23] flex items-center justify-center text-white font-black text-sm">
                  A
                </div>
                <h1 className="text-xl font-black tracking-tight text-zinc-900">
                  The <span className="text-[#E11B23]">Ashh</span> Store
                </h1>
              </div>
              <p className="font-semibold text-zinc-600">The Ashh Store Private Limited</p>
              <p className="text-zinc-500">Ashh Commerce Park, Bandra Kurla Complex, Mumbai, MH - 400051</p>
              <p className="text-zinc-500"><strong>GSTIN:</strong> {SELLER_GSTIN} | <strong>State:</strong> {SELLER_STATE} (27)</p>
              <p className="text-zinc-500"><strong>Email:</strong> support@theashhstore.com</p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-zinc-100 text-zinc-900 font-black uppercase text-[10px] tracking-wider px-2 py-0.5 rounded border border-zinc-300">
                TAX INVOICE
              </span>
              <p className="mt-2 text-xs"><strong>Invoice No:</strong> INV-{order.orderNumber}</p>
              <p className="text-xs"><strong>Date:</strong> {formatDate(order.createdAt)}</p>
              <p className="text-xs"><strong>AWB:</strong> {order.courier?.awbNumber || 'PENDING'}</p>
              <p className="text-xs"><strong>Payment:</strong> {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
            </div>
          </div>

          {/* Billing & Shipping Addresses */}
          <div className="grid grid-cols-2 gap-4 border-b border-zinc-200 pb-4">
            <div>
              <h4 className="font-black uppercase text-[11px] text-zinc-500 mb-1">Billed To:</h4>
              <p className="font-bold text-zinc-900">{order.customer.name}</p>
              <p>{order.billingAddress.addressLine1}</p>
              {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
              <p>{order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}</p>
              <p><strong>Phone:</strong> +91 {order.customer.phone}</p>
              <p><strong>Email:</strong> {order.customer.email}</p>
            </div>

            <div>
              <h4 className="font-black uppercase text-[11px] text-zinc-500 mb-1">Shipped To:</h4>
              <p className="font-bold text-zinc-900">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p><strong>Phone:</strong> +91 {order.shippingAddress.phone}</p>
              <p><strong>Place of Supply:</strong> {order.shippingAddress.state}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 border-y border-zinc-300 text-[10px] font-black uppercase text-zinc-700">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Description</th>
                  <th className="py-2 px-2">HSN</th>
                  <th className="py-2 px-2">Size / Color</th>
                  <th className="py-2 px-2 text-center">Qty</th>
                  <th className="py-2 px-2 text-right">Unit Price</th>
                  <th className="py-2 px-2 text-right">Taxable Val</th>
                  <th className="py-2 px-2 text-right">GST Rate</th>
                  <th className="py-2 px-2 text-right">Total (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {order.items.map((item, index) => {
                  const rateFraction = item.gstRate / 100;
                  const itemTotal = item.price * item.quantity;
                  const taxableValue = Math.round((itemTotal / (1 + rateFraction)) * 100) / 100;

                  return (
                    <tr key={index}>
                      <td className="py-2 px-2 text-zinc-500">{index + 1}</td>
                      <td className="py-2 px-2 font-bold text-zinc-900">{item.title}</td>
                      <td className="py-2 px-2 text-zinc-500">{item.hsnCode}</td>
                      <td className="py-2 px-2">{item.size} / {item.color}</td>
                      <td className="py-2 px-2 text-center font-bold">{item.quantity}</td>
                      <td className="py-2 px-2 text-right">{formatPrice(item.price)}</td>
                      <td className="py-2 px-2 text-right">₹{taxableValue}</td>
                      <td className="py-2 px-2 text-right">{item.gstRate}%</td>
                      <td className="py-2 px-2 text-right font-bold text-zinc-900">{formatPrice(itemTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tax Breakdown & Totals */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-right">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatPrice(order.subtotal)}</span>
              </div>
              {order.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({order.couponCode || 'Promo'}):</span>
                  <span>-{formatPrice(order.couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Charges:</span>
                <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
              </div>
              {order.codFee > 0 && (
                <div className="flex justify-between">
                  <span>COD Handling Fee:</span>
                  <span>{formatPrice(order.codFee)}</span>
                </div>
              )}
              {order.tax.isInterState ? (
                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>IGST (Integrated Tax):</span>
                  <span>{formatPrice(order.tax.igst)}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-zinc-500 text-[11px]">
                    <span>CGST (Central Tax):</span>
                    <span>{formatPrice(order.tax.cgst)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 text-[11px]">
                    <span>SGST (State Tax):</span>
                    <span>{formatPrice(order.tax.sgst)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-zinc-300">
                <span>Grand Total:</span>
                <span className="text-[#E11B23]">{formatPrice(order.grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Signatory */}
          <div className="border-t border-zinc-200 pt-6 flex items-end justify-between">
            <div className="text-[10px] text-zinc-500 max-w-sm space-y-0.5">
              <p><strong>Declaration:</strong></p>
              <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
              <p>For return or warranty claims, please refer to theashhstore.com/returns-policy</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-zinc-900">For THE ASHH STORE PVT LTD</p>
              <div className="h-10 flex items-center justify-end">
                <span className="text-[11px] text-zinc-400 italic">Digitally Signed</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-semibold">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
