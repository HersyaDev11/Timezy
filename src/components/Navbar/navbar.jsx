import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 px-6 md:px-16 py-4 ${
        scrolled
          ? "bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-white tracking-wide">
            Timezy
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <button className="text-gray-300 hover:text-white transition">
            Sign In
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
            Sign Up
          </button>
        </div>

        {/* HAMBURGER */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX size={24} className="text-white" />
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-[#1E293B]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl">
          <button className="block w-full text-left text-gray-300 hover:text-white transition">
            Sign In
          </button>

          <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}