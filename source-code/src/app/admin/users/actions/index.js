'use server'

import { revalidatePath } from "next/cache";
import db from "@/lib/db";


export async function fetchUsers({ 
  page = 1, 
  limit = 10 
}) {
  
  const offset = (page - 1) * limit;
  const [total, data] = await Promise.all([
    db.user.count(),
    db.user.findMany({
      take: limit,
      skip: offset,
      // Add any additional filtering or sorting
    })
  ]);
  
  revalidatePath('/admin/users'); // This will force a revalidation of the page
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


export async function onDeleteUser(id){
  const deleteUser = await db.user.delete({
    where:{
      id: id,
    }
  })


  return deleteUser
}