import Image from "next/image";
import InputSearchPS from "@/components//Forms/Input/InputSearchPS";
import db from "@/lib/db";

export default async function IsiBlog() {
  const dataPS = await db.ps.findMany()
  return (
    <>
      <section className="blok mx-auto">
        <div className="">
          <div className="content mx-auto">
            <div className="relative content-top py-24 my-10 mx-32 rounded-2xl bg-[url('/assets/images/bg.png')] bg-cover bg-center">
              <div className="absolute inset-0 bg-black opacity-50"></div>

              <div className="title relative z-[2] rounded-2xl">
                <div className="flex justify-center items-center">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    MyPS, Bawa Keseruan Game ke Rumahmu
                  </h2>
                </div>
              </div>
              <div className="form flex justify-center items-center relative z-[2]">
                <div className="bg-white p-6 rounded-md shadow-md inline-block space-y-4">

                <InputSearchPS dataPS={dataPS}/>
                </div>
              </div>
            </div>
            <div className="content-bottom bg-white text-black">
              <div className="title flex justify-center items-center py-16">
                <h3 className="text-2xl font-bold mb-6">
                  Mengapa Rental Console Game di MyPS
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8 justify-center items-center">
                <div className="text-center  flex flex-col  items-center">
                  <Image
                    src="/assets/images/isi1.png"
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
                <div className="text-center  flex flex-col  items-center">
                  <Image
                    src="/assets/images/isi2.png"
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
                <div className="text-center flex flex-col  items-center">
                  <Image
                    src="/assets/images/isi3.png"
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
