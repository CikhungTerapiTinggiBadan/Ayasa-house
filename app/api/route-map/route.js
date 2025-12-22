import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start'); 
  const end = searchParams.get('end');     

  const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;

  // Logging untuk debugging di terminal (bukan browser console)
  console.log("API Request:", { start, end, hasKey: !!apiKey });

  if (!apiKey) {
    return NextResponse.json({ error: 'Key missing in .env.local' }, { status: 500 });
  }

  if (!start || !end) {
    return NextResponse.json({ error: 'Missing coords' }, { status: 400 });
  }

  // Gunakan template literal yang bersih tanpa spasi tambahan
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("ORS Provider Error:", data);
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}