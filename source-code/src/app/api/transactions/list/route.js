import { NextResponse } from 'next/server';
import db from '@/lib/db';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nama_cust = searchParams.get('nama_cust'); // Extract 'nama_cust' query parameter

  try {
    const psData = nama_cust
      ? await db.transaksi.findMany({
          where: {
            nama_cust: {
              contains: nama_cust, // Use db's 'contains' for partial match
              mode: 'insensitive', // Make the search case-insensitive
            },
          },
        })
      : await db.transaksi.findMany();
    return NextResponse.json(psData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}