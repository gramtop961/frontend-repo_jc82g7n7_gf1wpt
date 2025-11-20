import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.35)]"
        >
          Play. Compete. Level Up.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl text-cyan-200/90"
        >
          A premium hub of bite‑sized games with leaderboards, profiles, and a sleek neon interface.
        </motion.p>
      </div>
    </section>
  )
}
