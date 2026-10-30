'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: 'customer' | 'admin') => void;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage or mock session
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ashh_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default customer demo session
        const demoUser: User = {
          id: 'user-cust-1',
          name: 'Aryan Palla',
          email: 'aryan@example.com',
          phone: '9876500001',
          role: 'customer',
          addresses: [
            {
              id: 'addr-cust-1',
              name: 'Aryan Palla',
              phone: '9876500001',
              addressLine1: 'Flat 402, Skyline Residency, Linking Road',
              addressLine2: 'Near Khar Station',
              landmark: 'Opposite Starbucks',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400052',
              addressType: 'Home',
              isDefault: true,
            },
            {
              id: 'addr-cust-2',
              name: 'Aryan (Office)',
              phone: '9876500001',
              addressLine1: 'Ashh Tech Park, Tower B, 6th Floor',
              addressLine2: 'Bandra Kurla Complex',
              landmark: 'Near Diamond Bourse',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400051',
              addressType: 'Work',
              isDefault: false,
            },
          ],
          walletBalance: 750,
          isMember: true,
          wishlist: ['prod-001', 'prod-002'],
          createdAt: '2026-09-01T10:00:00Z',
        };
        setUser(demoUser);
        localStorage.setItem('ashh_user', JSON.stringify(demoUser));
      }
    } catch (e) {
      console.error('Error loading user:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('ashh_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (e) {
      // Fallback
      if (email.includes('admin')) {
        switchRole('admin');
      } else {
        switchRole('customer');
      }
      return { success: true };
    }
  };

  const loginWithGoogle = async () => {
    const googleUser: User = {
      id: `user-google-${Date.now()}`,
      name: 'Google Verified User',
      email: 'user.verified@gmail.com',
      role: 'customer',
      addresses: [],
      walletBalance: 200,
      isMember: true,
      wishlist: [],
      createdAt: new Date().toISOString(),
    };
    setUser(googleUser);
    localStorage.setItem('ashh_user', JSON.stringify(googleUser));
  };

  const loginWithOTP = async (phone: string, otp: string) => {
    if (otp === '1234' || otp.length === 4 || otp.length === 6) {
      const otpUser: User = {
        id: `user-phone-${Date.now()}`,
        name: `Ashh Member (${phone.slice(-4)})`,
        email: `${phone}@ashhphone.in`,
        phone,
        role: 'customer',
        addresses: [],
        walletBalance: 100,
        isMember: true,
        wishlist: [],
        createdAt: new Date().toISOString(),
      };
      setUser(otpUser);
      localStorage.setItem('ashh_user', JSON.stringify(otpUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid OTP. Enter 1234 to sign in.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ashh_user');
  };

  const switchRole = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      const adminUser: User = {
        id: 'user-admin-1',
        name: 'Ashh Store Super Admin',
        email: 'admin@theashhstore.com',
        role: 'admin',
        addresses: [],
        walletBalance: 5000,
        isMember: true,
        wishlist: [],
        createdAt: new Date().toISOString(),
      };
      setUser(adminUser);
      localStorage.setItem('ashh_user', JSON.stringify(adminUser));
    } else {
      const custUser: User = {
        id: 'user-cust-1',
        name: 'Aryan Palla',
        email: 'aryan@example.com',
        phone: '9876500001',
        role: 'customer',
        addresses: [
          {
            id: 'addr-cust-1',
            name: 'Aryan Palla',
            phone: '9876500001',
            addressLine1: 'Flat 402, Skyline Residency, Linking Road',
            addressLine2: 'Near Khar Station',
            landmark: 'Opposite Starbucks',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400052',
            addressType: 'Home',
            isDefault: true,
          },
        ],
        walletBalance: 750,
        isMember: true,
        wishlist: ['prod-001', 'prod-002'],
        createdAt: new Date().toISOString(),
      };
      setUser(custUser);
      localStorage.setItem('ashh_user', JSON.stringify(custUser));
    }
  };

  const addAddress = async (newAddress: Omit<Address, 'id'>) => {
    if (!user) return;
    const addrWithId: Address = {
      ...newAddress,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0 || newAddress.isDefault,
    };

    let updatedAddresses = [...user.addresses];
    if (addrWithId.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(addrWithId);

    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    localStorage.setItem('ashh_user', JSON.stringify(updatedUser));
  };

  const updateAddress = async (id: string, updates: Partial<Address>) => {
    if (!user) return;
    const updated = user.addresses.map((a) => (a.id === id ? { ...a, ...updates } : a));
    const updatedUser = { ...user, addresses: updated };
    setUser(updatedUser);
    localStorage.setItem('ashh_user', JSON.stringify(updatedUser));
  };

  const deleteAddress = async (id: string) => {
    if (!user) return;
    const updated = user.addresses.filter((a) => a.id !== id);
    const updatedUser = { ...user, addresses: updated };
    setUser(updatedUser);
    localStorage.setItem('ashh_user', JSON.stringify(updatedUser));
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) return;
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    const updatedUser = { ...user, addresses: updated };
    setUser(updatedUser);
    localStorage.setItem('ashh_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        loginWithOTP,
        logout,
        switchRole,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
