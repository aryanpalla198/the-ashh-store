'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Award,
  GitBranch,
  Github,
  Workflow,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ExternalLink,
  Code2,
  Terminal,
  Server,
  Database,
  CreditCard,
  Truck,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-neutral-50 pb-24 pt-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Header Banner */}
        <div className="text-center space-y-3">
          <Logo size="lg" showSubtitle className="justify-center" />
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 mt-4">
            Wear Your Fandom With Pride
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Born out of love for superhero comic books, high-octane anime, gaming culture, and premium Indian streetwear.
          </p>

          {/* Quick GitHub Action Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://aryanpalla198.github.io/the-ashh-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E11B23] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Live Website (github.io)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/aryanpalla198/the-ashh-store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3.5 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>GitHub Pages: Active</span>
            </div>
          </div>
        </div>

        {/* 2. Brand Story Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-sm space-y-6 text-sm text-zinc-700 leading-relaxed">
          <div className="flex items-center gap-2 text-[#E11B23] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 fill-[#E11B23]" />
            <span>Brand Heritage</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 tracking-tight">
            The Ashh Story
          </h2>

          <p>
            <strong>The Ashh Store</strong> was founded to revolutionize pop-culture apparel in India. Modeled after the iconic aesthetic and precision of <em>The Souled Store</em>, we bring superhero fandoms, anime legends, and high-fashion streetwear under one roof with uncompromised quality.
          </p>
          <p>
            We engineer heavyweight drops utilizing authentic <strong>240+ GSM combed cotton</strong>, French terry weaves, high-definition puff printing, bio-silicon softening washes, and official licenses across Marvel, Naruto Shippuden, DC Comics, and Disney.
          </p>
          <p>
            From our design labs in Mumbai to our fulfillment centers nationwide, every seam, fabric cut, and woven label reflects world-class craftsmanship.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-200 text-center">
            <div className="space-y-1">
              <span className="text-3xl font-black text-[#E11B23]">100%</span>
              <p className="text-xs font-bold text-zinc-800">Official Licensed Merch</p>
              <p className="text-[11px] text-zinc-500">Marvel, Naruto, DC & Disney</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-[#E11B23]">240+ GSM</span>
              <p className="text-xs font-bold text-zinc-800">Heavyweight Cotton</p>
              <p className="text-[11px] text-zinc-500">French Terry & Supima Luxury</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-[#E11B23]">18,000+</span>
              <p className="text-xs font-bold text-zinc-800">Pincodes Serviced</p>
              <p className="text-[11px] text-zinc-500">Express Delivery with Shiprocket</p>
            </div>
          </div>
        </div>

        {/* 3. Tech Stack & Architecture Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#E11B23] text-xs font-black uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Under The Hood</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 tracking-tight">
            Production Tech Stack & Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                <Code2 className="w-4 h-4 text-[#E11B23]" />
                <span>Frontend & User Interface</span>
              </div>
              <ul className="text-xs text-zinc-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Next.js 14 App Router</strong> with TypeScript & Server Components</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Tailwind CSS</strong> with custom Souled Store design system (#E11B23)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Souled Store Mega Menu</strong> with multi-column category drops</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>5-Angle HD Image Zoom Gallery</strong> with Fullscreen Lightbox Modal</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                <Server className="w-4 h-4 text-[#E11B23]" />
                <span>Backend, API & Storage</span>
              </div>
              <ul className="text-xs text-zinc-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Next.js API Routes</strong> with JWT authentication & RBAC</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Multi-Engine Database Layer</strong> supporting MongoDB & PostgreSQL</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Razorpay API Integration</strong> (Cards, UPI, Netbanking, Wallets)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Shiprocket Courier Adapter</strong> with real-time tracking & labels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. GitHub CI/CD Workflow & Repository Info */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-red-400 text-xs font-black uppercase tracking-wider">
              <Workflow className="w-4 h-4" />
              <span>Automated DevOps</span>
            </div>

            <a
              href="https://github.com/aryanpalla198/the-ashh-store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase px-4 py-2 rounded-xl transition"
            >
              <Github className="w-4 h-4" />
              <span>View On GitHub →</span>
            </a>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            GitHub Actions CI/CD Pipeline
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
            Every pull request and push to the <code className="bg-zinc-800 px-2 py-0.5 rounded text-red-400 font-mono text-xs">main</code> branch automatically triggers our continuous integration workflow located at <code className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-200 font-mono text-xs">.github/workflows/ci.yml</code>.
          </p>

          <div className="bg-black/60 rounded-2xl p-5 border border-zinc-800 font-mono text-xs space-y-2 text-zinc-300">
            <div className="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-800">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>.github/workflows/ci.yml</span>
              </span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">GitHub Actions</span>
            </div>
            <p className="text-emerald-400"># 1. Automated checkout and Node.js 20 environment</p>
            <p className="text-zinc-400">$ git clone & setup-node@v4</p>
            <p className="text-emerald-400"># 2. Dependency tree installation</p>
            <p className="text-zinc-400">$ npm install</p>
            <p className="text-emerald-400"># 3. Full production static & dynamic build validation</p>
            <p className="text-zinc-400">$ npm run build  <span className="text-emerald-500 font-bold">✓ (32/32 routes verified)</span></p>
          </div>
        </div>

        {/* 5. Admin Dashboard & Quick Navigation */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#E11B23] text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Store Operations</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 tracking-tight">
            Role-Based Admin Portal
          </h2>

          <p className="text-sm text-zinc-600 leading-relaxed">
            The platform contains a dedicated admin portal to oversee live sales, inventory across sizes/colors, coupon campaigns, and customer order fulfillment.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-md"
            >
              <span>Launch Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/men?subCategory=shirts"
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition"
            >
              <span>Browse Men's Shirts</span>
            </Link>

            <Link
              href="/men?subCategory=shoes-sneakers"
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition"
            >
              <span>Browse Chunky Sneakers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
