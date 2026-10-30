import { NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus, updateOrder } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    if (body.status) {
      const updated = updateOrderStatus(params.id, body.status);
      return NextResponse.json({ success: true, order: updated });
    } else {
      const updated = updateOrder(params.id, body);
      return NextResponse.json({ success: true, order: updated });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
