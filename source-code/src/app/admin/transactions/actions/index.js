"use server";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";

export async function fetchTransactions({ page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  const [total, data] = await Promise.all([
    db.transaksi.count(),
    db.transaksi.findMany({
      take: limit,
      skip: offset,

      orderBy: {
        createdAt: "desc", // Ascending order
      },

      // Add any additional filtering or sorting
    }),
  ]);

  revalidatePath("/admin/transactions"); // This will force a revalidation of the page
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

function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export async function createTransaction(data) {
  const {
    seri_ps,
    jumlah_ps,
    waktu_sewa,
    nama_cust,
    no_hp,
    alamat_cust,
    jenis_jaminan,
  } = data;

  try {
    // Retrieve product (ps) from the database
    const ps = await db.ps.findUnique({
      where: {
        id: seri_ps, // Replace with the actual ID
      },
    });

    if (!ps) {
      throw new Error("Console not found");
    }

    // check ps stock
    if (ps.stok <= jumlah_ps) {
      throw new Error("Stok console habis!");
    }

    const decreasedStock = Number(ps.stok) - Number(jumlah_ps);
    const updatedPsStock = await db.ps.update({
      where: {
        id: ps.id,
      },
      data: {
        stok: decreasedStock < 0 ? 0 : decreasedStock, // Decrease stock by the required amount
      },
    });

    const hargaPs = ps.harga;

    // Parse rental times
    const waktu_pinjam = dayjs(waktu_sewa[0]);  // Convert to ISO string
    const waktu_kembali = dayjs(waktu_sewa[1]); 
    const diffInDays = waktu_kembali.diff(waktu_pinjam, "day");
    const hargaTotal = hargaPs * diffInDays;

    // Create transaction record in the database
    const createdTransaction = await db.transaksi.create({
      data: {
        nama_cust: nama_cust,
        no_hp: String(no_hp),
        alamat_cust: alamat_cust,
        waktu_kembali,
        waktu_pinjam,
        jumlah: parseInt(jumlah_ps),
        harga_total: String(hargaTotal),
        jenis_jaminan,
        Ps: {
          connect: {
            id: ps.id,
          },
        },
      },
    });

    console.log(createdTransaction);
    // Convert dayjs objects to plain strings
    const formattedCreatedAt = dayjs(createdTransaction.createdAt).format("DD-MM-YYYY");
    const formattedDueDate = dayjs(createdTransaction.createdAt).add(1, "day").format("DD-MM-YYYY");
    const formattedWaktuPinjam = dayjs(waktu_pinjam).format("DD/MM/YYYY");
    const formattedWaktuKembali = dayjs(waktu_kembali).format("DD/MM/YYYY");
    const message = {
      message:
        "Hai, berikut adalah invoice Anda:\n\n" +
        "-------------------------------\n" +
        "INVOICE #: INV-" +
        createdTransaction.id +
        "\n" +
        "Tanggal: " +
        dayjs(createdTransaction.createdAt).format("DD-MM-YYYY") +
        "\n" +
        "Jatuh Tempo: " +
        dayjs(createdTransaction.createdAt).add(1, "day").format("DD-MM-YYYY") +
        "\n" +
        "Nama Customer: " +
        nama_cust +
        "\n" +
        "Waktu Sewa: " +
        waktu_pinjam.format("DD/MM/YYYY") +
        "-" +
        waktu_kembali.format("DD/MM/YYYY") +
        "\n" +
        "-------------------------------\n\n" +
        "Item:\n" +
        "1. " +
        ps.seri +
        " (" +
        jumlah_ps +
        " konsol)      Rp." +
        formatNumber(hargaTotal) +
        "\n" +
        "-------------------------------\n" +
        "Total: Rp " +
        formatNumber(hargaTotal) +
        "\n\n" +
        "Metode Pembayaran: Transfer Bank\n" +
        "Nama Bank: Bank BRI\n" +
        "No. Rekening: 1234567890\n" +
        "Nama Pemilik Rekening: MyPS\n\n" +
        "Terima kasih atas pembelian Anda!",
    };

    //Send the invoice message via the API
    const response = await fetch(
      `https://58f7-182-2-39-11.ngrok-free.app/chat/sendmessage/${no_hp}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse JSON response
    console.log("Success:", responseData);

    
    // Return success response
    return {
      status: 201,
      message: "Transaction created and message sent successfully.",
      data: {
        ...createdTransaction,
        createdAt: formattedCreatedAt,
        dueDate: formattedDueDate,
        waktu_pinjam: formattedWaktuPinjam,
        waktu_kembali: formattedWaktuKembali,
      },
    };
    // Return success response
  } catch (error) {
    console.error("Error:", error.message);
    const plainError = {
      message: error.message,
      code: error.code,
    };

    // Return error response
    return {
      status: 500,
      message: error.message || "An unexpected error occurred.",
      error: plainError,
    };
  }
}

export async function onDeleteTransaction(id) {
  const deleteTransaksi = await db.transaksi.delete({
    where: {
      id: id,
    },
  });

  return deleteTransaksi;
}

export async function onApproveTransaction(transactionId) {
  // return {status: 405,  message: "Method Not Allowed" });

  if (!transactionId) {
    return { status: 400, message: "Transaction ID is required" };
  }

  try {
    // Update the transaction with id = transactionId to approve it (set is_approve = true)
    const updatedTransaction = await db.transaksi.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        is_approve: true, // Set approval status to true
      },
    });

    return {
      status: 200,
      message: "Transaction approved successfully",
      data: updatedTransaction,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error approving transaction" };
  }
}

export async function onRejectTransaction(transactionId) {
  if (!transactionId) {
    return { status: 400, message: "Transaction ID is required" };
  }

  try {
    // Update the transaction with id = transactionId to approve it (set is_approve = true)
    const updatedTransaction = await db.transaksi.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        is_approve: false, // Set approval status to true
      },
    });

    return {
      status: 200,
      message: "Transaction rejected successfully",
      data: updatedTransaction,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error rejecting transaction" };
  }
}
export async function onReturnTransaction(transactionId) {
  if (!transactionId) {
    return { status: 400, message: "Transaction ID is required" };
  }

  try {
    // Retrieve the transaction from the database
    const transaction = await db.transaksi.findUnique({
      where: {
        id: parseInt(transactionId),
      },
      include: {
        Ps: true, // Include the related PS record
      },
    });

    if (!transaction) {
      return { status: 404, message: "Transaction not found" };
    }

    const currentDate = new Date();
    let penalty = 0;

    // Check if the returned_at date exceeds waktu_kembali
    if (currentDate > transaction.waktu_kembali) {
      const diffInDays = dayjs(currentDate).diff(
        dayjs(transaction.waktu_kembali),
        "day"
      );
      penalty = diffInDays * 10000; // Calculate the penalty
    }

    // Update the stock of the PS
    const updatedPsStock = await db.ps.update({
      where: {
        id: transaction.Ps.id,
      },
      data: {
        stok: transaction.Ps.stok + transaction.jumlah, // Increase stock by the returned amount
      },
    });

    console.log(updatedPsStock);

    // Update the transaction with id = transactionId to set is_returned to true, update returned_at, and set penalty
    const updatedTransaction = await db.transaksi.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        is_returned: true, // Set return status to true
        waktu_dikembalikan: currentDate, // Set the returned_at date to the current date
        denda: String(penalty), // Set the penalty amount
      },
    });

    return {
      status: 200,
      message: "Transaction marked as returned successfully",
      data: updatedTransaction,
    };
  } catch (error) {
    console.error("Prisma error:", error);
    return { status: 500, message: "Error marking transaction as returned" };
  }
}

export async function updateTransaction(transactionId, data) {
  if (!transactionId) {
    return { status: 400, message: "Transaction ID is required" };
  }

  try {
    const transaction = await db.transaksi.findUnique({
      where: {
        id: parseInt(transactionId),
      },
    });

    if (!transaction) {
      return { status: 404, message: "Transaction not found" };
    }

    const currentDate = data.waktu_dikembalikan ? new Date(data.waktu_dikembalikan) : new Date();
    let penalty = 0;

    // Check if the returned_at date exceeds waktu_kembali
    if (currentDate > transaction.waktu_kembali) {
      const diffInDays = dayjs(currentDate).diff(
        dayjs(transaction.waktu_kembali),
        "day"
      );
      penalty = diffInDays * 10000; // Calculate the penalty
    }

    

    const updatedTransaction = await db.transaksi.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        nama_cust: data.nama_cust,
        no_hp: String(data.no_hp),
        alamat_cust: data.alamat_cust,
        waktu_pinjam: data.waktu_pinjam,
        waktu_kembali: data.waktu_kembali,
        waktu_dikembalikan: data.waktu_dikembalikan,
        denda: String(penalty),
        harga_total: String(transaction.harga_total),
        jenis_jaminan: data.jenis_jaminan,
        is_returned: data.is_returned,
      },
    });

    return {
      status: 200,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error updating transaction" };
  }
}

export async function searchTransactions({ search, status, date }) {
  try {
    // console.log("search", search);
    // console.log("status", status);
    // console.log("date", date);
    const [startDate, endDate] = date ? date.map((d) => new Date(d)) : [];
    const transactions = await db.transaksi.findMany({
      where: {
        OR: [
          { id: Number(search) ? { equals: Number(search) } : undefined },
          { nama_cust: { contains: search, mode: "insensitive" } },
          { no_hp: { contains: search, mode: "insensitive" } },
        ],
        AND: [
          { is_approve: status == true ? true : false },
          {
            createdAt: {
              gte: startDate ? new Date(startDate) : undefined,
              lte: endDate ? new Date(endDate) : undefined,
            },
          },
        ],
      },
    });
    const totalTransactions = await db.transaksi.count({
      where: {
        OR: [
          { id: Number(search) ? { equals: Number(search) } : undefined },
          { nama_cust: { contains: search, mode: "insensitive" } },
          { no_hp: { contains: search, mode: "insensitive" } },
        ],
        AND: [
          { is_approve: status == true ? true : false },
          {
            createdAt: {
              gte: startDate ? new Date(startDate) : undefined,
              lte: endDate ? new Date(endDate) : undefined,
            },
          },
        ],
      },
    });
    if (transactions.length === 0) {
      return {
        status: 404,
        data: [],
        pagination: {
          total: 0,
          page: 0,
          limit: 0,
        },
      };
    }

    return {
      status: 200,
      message: "Transactions retrieved successfully",
      data: transactions,
      pagination: {
        total: totalTransactions,
        page: 1,
        limit: 10,
      },
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error retrieving transactions" };
  }
}
