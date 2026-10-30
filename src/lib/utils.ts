import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(mrp: number, price: number): number {
  if (mrp <= price || mrp === 0) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `ASHH-${year}-${randomPart}${timestamp}`;
}

export function generateAWBNumber(): string {
  return `SRKT${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

export function formatDateTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}
