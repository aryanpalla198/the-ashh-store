import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'badge' | 'inverted' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export default function Logo({
  className = '',
  variant = 'full',
  size = 'md',
  showSubtitle = false,
}: LogoProps) {
  // Size dimensions
  const dimensions = {
    sm: { badge: 32, text: 'text-base', subText: 'text-[9px]' },
    md: { badge: 40, text: 'text-xl', subText: 'text-[10px]' },
    lg: { badge: 52, text: 'text-2xl', subText: 'text-xs' },
    xl: { badge: 64, text: 'text-3xl', subText: 'text-sm' },
  }[size];

  const isLight = variant === 'white' || variant === 'inverted';

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Iconic Souled Store-style Red Badge Emblem */}
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ width: dimensions.badge, height: dimensions.badge }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Badge Background with smooth rounded geometry (Signature TSS Red #E11B23) */}
          <rect
            width="100"
            height="100"
            rx="24"
            fill={isLight && variant === 'inverted' ? '#FFFFFF' : '#E11B23'}
          />
          {/* Subtle inner gloss accent */}
          <path
            d="M 12 28 C 12 19.163 19.163 12 28 12 L 72 12 C 80.837 12 88 19.163 88 28 L 88 45 C 55 45 45 65 12 65 Z"
            fill="white"
            fillOpacity="0.08"
          />
          {/* Stylized Streetwear "A" Monogram & Comic Silhouette */}
          <path
            d="M 50 16 L 24 76 L 38 76 L 44 61 L 56 61 L 62 76 L 76 76 Z M 50 33 L 53.5 49 L 46.5 49 Z"
            fill={isLight && variant === 'inverted' ? '#E11B23' : '#FFFFFF'}
          />
          {/* Lightning pop accent cut */}
          <polygon
            points="50,42 56,52 48,52 52,62 43,51 49,51"
            fill={isLight && variant === 'inverted' ? '#FFFFFF' : '#E11B23'}
          />
        </svg>
      </div>

      {/* Typography: The Ashh Store */}
      {variant !== 'badge' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline tracking-tight font-black">
            <span
              className={`font-black tracking-tight ${
                isLight ? 'text-white' : 'text-zinc-900'
              } ${dimensions.text}`}
              style={{ fontFamily: 'inherit' }}
            >
              The <span className="text-[#E11B23]">Ashh</span> Store
            </span>
          </div>
          {showSubtitle && (
            <span
              className={`tracking-wider uppercase font-semibold text-zinc-500 mt-0.5 ${dimensions.subText}`}
            >
              Official Pop Culture Merch
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
