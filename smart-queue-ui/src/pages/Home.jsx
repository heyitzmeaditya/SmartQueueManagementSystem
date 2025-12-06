import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Put taglines OUTSIDE the component so they don't recreate on every render
const TAGLINES = [
  "Skip the crowd. Track your turn in real-time.",
  "No more standing in long queues.",
  "Real-time digital queue for smart businesses.",
  "Fast, transparent, and stress-free queue system.",
  "Built with MERN for speed, scale, and security."
];

function Home({
  userToken,
  setUserToken,
  userWaitingTime,
  setUserWaitingTime
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Typing effect state
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "deleting"

  // ✅ TYPING EFFECT + 5s PAUSE + DELETING + LOOP
  useEffect(() => {
    let timeoutId;

    const fullText = TAGLINES[currentTagline];

    if (phase === "typing") {
      if (displayText.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 50); // typing speed
      } else {
        // Finished typing → pause for 5s
        timeoutId = setTimeout(() => {
          setPhase("pausing");
        }, 5000);
      }
    }

    else if (phase === "pausing") {
      // After pause → start deleting
      timeoutId = setTimeout(() => {
        setPhase("deleting");
      }, 200); // small delay before deleting starts
    }

    else if (phase === "deleting") {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 40); // deleting speed
      } else {
        // Done deleting → move to next tagline and start typing again
        timeoutId = setTimeout(() => {
          setCurrentTagline((prev) => (prev + 1) % TAGLINES.length);
          setPhase("typing");
        }, 300);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, phase, currentTagline]);

  // ✅ HANDLE GET TOKEN
  const handleGetToken = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/tokens", {
        name,
      });

      setUserToken(res.data.tokenNumber);
      setUserWaitingTime(res.data.estimatedWaitingTime);

      localStorage.setItem("userToken", res.data.tokenNumber);
      localStorage.setItem("userWaitingTime", res.data.estimatedWaitingTime);

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  // ✅ WAITING TIME AUTO-DECREASE
  useEffect(() => {
    if (!userToken) return;

    const interval = setInterval(() => {
      setUserWaitingTime((prev) => {
        if (prev > 0) return prev - 1;
        return 0;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [userToken, setUserWaitingTime]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-emerald-400/10 blur-3xl" />

      {/* ================= HERO SECTION ================= */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent neon-text"
      >
        Smart Queue System
      </motion.h1>

      {/* ✅ TYPING TAGLINE WITH BLINKING CURSOR */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-300 text-center mb-10 max-w-xl min-h-[48px]"
      >
        {displayText}
        <span className="ml-1 animate-pulse text-cyan-400">|</span>
      </motion.p>

      {/* ================= TOKEN INPUT CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass w-full max-w-sm rounded-2xl p-6 shadow-lg glow-blue"
      >
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border border-white/20 px-4 py-3 rounded-xl outline-none text-white placeholder-gray-400 mb-4 focus:border-cyan-400 transition"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleGetToken}
          disabled={loading}
          className="relative w-full overflow-hidden rounded-xl py-3 font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 text-black shadow-lg"
        >
          <span className="relative z-10">
            {loading ? "Generating..." : "Get Token"}
          </span>
          <span className="absolute inset-0 animate-pulse bg-white/20" />
        </motion.button>
      </motion.div>

      {/* ================= TOKEN RESULT CARD ================= */}
      {userToken && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass w-full max-w-sm rounded-2xl p-6 text-center glow-green"
        >
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">
            Token Generated ✅
          </h2>

          <p className="text-gray-300">Your Token Number</p>
          <p className="text-4xl font-bold my-2 text-white">
            #{userToken}
          </p>

          <p className="text-gray-300 mt-2">
            Estimated Waiting Time
          </p>

          <motion.p
            key={userWaitingTime}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-cyan-300"
          >
            ~ {userWaitingTime} minutes
          </motion.p>
        </motion.div>
      )}

    </div>
  );
}

export default Home;
