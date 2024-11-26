import { NextResponse } from 'next/server';
import db from '@/lib/db';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get('kategori'); // Extract 'kategori' query parameter

  try {
    const psData = kategori
      ? await db.ps.findMany({
          where: {
            kategori: {
              contains: kategori, // Use db's 'contains' for partial match
              mode: 'insensitive', // Make the search case-insensitive
            },
          },
        })
      : await db.ps.findMany();
    return NextResponse.json(psData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}