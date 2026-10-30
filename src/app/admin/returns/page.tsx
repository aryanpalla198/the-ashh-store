'use client';

import React, { useState } from 'react';
import { RotateCcw, Check, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface MockReturn {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  productTitle: string;
  reason: string;
  refundAmount: number;
  refundMode: 'bank_account' | 'store_credit';
  status: 'pending' | 'approved' | 'refunded' | 'rejected';
}

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState<MockReturn[]>([
    {
      id: 'ret-101',
      orderNumber: 'ASHH-2026-SPK891',
      customerName: 'Aryan Palla',
      phone: '9876500001',
      productTitle: 'Naruto: Akatsuki Cloud Oversized T-Shirt (Size L)',
      reason: 'Size too large, need smaller fit',
      refundAmount: 799,
      refundMode: 'store_credit',
      status: 'pending',
    },
    {
      id: 'ret-102',
      orderNumber: 'ASHH-2026-MRL204',
      customerName: 'Rohit Verma',
      phone: '9812345678',
      productTitle: 'Batman Utility Cargo Joggers (Size XL)',
      reason: 'Ordered wrong color shade',
      refundAmount: 1399,
      refundMode: 'bank_account',
      status: 'pending',
    },
  ]);

  const handleApproveRefund = (id: string) => {
    setReturns(
      returns.map((r) => (r.id === id ? { ...r, status: 'refunded' } : r))
    );
    alert('Return approved! Razorpay API refund initiated and Reverse Pickup generated via Shiprocket.');
  };

  const handleReject = (id: string) => {
    setReturns(
      returns.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">
          Customer Experience Desk
        </span>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
          Returns & Refund Authorizations ({returns.length})
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950/80 text-zinc-400 font-bold uppercase border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Order & Customer</th>
                <th className="py-3 px-4">Product Returned</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Refund Mode</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300 font-medium">
              {returns.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-800/30 transition">
                  <td className="py-3.5 px-4">
                    <p className="font-mono font-bold text-white">#{r.orderNumber}</p>
                    <p className="text-[11px] text-zinc-400">{r.customerName}</p>
                    <p className="text-[10px] text-zinc-500">+91 {r.phone}</p>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    {r.productTitle}
                  </td>

                  <td className="py-3.5 px-4 text-zinc-300">
                    {r.reason}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="uppercase text-[10px] font-bold bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                      {r.refundMode.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">
                    {formatPrice(r.refundAmount)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {r.status === 'refunded' ? (
                      <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded">
                        ✓ Refund Processed
                      </span>
                    ) : r.status === 'rejected' ? (
                      <span className="text-[10px] font-black uppercase text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded">
                        ✕ Rejected
                      </span>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApproveRefund(r.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg transition"
                        >
                          Approve Refund
                        </button>
                        <button
                          onClick={() => handleReject(r.id)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
