import { FiArrowRight, FiCheckCircle, FiClock, FiCalendar } from "react-icons/fi";

export default function AboutSection() {
  const features = [
    {
      icon: <FiCheckCircle />,
      title: "Manajemen Tugas Cerdas",
      desc: "Prioritaskan tugas kuliah berdasarkan deadline dan tingkat kesulitan secara otomatis.",
    },
    {
      icon: <FiClock />,
      title: "Mode Fokus Deep Work",
      desc: "Teknik Pomodoro terintegrasi dengan pemblokir distraksi untuk hasil maksimal.",
    },
    {
      icon: <FiCalendar />,
      title: "Kalender Akademik",
      desc: "Sinkronisasi jadwal kampus dan tugas dalam satu tampilan visual elegan.",
    },
  ];

  return (
    <section className="py-32 px-6 md:px-16 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Fitur yang Membuatmu Unggul
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dirancang khusus untuk mahasiswa ambisius yang ingin mengelola waktu
            dengan sistem modern dan efisien.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/40 hover:to-indigo-500/40 transition duration-500"
            >
              <div className="relative bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl p-8 h-full transition duration-500 group-hover:-translate-y-2">

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl bg-blue-500/20 rounded-2xl"></div>

                <div className="relative z-10">

                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 mb-6 text-xl">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Button */}
                  <button className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all duration-300">
                    Coba Sekarang
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}