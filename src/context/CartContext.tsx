'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductSize, CartItem, Coupon, TaxBreakdown } from '@/types';
import { calculateGST } from '@/lib/gst';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: ProductSize, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  couponDiscount: number;
  subtotal: number;
  shippingFee: number;
  codFee: number;
  tax: TaxBreakdown;
  grandTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCOD: boolean;
  setIsCOD: (isCod: boolean) => void;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;
const COD_CONVENIENCE_FEE = 50;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCOD, setIsCOD] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ashh_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('ashh_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ashh_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [items]);

  const addToCart = (product: Product, size: ProductSize, color?: string, quantity: number = 1) => {
    const chosenColor = color || (product.variants[0]?.color || 'Standard');
    const existingIndex = items.findIndex(
      (item) => item.productId === product.id && item.size === size && item.color === chosenColor
    );

    // Check variant stock
    const variant = product.variants.find((v) => v.size === size);
    const currentQtyInCart = existingIndex > -1 ? items[existingIndex].quantity : 0;
    const availableStock = variant?.stock || 0;

    if (currentQtyInCart + quantity > availableStock) {
      alert(`Only ${availableStock} items in size ${size} currently in stock!`);
      return;
    }

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      setItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${chosenColor}-${Date.now()}`,
        productId: product.id,
        product,
        size,
        color: chosenColor,
        quantity,
        price: product.price,
      };
      setItems([...items, newItem]);
    }

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(items.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const item = items.find((i) => i.id === cartItemId);
    if (item) {
      const variant = item.product.variants.find((v) => v.size === item.size);
      if (variant && quantity > variant.stock) {
        alert(`Only ${variant.stock} available in stock!`);
        return;
      }
    }

    setItems(
      items.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('ashh_cart');
    localStorage.removeItem('ashh_coupon');
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Coupon calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      couponDiscount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
    // Cannot exceed subtotal
    couponDiscount = Math.min(couponDiscount, subtotal);
  }

  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.code === 'FREESHIP'
      ? 0
      : STANDARD_SHIPPING_FEE;

  const codFee = isCOD && subtotal > 0 ? COD_CONVENIENCE_FEE : 0;

  const taxableAmount = Math.max(0, subtotal - couponDiscount);
  const tax = calculateGST(taxableAmount, 'Maharashtra', 5);

  const grandTotal = Math.max(0, taxableAmount + shippingFee + codFee);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}&cartTotal=${subtotal}`);
      const data = await res.json();

      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        localStorage.setItem('ashh_coupon', JSON.stringify(data.coupon));
        return { success: true, message: data.message || `Coupon "${code}" applied successfully!` };
      } else {
        return { success: false, message: data.error || 'Invalid or expired coupon code' };
      }
    } catch (e) {
      return { success: false, message: 'Failed to validate coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('ashh_coupon');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscount,
        subtotal,
        shippingFee,
        codFee,
        tax,
        grandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isCOD,
        setIsCOD,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
