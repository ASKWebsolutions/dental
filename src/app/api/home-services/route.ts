import { NextResponse } from 'next/server';
import { getHomeServices } from '@/data/homeServices';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await getHomeServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Fetch home services error:', error);
    return NextResponse.json({ error: 'Failed to fetch home services' }, { status: 500 });
  }
}
