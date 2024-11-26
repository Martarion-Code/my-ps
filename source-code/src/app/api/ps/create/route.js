import { NextResponse } from 'next/server';
import db from '@/lib/db';



export async function POST(request) {
  try {
    const body = await request.json();
    const { kategori, harga, stok } = body;

    if (!kategori || !harga || typeof stok !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newPs = await db.ps.create({
      data: { kategori, harga, stok },
    });

    return NextResponse.json(newPs, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}