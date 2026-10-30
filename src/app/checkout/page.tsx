'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Truck,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types';
import { formatPrice } from '@/lib/utils';
import { checkPincodeServiceability } from '@/lib/shiprocket';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    couponDiscount,
    appliedCoupon,
    shippingFee,
    codFee,
    grandTotal,
    isCOD,
    setIsCOD,
    clearCart,
  } = useCart();
  const { user, addAddress } = useAuth();

  // Multi-step: 1 = Address, 2 = Shipping, 3 = Payment
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Address state
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: user?.name || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400052',
    addressType: 'Home',
    isDefault: true,
  });

  // Shipping speed
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');

  // Payment method: 'razorpay' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  // Loading states
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set default address on load
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0) {
      const def = user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setSelectedAddressId(def.id);
    } else {
      setShowNewAddressForm(true);
    }
  }, [user]);

  // Sync COD fee state with CartContext
  useEffect(() => {
    setIsCOD(paymentMethod === 'cod');
  }, [paymentMethod, setIsCOD]);

  // Auto-fill city/state on pincode change
  const handlePincodeChange = (pin: string) => {
    const cleaned = pin.replace(/\D/g, '');
    setNewAddress((prev) => ({ ...prev, pincode: cleaned }));
    if (cleaned.length === 6) {
      const res = checkPincodeServiceability(cleaned);
      if (res.isServiceable) {
        setNewAddress((prev) => ({ ...prev, city: res.city, state: res.state }));
      }
    }
  };

  const handleSaveNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.phone || !newAddress.addressLine1 || !newAddress.pincode) {
      alert('Please fill all mandatory address fields');
      return;
    }
    await addAddress(newAddress);
    setShowNewAddressForm(false);
  };

  const activeAddress = user?.addresses.find((a) => a.id === selectedAddressId) || user?.addresses[0];

  // Final Order Submission
  const handlePlaceOrder = async () => {
    if (!activeAddress && !newAddress.addressLine1) {
      alert('Please select or add a delivery address');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const shippingAddr = activeAddress || {
      id: `addr-${Date.now()}`,
      ...newAddress,
    };

    try {
      // 1. Server-side inventory lock & order creation API call
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            title: i.product.title,
            image: i.product.images[0]?.url,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
            price: i.price,
            mrp: i.product.mrp,
            hsnCode: i.product.hsnCode,
            gstRate: i.product.gstRate,
          })),
          customer: {
            name: shippingAddr.name,
            email: user?.email || 'customer@theashhstore.com',
            phone: shippingAddr.phone,
          },
          shippingAddress: shippingAddr,
          billingAddress: shippingAddr,
          paymentMethod,
          couponCode: appliedCoupon?.code,
          couponDiscount,
          shippingFee: shippingSpeed === 'express' ? shippingFee + 99 : shippingFee,
          codFee: paymentMethod === 'cod' ? 50 : 0,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.error || 'Failed to place order. Check stock availability.');
        setIsProcessing(false);
        return;
      }

      // 2. If Razorpay online payment chosen, simulate or trigger Razorpay modal
      if (paymentMethod === 'razorpay') {
        // Razorpay checkout flow
        const verifyRes = await fetch('/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: data.order.id,
            razorpay_order_id: data.razorpayOrder?.id || `order_${Date.now()}`,
            razorpay_payment_id: `pay_${Date.now()}`,
            razorpay_signature: `mock_sig_${Date.now()}`,
          }),
        });
        await verifyRes.json();
      }

      // 3. Clear cart and redirect to order success page
      clearCart();
      router.push(`/order-success?orderId=${data.order.orderNumber}`);
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMessage('A network error occurred while placing your order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-bold">Your bag is empty.</h2>
        <button
          onClick={() => router.push('/oversized')}
          className="mt-4 bg-[#E11B23] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 pb-24 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stepper Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                currentStep >= 1 ? 'text-[#E11B23] font-black' : 'text-zinc-400'
              }`}
              onClick={() => setCurrentStep(1)}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 1 ? 'bg-[#E11B23] text-white' : 'bg-zinc-200 text-zinc-600'
                }`}
              >
                1
              </div>
              <span className="text-xs uppercase tracking-wide">Address</span>
            </div>

            <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 2 ? 'bg-[#E11B23]' : 'bg-zinc-200'}`} />

            <div
              className={`flex items-center gap-2 cursor-pointer ${
                currentStep >= 2 ? 'text-[#E11B23] font-black' : 'text-zinc-400'
              }`}
              onClick={() => activeAddress && setCurrentStep(2)}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 2 ? 'bg-[#E11B23] text-white' : 'bg-zinc-200 text-zinc-600'
                }`}
              >
                2
              </div>
              <span className="text-xs uppercase tracking-wide">Delivery</span>
            </div>

            <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 3 ? 'bg-[#E11B23]' : 'bg-zinc-200'}`} />

            <div
              className={`flex items-center gap-2 cursor-pointer ${
                currentStep === 3 ? 'text-[#E11B23] font-black' : 'text-zinc-400'
              }`}
              onClick={() => activeAddress && setCurrentStep(3)}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === 3 ? 'bg-[#E11B23] text-white' : 'bg-zinc-200 text-zinc-600'
                }`}
              >
                3
              </div>
              <span className="text-xs uppercase tracking-wide">Payment</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Steps */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: Address */}
            {currentStep === 1 && (
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h2 className="text-sm font-black uppercase text-zinc-900 tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E11B23]" />
                    <span>Select Delivery Address</span>
                  </h2>
                  <button
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="text-xs font-bold text-[#E11B23] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {/* Saved addresses selector */}
                {!showNewAddressForm && user?.addresses && user.addresses.length > 0 && (
                  <div className="space-y-3">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-start justify-between ${
                          selectedAddressId === addr.id
                            ? 'border-[#E11B23] bg-red-50/20'
                            : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-900">{addr.name}</span>
                            <span className="text-[10px] bg-zinc-100 text-zinc-600 font-bold px-1.5 py-0.5 rounded">
                              {addr.addressType}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-600">{addr.addressLine1}</p>
                          {addr.addressLine2 && (
                            <p className="text-xs text-zinc-500">{addr.addressLine2}</p>
                          )}
                          <p className="text-xs text-zinc-700 font-medium">
                            {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                          </p>
                          <p className="text-xs text-zinc-500">Phone: +91 {addr.phone}</p>
                        </div>
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="text-[#E11B23] focus:ring-[#E11B23] mt-1"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new address form */}
                {showNewAddressForm && (
                  <form onSubmit={handleSaveNewAddress} className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E11B23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Mobile Number (10 Digits) *</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value.replace(/\D/g, '') })}
                          className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E11B23]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Pincode *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newAddress.pincode}
                          onChange={(e) => handlePincodeChange(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E11B23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E11B23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E11B23]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Flat / House No. / Building / Street *</label>
                      <input
                        type="text"
                        required
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E11B23]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={newAddress.landmark || ''}
                        onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#E11B23]"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="bg-zinc-900 text-white text-xs font-bold uppercase px-4 py-2 rounded-lg"
                      >
                        Save Address
                      </button>
                      {user?.addresses && user.addresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowNewAddressForm(false)}
                          className="text-xs text-zinc-600 px-4 py-2"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <span>Proceed to Delivery Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Speed */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h2 className="text-sm font-black uppercase text-zinc-900 tracking-wider flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#E11B23]" />
                    <span>Choose Shipping Speed</span>
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-zinc-500 hover:text-zinc-900"
                  >
                    Change Address
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Standard Delivery */}
                  <label
                    onClick={() => setShippingSpeed('standard')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                      shippingSpeed === 'standard' ? 'border-[#E11B23] bg-red-50/20' : 'border-zinc-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">Standard Express Delivery</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">3-4 business days via Shiprocket (Bluedart / Delhivery)</p>
                    </div>
                    <span className="text-xs font-black text-emerald-700 uppercase">
                      {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                    </span>
                  </label>

                  {/* Priority Air Express */}
                  <label
                    onClick={() => setShippingSpeed('express')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                      shippingSpeed === 'express' ? 'border-[#E11B23] bg-red-50/20' : 'border-zinc-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">Priority Air Courier</span>
                        <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          FASTEST
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">1-2 business days with priority dispatch</p>
                    </div>
                    <span className="text-xs font-black text-zinc-900">₹99</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-zinc-600 hover:text-zinc-900"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h2 className="text-sm font-black uppercase text-zinc-900 tracking-wider flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#E11B23]" />
                    <span>Select Payment Option</span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Razorpay Online */}
                  <div
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-start justify-between ${
                      paymentMethod === 'razorpay' ? 'border-[#E11B23] bg-red-50/20' : 'border-zinc-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">Razorpay Secure Online Payment</span>
                        <span className="text-[10px] bg-[#E11B23] text-white font-bold px-1.5 py-0.5 rounded">
                          INSTANT
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">
                        UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards, NetBanking, Cred Pay & Wallets.
                      </p>
                      <div className="flex gap-2 pt-1 text-[10px] text-zinc-500 font-semibold">
                        <span>🔒 256-bit Bank Grade Encryption</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="text-[#E11B23] focus:ring-[#E11B23] mt-1"
                    />
                  </div>

                  {/* Cash On Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-start justify-between ${
                      paymentMethod === 'cod' ? 'border-[#E11B23] bg-red-50/20' : 'border-zinc-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">Cash On Delivery (COD)</span>
                        <span className="text-[10px] bg-zinc-200 text-zinc-700 font-bold px-1.5 py-0.5 rounded">
                          +₹50 Handling Fee
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">
                        Pay with cash or UPI QR code directly to the courier rider upon delivery.
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#E11B23] focus:ring-[#E11B23] mt-1"
                    />
                  </div>
                </div>

                {/* Final Place Order Button */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-zinc-600 hover:text-zinc-900"
                  >
                    ← Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-[#E11B23] hover:bg-red-700 disabled:opacity-50 text-white text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-red-900/30 flex items-center gap-2 transition"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isProcessing
                        ? 'Verifying & Securing Order...'
                        : `Place Order • ${formatPrice(
                            grandTotal + (shippingSpeed === 'express' ? 99 : 0)
                          )}`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Order Summary & Stock Lock Pill */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase text-zinc-900 tracking-wider">
                Order Review ({items.length} items)
              </h3>

              {/* Items small preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div key={i.id} className="flex gap-3 text-xs items-center">
                    <img
                      src={i.product.images[0]?.url}
                      alt={i.product.title}
                      className="w-12 h-14 object-cover rounded-lg bg-zinc-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-zinc-900 truncate">{i.product.title}</h4>
                      <p className="text-[11px] text-zinc-500">
                        {i.size} • Qty {i.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-zinc-900">{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-xs text-zinc-600 pt-3 border-t border-zinc-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 && shippingSpeed === 'standard' ? (
                      <strong className="text-emerald-700">FREE</strong>
                    ) : (
                      formatPrice(shippingFee + (shippingSpeed === 'express' ? 99 : 0))
                    )}
                  </span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-zinc-800 font-semibold">
                    <span>COD Convenience Fee</span>
                    <span>₹50</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total Payable</span>
                  <span className="text-[#E11B23]">
                    {formatPrice(
                      grandTotal +
                        (shippingSpeed === 'express' ? 99 : 0) +
                        (paymentMethod === 'cod' && !isCOD ? 50 : 0)
                    )}
                  </span>
                </div>
              </div>

              {/* Stock Lock Guarantee */}
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[11px] text-zinc-700 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#E11B23]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Real-Time Inventory Lock</span>
                </div>
                <p>
                  Items in your bag are secured during checkout to guarantee they won't go out of stock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
