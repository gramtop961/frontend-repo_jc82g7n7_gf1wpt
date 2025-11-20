import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const categories = ["All", "Puzzle", "Adventure", "Action", "Kids Learning"]

export default function GameGrid() {
  const [active, setActive] = useState('All')
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/games`)
        const data = await res.json()
        setGames(data)
      } catch (e) {
        // fallback seeded list if backend not up
        setGames([
          { _id: '1', title: 'Neon Blocks', description: 'Stack glowing blocks.', category: 'Puzzle' },
          { _id: '2', title: 'Cyber Runner', description: 'Dash through synth city.', category: 'Adventure' },
          { _id: '3', title: 'Pulse Shooter', description: 'Arcade action & waves.', category: 'Action' },
          { _id: '4', title: 'ABC Quest', description: 'Learn letters & sounds.', category: 'Kids Learning' },
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = active === 'All' ? games : games.filter(g => g.category === active)

  return (
    <section id="games" className="relative py-16 bg-gradient-to-b from-black to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Mini Games</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 rounded-full text-sm border ${active===c? 'bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black border-transparent' : 'border-white/15 bg-white/5 text-cyan-100 hover:bg-white/10'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-cyan-200/80">Loading games…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((g, idx) => (
              <motion.div key={g._id || idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: idx*0.05 }} className="group bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition relative overflow-hidden">
                <div className="h-36 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 mb-4 relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.4),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.35),transparent_50%)]" />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{g.title}</h3>
                    <p className="text-sm text-cyan-200/80 line-clamp-2">{g.description}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">{g.category}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-semibold hover:brightness-110 transition">Play Now</button>
                  <button className="text-cyan-300/90 hover:text-white text-sm">Details</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
