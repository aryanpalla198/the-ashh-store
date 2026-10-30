'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, Truck, MapPin, CheckCircle2, Clock, Search, ArrowRight } from 'lucide-react';
import { generateShiprocketTracking } from '@/lib/shiprocket';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId || 'ASHH-2026-SPK891');
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (orderIdInput) {
      handleTrack();
    }
  }, []);

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderIdInput.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const data = generateShiprocketTracking('shipped', 'Mumbai');
      setTrackingInfo(data);
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="bg-neutral-50 pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#E11B23] text-xs font-black uppercase px-3 py-1 rounded-full">
            <Package className="w-3.5 h-3.5" />
            <span>Shiprocket Courier Live Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
            Track Your Ashh Package
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Enter your Order Number or Courier AWB Code to get real-time GPS tracking.
          </p>

          {/* Form */}
          <form onSubmit={handleTrack} className="pt-4 flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              required
              placeholder="e.g. ASHH-2026-SPK891 or SRKT9281726481"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
              className="flex-1 bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#E11B23] shadow-sm"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition"
            >
              {isSearching ? 'Tracking...' : 'Track'}
            </button>
          </form>
        </div>

        {/* Live Timeline Result Card */}
        {trackingInfo && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xl space-y-8 animate-fade-in">
            {/* Courier Summary Card */}
            <div className="p-5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-red-950 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-zinc-400">Courier Partner</span>
                <h3 className="text-base sm:text-lg font-black uppercase text-white mt-0.5">
                  {trackingInfo.courierName}
                </h3>
                <p className="text-xs text-zinc-300 font-mono mt-1">
                  AWB: <strong className="text-white">{trackingInfo.awbNumber}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase text-zinc-400">Current Location</span>
                <p className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1 sm:justify-end">
                  <MapPin className="w-4 h-4" />
                  <span>{trackingInfo.currentLocation}</span>
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">ETA: Expected in 1-2 Days</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6 pl-4 sm:pl-8 border-l-2 border-red-200 ml-4">
              {trackingInfo.trackingSteps.map((step: any, index: number) => (
                <div key={index} className="relative group">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[25px] sm:-left-[41px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition ${
                      step.completed
                        ? 'bg-[#E11B23] text-white shadow-md'
                        : 'bg-zinc-200 text-zinc-400'
                    }`}
                  >
                    {step.completed ? '✓' : index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4
                        className={`text-sm font-black uppercase tracking-tight ${
                          step.completed ? 'text-zinc-900' : 'text-zinc-400'
                        }`}
                      >
                        {step.status}
                      </h4>
                      <span className="text-xs text-zinc-400 font-mono">{step.timestamp}</span>
                    </div>

                    <p className="text-xs font-semibold text-zinc-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{step.location}</span>
                    </p>

                    <p className="text-xs text-zinc-500 leading-relaxed">{step.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Note */}
            <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
              <span>Need help with your package? Our logistics desk is available 24/7.</span>
              <a
                href="mailto:shipping@theashhstore.com"
                className="text-[#E11B23] font-bold hover:underline"
              >
                Contact Ashh Support →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-bold uppercase">Loading Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
