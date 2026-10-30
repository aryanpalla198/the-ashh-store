'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Check,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Share2,
  Sparkles,
  AlertCircle,
  Maximize2,
  X,
  Eye,
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ProductSize, Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { checkPincodeServiceability } from '@/lib/shiprocket';
import SizeChartModal from '@/components/SizeChartModal';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = (params?.id as string) || '';

  const product = INITIAL_PRODUCTS.find((p) => p.id === productId || p.slug === productId) || INITIAL_PRODUCTS[0];

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Component states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.variants[0]?.color || 'Standard');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('400052');
  const [pincodeResult, setPincodeResult] = useState<any>(checkPincodeServiceability('400052'));
  const [addedAlert, setAddedAlert] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<'desc' | 'specs' | 'care' | 'delivery'>('desc');

  // Related products
  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.fandom === product.fandom)
  ).slice(0, 4);

  const isFavorited = isInWishlist(product.id);

  // Check current variant stock
  const currentVariant = product.variants.find((v) => v.size === selectedSize);
  const currentStock = currentVariant ? currentVariant.stock : null;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPincodeServiceability(pincodeInput);
    setPincodeResult(result);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first!');
      return;
    }
    if (currentVariant && currentVariant.stock <= 0) {
      alert('This size is currently out of stock.');
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first!');
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    router.push('/checkout');
  };

  return (
    <div className="bg-neutral-50 pb-20">
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 text-xs text-zinc-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-zinc-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <Link href={`/${product.category}`} className="hover:text-zinc-900 capitalize">
          {product.category.replace(/-/g, ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-800 font-semibold truncate max-w-xs">{product.title}</span>
      </div>

      {/* 2. Main PDP Viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Multi-View Image Gallery (Thumbs with Angle Badges + Zoom Stage) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails Rail with Angle Labels */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0 scrollbar-none">
              {product.images.map((img, idx) => {
                const angleName =
                  img.angle === 'front'
                    ? 'Front'
                    : img.angle === 'back'
                    ? 'Back'
                    : img.angle === 'side'
                    ? 'Side'
                    : img.angle === 'close'
                    ? 'Detail'
                    : img.angle === 'lifestyle'
                    ? 'Style'
                    : `View ${idx + 1}`;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-26 rounded-xl overflow-hidden border-2 transition-all flex flex-col shrink-0 group ${
                      activeImageIndex === idx
                        ? 'border-[#E11B23] shadow-md scale-102 ring-2 ring-red-100'
                        : 'border-zinc-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs text-white text-[9px] font-black uppercase text-center py-0.5 tracking-wider">
                      {angleName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Stage Image with Angle Badge & Lightbox Trigger */}
            <div className="relative flex-1 aspect-[3/4] bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm group">
              <img
                src={product.images[activeImageIndex]?.url || product.images[0]?.url}
                alt={product.title}
                onClick={() => setIsLightboxOpen(true)}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103 cursor-zoom-in"
              />

              {/* View Angle Pill Badge */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10 pointer-events-none">
                <Eye className="w-3.5 h-3.5 text-[#E11B23]" />
                <span>
                  {product.images[activeImageIndex]?.angle === 'front' && 'Front View'}
                  {product.images[activeImageIndex]?.angle === 'back' && 'Back Drape View'}
                  {product.images[activeImageIndex]?.angle === 'side' && 'Side Profile Angle'}
                  {product.images[activeImageIndex]?.angle === 'close' && 'Fabric & Print Detail'}
                  {product.images[activeImageIndex]?.angle === 'lifestyle' && 'Streetwear Styling'}
                  {!product.images[activeImageIndex]?.angle && 'Product View'}
                </span>
              </div>

              {/* Next / Previous Quick View Nav Buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous View"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next View"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Fullscreen Magnify Trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-zinc-900 p-2 rounded-xl shadow-md transition flex items-center gap-1 text-[11px] font-bold"
              >
                <Maximize2 className="w-4 h-4 text-[#E11B23]" />
                <span className="hidden sm:inline">Zoom HD</span>
              </button>

              {/* License Badge */}
              {product.officialLicenseBadge && (
                <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                  {product.officialLicenseBadge}
                </div>
              )}

              {/* Model Stats Pill */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-zinc-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border border-zinc-200">
                Model is 6'1" wearing size L
              </div>
            </div>
          </div>

          {/* Right Column: Buying Controls & Specs */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Fandom & Rating */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#E11B23] font-black uppercase tracking-wider">
                  {product.fandom || product.category}
                </span>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                  <span className="text-zinc-400 font-normal">| {product.reviewCount} Reviews</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Price section */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-base text-zinc-400 line-through">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="text-sm font-black text-[#E11B23] bg-red-50 px-2 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Inclusive of all taxes</p>

              {/* Ashh Club Member Exclusive Pill */}
              {product.memberPrice && (
                <div className="mt-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 fill-amber-600" />
                    <span className="text-xs font-black text-amber-950 uppercase">
                      The Ashh Club Price: ₹{product.memberPrice}
                    </span>
                  </div>
                  <Link href="/account" className="text-[11px] font-bold text-amber-800 hover:underline">
                    Join & Save ₹{product.price - product.memberPrice}
                  </Link>
                </div>
              )}
            </div>

            {/* Size Selector */}
            <div className="pt-4 border-t border-zinc-200">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-zinc-900">Select Size</span>
                  {selectedSize && (
                    <span className="text-xs font-bold text-[#E11B23]">({selectedSize})</span>
                  )}
                </div>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-xs font-bold text-[#E11B23] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              {/* Size Buttons Grid */}
              <div className="grid grid-cols-6 gap-2">
                {product.variants.map((v) => {
                  const isOutOfStock = v.stock <= 0;
                  const isSelected = selectedSize === v.size;
                  return (
                    <button
                      key={v.sku}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(v.size)}
                      className={`h-11 rounded-xl text-xs font-black transition relative border ${
                        isSelected
                          ? 'bg-[#E11B23] text-white border-[#E11B23] shadow-md shadow-red-900/20'
                          : isOutOfStock
                          ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed line-through'
                          : 'bg-white text-zinc-800 hover:border-zinc-400 border-zinc-300'
                      }`}
                    >
                      {v.size}
                      {/* Low Stock Warning */}
                      {v.stock > 0 && v.stock < 10 && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-black px-1 rounded-full whitespace-nowrap">
                          {v.stock} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stock Message */}
              {selectedSize && currentStock !== null && (
                <p className={`text-xs mt-2 font-bold ${currentStock > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {currentStock > 0 ? `✓ In Stock (${currentStock} available for dispatch)` : '✕ Out of stock in this size'}
                </p>
              )}
            </div>

            {/* Action Buttons: Add To Bag, Buy Now, Wishlist */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#E11B23] hover:bg-[#c5161d] text-white text-sm font-black uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition transform active:scale-[0.98]"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add To Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-black uppercase tracking-wider py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>Buy Now</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition flex items-center justify-center ${
                  isFavorited
                    ? 'bg-red-50 border-red-300 text-[#E11B23]'
                    : 'bg-white border-zinc-300 text-zinc-700 hover:text-[#E11B23]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#E11B23]' : ''}`} />
              </button>
            </div>

            {/* Pincode & Delivery Checker */}
            <div className="p-4 bg-white rounded-2xl border border-zinc-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-zinc-900">
                <MapPin className="w-4 h-4 text-[#E11B23]" />
                <span>Delivery & Services</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#E11B23]"
                />
                <button
                  type="submit"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase px-4 py-2 rounded-lg"
                >
                  Check
                </button>
              </form>

              {pincodeResult && pincodeResult.isServiceable && (
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Check className="w-4 h-4" />
                    <span>Get it by {pincodeResult.estimatedDeliveryDate}</span>
                  </div>
                  <div className="text-zinc-600 text-[11px] flex items-center gap-3">
                    <span>💵 Cash On Delivery Available</span>
                    <span>•</span>
                    <span>⚡ Bluedart Air Express</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion Tabs (Highlights, Fabric, Care, Returns) */}
            <div className="border-t border-zinc-200 pt-4 space-y-3">
              {/* Product Highlights */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'desc' ? ('' as any) : 'desc')}
                  className="w-full p-3.5 text-left text-xs font-black uppercase tracking-wider flex items-center justify-between text-zinc-900"
                >
                  <span>Product Highlights & Story</span>
                  <span>{activeAccordion === 'desc' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'desc' && (
                  <div className="p-3.5 pt-0 text-xs text-zinc-600 space-y-2 border-t border-zinc-100">
                    <p className="leading-relaxed">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 mt-2 font-medium">
                      {product.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Material & Fabric Specs */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'specs' ? ('' as any) : 'specs')}
                  className="w-full p-3.5 text-left text-xs font-black uppercase tracking-wider flex items-center justify-between text-zinc-900"
                >
                  <span>Material & Fabric Specs</span>
                  <span>{activeAccordion === 'specs' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'specs' && (
                  <div className="p-3.5 pt-0 text-xs text-zinc-600 space-y-1.5 border-t border-zinc-100">
                    <p><strong>Fabric:</strong> {product.fabric}</p>
                    <p><strong>GSM (Weight):</strong> {product.gsm} GSM Heavyweight Loopback</p>
                    <p><strong>Fit:</strong> {product.fit} (Streetwear Drop Shoulder)</p>
                    <p><strong>HSN Code:</strong> {product.hsnCode} (GST: {product.gstRate}%)</p>
                  </div>
                )}
              </div>

              {/* Wash Care */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? ('' as any) : 'care')}
                  className="w-full p-3.5 text-left text-xs font-black uppercase tracking-wider flex items-center justify-between text-zinc-900"
                >
                  <span>Wash Care Guidelines</span>
                  <span>{activeAccordion === 'care' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'care' && (
                  <div className="p-3.5 pt-0 text-xs text-zinc-600 border-t border-zinc-100">
                    <ul className="list-disc pl-4 space-y-1 font-medium">
                      {product.washCare.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Customer Reviews Section */}
        <section className="mt-16 pt-12 border-t border-zinc-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900">
                Customer Ratings & Reviews
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-zinc-800">4.8 out of 5</span>
                <span className="text-xs text-zinc-400">({product.reviewCount} global ratings)</span>
              </div>
            </div>

            <button
              onClick={() => alert('Review submission is enabled for verified purchases in your orders page!')}
              className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-xl self-start"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900">Aryan Palla</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded">
                  Verified Buyer
                </span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h4 className="text-xs font-black text-zinc-900">Supreme quality puff print!</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                The 240 GSM weight is authentic and has nice structure. I wore it out to comic con and got stopped 4 times asking where I got it from. Definitely buying more colors!
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900">Siddharth Rao</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded">
                  Verified Buyer
                </span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h4 className="text-xs font-black text-zinc-900">Best oversized fit in India</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                I was skeptical about sizing but the size guide was spot-on. True boxy fit, doesn't cling to the body, and the neck ribbing didn't stretch after a cold machine wash.
              </p>
            </div>
          </div>
        </section>

        {/* 4. You May Also Like */}
        <section className="mt-16 pt-12 border-t border-zinc-200">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        productType={product.fit}
      />

      {/* Fullscreen HD Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight">{product.title}</h3>
              <p className="text-xs text-zinc-400">
                View {activeImageIndex + 1} of {product.images.length} —{' '}
                <span className="text-[#E11B23] font-bold">
                  {product.images[activeImageIndex]?.angle === 'front' && 'Front View'}
                  {product.images[activeImageIndex]?.angle === 'back' && 'Back Drape View'}
                  {product.images[activeImageIndex]?.angle === 'side' && 'Side Profile Angle'}
                  {product.images[activeImageIndex]?.angle === 'close' && 'Fabric & Print Detail'}
                  {product.images[activeImageIndex]?.angle === 'lifestyle' && 'Streetwear Styling'}
                  {!product.images[activeImageIndex]?.angle && 'Product View'}
                </span>
              </p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image Viewport */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            <img
              src={product.images[activeImageIndex]?.url}
              alt={product.title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Prev/Next buttons */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                  activeImageIndex === idx
                    ? 'border-[#E11B23] scale-105 ring-2 ring-red-500/50'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
