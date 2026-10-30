'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  Wallet,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Printer,
  XCircle,
  Truck,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { Order, Address } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import InvoiceModal from '@/components/InvoiceModal';

export default function AccountPage() {
  const { user, switchRole, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { wishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wallet' | 'returns'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Return modal states
  const [returnModalOrder, setReturnModalOrder] = useState<Order | null>(null);
  const [returnReason, setReturnReason] = useState('Size did not fit');
  const [returnRefundMode, setReturnRefundMode] = useState<'store_credit' | 'bank_account'>('store_credit');
  const [returnBankUPI, setReturnBankUPI] = useState('');
  const [returnSuccess, setReturnSuccess] = useState(false);

  // Fetch orders
  useEffect(() => {
    async function loadOrders() {
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
    loadOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, orderStatus: 'cancelled' } : o)));
        alert('Order has been cancelled successfully.');
      }
    } catch (e) {
      alert('Failed to cancel order');
    }
  };

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnModalOrder) return;

    try {
      const res = await fetch(`/api/orders/${returnModalOrder.id}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: returnReason,
          refundMethod: returnRefundMode,
          upiId: returnBankUPI,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReturnSuccess(true);
        setTimeout(() => {
          setReturnSuccess(false);
          setReturnModalOrder(null);
        }, 1500);
      }
    } catch (e) {
      alert('Return request failed');
    }
  };

  const trackingSteps = [
    { key: 'placed', label: 'Order Placed' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'packed', label: 'Packed' },
    { key: 'shipped', label: 'In Transit' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' },
  ];

  const getStepProgressIndex = (status: Order['orderStatus']) => {
    const map: Record<string, number> = {
      placed: 0,
      confirmed: 1,
      packed: 2,
      shipped: 3,
      out_for_delivery: 4,
      delivered: 5,
      cancelled: -1,
      returned: -1,
    };
    return map[status] ?? 0;
  };

  return (
    <div className="bg-neutral-50 pb-24 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Greeting & Stats Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 text-white font-black text-2xl flex items-center justify-center shadow-md">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase text-zinc-900">
                  {user?.name || 'Ashh Fan'}
                </h1>
                {user?.isMember && (
                  <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" /> Ashh Club VIP
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">{user?.email} • +91 {user?.phone || '9876500001'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200 text-center min-w-[110px]">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Wallet Balance</span>
              <p className="text-base font-black text-[#E11B23]">₹{user?.walletBalance || 500}</p>
            </div>
            <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200 text-center min-w-[110px]">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Total Orders</span>
              <p className="text-base font-black text-zinc-900">{orders.length}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase transition ${
                activeTab === 'orders' ? 'bg-[#E11B23] text-white shadow-sm' : 'bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders & Live Tracking</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase transition ${
                activeTab === 'addresses' ? 'bg-[#E11B23] text-white shadow-sm' : 'bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('wallet')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase transition ${
                activeTab === 'wallet' ? 'bg-[#E11B23] text-white shadow-sm' : 'bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Ashh Wallet & Credits</span>
            </button>

            <Link
              href="/wishlist"
              className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase bg-white text-zinc-700 hover:bg-zinc-100 transition"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>

            <div className="pt-4 border-t border-zinc-200 mt-4">
              <Link
                href="/admin"
                onClick={() => switchRole('admin')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase bg-zinc-900 text-white hover:bg-zinc-800 transition shadow-sm"
              >
                <span>⚙️ Switch To Admin View</span>
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-base font-black uppercase tracking-wider text-zinc-900">
                  Order History & Live Courier Tracking
                </h2>

                {orders.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl border border-zinc-200 text-center">
                    <p className="text-sm font-bold text-zinc-700">No orders placed yet!</p>
                    <Link
                      href="/oversized"
                      className="mt-4 inline-block bg-[#E11B23] text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl"
                    >
                      Browse Collections
                    </Link>
                  </div>
                ) : (
                  orders.map((ord) => {
                    const stepIdx = getStepProgressIndex(ord.orderStatus);
                    const canCancel = ['placed', 'confirmed'].includes(ord.orderStatus);
                    const canReturn = ord.orderStatus === 'delivered' && !ord.returnRequest;

                    return (
                      <div
                        key={ord.id}
                        className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-5"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                          <div>
                            <span className="text-[10px] font-black uppercase text-zinc-400">
                              Order #{ord.orderNumber}
                            </span>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              Placed on {formatDate(ord.createdAt)} • Payment: <strong className="uppercase">{ord.paymentMethod}</strong> ({ord.paymentStatus})
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedInvoiceOrder(ord)}
                              className="text-xs font-bold text-zinc-700 hover:text-[#E11B23] bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Invoice</span>
                            </button>

                            <span
                              className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                                ord.orderStatus === 'delivered'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : ord.orderStatus === 'cancelled'
                                  ? 'bg-zinc-100 text-zinc-500'
                                  : 'bg-red-50 text-[#E11B23]'
                              }`}
                            >
                              {ord.orderStatus.replace(/_/g, ' ')}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Visual Stepper (The Souled Store / Shiprocket style) */}
                        {ord.orderStatus !== 'cancelled' && (
                          <div className="py-2">
                            <div className="grid grid-cols-6 gap-1 text-center">
                              {trackingSteps.map((st, i) => {
                                const isDone = stepIdx >= i;
                                const isCurrent = stepIdx === i;
                                return (
                                  <div key={st.key} className="flex flex-col items-center">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition ${
                                        isDone
                                          ? 'bg-[#E11B23] text-white shadow-sm'
                                          : 'bg-zinc-200 text-zinc-500'
                                      }`}
                                    >
                                      {isDone ? '✓' : i + 1}
                                    </div>
                                    <span
                                      className={`text-[9px] sm:text-[10px] font-bold leading-tight ${
                                        isCurrent
                                          ? 'text-[#E11B23]'
                                          : isDone
                                          ? 'text-zinc-800'
                                          : 'text-zinc-400'
                                      }`}
                                    >
                                      {st.label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Order Items */}
                        <div className="space-y-3 pt-2">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-14 h-16 object-cover rounded-xl bg-zinc-100 shrink-0"
                                />
                                <div>
                                  <h4 className="font-bold text-zinc-900 line-clamp-1">
                                    {item.title}
                                  </h4>
                                  <p className="text-[11px] text-zinc-500 mt-0.5">
                                    Size: <strong>{item.size}</strong> • Color: <strong>{item.color}</strong> • Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-black text-zinc-900">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions (Cancel / Return / Track) */}
                        <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs">
                            <span className="text-zinc-500">Grand Total: </span>
                            <span className="font-black text-zinc-950 text-sm">{formatPrice(ord.grandTotal)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {canCancel && (
                              <button
                                onClick={() => handleCancelOrder(ord.id)}
                                className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition"
                              >
                                Cancel Order
                              </button>
                            )}

                            {canReturn && (
                              <button
                                onClick={() => setReturnModalOrder(ord)}
                                className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition"
                              >
                                Return or Exchange
                              </button>
                            )}

                            {ord.courier && (
                              <Link
                                href={`/track-order?orderId=${ord.orderNumber}`}
                                className="text-xs font-bold text-[#E11B23] bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                              >
                                Live Courier Route →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <h2 className="text-base font-black uppercase tracking-wider text-zinc-900">
                    Saved Delivery Addresses
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user?.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50/50 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-900">{addr.name}</span>
                        <span className="text-[10px] bg-zinc-200 text-zinc-700 font-bold px-2 py-0.5 rounded">
                          {addr.addressType}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600">{addr.addressLine1}</p>
                      {addr.addressLine2 && <p className="text-xs text-zinc-500">{addr.addressLine2}</p>}
                      <p className="text-xs text-zinc-700 font-semibold">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs text-zinc-500">Phone: +91 {addr.phone}</p>

                      <div className="pt-3 flex items-center justify-between border-t border-zinc-200">
                        {addr.isDefault ? (
                          <span className="text-[11px] font-bold text-emerald-700">✓ Default Address</span>
                        ) : (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-[11px] font-bold text-zinc-600 hover:text-zinc-900"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-xs text-zinc-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WALLET TAB */}
            {activeTab === 'wallet' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
                <h2 className="text-base font-black uppercase tracking-wider text-zinc-900">
                  The Ashh Store Wallet & Credits
                </h2>

                <div className="p-6 bg-gradient-to-r from-zinc-950 to-zinc-800 text-white rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Total Available Credit
                    </span>
                    <h3 className="text-3xl font-black text-white mt-1">₹{user?.walletBalance || 500}</h3>
                    <p className="text-xs text-zinc-400 mt-1">Instant 1-click checkout on your next fashion order</p>
                  </div>
                  <Wallet className="w-12 h-12 text-[#E11B23]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Return Request Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4">
            <h3 className="text-base font-black uppercase text-zinc-900">
              Return Request • #{returnModalOrder.orderNumber}
            </h3>

            {returnSuccess ? (
              <div className="text-center py-6 text-emerald-600 font-bold space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <p>Return request accepted! Shiprocket reverse pickup scheduled.</p>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Reason for Return</label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full bg-zinc-100 border border-zinc-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option>Size did not fit (Too Large)</option>
                    <option>Size did not fit (Too Small)</option>
                    <option>Fabric feel was not as expected</option>
                    <option>Received defective or wrong product</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Refund Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={returnRefundMode === 'store_credit'}
                        onChange={() => setReturnRefundMode('store_credit')}
                        className="text-[#E11B23]"
                      />
                      <span>Instant Ashh Store Credit (With extra ₹100 bonus)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={returnRefundMode === 'bank_account'}
                        onChange={() => setReturnRefundMode('bank_account')}
                        className="text-[#E11B23]"
                      />
                      <span>Original Bank Account / UPI</span>
                    </label>
                  </div>
                </div>

                {returnRefundMode === 'bank_account' && (
                  <div>
                    <label className="block font-bold text-zinc-700 uppercase mb-1">UPI ID for Refund</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. yourname@okhdfcbank"
                      value={returnBankUPI}
                      onChange={(e) => setReturnBankUPI(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2 focus:outline-none"
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReturnModalOrder(null)}
                    className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 font-bold uppercase rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#E11B23] text-white font-bold uppercase rounded-lg hover:bg-red-700"
                  >
                    Submit Return
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          isOpen={Boolean(selectedInvoiceOrder)}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
