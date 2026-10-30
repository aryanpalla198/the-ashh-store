import { NextResponse } from 'next/server';
import { getCouponByCode } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code') || '';
    const cartTotal = Number(searchParams.get('cartTotal')) || 0;

    if (!code) {
      return NextResponse.json({ success: false, error: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = getCouponByCode(code);
    if (!coupon) {
      return NextResponse.json({ success: false, error: 'Invalid or inactive coupon code' }, { status: 404 });
    }

    if (cartTotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          success: false,
          error: `Coupon "${coupon.code}" requires a minimum order value of ₹${coupon.minOrderValue}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      coupon,
      message: `Coupon "${coupon.code}" applied successfully!`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
