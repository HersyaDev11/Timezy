import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 pt-28 pb-20 text-white">
      
      <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Kuasai Waktu, <br />
            <span className="text-blue-500">
              Raih Prestasi
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-lg">
            Platform manajemen waktu dan fokus all-in-one yang dirancang khusus
            untuk mahasiswa ambisius. Tingkatkan IPK Anda dengan manajemen tugas
            yang elegan dan sistematis.
          </p>

          <div className="flex gap-4">
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:scale-105">
              Mulai Sekarang
              <FiArrowRight className="text-lg" />
            </button>

            <button className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition">
              Pelajari Lebih
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-3xl"></div>

          <div className="relative bg-slate-900/60 backdrop-blur-xl p-4 rounded-3xl shadow-2xl">
            <img
              src="/assets/hero.png"
              alt="Study Productivity"
              className="rounded-2xl object-cover w-full h-[400px]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}