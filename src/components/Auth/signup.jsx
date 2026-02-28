import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Register() {
  const [show, setShow] = useState(false);

  return (
    <section className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        {/* Tombol Kembali */}
        <Link
          to="/"
          className="absolute -top-14 left-0 flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <FiArrowLeft />
          Kembali ke Beranda
        </Link>

        <div className="rounded-3xl p-[1px] bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500">
          <div className="bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl p-10">

            <h2 className="text-3xl font-semibold text-white mb-2 text-center">
              Buat Akun Baru
            </h2>

            <p className="text-gray-400 text-sm text-center mb-8">
              Mulai perjalanan produktifmu bersama Timezy.
            </p>

            <form className="space-y-6">

              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Alamat Email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-4 text-gray-400" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Kata Sandi"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-lg shadow-purple-500/30">
                Daftar
              </button>

            </form>

            <p className="text-gray-400 text-sm mt-8 text-center">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Masuk
              </Link>
            </p>

          </div>
        </div>
      </motion.div>
    </section>
  );
}