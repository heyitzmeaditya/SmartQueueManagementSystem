import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ onStaffLoginClick, onAdminLoginClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Live Queue", to: "/live" },
    { label: "About", to: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="glass rounded-2xl border border-white/10 px-4 py-2 flex items-center justify-between backdrop-blur-xl bg-white/5 shadow-lg shadow-blue-500/10">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-500 via-cyan-400 to-emerald-400 flex items-center justify-center text-xs font-bold shadow-lg shadow-cyan-400/50">
              SQ
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm md:text-base">
                SmartQueue
              </span>
              <span className="text-[11px] text-gray-300/80 hidden sm:block">
                Real-time digital queue system
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Links */}
            <nav className="flex items-center gap-4 text-sm">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  <motion.span
                    whileHover={{ y: -1, opacity: 0.9 }}
                    className={`relative cursor-pointer ${
                      isActive(link.to)
                        ? "text-blue-300"
                        : "text-gray-200/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive(link.to) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 rounded-full"
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                onClick={onStaffLoginClick}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-blue-400/60 bg-blue-500/10 hover:bg-blue-500/20 shadow shadow-blue-500/40"
              >
                Staff Login
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                onClick={onAdminLoginClick}
                className="text-xs md:text-sm px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 text-white shadow shadow-red-500/50"
              >
                Admin Login
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="space-y-1">
              <span className="block h-0.5 w-5 bg-white"></span>
              <span className="block h-0.5 w-4 bg-white"></span>
              <span className="block h-0.5 w-3 bg-white"></span>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 glass rounded-2xl border border-white/10 px-4 py-3 space-y-3 backdrop-blur-xl bg-black/60"
          >
            <nav className="flex flex-col gap-2 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-2 py-1 rounded-md ${
                    isActive(link.to)
                      ? "bg-white/10 text-blue-300"
                      : "text-gray-200/90 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onStaffLoginClick();
                }}
                className="w-full text-xs px-3 py-2 rounded-full border border-blue-400/60 bg-blue-500/10 hover:bg-blue-500/20"
              >
                Staff Login
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdminLoginClick();
                }}
                className="w-full text-xs px-3 py-2 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 text-white"
              >
                Admin Login
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

export default Navbar;
