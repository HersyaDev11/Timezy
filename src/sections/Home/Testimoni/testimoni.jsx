import { motion } from "framer-motion";
import { FiStar, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useRef } from "react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Teknik Informatika, UI",
      text: "Nilai saya meningkat drastis sejak menggunakan fitur time-blocking. Sangat intuitif dan desainnya memanjakan mata.",
      image: "/assets/user1.jpg",
    },
    {
      name: "Sarah Wijaya",
      role: "Manajemen, UGM",
      text: "Akhirnya ada aplikasi yang mengerti kebutuhan mahasiswa Indonesia. Integrasi kalendernya juara!",
      image: "/assets/user2.jpg",
    },
    {
      name: "Budi Santoso",
      role: "Arsitektur, ITB",
      text: "Dark mode-nya sangat nyaman untuk belajar malam hari. Fitur Focus Mode benar-benar life saver saat skripsi.",
      image: "/assets/user3.jpg",
    },
  ];

  return (
    <section className="relative py-40 px-6 md:px-16 text-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px] animate-pulse top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[150px] animate-pulse bottom-[-200px] right-[-150px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between  mb-16 gap-8"
        >
          {/* LEFT TEXT */}
          <div className="space-y-5 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Apa Kata Mahasiswa
            </h2>

            <p className="text-gray-400 text-lg">
              Ribuan mahasiswa telah meningkatkan produktivitas mereka bersama
              <span className="text-white font-medium"> Timezy</span>.
            </p>
          </div>

          {/* RIGHT ARROWS */}
          <div className="flex items-center gap-4">
            <button className="group w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
              <FiArrowLeft className="text-white group-hover:-translate-x-1 transition" />
            </button>

            <button className="group w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
              <FiArrowRight className="text-white group-hover:translate-x-1 transition" />
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-12 perspective">
          {testimonials.map((item, index) => (
            <TiltCard key={index} item={item} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ item, delay }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ rotateY: 8, rotateX: -5 }}
      className="relative group rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/40 via-indigo-500/30 to-purple-500/40 transition duration-500"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative bg-[#0F172A]/80 backdrop-blur-2xl rounded-3xl p-10 h-full transition duration-500 group-hover:-translate-y-3">
        {/* Glow Layer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-3xl bg-blue-500/20 rounded-3xl"></div>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 text-yellow-400 mb-6">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="fill-yellow-400" />
            ))}
          </div>

          {/* Text */}
          <p className="text-gray-300 leading-relaxed mb-10 text-lg">
            “{item.text}”
          </p>

          {/* User */}
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-full object-cover border border-white/10 shadow-lg"
            />
            <div>
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-gray-400 text-sm">{item.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
