import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name') || 'World';

  const data = {
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    method: 'GET',
    path: request.nextUrl.pathname,
  };

  return NextResponse.json(data, { status: 200 });
}
