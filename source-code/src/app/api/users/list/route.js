import { NextResponse } from 'next/server';
import db from '@/lib/db';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username'); // Extract 'username' query parameter

  try {
    console.log(db.users)
    const psData = username
      ? await db.users.findMany({
          where: {
            username: {
              contains: username, // Use db's 'contains' for partial match
              mode: 'insensitive', // Make the search case-insensitive
            },
          },
        })
      : await db.users.findMany();
      console.log(psData)
    return NextResponse.json(psData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}