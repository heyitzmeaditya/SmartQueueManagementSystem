import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LiveQueue from "./pages/LiveQueue";
import About from "./pages/About";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/Footer";


function App() {
  // ================= GLOBAL STATES =================
  const [userToken, setUserToken] = useState(null);
  const [userWaitingTime, setUserWaitingTime] = useState(null);

  const location = useLocation();

  const [avgTime, setAvgTime] = useState(3);
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [analytics, setAnalytics] = useState({});

  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // ================= LOAD TOKEN FROM LOCAL STORAGE =================
  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    const savedWaiting = localStorage.getItem("userWaitingTime");

    if (savedToken) setUserToken(savedToken);
    if (savedWaiting) setUserWaitingTime(savedWaiting);
  }, []);

  // ================= FETCH ANALYTICS =================
  useEffect(() => {
    if (isAdminLoggedIn) {
      axios
        .get("http://localhost:5000/api/admin/analytics")
        .then((res) => setAnalytics(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAdminLoggedIn]);

  return (
    <>
      <Navbar
        onStaffLoginClick={() => setShowStaffLogin(true)}
        onAdminLoginClick={() => setShowAdminLogin(true)}
      />

      {/* ================= STAFF LOGIN MODAL ================= */}
      {/* ================= PREMIUM STAFF LOGIN MODAL ================= */}
{showStaffLogin && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

    <div className="glass w-full max-w-md rounded-3xl p-8 glow-green animate-fadeIn">

      <h2 className="text-3xl font-extrabold text-center text-emerald-400 mb-2">
        Staff Login
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Secure access to staff control panel
      </p>

      <input
        type="email"
        placeholder="Staff Email"
        className="w-full bg-transparent border border-white/20 px-4 py-3 rounded-xl mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full bg-transparent border border-white/20 px-4 py-3 rounded-xl mb-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <div className="flex justify-between gap-4">
        <button
          onClick={() => setShowStaffLogin(false)}
          className="w-1/2 py-3 rounded-xl border border-gray-500/40 text-gray-300 hover:bg-gray-500/10 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setIsStaffLoggedIn(true);
            setShowStaffLogin(false);
          }}
          className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 text-black font-bold hover:scale-105 transition"
        >
          Login
        </button>
      </div>
    </div>
  </div>
)}


      {/* ================= ADMIN LOGIN MODAL ================= */}
      {/* ================= PREMIUM ADMIN LOGIN MODAL ================= */}
{showAdminLogin && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

    <div className="glass w-full max-w-md rounded-3xl p-8 glow-red animate-fadeIn">

      <h2 className="text-3xl font-extrabold text-center text-red-400 mb-2">
        Admin Login
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Secure access to system control room
      </p>

      <input
        type="email"
        placeholder="Admin Email"
        className="w-full bg-transparent border border-white/20 px-4 py-3 rounded-xl mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full bg-transparent border border-white/20 px-4 py-3 rounded-xl mb-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      <div className="flex justify-between gap-4">
        <button
          onClick={() => setShowAdminLogin(false)}
          className="w-1/2 py-3 rounded-xl border border-gray-500/40 text-gray-300 hover:bg-gray-500/10 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setIsAdminLoggedIn(true);
            setShowAdminLogin(false);
          }}
          className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 text-white font-bold hover:scale-105 transition"
        >
          Login
        </button>
      </div>
    </div>
  </div>
)}

      {/* ================= STAFF DASHBOARD ================= */}
      {/* ================= STAFF PORTAL ================= */}
{isStaffLoggedIn && !isAdminLoggedIn && (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500/10 via-cyan-400/10 to-blue-500/10 px-4">

    <div className="glass w-full max-w-lg rounded-3xl p-8 text-center glow-green">

      <h2 className="text-3xl font-extrabold text-emerald-400 mb-2">
        Staff Control Panel
      </h2>
      <p className="text-gray-400 mb-8">
        Serve users and manage live queue in real-time
      </p>

      {/* LIVE STATUS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Current Status</p>
          <p className="text-xl font-bold text-cyan-300">Live</p>
        </div>

        <div className="glass rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">System Health</p>
          <p className="text-xl font-bold text-emerald-300">Good</p>
        </div>
      </div>

      {/* SERVE BUTTON */}
      <button
        onClick={async () => {
          try {
            await axios.post("http://localhost:5000/api/serve-next");
            alert("✅ Next token served");
          } catch (err) {
            alert("❌ Error serving token");
          }
        }}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 text-black font-bold text-lg shadow-xl hover:scale-105 transition mb-6"
      >
        ▶ Serve Next Token
      </button>

      {/* LOGOUT */}
      <button
        onClick={() => setIsStaffLoggedIn(false)}
        className="w-full py-3 rounded-xl border border-red-400/60 text-red-400 hover:bg-red-500/10 transition"
      >
        Logout
      </button>

    </div>
  </div>
)}


      {/* ================= ADMIN DASHBOARD ================= */}
      {/* ================= ADMIN CONTROL PANEL ================= */}
{isAdminLoggedIn && (
  <div className="min-h-screen bg-gradient-to-br from-red-500/10 via-orange-400/10 to-yellow-400/10 px-4 py-12">

    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
      Admin Control Room 👑
    </h2>

    {/* METRICS */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">

      <div className="glass p-6 rounded-3xl text-center glow-blue">
        <p className="text-gray-400">System Status</p>
        <p className="text-2xl font-bold text-cyan-300">Operational</p>
      </div>

      <div className="glass p-6 rounded-3xl text-center glow-green">
        <p className="text-gray-400">Queue Health</p>
        <p className="text-2xl font-bold text-emerald-300">Stable</p>
      </div>

      <div className="glass p-6 rounded-3xl text-center glow-red">
        <p className="text-gray-400">Security Level</p>
        <p className="text-2xl font-bold text-red-300">High</p>
      </div>

    </div>

    {/* CONTROL GRID */}
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

      {/* RESET QUEUE */}
      <div className="glass p-6 rounded-3xl text-center glow-red">
        <h3 className="font-bold text-lg mb-4 text-red-400">
          Reset Entire Queue
        </h3>

        <button
          onClick={async () => {
            await axios.post("http://localhost:5000/api/admin/reset-queue");
            alert("✅ Queue reset");
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 text-white font-bold hover:scale-105 transition"
        >
          ⚠ Reset Queue
        </button>
      </div>

      {/* SET AVG TIME */}
      <div className="glass p-6 rounded-3xl text-center glow-blue">
        <h3 className="font-bold text-lg mb-3 text-cyan-300">
          Avg Service Time (min)
        </h3>

        <input
          type="number"
          placeholder="Enter minutes"
          onChange={(e) => setAvgTime(e.target.value)}
          className="w-full bg-transparent border border-white/20 px-3 py-2 rounded-lg mb-3 text-white"
        />

        <button
          onClick={async () => {
            await axios.post("http://localhost:5000/api/admin/set-avg-time", {
              avgServiceTime: avgTime,
            });
            alert("✅ Time updated");
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold hover:scale-105 transition"
        >
          Update Time
        </button>
      </div>

      {/* CREATE STAFF */}
      <div className="glass p-6 rounded-3xl text-center glow-green">
        <h3 className="font-bold text-lg mb-3 text-emerald-300">
          Create Staff Account
        </h3>

        <input
          type="email"
          placeholder="Staff Email"
          onChange={(e) => setStaffEmail(e.target.value)}
          className="w-full bg-transparent border border-white/20 px-3 py-2 rounded-lg mb-3 text-white"
        />

        <input
          type="password"
          placeholder="Staff Password"
          onChange={(e) => setStaffPassword(e.target.value)}
          className="w-full bg-transparent border border-white/20 px-3 py-2 rounded-lg mb-3 text-white"
        />

        <button
          onClick={async () => {
            await axios.post("http://localhost:5000/api/admin/create-staff", {
              email: staffEmail,
              password: staffPassword,
            });
            alert("✅ Staff Created");
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 text-black font-bold hover:scale-105 transition"
        >
          Create Staff
        </button>
      </div>

    </div>

    {/* ANALYTICS */}
    <div className="glass max-w-4xl mx-auto mt-14 p-8 rounded-3xl text-center glow-blue">
      <h3 className="text-2xl font-bold mb-4 text-cyan-300">
        Live Daily Analytics
      </h3>
      <p>✅ Tokens Served: 35</p>
      <p>⚠️ Tokens Expired: 5</p>
      <p>🔥 Peak Rush Time: 1:00 PM - 2:00 PM</p>
    </div>

    {/* LOGOUT */}
    <div className="text-center mt-10">
      <button
        onClick={() => setIsAdminLoggedIn(false)}
        className="px-6 py-2 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/10 transition"
      >
        Logout
      </button>
    </div>

  </div>
)}

      {/* ================= NORMAL USER ROUTES ================= */}
      {!isStaffLoggedIn &&
        !isAdminLoggedIn &&
        !showStaffLogin &&
        !showAdminLogin && (
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Home
                      userToken={userToken}
                      setUserToken={setUserToken}
                      userWaitingTime={userWaitingTime}
                      setUserWaitingTime={setUserWaitingTime}
                    />
                  </motion.div>
                }
              />

              <Route
                path="/live"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <LiveQueue />
                  </motion.div>
                }
              />

              <Route
                path="/about"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <About />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        )}
        <Footer />

    </>
  );
}

export default App;
