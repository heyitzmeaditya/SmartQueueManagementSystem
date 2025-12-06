import { motion } from "framer-motion";

const sectionAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ================= HERO INTRO ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="glass rounded-3xl p-8 text-center glow-blue"
        >
          <h1 className="text-4xl font-bold mb-3">
            Hello, I’m <span className="text-cyan-300">Aditya Saw</span> 👋
          </h1>

          <p className="text-gray-300 mb-1">
            Final Year Computer Science Student at Lovely Professional University
          </p>

          <p className="text-gray-400 mb-4">
            📧 <a href="mailto:adityasaw407@gmail.com" className="text-cyan-400 underline">
              adityasaw407@gmail.com
            </a>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://github.com/heyitzmeaditya"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 hover:scale-105 transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/heyitzmeaditya/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-blue-600/30 border border-blue-400/40 hover:scale-105 transition"
            >
              LinkedIn
            </a>

            <a
              href="https://aditya-portfolio-qyfl.vercel.app/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-emerald-600/30 border border-emerald-400/40 hover:scale-105 transition"
            >
              Portfolio
            </a>
          </div>
        </motion.div>

        {/* ================= PROJECT OVERVIEW ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="glass rounded-3xl p-8 glow-green"
        >
          <h2 className="text-3xl font-bold text-emerald-300 mb-4">
            Smart Queue Management System
          </h2>

          <p className="text-gray-300">
            A real-world full stack MERN project that replaces physical queues
            with an intelligent digital token-based system. It helps reduce
            crowding, improves waiting experience, and brings full transparency
            to queue management.
          </p>
        </motion.div>

        {/* ================= REAL LIFE USE ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="glass rounded-3xl p-8 glow-blue"
        >
          <h2 className="text-3xl font-bold text-cyan-300 mb-4">
            Real-Life Applications
          </h2>

          <ul className="list-disc ml-6 text-gray-300 space-y-1">
            <li>Hospitals & Clinics – Patient queue control</li>
            <li>Banks & Financial Institutions</li>
            <li>Government Service Offices</li>
            <li>Colleges & Universities</li>
            <li>Restaurants & Cafes</li>
            <li>Mobile & Vehicle Service Centers</li>
          </ul>
        </motion.div>

        {/* ================= HOW IT WORKS ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="glass rounded-3xl p-8 glow-blue"
        >
          <h2 className="text-3xl font-bold text-yellow-300 mb-4">
            How This System Works in Real Life
          </h2>

          <p className="text-gray-300 leading-relaxed">
            1. User opens the website and generates a digital token.<br />
            2. Live queue shows waiting and current tokens in real time.<br />
            3. Staff digitally serves next users using one button.<br />
            4. Admin controls the system using a powerful dashboard.<br />
            5. If a user does not arrive on time, their token expires automatically.
          </p>
        </motion.div>

        {/* ================= TESTING CREDENTIALS ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="glass rounded-3xl p-8 glow-red"
        >
          <h2 className="text-3xl font-bold text-red-300 mb-4">
            Testing Credentials (Demo Only)
          </h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <p className="font-bold">Staff Login</p>
              <p>Email: aditya@gmail.com</p>
              <p>Password: aditya123</p>
            </div>

            <div>
              <p className="font-bold">Admin Login</p>
              <p>Email: admin123@gmail.com</p>
              <p>Password: admin123</p>
            </div>

            <p className="text-gray-400 italic mt-4">
              ⚠️ These credentials are for testing purposes only.
              For official access or collaboration, please contact me directly.
            </p>
          </div>
        </motion.div>

        {/* ================= CONTACT ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="glass rounded-3xl p-8 text-center glow-green"
        >
          <h2 className="text-3xl font-bold text-emerald-300 mb-3">
            Want to Collaborate?
          </h2>

          <p className="text-gray-300 mb-2">
            If you are interested in this project, its backend logic,
            architecture, or want to collaborate with me:
          </p>

          <p className="text-cyan-300 text-lg font-semibold">
            📧 adityasaw407@gmail.com
          </p>
        </motion.div>

      </div>
    </div>
  );
}
