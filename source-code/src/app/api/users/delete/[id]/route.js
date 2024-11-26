import { NextResponse } from 'next/server';
import db from '@/lib/db';


export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await db.users.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'users deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}