import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [{ name: "Home", path: "/" }];

  return (
    <div className="fixed top-4 left-0 w-full z-50 px-6 md:px-16">
      <motion.div
        transition={{ duration: 0.4 }}
        className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold text-lg tracking-wide">
            Timezy
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 relative">
          {navLinks.map((link) => (
            <NavItem key={link.path} link={link} location={location} />
          ))}

          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX size={24} className="text-white" />
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 max-w-7xl mx-auto bg-[#1E293B]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <Link to="/login" className="block text-gray-300 hover:text-white">
              Sign In
            </Link>

            <Link
              to="/register"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ link, location }) {
  const isActive = location.pathname === link.path;

  return (
    <Link
      to={link.path}
      className="relative text-gray-300 hover:text-white transition"
    >
      {link.name}

      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute -bottom-2 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
        />
      )}
    </Link>
  );
}
