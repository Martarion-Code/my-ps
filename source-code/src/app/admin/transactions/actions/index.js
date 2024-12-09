'use server'
import { revalidatePath } from "next/cache";
import db from "@/lib/db";

export async function fetchTransactions({ 
  page = 1, 
  limit = 10 
}) {
  const offset = (page - 1) * limit;
  const [total, data] = await Promise.all([
    db.transaksi.count(),
    db.transaksi.findMany({
      take: limit,
      skip: offset,
      // Add any additional filtering or sorting
    })
  ]);
  
  revalidatePath('/admin/transactions'); // This will force a revalidation of the page
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function onDeleteTransaction(id){
  const deleteTransaksi = await db.transaksi.delete({
    where:{
      id: id,
    }
  })


  return deleteTransaksi
}