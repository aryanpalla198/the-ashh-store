import { TaxBreakdown } from '@/types';

export const SELLER_STATE = 'Maharashtra';
export const SELLER_GSTIN = '27AABCT3524Q1ZP';

/**
 * Calculates Indian GST breakdown for products.
 * Retail apparel prices in India are typically inclusive of GST.
 * @param amount - Total taxable gross amount
 * @param destinationState - State of customer
 * @param gstRate - 5% or 12%
 */
export function calculateGST(
  amount: number,
  destinationState: string = 'Maharashtra',
  gstRate: number = 5
): TaxBreakdown {
  const isInterState = destinationState.trim().toLowerCase() !== SELLER_STATE.toLowerCase();
  
  // Tax included in price formula: Tax = Amount - (Amount / (1 + (Rate / 100)))
  const rateFraction = gstRate / 100;
  const taxableValue = amount / (1 + rateFraction);
  const totalTax = Math.round((amount - taxableValue) * 100) / 100;

  if (isInterState) {
    return {
      cgst: 0,
      sgst: 0,
      igst: totalTax,
      totalTax,
      isInterState: true,
    };
  } else {
    const halfTax = Math.round((totalTax / 2) * 100) / 100;
    return {
      cgst: halfTax,
      sgst: halfTax,
      igst: 0,
      totalTax,
      isInterState: false,
    };
  }
}
