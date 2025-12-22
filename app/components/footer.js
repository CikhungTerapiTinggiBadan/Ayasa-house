
const HEADER_BG = "bg-[#293c2a]"; // Hijau tua

export default function Footer() {
  return (
    <footer className={`${HEADER_BG} py-12 px-4`}>
      <div className="max-w-5xl mx-auto text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Alamat */}
          <div>
            <h3 className="text-lg font-bold mb-3">Alamat</h3>
            <p className="text-sm text-gray-300">
            Jl. Sunan Kudus No.103, RT.02/RW.25, Jaban, Sinduharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581
            </p>
          </div>

          {/* Logo/Judul Tengah */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-1">AYASA HOUSE</h3>
            <div className="text-3xl font-extrabold tracking-widest">
              <img 
                  src="/logo.png" // Menggunakan src default: logo.png
                  alt="AYASA HOUSE Logo" 
                  className="w-40 h-auto" // Sesuaikan ukuran logo
              />
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-end">Kontak</h3>
            <p className="text-sm text-white text-end">
              +62 822-4990-6357 / a.n Baiq
            </p>
            <p className="text-sm text-white text-end mt-2">
              IG @AyasaHouse
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}