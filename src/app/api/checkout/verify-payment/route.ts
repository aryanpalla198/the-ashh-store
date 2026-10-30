import { NextResponse } from 'next/server';
import { updateOrder } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const isValid = verifyRazorpaySignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay payment signature' },
        { status: 400 }
      );
    }

    const updated = updateOrder(orderId, {
      paymentStatus: 'paid',
      orderStatus: 'confirmed',
      razorpayPaymentId: razorpay_payment_id,
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
