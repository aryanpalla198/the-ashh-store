'use client';

import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType?: string;
}

export default function SizeChartModal({ isOpen, onClose, productType = 'Oversized T-Shirt' }: SizeChartModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  // Measurement matrix
  const measurements = {
    inches: [
      { size: 'XS', chest: '40', length: '28', shoulder: '20.5', sleeve: '9.0' },
      { size: 'S', chest: '42', length: '29', shoulder: '21.5', sleeve: '9.5' },
      { size: 'M', chest: '44', length: '30', shoulder: '22.5', sleeve: '10.0' },
      { size: 'L', chest: '46', length: '31', shoulder: '23.5', sleeve: '10.5' },
      { size: 'XL', chest: '48', length: '32', shoulder: '24.5', sleeve: '11.0' },
      { size: 'XXL', chest: '50', length: '33', shoulder: '25.5', sleeve: '11.5' },
    ],
    cm: [
      { size: 'XS', chest: '101.6', length: '71.1', shoulder: '52.0', sleeve: '22.8' },
      { size: 'S', chest: '106.7', length: '73.6', shoulder: '54.6', sleeve: '24.1' },
      { size: 'M', chest: '111.8', length: '76.2', shoulder: '57.1', sleeve: '25.4' },
      { size: 'L', chest: '116.8', length: '78.7', shoulder: '59.7', sleeve: '26.7' },
      { size: 'XL', chest: '121.9', length: '81.3', shoulder: '62.2', sleeve: '27.9' },
      { size: 'XXL', chest: '127.0', length: '83.8', shoulder: '64.8', sleeve: '29.2' },
    ],
  }[unit];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-zinc-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#E11B23]" />
            <h3 className="text-base font-black uppercase text-zinc-900 tracking-wider">
              {productType} Size Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
              Measurement Unit:
            </span>
            <div className="bg-zinc-100 p-0.5 rounded-lg flex gap-1 border border-zinc-200">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                  unit === 'inches' ? 'bg-[#E11B23] text-white shadow-sm' : 'text-zinc-600'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                  unit === 'cm' ? 'bg-[#E11B23] text-white shadow-sm' : 'text-zinc-600'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-zinc-100 text-zinc-700 font-black uppercase">
                <tr>
                  <th className="py-2.5 px-3 border-b border-zinc-200">Size</th>
                  <th className="py-2.5 px-3 border-b border-zinc-200">Chest</th>
                  <th className="py-2.5 px-3 border-b border-zinc-200">Length</th>
                  <th className="py-2.5 px-3 border-b border-zinc-200">Shoulder</th>
                  <th className="py-2.5 px-3 border-b border-zinc-200">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-medium text-zinc-800">
                {measurements.map((row) => (
                  <tr key={row.size} className="hover:bg-red-50/40 transition">
                    <td className="py-2.5 px-3 font-bold text-[#E11B23] bg-zinc-50/50">{row.size}</td>
                    <td className="py-2.5 px-3">{row.chest}</td>
                    <td className="py-2.5 px-3">{row.length}</td>
                    <td className="py-2.5 px-3">{row.shoulder}</td>
                    <td className="py-2.5 px-3">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring tips note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold">Fit Note:</strong> Oversized fits have an intentional
            drop-shoulder and boxy silhouette. If you prefer a standard tailored look, we recommend
            ordering one size down from your regular size.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-center">
          <button
            onClick={onClose}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition"
          >
            Got It, Back to Product
          </button>
        </div>
      </div>
    </div>
  );
}
