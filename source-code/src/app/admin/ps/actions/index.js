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


export async function updatePS(psId, data) {
  if (!psId) {
    return { status: 400, message: "PS ID is required" };
  }

  try {
    const updatedPS = await db.ps.update({
      where: {
        id: parseInt(psId),
      },
      data: {
        kategori: data.kategori,
        seri:data.seri,
        harga: data.harga,
        stok: data.stok,
      },
    });
``
    return {
      status: 200,
      message: "PS updated successfully",
      data: updatedPS,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error updating PS" };
  }
}


export async function createPS(data) {
  try {
    const newPS = await db.ps.create({
      data: {
        kategori: data.kategori,
        seri: data.seri,
        harga: data.harga,
        stok: data.stok,
      },
    });

    return {
      status: 201,
      message: "PS created successfully",
      data: newPS,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error creating PS" };
  }
}