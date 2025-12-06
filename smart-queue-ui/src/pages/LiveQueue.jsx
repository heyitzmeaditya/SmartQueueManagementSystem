import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function LiveQueue() {
  const [current, setCurrent] = useState(null);
  const [waiting, setWaiting] = useState([]);
  const [served, setServed] = useState([]);

  // ✅ Fetch live queue every 5 seconds
  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/queue");
        setCurrent(res.data.currentServing);
        setWaiting(res.data.waitingTokens);
        setServed(res.data.servedTokens);
      } catch (err) {
        console.error("Queue fetch error", err);
      }
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 pt-10 overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 blur-3xl" />

      {/* ================= HEADING ================= */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent neon-text"
      >
        Live Queue Display
      </motion.h1>

      <p className="text-gray-400 mb-10 text-center">
        Real-time digital queue tracking board
      </p>

      {/* ================= CURRENT TOKEN ================= */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass w-full max-w-lg rounded-3xl p-6 text-center mb-10 glow-blue"
      >
        <h2 className="text-lg text-gray-400 mb-2">Currently Serving</h2>

        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl font-extrabold text-white"
            >
              #{current}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl text-gray-500"
            >
              No active token
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ================= WAITING TOKENS ================= */}
      <div className="w-full max-w-5xl mb-12">
        <h3 className="text-xl font-semibold text-center mb-4 text-cyan-300">
          Waiting Tokens
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4  ">
          <AnimatePresence>
            {waiting.length > 0 ? (
              waiting.map((token) => (
                <motion.div
                  key={token}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-xl py-3 text-center glow-blue"
                >
                  #{token}
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-500"
              >
                No waiting tokens
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= SERVED TOKENS ================= */}
      <div className="w-full max-w-5xl mb-10">
        <h3 className="text-xl font-semibold text-center mb-4 text-emerald-300">
          Recently Served
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          <AnimatePresence>
            {served.length > 0 ? (
              served.map((token) => (
                <motion.div
                  key={token}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass px-4 py-2 rounded-lg text-sm text-gray-300"
                >
                  #{token}
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500"
              >
                No tokens served yet
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

export default LiveQueue;
