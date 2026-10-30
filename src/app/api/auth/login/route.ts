import { NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/db';
import { signJwtToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    let user = getUserByEmail(email);

    if (!user) {
      // Auto-register demo user
      user = createUser({
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'customer',
        addresses: [],
        walletBalance: 200,
        wishlist: [],
      });
    }

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({ success: true, user, token });

    // Set secure HTTP-only cookie
    response.cookies.set('ashh_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
