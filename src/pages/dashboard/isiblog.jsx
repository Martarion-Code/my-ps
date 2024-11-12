import React from "react";
import Image from "next/image";

export default function isiblog() {
  return (
    <>
      <section className="blok mx-auto">
        <div className="">
          <div className="content mx-auto">
            <div className="content-top py-24 bg-[url('/assets/images/bg.png')] bg-cover bg-center">
              <div className="title">
                <div className="flex justify-center items-center">
                  <h2 className="text-2xl font-bold mb-4">
                    MyPS, Bawa Keseruan Game ke Rumahmu
                  </h2>
                </div>
              </div>
              <div className="form flex justify-center items-center">
                <div className="bg-white p-6 rounded-md shadow-md inline-block space-y-4">
                  <div className="space-x-4">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="rentalType"
                        value="delivery"
                        defaultChecked
                      />
                      <span className="text-black">Delivery</span>
                    </label>
                    <label className="inline-flex items-center space-x-2">
                      <input type="radio" name="rentalType" value="pickup" />
                      <span className="text-black">Pickup</span>
                    </label>
                  </div>

                  <form className="grid grid-cols-3 gap-4 text-black">
                    <input
                      type="text"
                      placeholder="Kategori"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Harga"
                      className="border p-2 rounded"
                    />
                    <input
                      type="date"
                      placeholder="Tanggal Mulai Rental"
                      className="border p-2 rounded"
                    />
                    <input
                      type="time"
                      placeholder="Waktu Mulai"
                      className="border p-2 rounded"
                    />
                    <input
                      type="date"
                      placeholder="Tanggal Selesai Rental"
                      className="border p-2 rounded"
                    />
                    <input
                      type="time"
                      placeholder="Waktu Selesai"
                      className="border p-2 rounded"
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-4 py-2 rounded col-span-3"
                    >
                      Pesan
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="content-bottom bg-white text-black">
              <div className="title flex justify-center items-center py-16">
                <h3 className="text-2xl font-bold mb-6">
                  Mengapa Rental Console Game di MyPS
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Image
                    src="/asss"
                    alt="Logo" // Tambahkan alt untuk aksesibilitas
                    width={150} // Tentukan lebar gambar
                    height={50} // Tentukan tinggi gambar
                  />
                  <h4 className="font-semibold text-lg">
                    Pilihan Game Terlengkap
                  </h4>
                  <p className="text-gray-600">
                    Kami menyediakan berbagai judul game populer dan konsol
                    terkini, sehingga Anda selalu bisa mencoba game baru.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
