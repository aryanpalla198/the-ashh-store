'use client';

import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { Printer, Tag, Truck, Check, Eye, X, Filter } from 'lucide-react';
import InvoiceModal from '@/components/InvoiceModal';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [shippingLabelOrder, setShippingLabelOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(
          orders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (e) {
      alert('Status update failed');
    }
  };

  const handleMarkCODPaid = async (orderId: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, paymentStatus: 'paid' } : o))
    );
    alert('Payment marked as PAID via Cash On Delivery.');
  };

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((o) => o.orderStatus === filterStatus);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">
            Logistics & Fulfillment
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
            Customer Orders ({filteredOrders.length})
          </h2>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          {['all', 'placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition ${
                filterStatus === st
                  ? 'bg-[#E11B23] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950/80 text-zinc-400 font-bold uppercase border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Info</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status & Workflow</th>
                <th className="py-3 px-4 text-right">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300 font-medium">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-800/30 transition">
                  {/* Order ID */}
                  <td className="py-3.5 px-4">
                    <p className="font-mono font-bold text-white">#{ord.orderNumber}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{formatDate(ord.createdAt)}</p>
                    <p className="text-[10px] text-[#E11B23] font-bold">
                      {ord.items.reduce((acc, i) => acc + i.quantity, 0)} items • {formatPrice(ord.grandTotal)}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{ord.customer.name}</p>
                    <p className="text-[11px] text-zinc-400">+91 {ord.customer.phone}</p>
                    <p className="text-[10px] text-zinc-500 truncate max-w-[150px]">{ord.customer.email}</p>
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-4">
                    <p className="text-zinc-200">{ord.shippingAddress.city}, {ord.shippingAddress.state}</p>
                    <p className="text-[10px] font-mono text-zinc-500">PIN: {ord.shippingAddress.pincode}</p>
                  </td>

                  {/* Payment */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <span className="uppercase text-[10px] font-black bg-zinc-800 px-2 py-0.5 rounded text-white">
                        {ord.paymentMethod}
                      </span>
                      <p
                        className={`text-[10px] font-bold ${
                          ord.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        ● {ord.paymentStatus.toUpperCase()}
                      </p>
                      {ord.paymentMethod === 'cod' && ord.paymentStatus !== 'paid' && (
                        <button
                          onClick={() => handleMarkCODPaid(ord.id)}
                          className="text-[9px] font-bold text-emerald-400 hover:underline block"
                        >
                          Mark COD Paid
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Status & Transitions */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1.5">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-zinc-950 border border-zinc-700 rounded-lg text-xs font-bold text-white px-2.5 py-1 focus:outline-none cursor-pointer"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="out_for_delivery">Out For Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      {ord.courier && (
                        <p className="text-[10px] font-mono text-zinc-500">AWB: {ord.courier.awbNumber}</p>
                      )}
                    </div>
                  </td>

                  {/* Documents & Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition"
                        title="Print GST Tax Invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      <button
                        onClick={() => setShippingLabelOrder(ord)}
                        className="bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition"
                        title="Generate Courier Shipping Label"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Label</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          isOpen={Boolean(selectedInvoiceOrder)}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

      {/* Shipping Label Preview Modal */}
      {shippingLabelOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
          <div className="bg-white text-zinc-950 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4 font-sans text-xs print:border-none print:shadow-none">
            <div className="flex justify-between items-center border-b pb-3 print:hidden">
              <h3 className="font-black uppercase text-sm">Shiprocket Shipping Label</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-[#E11B23] text-white px-3 py-1 rounded text-xs font-bold"
                >
                  Print Label
                </button>
                <button onClick={() => setShippingLabelOrder(null)} className="text-zinc-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Label Document */}
            <div className="border-2 border-black p-4 space-y-3">
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div>
                  <h4 className="font-black text-base uppercase">THE ASHH STORE</h4>
                  <p className="text-[10px]">Bluedart Air Express Surface</p>
                </div>
                <div className="text-right font-black">
                  <span className="text-xs bg-black text-white px-2 py-0.5 uppercase">
                    {shippingLabelOrder.paymentMethod.toUpperCase()}
                  </span>
                  <p className="text-sm mt-1">{formatPrice(shippingLabelOrder.grandTotal)}</p>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="text-center py-2 bg-zinc-100 border border-zinc-300">
                <div className="h-10 flex items-center justify-center font-mono font-black text-sm tracking-widest">
                  |||||| |||| |||||||| ||| |||||||
                </div>
                <p className="font-mono text-[10px]">{shippingLabelOrder.courier?.awbNumber || 'SRKT8927163821'}</p>
              </div>

              {/* Destination */}
              <div className="border-t border-black pt-2">
                <p className="text-[10px] uppercase font-bold text-zinc-500">Deliver To:</p>
                <p className="font-black text-sm">{shippingLabelOrder.shippingAddress.name}</p>
                <p>{shippingLabelOrder.shippingAddress.addressLine1}</p>
                <p className="font-bold text-base mt-1">
                  {shippingLabelOrder.shippingAddress.city} - {shippingLabelOrder.shippingAddress.pincode}
                </p>
                <p>Phone: +91 {shippingLabelOrder.shippingAddress.phone}</p>
              </div>

              {/* Return Address */}
              <div className="border-t border-black pt-2 text-[10px] text-zinc-600">
                <p><strong>If Undelivered Return To:</strong> The Ashh Store Hub, Bhiwandi, Thane, MH - 421302</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
