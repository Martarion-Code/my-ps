import db  from "@/lib/db"; // Import Prisma client

// POST handler to create a new transaction
export async function POST(req) {
  try {
    // Get the data from the request body
    const { user_id, ps_id, nama_cust, no_hp, alamat_cust, waktu_pinjam, waktu_kembali, harga_total } = await req.json();

    // Validate the required fields
    if (!ps_id, !nama_cust || !no_hp || !alamat_cust || !waktu_pinjam || !waktu_kembali || !harga_total) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a new Transaksi record in the database
    const newTransaksi = await db.transaksi.create({
      data: {
        user_id,
        ps_id,
        nama_cust,
        no_hp,
        alamat_cust,
        waktu_pinjam,
        waktu_kembali,
        harga_total,
      },
    });
    const externalResponse = await fetch('http://localhost:4000/kirim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nowa:no_hp,
        pesan: `Berikut adalah jumlah tagihan yang ${nama_cust} harus bayarkan :
          ${harga_total}
        `
      }), // Data to send to the external server
    });

    if (!externalResponse.ok) {
      throw new Error(`Failed to fetch data from http://localhost:4000/kirim`);
    }
    // Return the created transaksi as a response
    return new Response(
      JSON.stringify({ message: "Transaksi created successfully", transaksi: newTransaksi }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Handle errors (e.g., database errors)
    return new Response(
      JSON.stringify({ message: "Error creating transaksi", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
