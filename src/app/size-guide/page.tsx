'use client';

import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  const charts = [
    {
      title: 'Oversized T-Shirts (Streetwear Drop Shoulder)',
      data: {
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
      },
    },
    {
      title: 'Hoodies & Sweatshirts (Brushed Fleece)',
      data: {
        inches: [
          { size: 'S', chest: '44', length: '27.5', shoulder: '21', sleeve: '24.5' },
          { size: 'M', chest: '46', length: '28.5', shoulder: '22', sleeve: '25.0' },
          { size: 'L', chest: '48', length: '29.5', shoulder: '23', sleeve: '25.5' },
          { size: 'XL', chest: '50', length: '30.5', shoulder: '24', sleeve: '26.0' },
        ],
        cm: [
          { size: 'S', chest: '111.8', length: '69.8', shoulder: '53.3', sleeve: '62.2' },
          { size: 'M', chest: '116.8', length: '72.4', shoulder: '55.9', sleeve: '63.5' },
          { size: 'L', chest: '121.9', length: '74.9', shoulder: '58.4', sleeve: '64.8' },
          { size: 'XL', chest: '127.0', length: '77.5', shoulder: '60.9', sleeve: '66.0' },
        ],
      },
    },
  ];

  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-950 flex items-center gap-2">
              <Ruler className="w-8 h-8 text-[#E11B23]" />
              <span>Comprehensive Size Guide</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Find your ideal fit across our official oversized t-shirts and hoodies.
            </p>
          </div>

          <div className="bg-white p-1 rounded-xl flex gap-1 border border-zinc-200 self-start">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                unit === 'inches' ? 'bg-[#E11B23] text-white' : 'text-zinc-600'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                unit === 'cm' ? 'bg-[#E11B23] text-white' : 'text-zinc-600'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {charts.map((chart, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-zinc-900">
                {chart.title}
              </h2>
              <div className="border border-zinc-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-center border-collapse">
                  <thead className="bg-zinc-100 text-zinc-700 font-black uppercase">
                    <tr>
                      <th className="py-3 px-4 border-b border-zinc-200">Size</th>
                      <th className="py-3 px-4 border-b border-zinc-200">Chest</th>
                      <th className="py-3 px-4 border-b border-zinc-200">Length</th>
                      <th className="py-3 px-4 border-b border-zinc-200">Shoulder</th>
                      <th className="py-3 px-4 border-b border-zinc-200">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 font-medium text-zinc-800">
                    {chart.data[unit].map((row) => (
                      <tr key={row.size} className="hover:bg-red-50/30">
                        <td className="py-3 px-4 font-bold text-[#E11B23] bg-zinc-50">{row.size}</td>
                        <td className="py-3 px-4">{row.chest}</td>
                        <td className="py-3 px-4">{row.length}</td>
                        <td className="py-3 px-4">{row.shoulder}</td>
                        <td className="py-3 px-4">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
