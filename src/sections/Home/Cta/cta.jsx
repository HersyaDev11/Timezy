import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTASection() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative py-28 px-6 md:px-16 overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>

      <motion.div
        style={{ y: yParallax }}
        className="relative max-w-6xl mx-auto"
      >
        <div
          onMouseMove={handleMouseMove}
          className="relative group rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40"
        >
          {/* Glass Card */}
          <div className="relative bg-[#0f172a]/90 backdrop-blur-2xl rounded-3xl p-16 text-center overflow-hidden">
            {/* Mouse Glow */}
            <div
              className="pointer-events-none absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"
              style={{
                left: position.x - 192,
                top: position.y - 192,
              }}
            />

            {/* Content */}
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Siap Menguasai Waktu Anda?
              </h2>

              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Bergabunglah dengan ribuan mahasiswa yang sudah meningkatkan
                produktivitasnya bersama Timezy.
              </p>

              <div className="flex justify-center gap-6 pt-4">
                <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg shadow-blue-500/30">
                  Mulai Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
