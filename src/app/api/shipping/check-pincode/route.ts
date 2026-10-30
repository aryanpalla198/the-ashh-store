import { NextResponse } from 'next/server';
import { checkPincodeServiceability } from '@/lib/shiprocket';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pincode = searchParams.get('pincode') || '';

    if (!pincode) {
      return NextResponse.json({ success: false, error: 'Pincode is required' }, { status: 400 });
    }

    const result = checkPincodeServiceability(pincode);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
