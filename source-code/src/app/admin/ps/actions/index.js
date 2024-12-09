"use server";
// import { revalidatePath } from "next/cache";
import db from "@/lib/db";

export async function fetchPS({ page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  const [total, data] = await Promise.all([
    db.ps.count(),
    db.ps.findMany({
      take: limit,
      skip: offset,
      // Add any additional filtering or sorting
    }),
  ]);

  // revalidatePath('/admin/ps'); // This will force a revalidation of the page
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function onDelete(id) {
  const deletePs = await db.ps.delete({
    where: {
      id: id,
    },
  });

  return deletePs;
}
