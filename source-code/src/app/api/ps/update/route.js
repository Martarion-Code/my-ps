import { NextResponse } from 'next/server';
import db from '@/lib/db';


export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    const updatedPs = await db.ps.update({
      where: { id: parseInt(id, 10) },
      data: body,
    });

    return NextResponse.json(updatedPs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}