import { NextResponse } from 'next/server';
import db from '@/lib/db';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get('kategori'); // Extract 'kategori' query parameter
  const page = parseInt(searchParams.get('page') || "1", 10)
  const limit = parseInt(searchParams.get('limit') || "10", 10)
  const skip = (page - 1) * limit
  try {
    const psData = kategori
      ? await db.ps.findMany({
        skip,
          where: {
            kategori: {
              contains: kategori, // Use db's 'contains' for partial match
              mode: 'insensitive', // Make the search case-insensitive
            },
          },
          take:limit
        })
      : await db.ps.findMany({
        skip,
        take:limit,
      });

      const total = await db.ps.count()
    return NextResponse.json({data: psData,
      pagination:{
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}