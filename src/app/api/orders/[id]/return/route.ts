import { NextResponse } from 'next/server';
import { getOrderById, updateOrder } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { reason, refundMethod, upiId } = body;

    const order = getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const returnRequest = {
      id: `ret-${Date.now()}`,
      reason,
      refundMethod,
      bankDetails: upiId ? { upiId, accountNumber: '', ifsc: '', accountHolderName: '' } : undefined,
      status: 'pending' as const,
      requestedAt: new Date().toISOString(),
      refundAmount: order.grandTotal,
    };

    const updated = updateOrder(params.id, {
      returnRequest,
      orderStatus: 'returned',
    });

    return NextResponse.json({ success: true, order: updated, returnRequest });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
