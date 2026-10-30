import { NextResponse } from 'next/server';
import { createOrder, lockAndDeductStock } from '@/lib/db';
import { createRazorpayOrder } from '@/lib/razorpay';
import { generateShiprocketTracking } from '@/lib/shiprocket';
import { calculateGST } from '@/lib/gst';
import { generateOrderNumber } from '@/lib/utils';
import { sendOrderPlacedAlerts } from '@/lib/notifications';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      items,
      customer,
      shippingAddress,
      billingAddress,
      paymentMethod,
      couponCode,
      couponDiscount = 0,
      shippingFee = 0,
      codFee = 0,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items in order' }, { status: 400 });
    }

    // 1. Critical Inventory Check & Stock Lock
    const stockLockResult = lockAndDeductStock(
      items.map((i: any) => ({
        productId: i.productId,
        size: i.size,
        quantity: i.quantity,
      }))
    );

    if (!stockLockResult.success) {
      return NextResponse.json(
        { success: false, error: stockLockResult.error },
        { status: 400 }
      );
    }

    // 2. Calculations
    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const taxableAmount = Math.max(0, subtotal - couponDiscount);
    const destinationState = shippingAddress?.state || 'Maharashtra';
    const tax = calculateGST(taxableAmount, destinationState, 5);
    const grandTotal = Math.max(0, taxableAmount + shippingFee + codFee);

    const orderNumber = generateOrderNumber();

    // 3. Generate Shiprocket tracking
    const courier = generateShiprocketTracking('placed', shippingAddress.city || 'Mumbai');

    // 4. Create Razorpay order if prepaid
    let razorpayOrder = null;
    if (paymentMethod === 'razorpay') {
      razorpayOrder = await createRazorpayOrder({
        amount: grandTotal,
        receipt: orderNumber,
        notes: { customer: customer.name, phone: customer.phone },
      });
    }

    // 5. Save order in DB
    const newOrder = createOrder({
      orderNumber,
      customer,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      razorpayOrderId: razorpayOrder?.id,
      subtotal,
      couponCode,
      couponDiscount,
      shippingFee,
      codFee,
      tax,
      grandTotal,
      orderStatus: 'placed',
      courier,
      stockLocked: true,
    });

    // 6. Send transactional alerts
    try {
      await sendOrderPlacedAlerts(newOrder);
    } catch (e) {
      console.error('Notification error:', e);
    }

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        razorpayOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
